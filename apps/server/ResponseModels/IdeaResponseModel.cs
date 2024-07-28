using Atelier.Core.Entities.Fields;

namespace Atelier.Server.ResponseModels;

public class IdeaResponseModel
{
    public string Id { get; init; } = string.Empty;

    public string Title { get; init; } = string.Empty;

    public string Description { get; init; } = string.Empty;

    public string Author { get; init; } = string.Empty;

    public List<string> Tags { get; init; } = [];

    public List<string> Attachments { get; init; } = [];

    public List<FieldBase> Fields { get; init; } = [];

    public DateTime CreatedAt { get; init; } = DateTime.Now;

    public DateTime UpdatedAt { get; init; } = DateTime.Now;

    public bool IsDeleted { get; init; } = false;
}
