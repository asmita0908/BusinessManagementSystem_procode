using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Models
{
    public class Contract
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string ContractName { get; set; } = null!;
        public string ClientName { get; set; } = null!;
        public string Status { get; set; } = "Pending Approval";
        public decimal ContractValue { get; set; }
    }
}