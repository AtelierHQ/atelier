namespace Atelier.Server.ResponseModels;

public abstract class FieldsBaseResponseModel
{
    public string Id { get; init; } = string.Empty;

    public string Label { get; init; } = string.Empty;

    public string Description { get; init; } = string.Empty;

    public string FieldType { get; init; } = string.Empty;
}

public class SelectFieldResponseModel : FieldsBaseResponseModel
{
    public List<string> Options { get; init; } = [];
}

public class RatingFieldResponseModel : FieldsBaseResponseModel
{
    public int MaxRating { get; init; }
}

public class CheckboxFieldResponseModel : FieldsBaseResponseModel
{
    public bool IsChecked { get; init; }
}

public class DateFieldResponseModel : FieldsBaseResponseModel
{
    public DateTime? MinDate { get; init; }

    public DateTime? MaxDate { get; init; }
}

public class InputFieldResponseModel : FieldsBaseResponseModel
{
    public string Placeholder { get; init; } = string.Empty;
}

public class SliderFieldResponseModel : FieldsBaseResponseModel
{
    public double MinValue { get; init; }

    public double MaxValue { get; init; }

    public double Step { get; init; }
}

public class NumberFieldResponseModel : FieldsBaseResponseModel
{
    public bool IsDecimal { get; init; }

    public bool AllowNegative { get; init; }
}
