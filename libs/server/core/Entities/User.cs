using Atelier.Core.Interfaces;

namespace Atelier.Core.Entities;

public class User : IEntity<string>
{
    public string Id { get; private set; }

    public string Name { get; private set; }

    public string Email { get; private set; }

    public string Password { get; private set; }

    public string Role { get; private set; }

    public DateTime CreatedAt { get; private set; }

    public DateTime UpdatedAt { get; private set; }

    public bool IsDeleted { get; private set; }

    public User(string name, string email, string password, string role)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        ArgumentException.ThrowIfNullOrWhiteSpace(email);
        ArgumentException.ThrowIfNullOrWhiteSpace(password);
        ArgumentException.ThrowIfNullOrWhiteSpace(role);

        Id = string.Empty;
        Name = name;
        Email = email;
        Password = password;
        Role = role;
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
        IsDeleted = false;
    }

    public void SetId(string id)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(id);

        if (string.IsNullOrWhiteSpace(id))
        {
            Id = id;
        }
    }
}
