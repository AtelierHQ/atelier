namespace Atelier.Core.Interfaces;

public interface IEntity<TId>
{
    TId Id { get; }

    void SetId(TId id);
}
