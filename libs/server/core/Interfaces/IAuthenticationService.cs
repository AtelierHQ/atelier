using Atelier.Core.Entities;

namespace Atelier.Core.Interfaces;

public interface IAuthenticationService
{
    Task<bool> ValidateCredentialsAsync(string email, string password, CancellationToken cancellationToken);

    Task<User> GetUserByEmailAsync(string email, CancellationToken cancellationToken);

    string HashPassword(string password);
}
