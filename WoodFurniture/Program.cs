
using Microsoft.EntityFrameworkCore;
using WoodFurniture.Models;
using WoodFurniture.Services;
using WoodFurniture.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

//đăng kí DbContext với MySQL
builder.Services.AddDbContext<WoodFurnitureContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("WoodFurniture"),
        ServerVersion.Parse("8.0.41-mysql")
    )
);

// Cấu hình Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"])
        )
    };
});

// Thêm cấu hình CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy
            .WithOrigins("http://localhost:5173") // Đúng với port của React
            .AllowAnyHeader()
            .AllowAnyMethod()
    );
});

// 2. Đăng ký Controllers
builder.Services.AddControllers();

// đăng ký service cho auth 
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<AdminRepository>();

// đăng ký service cho product
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<ProductRepository>();

// đăng ký service cho order
builder.Services.AddScoped<OrderService>();
builder.Services.AddScoped<OrderRepository>();

// đăng ký service cho khachhang
builder.Services.AddScoped<CustomerService>();
builder.Services.AddScoped<CustomerRepository>();

// đăng ký service cho diachi
builder.Services.AddScoped<AddressService>();
builder.Services.AddScoped<AddressRepository>();

// đăng ký service cho pttt
builder.Services.AddScoped<PaymentService>();
builder.Services.AddScoped<PaymentRepository>();

// đăng ký service cho sanphamdonhang
builder.Services.AddScoped<OrderProductService>();
builder.Services.AddScoped<OrderProductRepository>();

// 3. Đăng ký OpenAPI/Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 4. Dùng Swagger chỉ trong Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// Sử dụng CORS
app.UseCors("AllowReactApp");

// Sử dụng Authentication và Authorization
app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();

// 5. Map Controllers
app.MapControllers();

app.Run();