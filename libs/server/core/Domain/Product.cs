namespace Atelier.Core.Domain;

public class Product(Guid id, string name, string description, Guid ownerId, Guid teamId)
{
    public Guid Id { get; set; } = id;

    public string Name { get; set; } = name;

    public string Description { get; set; } = description;

    public Guid OwnerId { get; set; } = ownerId;

    public Guid TeamId { get; set; } = teamId;

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public DateTime UpdatedAt { get; set; } = DateTime.Now;

    public bool IsDeleted { get; set; } = false;
}
