
using Microsoft.EntityFrameworkCore;
using testMongo.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using testMongo.Services;

namespace testMongo
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //// Connexion à la base de données MongoDB en local
            //var client = new MongoClient("mongodb://localhost:27017");
            //var database = client.GetDatabase("salles");
            //var collection = database.GetCollection<BsonDocument>("salles");

            //// Récupération de toutes les salles
            //var salles = collection.Find(Builders<BsonDocument>.Filter.Empty).ToList();

            //// Affichage des salles
            //foreach (var salle in salles)
            //{
            //    Console.WriteLine(salle);
            //}

            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.Configure<SalleDatabaseSettings>(
                builder.Configuration.GetSection("SallesDatabase"));

            builder.Services.AddTransient<SallesService>();

            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            // Add services to the container.
            //builder.Services.AddDbContext<ApiDbContext>(options => options.UseMySQL(builder.Configuration.GetConnectionString("Default")));
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddControllers().AddNewtonsoftJson();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
