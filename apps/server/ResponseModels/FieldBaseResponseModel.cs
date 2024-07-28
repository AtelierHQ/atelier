namespace Atelier.Server.ResponseModels;

public abstract class FieldBaseResponseModel
{
    public string Id { get; init; } = string.Empty;

    public string Label { get; init; } = string.Empty;

    public string Description { get; init; } = string.Empty;

    public string FieldType { get; init; } = string.Empty;
}

public class SelectFieldResponseModel : FieldBaseResponseModel
{
    public List<string> Options { get; init; } = [];
}

public class RatingFieldResponseModel : FieldBaseResponseModel
{
    public int MaxRating { get; init; }
}

public class CheckboxFieldResponseModel : FieldBaseResponseModel
{
    public bool IsChecked { get; init; }
}

public class DateFieldResponseModel : FieldBaseResponseModel
{
    public DateTime? MinDate { get; init; }

    public DateTime? MaxDate { get; init; }
}

public class InputFieldResponseModel : FieldBaseResponseModel
{
    public string Placeholder { get; init; } = string.Empty;
}

public class SliderFieldResponseModel : FieldBaseResponseModel
{
    public double MinValue { get; init; }

    public double MaxValue { get; init; }

    public double Step { get; init; }
}

public class NumberFieldResponseModel : FieldBaseResponseModel
{
    public bool IsDecimal { get; init; }

    public bool AllowNegative { get; init; }
}
