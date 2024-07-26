namespace Atelier.Server.Domain;

public class Idea(Guid id, string title, string description, string author, List<string> tags, List<string> attachments)
{
    public Guid Id { get; set; } = id;

    public string Title { get; set; } = title;

    public string Description { get; set; } = description;

    public string Author { get; set; } = author;

    public List<string> Tags { get; set; } = tags;

    public List<string> Attachments { get; set; } = attachments;

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public DateTime UpdatedAt { get; set; } = DateTime.Now;

    public bool IsDeleted { get; set; } = false;
}
