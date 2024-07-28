using System.Security.Cryptography;
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
        var user = (await _userRepository.GetAllAsync(0, 0, u => u.Email == email, cancellationToken)).FirstOrDefault();
        if (user is null)
        {
            throw new Exception("User not found!");
        }

        return VerifyPassword(password, user.Password);
    }

    public async Task<User> GetUserByEmailAsync(string email, CancellationToken cancellationToken)
    {
        var user = (await _userRepository.GetAllAsync(0, 0, u => u.Email == email, cancellationToken)).FirstOrDefault();
        if (user is null)
        {
            throw new Exception("User not found!");
        }

        return user;
    }

    private bool VerifyPassword(string password, string storedHash)
    {
        var hashBytes = Convert.FromBase64String(storedHash);

        // Extract the salt from the stored hash
        var salt = new byte[16];
        Array.Copy(hashBytes, 0, salt, 0, 16);

        // Compute the hash on the password the user entered
        var computedHash = Rfc2898DeriveBytes.Pbkdf2(password, salt, 100000, HashAlgorithmName.SHA256, 32);

        // Compare the computed hash with the stored hash
        for (var i = 0; i < 32; i++)
        {
            if (hashBytes[i + 16] != computedHash[i])
                return false;
        }

        return true;
    }

    public string HashPassword(string password)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(password);

        var salt = RandomNumberGenerator.GetBytes(16);
        var hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, 100000, HashAlgorithmName.SHA256, 32);

        var hashBytes = new byte[48];
        Array.Copy(salt, 0, hashBytes, 0, 16);
        Array.Copy(hash, 0, hashBytes, 16, 32);

        return Convert.ToBase64String(hashBytes);
    }
}
