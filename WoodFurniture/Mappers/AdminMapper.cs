using WoodFurniture.Models;

public static class AdminMapper
{
    public static AdminDto ToDto(Admin admin)
    {
        return new AdminDto
        {
            Id = admin.Id,
            Email = admin.Email
        };
    }
}