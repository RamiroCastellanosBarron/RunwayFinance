using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _uow;
        private readonly ILogger<AccountController> _logger;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IMapper mapper, ITokenService tokenService, IPhotoService photoService, IUnitOfWork uow, ILogger<AccountController> logger)
        {
            _logger = logger;
            _uow = uow;
            _photoService = photoService;
            _tokenService = tokenService;
            _mapper = mapper;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AccountDto>> Login(LoginDto request)
        {
            var user = await _userManager.Users
                .Include(x => x.UserProfilePicture)
                .Include(x => x.UserProfilePicture).ThenInclude(x => x.Photo)
                .SingleOrDefaultAsync(x => x.Email == request.Email);

            if (user == null) return Unauthorized(new ApiResponse(401, "Correo o contraseña incorrecta"));

            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (!result.Succeeded) return Unauthorized(new ApiResponse(401, "Correo o contraseña incorrecta"));

            var accountToReturn = _mapper.Map<AppUser, AccountDto>(user);

            accountToReturn.Token = await _tokenService.CreateToken(user);

            return Ok(accountToReturn);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<AccountDto>> GetUser()
        {
            var user = await _userManager.Users
                .SingleOrDefaultAsync(x => x.Id == User.GetUserId());

            return Ok(user);
        }

        [Authorize]
        [HttpPost("profile-picture")]
        public async Task<ActionResult<AccountDto>> SetProfilePicture(IFormFile file)
        {
            Guid userId = User.GetUserId();

            var result = await _photoService.AddAccountPhoto(file);

            if (result.Error != null)
                return BadRequest(new ApiResponse(400, result.Error.Message));

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                UserProfilePicture = new UserProfilePicture
                {
                    UserId = userId
                }
            };

            _uow.PhotoRepository.Add(photo);

            if (await _uow.Complete() < 0)
                return BadRequest(new ApiResponse(400, "Failed to add the photo"));

            var accountDto = await GenerateAccountDto(userId);

            return Ok(accountDto);
        }

        [Authorize]
        [HttpDelete("profile-picture")]
        public async Task<ActionResult<AccountDto>> DeleteProfilePicture()
        {
            Guid userId = User.GetUserId();

            var photo = await _uow.PhotoRepository.GetPhotoByUserIdAsync(userId);

            if (!string.IsNullOrEmpty(photo.PublicId))
            {
                var deleteResult = await _photoService.DeletePhoto(photo.PublicId);

                if (deleteResult.Result != "ok")
                    _logger.LogWarning($"The profile picture of id {photo.Id} could not be deleted from Cloudinary. Result: {deleteResult.Result}.");
            }

            _uow.PhotoRepository.Delete(photo);

            if (await _uow.Complete() < 0)
                return BadRequest(new ApiResponse(400, "Failed to delete the photo"));

            var accountDto = await GenerateAccountDto(userId);

            return Ok(accountDto);
        }

        [AllowAnonymous]
        [HttpPost("request-password-reset-token/{email}")]
        public async Task<ActionResult<string>> RequestPasswordResetTokenWithEmail([FromRoute] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            return Ok(token);
        }

        [HttpPut("reset-password-with-token")]
        public async Task<ActionResult> ResetPasswordWithToken([FromBody] PasswordResetDto passwordResetDto)
        {
            var user = await _userManager.FindByEmailAsync(passwordResetDto.Email);
            if (user == null)
            {
                return BadRequest("Invalid request");
            }

            var verifyPassResult = _userManager.PasswordHasher.VerifyHashedPassword(user, user.PasswordHash, passwordResetDto.Password);
            if (verifyPassResult == PasswordVerificationResult.Success)
            {
                return BadRequest("New password should be different from the old password.");
            }

            var result = await _userManager.ResetPasswordAsync(user, passwordResetDto.Token, passwordResetDto.Password);

            if (!result.Succeeded)
            {
                if (result.Errors.Any(e => e.Code == "InvalidToken"))
                {
                    return BadRequest("Invalid or expired token.");
                }

                return BadRequest("Password reset failed");
            }

            return Ok("Password reset successfully");
        }

        [Authorize]
        [HttpPut("password-update")]
        public async Task<ActionResult> ResetPassword(NewPasswordDto password)
        {
            var user = await _userManager.Users
                .SingleOrDefaultAsync(u => u.Email == User.GetEmail());

            var result = await _signInManager.CheckPasswordSignInAsync(user, password.CurrentPassword, false);

            if (!result.Succeeded) return Unauthorized("La contraseña actual es incorrecta");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            await _userManager.ResetPasswordAsync(user, token, password.NewPassword);

            return Ok();
        }

        private async Task<AccountDto> GenerateAccountDto(Guid userId)
        {
            var user = await _userManager.Users
                .Include(x => x.UserProfilePicture)
                .Include(x => x.UserProfilePicture).ThenInclude(x => x.Photo)
                .SingleOrDefaultAsync(x => x.Id == userId);

            var accountToReturn = _mapper.Map<AppUser, AccountDto>(user);

            accountToReturn.Token = await _tokenService.CreateToken(user);

            return accountToReturn;
        }
    }
}