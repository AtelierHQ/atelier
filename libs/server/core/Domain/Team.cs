namespace Atelier.Core.Domain;

public class Team(Guid id, string name, string description, List<Guid> members)
{
    public Guid Id { get; set; } = id;

    public string Name { get; set; } = name;

    public string Description { get; set; } = description;

    public List<Guid> Members { get; set; } = members;

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public DateTime UpdatedAt { get; set; } = DateTime.Now;

    public bool IsDeleted { get; set; } = false;
}
