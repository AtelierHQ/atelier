using Atelier.Server.Domain;
using FastEndpoints;
using FluentValidation;
using MongoDB.Driver;

namespace Atelier.Server.Endpoints;

// Request DTOs
public class CreateIdeaRequest
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string Author { get; set; }
    public List<string> Tags { get; set; }
    public List<string> Attachments { get; set; }
}

public class UpdateIdeaRequest
{
    public string Title { get; set; }
    public string Description { get; set; }
    public List<string> Tags { get; set; }
    public List<string> Attachments { get; set; }
}

// Response DTO
public class IdeaResponse
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Author { get; set; }
    public List<string> Tags { get; set; }
    public List<string> Attachments { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

// Validators
public class CreateIdeaValidator : Validator<CreateIdeaRequest>
{
    public CreateIdeaValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Description).NotEmpty().MaximumLength(1000);
        RuleFor(x => x.Author).NotEmpty().MaximumLength(50);
        RuleFor(x => x.Tags).NotNull();
        RuleFor(x => x.Attachments).NotNull();
    }
}

public class UpdateIdeaValidator : Validator<UpdateIdeaRequest>
{
    public UpdateIdeaValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Description).NotEmpty().MaximumLength(1000);
        RuleFor(x => x.Tags).NotNull();
        RuleFor(x => x.Attachments).NotNull();
    }
}

// Create Endpoint
public class CreateIdeaEndpoint : Endpoint<CreateIdeaRequest, IdeaResponse>
{
    private readonly IMongoCollection<Idea> _ideasCollection;

    public CreateIdeaEndpoint(IMongoDatabase database)
    {
        _ideasCollection = database.GetCollection<Idea>("Ideas");
    }

    public override void Configure()
    {
        Post("/ideas");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CreateIdeaRequest req, CancellationToken ct)
    {
        var idea = new Idea(
            Guid.NewGuid(),
            req.Title,
            req.Description,
            req.Author,
            req.Tags,
            req.Attachments
        );

        await _ideasCollection.InsertOneAsync(idea, cancellationToken: ct);

        var response = IdeaEndpointsHelper.MapToResponse(idea);
        await SendAsync(response, 201, ct);
    }
}

// Read (Get All) Endpoint
public class GetAllIdeasEndpoint : EndpointWithoutRequest<List<IdeaResponse>>
{
    private readonly IMongoCollection<Idea> _ideasCollection;

    public GetAllIdeasEndpoint(IMongoDatabase database)
    {
        _ideasCollection = database.GetCollection<Idea>("Ideas");
    }

    public override void Configure()
    {
        Get("/ideas");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var ideas = await _ideasCollection.Find(i => !i.IsDeleted).ToListAsync(ct);
        var response = ideas.ConvertAll(IdeaEndpointsHelper.MapToResponse);
        await SendAsync(response, cancellation: ct);
    }
}

// Read (Get One) Endpoint
public class GetIdeaEndpoint : Endpoint<string, IdeaResponse>
{
    private readonly IMongoCollection<Idea> _ideasCollection;

    public GetIdeaEndpoint(IMongoDatabase database)
    {
        _ideasCollection = database.GetCollection<Idea>("Ideas");
    }

    public override void Configure()
    {
        Get("/ideas/{id}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(string id, CancellationToken ct)
    {
        var idea = await _ideasCollection.Find(i => i.Id.ToString() == id && !i.IsDeleted).FirstOrDefaultAsync(ct);

        if (idea == null)
        {
            await SendNotFoundAsync(ct);
            return;
        }

        var response = IdeaEndpointsHelper.MapToResponse(idea);
        await SendAsync(response, cancellation: ct);
    }
}

// Update Endpoint
public class UpdateIdeaEndpoint : Endpoint<UpdateIdeaRequest, IdeaResponse>
{
    private readonly IMongoCollection<Idea> _ideasCollection;

    public UpdateIdeaEndpoint(IMongoDatabase database)
    {
        _ideasCollection = database.GetCollection<Idea>("Ideas");
    }

    public override void Configure()
    {
        Put("/ideas/{id}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(UpdateIdeaRequest req, CancellationToken ct)
    {
        var id = Route<string>("id");

        var update = Builders<Idea>.Update
            .Set(i => i.Title, req.Title)
            .Set(i => i.Description, req.Description)
            .Set(i => i.Tags, req.Tags)
            .Set(i => i.Attachments, req.Attachments)
            .Set(i => i.UpdatedAt, DateTime.UtcNow);

        var result = await _ideasCollection.UpdateOneAsync(
            i => i.Id.ToString() == id && !i.IsDeleted,
            update,
            new UpdateOptions { IsUpsert = false },
            ct);

        if (result.MatchedCount == 0)
        {
            await SendNotFoundAsync(ct);
            return;
        }

        var updatedIdea = await _ideasCollection.Find(i => i.Id.ToString() == id).FirstOrDefaultAsync(ct);
        var response = IdeaEndpointsHelper.MapToResponse(updatedIdea);
        await SendAsync(response, cancellation: ct);
    }
}

// Delete Endpoint
public class DeleteIdeaEndpoint : Endpoint<string>
{
    private readonly IMongoCollection<Idea> _ideasCollection;

    public DeleteIdeaEndpoint(IMongoDatabase database)
    {
        _ideasCollection = database.GetCollection<Idea>("Ideas");
    }

    public override void Configure()
    {
        Delete("/ideas/{id}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(string id, CancellationToken ct)
    {
        var update = Builders<Idea>.Update.Set(i => i.IsDeleted, true);
        var result = await _ideasCollection.UpdateOneAsync(i => i.Id.ToString() == id && !i.IsDeleted, update,
            new UpdateOptions { IsUpsert = false }, ct);

        if (result.MatchedCount == 0)
        {
            await SendNotFoundAsync(ct);
            return;
        }

        await SendNoContentAsync(ct);
    }
}

public static class IdeaEndpointsHelper
{
    // Helper method to map Idea to IdeaResponse
    public static IdeaResponse MapToResponse(Idea idea)
    {
        return new IdeaResponse
        {
            Id = idea.Id.ToString(),
            Title = idea.Title,
            Description = idea.Description,
            Author = idea.Author,
            Tags = idea.Tags,
            Attachments = idea.Attachments,
            CreatedAt = idea.CreatedAt,
            UpdatedAt = idea.UpdatedAt
        };
    }
}
