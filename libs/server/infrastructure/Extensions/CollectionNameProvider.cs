using Atelier.Core.Entities;
using Atelier.Core.Entities.Fields;

namespace Atelier.Infrastructure.Extensions;

public interface ICollectionNameProvider
{
    string GetCollectionName<TEntity>();
}

public class CollectionNameProvider : ICollectionNameProvider
{
    private readonly Dictionary<Type, string> _collectionNames = new()
    {
        { typeof(User), "users" },
        { typeof(Idea), "ideas" },
        { typeof(Document), "documents" },
        { typeof(FieldBase), "fields" }
    };

    public string GetCollectionName<TEntity>()
    {
        return _collectionNames.TryGetValue(typeof(TEntity), out var name) ? name : typeof(TEntity).Name;
    }
}
