using Atelier.Core.Entities.Fields;
using Atelier.Core.Interfaces;

namespace Atelier.Core.Entities;

public class Idea : IEntity<string>
{
    public string Id { get; private set; }

    public string Title { get; private set; }

    public string Description { get; private set; }

    public string Author { get; private set; }

    public List<string> Tags { get; private set; }

    public List<string> Attachments { get; private set; }

    public List<FieldValue> FieldValues { get; private set; }

    public DateTime CreatedAt { get; private set; }

    public DateTime UpdatedAt { get; private set; }

    public bool IsDeleted { get; private set; }

    public Idea(string title, string description, string author, List<string> tags, List<string> attachments)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(title);
        ArgumentException.ThrowIfNullOrWhiteSpace(description);
        ArgumentException.ThrowIfNullOrWhiteSpace(author);
        ArgumentNullException.ThrowIfNull(tags);
        ArgumentNullException.ThrowIfNull(attachments);

        Id = string.Empty;
        Title = title;
        Description = description;
        Author = author;
        Tags = tags;
        Attachments = attachments;
        FieldValues = new List<FieldValue>();
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
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

    public void InitializeFieldValues(List<FieldValue> fieldsValues)
    {
        ArgumentNullException.ThrowIfNull(fieldsValues);
        FieldValues = fieldsValues;
    }

    public void Update(string title, string description)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(title);
        ArgumentException.ThrowIfNullOrWhiteSpace(description);

        Title = title;
        Description = description;
        UpdatedAt = DateTime.UtcNow;
    }

    public void UpdateFieldValues(List<FieldValue> fieldsValues)
    {
        ArgumentNullException.ThrowIfNull(fieldsValues);
        FieldValues = fieldsValues;
        UpdatedAt = DateTime.UtcNow;
    }

    public void MarkAsDeleted()
    {
        IsDeleted = true;
    }
}
