namespace Atelier.Core.Entities.Fields;

public class FieldValue
{
    public string FieldId { get; private set; }

    public string Value { get; private set; }

    public FieldValue(string fieldId, string value)
    {
        ArgumentNullException.ThrowIfNull(fieldId);
        ArgumentNullException.ThrowIfNull(value);
        FieldId = fieldId;
        Value = value;
    }
}
