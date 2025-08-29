using WoodFurniture.Models;

public class AdminRepository
{
    private readonly WoodFurnitureContext _context;

    public AdminRepository(WoodFurnitureContext context)
    {
        _context = context;
    }
    public Admin? GetByEmailAndPassword(string email, string password)
    {
        return _context.Admins.FirstOrDefault(a => a.Email == email && a.PasswordHash == password);
    }
}