using System.ComponentModel.DataAnnotations;

namespace Core.DTOs
{
    public class NewPasswordDto
    {
        [Required(ErrorMessage = "Current password is required.")]
        public string CurrentPassword { get; set; }

        [Required(ErrorMessage = "New password is required.")]
        [StringLength(30, ErrorMessage = "Password must be between 8 and 30 characters long.", MinimumLength = 8)]
        [RegularExpression("(?=^.{6,255}$)((?=.*\\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*", ErrorMessage = "Password must meet the complexity requirements.")]
        public string NewPassword { get; set; }

        [Required(ErrorMessage = "Confirm new password is required")]
        [Compare("NewPassword", ErrorMessage = "Password and confirmation password must match.")]
        public string ConfirmNewPassword { get; set; }
    }
}