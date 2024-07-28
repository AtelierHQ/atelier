using System.Text.Json;
using System.Text.Json.Serialization;
using Atelier.Server.ResponseModels;

namespace Atelier.Server.Converter;

public class FieldBaseResponseModelConverter : JsonConverter<FieldBaseResponseModel>
{
    public override FieldBaseResponseModel? Read(ref Utf8JsonReader reader, Type typeToConvert,
        JsonSerializerOptions? options)
    {
        if (reader.TokenType != JsonTokenType.StartObject)
        {
            throw new JsonException("JSON object expected.");
        }

        using var doc = JsonDocument.ParseValue(ref reader);
        var root = doc.RootElement;

        if (!root.TryGetProperty("fieldType", out var fieldTypeElement))
        {
            throw new JsonException("FieldType property is required.");
        }

        var fieldType = fieldTypeElement.GetString();

        return fieldType switch
        {
            "select" => JsonSerializer.Deserialize<SelectFieldResponseModel>(root.GetRawText(), options),
            "rating" => JsonSerializer.Deserialize<RatingFieldResponseModel>(root.GetRawText(), options),
            "checkbox" => JsonSerializer.Deserialize<CheckboxFieldResponseModel>(root.GetRawText(), options),
            "date" => JsonSerializer.Deserialize<DateFieldResponseModel>(root.GetRawText(), options),
            "input" => JsonSerializer.Deserialize<InputFieldResponseModel>(root.GetRawText(), options),
            "slider" => JsonSerializer.Deserialize<SliderFieldResponseModel>(root.GetRawText(), options),
            "number" => JsonSerializer.Deserialize<NumberFieldResponseModel>(root.GetRawText(), options),
            _ => throw new JsonException($"Unknown field type: {fieldType}")
        };
    }

    public override void Write(Utf8JsonWriter writer, FieldBaseResponseModel value, JsonSerializerOptions options)
    {
        switch (value)
        {
            case SelectFieldResponseModel select:
                JsonSerializer.Serialize(writer, select, options);
                break;
            case RatingFieldResponseModel rating:
                JsonSerializer.Serialize(writer, rating, options);
                break;
            case CheckboxFieldResponseModel checkbox:
                JsonSerializer.Serialize(writer, checkbox, options);
                break;
            case DateFieldResponseModel date:
                JsonSerializer.Serialize(writer, date, options);
                break;
            case InputFieldResponseModel input:
                JsonSerializer.Serialize(writer, input, options);
                break;
            case SliderFieldResponseModel slider:
                JsonSerializer.Serialize(writer, slider, options);
                break;
            case NumberFieldResponseModel number:
                JsonSerializer.Serialize(writer, number, options);
                break;
            default:
                throw new JsonException($"Unknown field type: {value.GetType().Name}");
        }
    }
}
