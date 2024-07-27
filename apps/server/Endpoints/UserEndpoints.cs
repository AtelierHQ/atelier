using Atelier.Core.Entities;
using Atelier.Core.Interfaces;
using Atelier.Server.RequestModels;
using Atelier.Server.ResponseModels;
using FastEndpoints;
using FastEndpoints.Security;

namespace Atelier.Server.Endpoints;

public class UserSignupEndpoint : Endpoint<UserSignUpRequestModel>
{
    private readonly IAuthenticationService _authenticationService;
    private readonly IEntityRepository<User, string> _usersRepository;

    public UserSignupEndpoint(IAuthenticationService authenticationService,
        IEntityRepository<User, string> usersRepository)
    {
        ArgumentNullException.ThrowIfNull(authenticationService);
        ArgumentNullException.ThrowIfNull(usersRepository);

        _authenticationService = authenticationService;
        _usersRepository = usersRepository;
    }

    public override void Configure()
    {
        Post("/api/d/signup");
        AllowAnonymous();
    }

    public override async Task HandleAsync(UserSignUpRequestModel req, CancellationToken ct)
    {
        var users = await _usersRepository.GetAllAsync(0, 0, ct);
        if (users.Any(u => u.Email == req.Email))
        {
            await SendAsync("Email already in use!", 400, ct);
        }

        var passwordHash = _authenticationService.HashPassword(req.Password);
        var user = new User(req.Name, req.Email, passwordHash, req.Role);
        var createdUser = await _usersRepository.CreateAsync(user, ct);

        var userResponse = new UserResponseModel
        {
            Id = createdUser.Id,
            Name = createdUser.Name,
            Email = createdUser.Email,
            Role = createdUser.Role,
        };

        await SendAsync(userResponse, 201, ct);
    }
}

public class UserLoginEndpoint : Endpoint<UserLoginRequestModel>
{
    private readonly IAuthenticationService _authenticationService;

    public UserLoginEndpoint(IAuthenticationService authenticationService)
    {
        ArgumentNullException.ThrowIfNull(authenticationService);
        _authenticationService = authenticationService;
    }

    public override void Configure()
    {
        Post("/api/d/login");
        AllowAnonymous();
    }

    public override async Task HandleAsync(UserLoginRequestModel req, CancellationToken ct)
    {
        if (await _authenticationService.ValidateCredentialsAsync(req.Email, req.Password, ct))
        {
            var user = await _authenticationService.GetUserByEmailAsync(req.Email, ct);
            var jwtToken = JwtBearer.CreateToken(
                o =>
                {
                    o.SigningKey = "YourSecretKeyHereThatShouldBeAtLeast32CharactersLong";
                    o.ExpireAt = DateTime.UtcNow.AddDays(1);
                    o.User.Roles.Add(user.Role);
                    o.User.Claims.Add(("email", user.Email));
                    o.User["UserId"] = user.Id;
                });

            await SendAsync(new { req.Email, Token = jwtToken }, cancellation: ct);
        }
        else
        {
            ThrowError("The supplied credentials are invalid!");
        }
    }
}
