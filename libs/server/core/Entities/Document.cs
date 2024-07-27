using Atelier.Core.Interfaces;

namespace Atelier.Core.Entities;

public class Document : IEntity<string>
{
    public string Id { get; private set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public string Content { get; set; }

    public Guid OwnerId { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public DateTime UpdatedAt { get; set; } = DateTime.Now;

    public bool IsDeleted { get; set; } = false;

    public Document(string name, string description, string content, Guid ownerId)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        ArgumentException.ThrowIfNullOrWhiteSpace(description);
        ArgumentException.ThrowIfNullOrWhiteSpace(content);
        ArgumentNullException.ThrowIfNull(ownerId);

        Id = string.Empty;
        Name = name;
        Description = description;
        Content = content;
        OwnerId = ownerId;
    }

    public void SetId(string id)
    {
        throw new NotImplementedException();
    }
}
