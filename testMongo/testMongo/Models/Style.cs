using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace testMongo.Models
{
    public class Style
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("styles")]
        public List<string> Styles{get; set;}
    }
}
