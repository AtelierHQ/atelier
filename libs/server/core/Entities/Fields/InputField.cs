using Atelier.Core.Enumerations;

namespace Atelier.Core.Entities.Fields;

public class InputField : FieldBase
{
    public override FieldType FieldType => FieldType.Input;

    public string Placeholder { get; private set; }

    public InputField(string label, string description, string placeholder) : base(label, description)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(placeholder);
        Placeholder = placeholder;
    }
}
