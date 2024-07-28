using Atelier.Core.Entities;
using Atelier.Core.Entities.Fields;
using Atelier.Core.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;

namespace Atelier.Infrastructure.Extensions;

public static class MongoDbConfig
{
    public static void Configure()
    {
        // Register class maps for each of your entity types
        RegisterClassMap<Idea>();
        // Register class maps
        BsonClassMap.RegisterClassMap<FieldBase>(cm =>
        {
            cm.AutoMap();
            cm.SetIsRootClass(true);
            cm.AddKnownType(typeof(SelectField));
            cm.AddKnownType(typeof(RatingField));
            cm.AddKnownType(typeof(CheckboxField));
            cm.AddKnownType(typeof(DateField));
            cm.AddKnownType(typeof(InputField));
            cm.AddKnownType(typeof(SliderField));
            cm.AddKnownType(typeof(NumberField));
        });
    }

    private static void RegisterClassMap<TEntity>() where TEntity : IEntity<string>
    {
        if (!BsonClassMap.IsClassMapRegistered(typeof(TEntity)))
        {
            BsonClassMap.RegisterClassMap<TEntity>(cm => { cm.AutoMap(); });
        }
    }
}

// Custom ID generator that creates string representations of ObjectIds
public class StringObjectIdGenerator : IIdGenerator
{
    public static StringObjectIdGenerator Instance { get; } = new();

    public object GenerateId(object container, object document)
    {
        return ObjectId.GenerateNewId().ToString();
    }

    public bool IsEmpty(object id)
    {
        return string.IsNullOrEmpty(id as string);
    }
}
