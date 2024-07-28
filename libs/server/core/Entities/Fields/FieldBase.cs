using Atelier.Core.Enumerations;

namespace Atelier.Core.Entities.Fields;

public abstract class FieldBase
{
    public string Id { get; private set; }

    public string Label { get; private set; }

    public string Description { get; private set; }

    public string Value { get; private set; }

    public abstract FieldType FieldType { get; }

    protected FieldBase(string label, string description)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(label);
        ArgumentException.ThrowIfNullOrWhiteSpace(description);

        Id = string.Empty;
        Label = label;
        Description = description;
        Value = string.Empty;
    }
}
