namespace Atelier.Server.RequestModels;

public class UserSignUpRequestModel
{
    public string Name { get; init; } = string.Empty;

    public string Email { get; init; } = string.Empty;

    public string Password { get; init; } = string.Empty;

    public string Role { get; init; } = string.Empty;
}

public class UserLoginRequestModel
{
    public string Email { get; init; } = string.Empty;

    public string Password { get; init; } = string.Empty;
}
