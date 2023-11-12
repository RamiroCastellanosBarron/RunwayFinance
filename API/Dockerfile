FROM mcr.microsoft.com/dotnet/sdk:7.0 as build
WORKDIR /app
EXPOSE 80

COPY RunwayFinance.sln RunwayFinance.sln
COPY API/API.csproj API/API.csproj
COPY Core/Core.csproj Core/Core.csproj
COPY Infrastructure/Infrastructure.csproj Infrastructure/Infrastructure.csproj

RUN dotnet restore RunwayFinance.sln

COPY API API
COPY Core Core
COPY Infrastructure Infrastructure
WORKDIR /app/API
RUN dotnet publish -c Release -o /app/API/out

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app/API/out .
ENTRYPOINT [ "dotnet", "API.dll" ]