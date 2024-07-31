using backend.Authentication;
using backend.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly IConfiguration _configuration;

    public AccountController(UserManager<AppUser> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserModel model)
    {
        if (ModelState.IsValid)
        {
            var existedUser = await _userManager.FindByNameAsync(model.UserName);
            if (existedUser != null)
            {
                ModelState.AddModelError("UserName", "User name is already taken");
                return BadRequest(ModelState);
            }

            var user = new AppUser
            {
                UserName = model.UserName,
                Email = model.Email
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                var token = GenerateToken(model.UserName);
                return Ok(new { token, user.Id, user.UserName, user.Email });
            }
        }


        return BadRequest(ModelState);
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginUserModel model)
    {
        if (ModelState.IsValid)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var token = GenerateToken(model.UserName);
                return Ok(new { token, user.Id, user.UserName, user.Email});
            }
        }
        return BadRequest(new { error = "Invalid user name or password" });
    }
    [HttpPost("refresh-token")]
    public IActionResult RefreshToken([FromBody] string expiredToken)
    {
        if(expiredToken is null)
        {
            return BadRequest(new { error = "Token is required" });
        }
        var principal = GetPrincipalFromExpiredToken(expiredToken);
        if (principal is null)
        {
            return BadRequest(new { error = "Invalid token" });
        }
        var userName = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
        if (userName is null || userName == "")
        {
            return BadRequest(new { error = "Invalid token: no username" });
        }
        var newToken = GenerateToken(userName);
        return Ok(new { newToken });
    }

    private ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
    {
        string? secret = _configuration["JwtConfig:Secret"];
        if (secret is null)
        {
            return null;
        }
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false,
            ValidateIssuer = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)),
            ValidateLifetime = false
        };
        try {
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                return null;
            }
            return principal;
        }
        catch
        {
            return null;
        }
    }

    private string? GenerateToken(string userName)
    {
        var secret = _configuration["JwtConfig:Secret"];
        var issuer = _configuration["JwtConfig:Issuer"];
        var audience = _configuration["JwtConfig:Audience"];
        if (secret is null || issuer is null || audience is null)
        {
            throw new ApplicationException("Jwt is not set in the configuration");
        }



        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new(ClaimTypes.Name, userName),
            }),
            Expires = DateTime.Now.AddMinutes(3),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Issuer = issuer,
            Audience = audience
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
