using System.Security.Cryptography;
using System.Text;
using Atelier.Core.Entities;
using Atelier.Core.Interfaces;

namespace Atelier.Core.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly IEntityRepository<User, string> _userRepository;

    public AuthenticationService(IEntityRepository<User, string> userRepository)
    {
        ArgumentNullException.ThrowIfNull(userRepository);
        _userRepository = userRepository;
    }

    public async Task<bool> ValidateCredentialsAsync(string email, string password, CancellationToken cancellationToken)
    {
        await Task.Delay(500, cancellationToken);
        return email == "meet@gmail.com" && password == "123456";
    }

    public async Task<User> GetUserByEmailAsync(string email, CancellationToken cancellationToken)
    {
        var users = await _userRepository.GetAllAsync(0, 0, cancellationToken);
        var user = users.FirstOrDefault(u => u.Email == email);
        if (user is null)
        {
            throw new Exception("User not found!");
        }

        return user;
    }

    private bool VerifyPassword(string password, string storedHash)
    {
        var hashedBytes = SHA256.HashData(Encoding.UTF8.GetBytes(password));
        var hash = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
        return hash == storedHash;
    }

    public string HashPassword(string password)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(password);

        var hashedBytes = SHA256.HashData(Encoding.UTF8.GetBytes(password));
        return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
    }
}
