using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using WoodFurniture.Models;

namespace WoodFurniture.Services
{
    public class AuthService
    {
        private readonly AdminRepository _adminRepository;
        private readonly string _jwtSecret; 

        public AuthService(AdminRepository adminRepository, IConfiguration configuration)
        {
            _adminRepository = adminRepository;
            _jwtSecret = configuration["Jwt:Secret"];
        }

        public AdminDto? Login(LoginDto loginDto)
        {
            var admin = _adminRepository.GetByEmailAndPassword(loginDto.Email, loginDto.PasswordHash);
            if (admin == null) return null;
            var dto = AdminMapper.ToDto(admin);
            dto.Token = GenerateJwtToken(admin);
            return dto;
        }

        private string GenerateJwtToken(Admin admin)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, admin.Id.ToString()),
                    new Claim(ClaimTypes.Email, admin.Email ?? "")
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}