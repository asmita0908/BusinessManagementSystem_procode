using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly IMongoCollection<InventoryItem> _inventory;
        private readonly IMongoCollection<BsonDocument> _notifications;

        public InventoryController(IMongoClient mongoClient, IOptions<MongoDbSettings> settings)
        {
            var database = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _inventory = database.GetCollection<InventoryItem>("Inventory");
            _notifications = database.GetCollection<BsonDocument>("Notifications");
        }

        [HttpGet]
        public async Task<ActionResult<List<InventoryItem>>> Get() => await _inventory.Find(_ => true).ToListAsync();

        [HttpPost]
        public async Task<IActionResult> Post(InventoryItem item)
        {
            if (item.AvailableQty <= 10)
            {
                item.Status = "Low Stock Alert";
                var alert = new BsonDocument
                {
                    { "Title", "High Priority: Low Stock" },
                    { "Message", $"Product {item.ProductName} is running low ({item.AvailableQty} left)." },
                    { "Date", DateTime.UtcNow }
                };
                await _notifications.InsertOneAsync(alert);
            }
            else
            {
                item.Status = "In Stock";
            }
            await _inventory.InsertOneAsync(item);
            return Ok(item);
        }
    }
}