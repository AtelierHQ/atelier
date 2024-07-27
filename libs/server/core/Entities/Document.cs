using Atelier.Core.Interfaces;

namespace Atelier.Core.Entities;

public class Document : IEntity<string>
{
    public string Id { get; private set; }

    public string Title { get; private set; }

    public string Content { get; private set; }

    public string OwnerId { get; private set; }

    public DateTime CreatedAt { get; private set; }

    public DateTime UpdatedAt { get; private set; }

    public bool IsDeleted { get; private set; }

    public Document(string title, string content, string ownerId, DateTime createdAt, DateTime updatedAt)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(title);
        ArgumentException.ThrowIfNullOrWhiteSpace(content);
        ArgumentNullException.ThrowIfNull(ownerId);

        Id = string.Empty;
        Title = title;
        Content = content;
        OwnerId = ownerId;
        CreatedAt = createdAt;
        UpdatedAt = updatedAt;
        IsDeleted = false;
    }

    public void SetId(string id)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(id);

        if (string.IsNullOrEmpty(Id))
        {
            Id = id;
        }
    }
}
