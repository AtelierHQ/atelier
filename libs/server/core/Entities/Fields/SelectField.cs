using Atelier.Core.Enumerations;

namespace Atelier.Core.Entities.Fields;

public class SelectField : FieldBase
{
    public override FieldType FieldType => FieldType.Select;

    public List<string> Options { get; private set; }

    public SelectField(string label, string description, List<string> options) : base(label, description)
    {
        ArgumentNullException.ThrowIfNull(options);
        Options = options;
    }
}

public class RatingField : FieldBase
{
    public override FieldType FieldType => FieldType.Rating;

    public int MaxRating { get; private set; }

    public RatingField(string label, string description, int maxRating) : base(label, description)
    {
        ArgumentNullException.ThrowIfNull(maxRating);
        MaxRating = maxRating;
    }
}

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

public class SliderField : FieldBase
{
    public override FieldType FieldType => FieldType.Slider;

    public double MinValue { get; private set; }

    public double MaxValue { get; private set; }

    public double Step { get; private set; }

    public SliderField(string label, string description, double minValue, double maxValue, double step) : base(label,
        description)
    {
        ArgumentNullException.ThrowIfNull(minValue);
        ArgumentNullException.ThrowIfNull(maxValue);
        ArgumentNullException.ThrowIfNull(step);

        MinValue = minValue;
        MaxValue = maxValue;
        Step = step;
    }
}

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
