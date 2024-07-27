using Atelier.Core.Interfaces;
using Atelier.Infrastructure.Extensions;
using MongoDB.Driver;

namespace Atelier.Infrastructure.Repositories;

public class EntityRepository<TEntity, TId> : IEntityRepository<TEntity, TId>
    where TEntity : class, IEntity<TId>
{
    private readonly IMongoCollection<TEntity> _collection;
    private readonly IIdGenerator<TId> _idGenerator;

    public EntityRepository(IMongoDatabase database, ICollectionNameProvider collectionNameProvider,
        IIdGenerator<TId> idGenerator)
    {
        ArgumentNullException.ThrowIfNull(database);
        ArgumentNullException.ThrowIfNull(collectionNameProvider);
        ArgumentNullException.ThrowIfNull(idGenerator);

        var collectionName = collectionNameProvider.GetCollectionName<TEntity>();
        _collection = database.GetCollection<TEntity>(collectionName);
        _idGenerator = idGenerator;
    }

    public async Task<TEntity> CreateAsync(TEntity entity, CancellationToken ct)
    {
        entity.SetId(_idGenerator.GenerateId());
        await _collection.InsertOneAsync(entity, cancellationToken: ct);
        return entity;
    }

    public async Task<List<TEntity>> GetAllAsync(int page, int pageSize, CancellationToken ct)
    {
        var skip = (page - 1) * pageSize;
        return await _collection.Find(_ => true).Skip(skip).Limit(pageSize).ToListAsync(ct);
    }

    public async Task<TEntity> GetByIdAsync(TId id, CancellationToken ct)
    {
        var entity = await _collection.Find(e => e.Id != null && e.Id.Equals(id)).FirstOrDefaultAsync(ct);
        if (entity is null)
        {
            throw new Exception("Entity not found");
        }

        return entity;
    }

    public async Task<TEntity> UpdateAsync(TId id, TEntity entity, CancellationToken ct)
    {
        await _collection.ReplaceOneAsync(e => e.Id != null && e.Id.Equals(id), entity, cancellationToken: ct);
        return entity;
    }

    public async Task<bool> DeleteAsync(TId id, CancellationToken ct)
    {
        var result = await _collection.DeleteOneAsync(e => e.Id != null && e.Id.Equals(id), ct);
        return result.DeletedCount > 0;
    }
}
