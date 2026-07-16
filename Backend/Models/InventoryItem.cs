using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Models
{
    public class InventoryItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string ProductName { get; set; } = null!;
        public int AvailableQty { get; set; }
        public string Status { get; set; } = "In Stock";
    }
}