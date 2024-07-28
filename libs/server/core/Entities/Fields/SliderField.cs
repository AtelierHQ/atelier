using Atelier.Core.Enumerations;

namespace Atelier.Core.Entities.Fields;

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
