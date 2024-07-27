using Atelier.Core.Interfaces;
using MongoDB.Bson;

namespace Atelier.Infrastructure.Extensions;

public class MongoObjectIdGenerator : IIdGenerator<string>
{
    public string GenerateId()
    {
        return ObjectId.GenerateNewId().ToString();
    }
}
