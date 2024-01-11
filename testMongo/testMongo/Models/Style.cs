using MongoDB.Bson.Serialization.Attributes;

namespace testMongo.Models
{
    public class Style
    {
        [BsonElement("styles")]
        public List<string> Styles
        {
            get; set;
        }
}
