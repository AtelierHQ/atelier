using Atelier.Core.Entities;
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
        // RegisterClassMap<OtherEntity>();
    }

    private static void RegisterClassMap<TEntity>() where TEntity : IEntity<string>
    {
        if (!BsonClassMap.IsClassMapRegistered(typeof(TEntity)))
        {
            BsonClassMap.RegisterClassMap<TEntity>(cm =>
            {
                cm.AutoMap();
                cm.MapIdMember(c => c.Id)
                    .SetIdGenerator(StringObjectIdGenerator.Instance)
                    .SetSerializer(new StringSerializer(BsonType.ObjectId));
            });
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
