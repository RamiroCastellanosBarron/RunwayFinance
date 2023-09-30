using System.ComponentModel.DataAnnotations;

namespace Core.DTOs
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "First name is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Sex is required")]
        public string Sex { get; set; }

        [Required(ErrorMessage = "Date of birth is required")]
        public DateOnly? DateOfBirth { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Phone number is required")]
        [Phone(ErrorMessage = "Invalid phone number format")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(30, ErrorMessage = "Password must be between 8 and 30 characters long.", MinimumLength = 8)]
        [RegularExpression("(?=^.{6,255}$)((?=.*\\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*", ErrorMessage = "Password must meet the complexity requirements.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm Password is required")]
        [Compare("Password", ErrorMessage = "Password and Confirm Password must match.")]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "You must agree to the terms and conditions")]
        [Range(typeof(bool), "true", "true", ErrorMessage = "You must agree to the terms and conditions")]
        public bool AgreeTermsAndConditions { get; set; }

        [Required(ErrorMessage = "You must agree to the privacy policy")]
        [Range(typeof(bool), "true", "true", ErrorMessage = "You must agree to the privacy policy")]
        public bool AgreePrivacyPolicy { get; set; }
    }
}