using MongoDB.Bson.Serialization.Attributes;

namespace testMongo.Dto
{
    public class LocalisationsDto
    {
        public string Type { get; set; }

        public List<double> Coordinates { get; set; }
    }
}
