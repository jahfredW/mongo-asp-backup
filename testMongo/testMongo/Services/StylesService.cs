using Microsoft.Extensions.Options;
using MongoDB.Driver;
using testMongo.Models;

namespace testMongo.Services
{
    public class StylesService
    {
        private readonly IMongoCollection<Style> _StylesCollection;

        public StylesService(
    IOptions<SallesDatabaseStyleSettings> SallesDatabaseStyle)
        {
            var mongoClient = new MongoClient(
                SallesDatabaseStyle.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                SallesDatabaseStyle.Value.DatabaseName);

            _StylesCollection = mongoDatabase.GetCollection<Style>(
                SallesDatabaseStyle.Value.CollectionName);
        }

        public async Task<Style> GetAsync() =>
            await _StylesCollection.Find(_ => true).FirstOrDefaultAsync();

        public async Task UpdateAsync(string id, Style updatedStyle) =>
            await _StylesCollection.ReplaceOneAsync(x => x.Id == id, updatedStyle);

    }
}

