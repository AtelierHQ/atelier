using Atelier.Server.RequestModels;
using FastEndpoints;
using FluentValidation;

namespace Atelier.Server.Validators;

public class SignUpValidator : Validator<UserSignUpRequestModel>
{
    public SignUpValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(50);
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
        RuleFor(x => x.Role).NotEmpty();
    }
}

public class LoginValidator : Validator<UserLoginRequestModel>
{
    public LoginValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
    }
}
