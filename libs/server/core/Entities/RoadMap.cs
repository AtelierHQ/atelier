namespace Atelier.Core.Entities;

public class RoadMap(Guid id, Guid productId, string name, List<Guid> ideas, DateTime startDate, DateTime endDate)
{
    public Guid Id { get; set; } = id;

    public Guid ProductId { get; set; } = productId;

    public string Name { get; set; } = name;

    public List<Guid> Ideas { get; set; } = ideas;

    public DateTime StartDate { get; set; } = startDate;

    public DateTime EndDate { get; set; } = endDate;

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public DateTime UpdatedAt { get; set; } = DateTime.Now;

    public bool IsDeleted { get; set; } = false;
}
