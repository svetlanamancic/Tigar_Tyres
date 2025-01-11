#build project at this stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 as build
WORKDIR /src
COPY ["API.csproj", "./"]
RUN dotnet restore "./API.csproj"
COPY . .
RUN dotnet publish "API.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 as base
ENV \
    ASPNETCORE_URLS=http://+:80 \
    DOTNET_RUNNING_IN_CONTAINER=true
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 80

ENTRYPOINT ["dotnet", "API.dll"]
