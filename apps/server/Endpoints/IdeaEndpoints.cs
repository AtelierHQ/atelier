using Atelier.Core.Entities;
using Atelier.Core.Interfaces;
using FastEndpoints;
using FluentValidation;

namespace Atelier.Server.Endpoints;

public record CreateIdeaRequest(
    string Title,
    string Description,
    string Author,
    List<string> Tags,
    List<string> Attachments
);

public record UpdateIdeaRequest(
    string Title,
    string Description,
    List<string> Tags,
    List<string> Attachments
);

public record IdeaResponse(
    string Id,
    string Title,
    string Description,
    string Author,
    List<string> Tags,
    List<string> Attachments,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

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
    private readonly IEntityRepository<Idea, string> _ideasRepository;

    public CreateIdeaEndpoint(IEntityRepository<Idea, string> ideasRepository)
    {
        ArgumentNullException.ThrowIfNull(ideasRepository);
        _ideasRepository = ideasRepository;
    }

    public override void Configure()
    {
        Post("/ideas");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CreateIdeaRequest req, CancellationToken ct)
    {
        var idea = new Idea(
            req.Title,
            req.Description,
            req.Author,
            req.Tags,
            req.Attachments
        );

        await _ideasRepository.CreateAsync(idea, ct);

        var response = IdeaEndpointsHelper.MapToResponse(idea);
        await SendAsync(response, 201, ct);
    }
}

// Read (Get All) Endpoint
public class GetAllIdeasEndpoint : EndpointWithoutRequest<List<IdeaResponse>>
{
    private readonly IEntityRepository<Idea, string> _ideasRepository;

    public GetAllIdeasEndpoint(IEntityRepository<Idea, string> ideasRepository)
    {
        ArgumentNullException.ThrowIfNull(ideasRepository);
        _ideasRepository = ideasRepository;
    }

    public override void Configure()
    {
        Get("/ideas");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var ideas = await _ideasRepository.GetAllAsync(0, 0, ct);
        var response = ideas.ConvertAll(IdeaEndpointsHelper.MapToResponse);
        await SendAsync(response, cancellation: ct);
    }
}

// Read (Get One) Endpoint
public class GetIdeaEndpoint : Endpoint<string, IdeaResponse>
{
    private readonly IEntityRepository<Idea, string> _ideasRepository;

    public GetIdeaEndpoint(IEntityRepository<Idea, string> ideasRepository)
    {
        ArgumentNullException.ThrowIfNull(ideasRepository);
        _ideasRepository = ideasRepository;
    }

    public override void Configure()
    {
        Get("/ideas/{id}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(string id, CancellationToken ct)
    {
        var idea = await _ideasRepository.GetByIdAsync(id, ct);

        if (idea == null)
        {
            await SendNotFoundAsync(ct);
            return;
        }

        var response = IdeaEndpointsHelper.MapToResponse(idea);
        await SendAsync(response, cancellation: ct);
    }
}

public static class IdeaEndpointsHelper
{
    // Helper method to map Idea to IdeaResponse
    public static IdeaResponse MapToResponse(Idea idea)
    {
        return new IdeaResponse(
            idea.Id,
            idea.Title,
            idea.Description,
            idea.Author,
            idea.Tags,
            idea.Attachments,
            idea.CreatedAt,
            idea.UpdatedAt
        );
    }
}
