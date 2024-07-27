namespace Atelier.Core.Interfaces;

public interface IIdGenerator<out TId>
{
    TId GenerateId();
}
