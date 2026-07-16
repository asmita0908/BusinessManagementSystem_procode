using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly IMongoCollection<Customer> _customers;

        public CustomerController(IMongoClient mongoClient, IOptions<MongoDbSettings> settings)
        {
            var database = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _customers = database.GetCollection<Customer>("Customers");
        }

        [HttpGet]
        public async Task<ActionResult<List<Customer>>> Get() => await _customers.Find(_ => true).ToListAsync();

        [HttpPost]
        public async Task<IActionResult> Post(Customer customer)
        {
            if (customer.LoyaltyPoints == 0) customer.LoyaltyPoints = 10;
            await _customers.InsertOneAsync(customer);
            return Ok(customer);
        }
    }
}