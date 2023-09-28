namespace Core.Interfaces
{
    public interface IEmailService
    {
        Task SendMail(string to, string subject, string htmlMessage);
    }
}