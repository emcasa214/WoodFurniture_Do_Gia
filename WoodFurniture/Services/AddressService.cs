using WoodFurniture.Models;

public class AddressService
{
    private readonly AddressRepository _addressRepository;

    public AddressService(AddressRepository addressRepository)
    {
        _addressRepository = addressRepository;
    }

    public IEnumerable<DiaChi> GetAllAddresses()
    {
        return _addressRepository.GetAll();
    }

    public IEnumerable<DiaChi> GetAddressesForId(int id)
    {
        return _addressRepository.GetAddressesForCustomerId(id);
    }
    
    public void AddAddress(DiaChi address)
    {
        _addressRepository.Add(address);
        _addressRepository.Save();
    }

    public void UpdateAddress(DiaChi address)
    {
        _addressRepository.Update(address);
        _addressRepository.Save();
    }

    public void DeleteAddress(DiaChi address)
    {
        _addressRepository.Delete(address);
        _addressRepository.Save();
    }
}