using Atelier.Core.Enumerations;

namespace Atelier.Core.Entities.Fields;

public class NumberField : FieldBase
{
    public override FieldType FieldType => FieldType.Number;

    public bool IsDecimal { get; private set; }

    public bool AllowNegative { get; private set; }

    public NumberField(string label, string description, bool isDecimal, bool allowNegative) : base(label, description)
    {
        ArgumentNullException.ThrowIfNull(isDecimal);
        ArgumentNullException.ThrowIfNull(allowNegative);

        IsDecimal = isDecimal;
        AllowNegative = allowNegative;
    }
}
