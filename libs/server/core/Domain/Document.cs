namespace Atelier.Core.Domain;

public class Document(Guid id, string name, string description, string content, Guid ownerId)
{
    public Guid Id { get; set; } = id;

    public string Name { get; set; } = name;

    public string Description { get; set; } = description;

    public string Content { get; set; } = content;

    public Guid OwnerId { get; set; } = ownerId;

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public DateTime UpdatedAt { get; set; } = DateTime.Now;

    public bool IsDeleted { get; set; } = false;
}
