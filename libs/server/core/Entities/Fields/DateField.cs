using Atelier.Core.Enumerations;

namespace Atelier.Core.Entities.Fields;

public class DateField : FieldBase
{
    public override FieldType FieldType => FieldType.Date;

    public DateTime? MinDate { get; private set; }

    public DateTime? MaxDate { get; private set; }

    public DateField(string label, string description, DateTime? minDate = null, DateTime? maxDate = null) : base(label,
        description)
    {
        MinDate = minDate;
        MaxDate = maxDate;
    }
}
