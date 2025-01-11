namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }

        IProductionRepository ProductionRepository { get; }   

        IMachineRepository MachineRepository { get; }

        ITyreRepository TyreRepository { get; }

        ISalesRepository SalesRepository { get; }

        Task<bool> Complete();

        bool HasChanges();
    }
}