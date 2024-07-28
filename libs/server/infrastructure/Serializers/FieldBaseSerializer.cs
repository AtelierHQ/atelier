using Atelier.Core.Entities.Fields;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;

namespace Atelier.Infrastructure.Serializers;

public class FieldBaseSerializer : SerializerBase<FieldBase>
{
    public override FieldBase Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
    {
        var document = BsonSerializer.Deserialize<BsonDocument>(context.Reader);

        if (!document.Contains("_t"))
            throw new Exception("Missing type discriminator '_t'");

        var type = document["_t"].AsString;
        return type switch
        {
            nameof(SelectField) => BsonSerializer.Deserialize<SelectField>(document),
            nameof(RatingField) => BsonSerializer.Deserialize<RatingField>(document),
            nameof(CheckboxField) => BsonSerializer.Deserialize<CheckboxField>(document),
            nameof(DateField) => BsonSerializer.Deserialize<DateField>(document),
            nameof(InputField) => BsonSerializer.Deserialize<InputField>(document),
            nameof(SliderField) => BsonSerializer.Deserialize<SliderField>(document),
            nameof(NumberField) => BsonSerializer.Deserialize<NumberField>(document),
            _ => throw new Exception($"Unknown field type: {type}")
        };
    }

    public override void Serialize(BsonSerializationContext context, BsonSerializationArgs args, FieldBase value)
    {
        BsonSerializer.Serialize(context.Writer, value);
    }
}
