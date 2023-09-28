using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace Core.Interfaces
{
    public interface IDocumentService
    {
        Task<(string documentUrl, string publicId, string thumbnailUrl)> UploadDocument(IFormFile file);
        Task<DeletionResult> DeleteDocument(string documentPublicId);
    }
}