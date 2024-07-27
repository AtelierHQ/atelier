using Atelier.Core.Entities;

namespace Atelier.Infrastructure.Extensions;

public interface ICollectionNameProvider
{
    string GetCollectionName<TEntity>();
}

public class CollectionNameProvider : ICollectionNameProvider
{
    private readonly Dictionary<Type, string> _collectionNames = new()
    {
        { typeof(Idea), "ideas" },
        { typeof(Document), "documents" }
    };

    public string GetCollectionName<TEntity>()
    {
        return _collectionNames.TryGetValue(typeof(TEntity), out var name) ? name : typeof(TEntity).Name;
    }
}
