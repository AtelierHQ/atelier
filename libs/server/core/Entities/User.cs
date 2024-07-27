namespace Atelier.Core.Entities;

public class User(Guid id, string name, string email, string password, string role)
{
    public Guid Id { get; set; } = id;

    public string Name { get; set; } = name;

    public string Email { get; set; } = email;

    public string Password { get; set; } = password;

    public string Role { get; set; } = role;

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public DateTime UpdatedAt { get; set; } = DateTime.Now;

    public bool IsDeleted { get; set; } = false;
}
