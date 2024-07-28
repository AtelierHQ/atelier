using Atelier.Core.Enumerations;

namespace Atelier.Core.Entities.Fields;

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
