using WoodFurniture.Models;

public class CustomerService
{
    private readonly CustomerRepository _customerRepository;

    public CustomerService(CustomerRepository customerRepository)
    {
        _customerRepository = customerRepository;
    }

    public IEnumerable<KhachHang> GetAllCustomers()
    {
        return _customerRepository.GetAll();
    }

    public void AddCustomer(KhachHang customer)
    {
        _customerRepository.Add(customer);
        _customerRepository.Save();
    }

    public void UpdateCustomer(KhachHang customer)
    {
        _customerRepository.Update(customer);
        _customerRepository.Save();
    }

    public void DeleteCustomer(KhachHang customer)
    {
        _customerRepository.Delete(customer);
        _customerRepository.Save();
    }
}