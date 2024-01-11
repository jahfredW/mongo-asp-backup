using Microsoft.Extensions.Options;
using MongoDB.Driver;
using testMongo.Models;

namespace testMongo.Services
{
    public class StylesService
    {
        private readonly IMongoCollection<Style> _StylesCollection;

        public StylesService(
    IOptions<SalleDatabaseSettings> StyleStoreDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                StyleStoreDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                StyleStoreDatabaseSettings.Value.DatabaseName);

            _StylesCollection = mongoDatabase.GetCollection<Style>(
                StyleStoreDatabaseSettings.Value.CollectionName);
        }

        public async Task<List<Style>> GetAsync() =>
            await _StylesCollection.Find(_ => true).ToListAsync();


        public async Task CreateAsync(Style newStyle) =>
            await _StylesCollection.InsertOneAsync(newStyle);

        public async Task UpdateAsync(string id, Style updatedStyle) =>
            await _StylesCollection.ReplaceOneAsync(x => x.Id == id, updatedStyle);

        public async Task RemoveAsync(string id) =>
            await _StylesCollection.DeleteOneAsync(x => x.Id == id);
    }
}

