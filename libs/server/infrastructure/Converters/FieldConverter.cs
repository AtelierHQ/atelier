using System.Text.Json;
using System.Text.Json.Serialization;
using Atelier.Core.Entities.Fields;
using Atelier.Core.Enumerations;

namespace Atelier.Infrastructure.Converters;

public class FieldConverter : JsonConverter<FieldBase>
{
    public override FieldBase? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions? options)
    {
        using var doc = JsonDocument.ParseValue(ref reader);
        var root = doc.RootElement;

        if (!root.TryGetProperty("fieldType", out var typeElement)) throw new JsonException("Field type not specified");

        if (Enum.TryParse<FieldType>(typeElement.GetString(), true, out var fieldType))
        {
            return fieldType switch
            {
                FieldType.Select => JsonSerializer.Deserialize<SelectField>(root.GetRawText(), options),
                FieldType.Rating => JsonSerializer.Deserialize<RatingField>(root.GetRawText(), options),
                FieldType.Checkbox => JsonSerializer.Deserialize<CheckboxField>(root.GetRawText(), options),
                FieldType.Date => JsonSerializer.Deserialize<DateField>(root.GetRawText(), options),
                FieldType.Input => JsonSerializer.Deserialize<InputField>(root.GetRawText(), options),
                FieldType.Slider => JsonSerializer.Deserialize<SliderField>(root.GetRawText(), options),
                FieldType.Number => JsonSerializer.Deserialize<NumberField>(root.GetRawText(), options),
                _ => throw new JsonException($"Unknown field type: {fieldType}")
            };
        }

        throw new JsonException($"Invalid field type: {typeElement.GetString()}");
    }

    public override void Write(Utf8JsonWriter writer, FieldBase value, JsonSerializerOptions options)
    {
        JsonSerializer.Serialize(writer, value, value.GetType(), options);
    }
}
