namespace Atelier.Core.Interfaces;

public interface IEntityRepository<TEntity, in TId> where TEntity : IEntity<TId>
{
    Task<TEntity> CreateAsync(TEntity entity, CancellationToken ct);

    Task<List<TEntity>> GetAllAsync(int page, int pageSize, CancellationToken ct);

    Task<TEntity> GetByIdAsync(TId id, CancellationToken ct);

    Task<TEntity> UpdateAsync(TId id, TEntity entity, CancellationToken ct);

    Task<bool> DeleteAsync(TId id, CancellationToken ct);
}
