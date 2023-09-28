using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Core.Helpers;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Services
{
    public class DocumentService : IDocumentService
    {
        private readonly Cloudinary _cloudinaryAccount;
        public DocumentService(IOptions<CloudinarySettings> cloudinarySettings)
        {
            var acc = new Account
            (
                cloudinarySettings.Value.CloudName,
                cloudinarySettings.Value.ApiKey,
                cloudinarySettings.Value.ApiSecret
            );

            _cloudinaryAccount = new Cloudinary(acc);
        }

        public async Task<DeletionResult> DeleteDocument(string documentPublicId)
        {
            var deleteParams = new DeletionParams(documentPublicId);

            return await _cloudinaryAccount.DestroyAsync(deleteParams);
        }

        public async Task<(string documentUrl, string publicId, string thumbnailUrl)> UploadDocument(IFormFile file)
        {
            var uploadResult = await _cloudinaryAccount.UploadAsync(new ImageUploadParams
            {
                File = new FileDescription(file.FileName, file.OpenReadStream()),
            });

            var thumbnailTransformation = new Transformation().Page("1").Width(200).Height(300).Crop("fill");
            var thumbnailUrl = _cloudinaryAccount.Api.UrlImgUp.Transform(thumbnailTransformation).BuildUrl(uploadResult.PublicId + ".png");

            return (uploadResult.Url.ToString(), uploadResult.PublicId, thumbnailUrl);
        }
    }
}