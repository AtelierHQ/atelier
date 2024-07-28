using Atelier.Core.Enumerations;

namespace Atelier.Core.Entities.Fields;

public class CheckboxField : FieldBase
{
    public override FieldType FieldType => FieldType.Checkbox;

    public bool IsChecked { get; private set; }

    public CheckboxField(string label, string description, bool isChecked) : base(label, description)
    {
        ArgumentNullException.ThrowIfNull(isChecked);
        IsChecked = false;
    }
}
