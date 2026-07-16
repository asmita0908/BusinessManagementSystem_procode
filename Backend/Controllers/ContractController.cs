using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContractController : ControllerBase
    {
        private readonly IMongoCollection<Contract> _contracts;

        public ContractController(IMongoClient mongoClient, IOptions<MongoDbSettings> settings)
        {
            var database = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _contracts = database.GetCollection<Contract>("Contracts");
        }

        [HttpGet]
        public async Task<ActionResult<List<Contract>>> Get() => await _contracts.Find(_ => true).ToListAsync();

        [HttpPost]
        public async Task<IActionResult> Post(Contract contract)
        {
            contract.Status = "Pending Approval";
            await _contracts.InsertOneAsync(contract);
            return Ok(contract);
        }
    }
}