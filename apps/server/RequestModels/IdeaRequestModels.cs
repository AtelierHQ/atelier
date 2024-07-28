using Atelier.Core.Entities.Fields;

namespace Atelier.Server.RequestModels;

public class CreateIdeaRequestModel
{
    public string Title { get; init; } = string.Empty;

    public string Description { get; init; } = string.Empty;

    public string Author { get; init; } = string.Empty;

    public List<string> Tags { get; init; } = [];

    public List<string> Attachments { get; init; } = [];
}

public class UpdateIdeaRequestModel
{
    public string Title { get; init; } = string.Empty;

    public string Description { get; init; } = string.Empty;

    public string Author { get; init; } = string.Empty;

    public List<string> Tags { get; init; } = [];

    public List<string> Attachments { get; init; } = [];

    public List<FieldValue> FieldsValues { get; init; } = [];
}
