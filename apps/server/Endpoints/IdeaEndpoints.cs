using Atelier.Core.Entities;
using Atelier.Core.Entities.Fields;
using Atelier.Core.Enumerations;
using Atelier.Core.Factories;
using Atelier.Core.Interfaces;
using Atelier.Server.RequestModels;
using Atelier.Server.ResponseModels;
using FastEndpoints;

namespace Atelier.Server.Endpoints;

public class CreateIdeaEndpoint : Endpoint<CreateIdeaRequestModel, IdeaResponseModel>
{
    private readonly IEntityRepository<Idea, string> _ideasRepository;

    public CreateIdeaEndpoint(IEntityRepository<Idea, string> ideasRepository)
    {
        ArgumentNullException.ThrowIfNull(ideasRepository);
        _ideasRepository = ideasRepository;
    }

    public override void Configure()
    {
        Post("/api/ideas");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CreateIdeaRequestModel request, CancellationToken ct)
    {
        var newIdea = new Idea(request.Title, request.Description, request.Author, request.Tags, request.Attachments);

        // Initialize all system fields
        var systemFields = (from FieldType fieldType in Enum.GetValues(typeof(FieldType))
            select SystemFieldFactory.CreateSystemField(fieldType)).ToList();

        newIdea.InitializeFields(systemFields);

        var idea = await _ideasRepository.CreateAsync(newIdea, ct);
        var response = IdeaEndpointsHelper.MapToResponse(idea);

        await SendAsync(response, 201, ct);
    }
}

public class GetAllIdeasEndpoint : EndpointWithoutRequest<List<IdeaResponseModel>>
{
    private readonly IEntityRepository<Idea, string> _ideasRepository;

    public GetAllIdeasEndpoint(IEntityRepository<Idea, string> ideasRepository)
    {
        ArgumentNullException.ThrowIfNull(ideasRepository);
        _ideasRepository = ideasRepository;
    }

    public override void Configure()
    {
        Get("/api/ideas");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var ideas = await _ideasRepository.GetAllAsync(0, 0, ct);
        var response = ideas.ConvertAll(IdeaEndpointsHelper.MapToResponse);

        await SendAsync(response, cancellation: ct);
    }
}

public class GetIdeaEndpoint : Endpoint<string, IdeaResponseModel>
{
    private readonly IEntityRepository<Idea, string> _ideasRepository;

    public GetIdeaEndpoint(IEntityRepository<Idea, string> ideasRepository)
    {
        ArgumentNullException.ThrowIfNull(ideasRepository);
        _ideasRepository = ideasRepository;
    }

    public override void Configure()
    {
        Get("/api/ideas/{id}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(string id, CancellationToken ct)
    {
        var idea = await _ideasRepository.GetByIdAsync(id, ct);
        var response = IdeaEndpointsHelper.MapToResponse(idea);
        await SendAsync(response, cancellation: ct);
    }
}

public class UpdateIdeaEndpoint : Endpoint<UpdateIdeaRequestModel, IdeaResponseModel>
{
    private readonly IEntityRepository<Idea, string> _ideasRepository;

    public UpdateIdeaEndpoint(IEntityRepository<Idea, string> ideasRepository)
    {
        ArgumentNullException.ThrowIfNull(ideasRepository);
        _ideasRepository = ideasRepository;
    }

    public override void Configure()
    {
        Put("/api/ideas/{id}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(UpdateIdeaRequestModel request, CancellationToken ct)
    {
        var id = Route<string>("id");
        if (string.IsNullOrEmpty(id))
        {
            await SendErrorsAsync(400, ct);
            return;
        }

        var idea = await _ideasRepository.GetByIdAsync(id, ct);

        idea.Update(request.Title, request.Description, request.Tags, request.Attachments);

        var updatedIdea = await _ideasRepository.UpdateAsync(id, idea, ct);
        var response = IdeaEndpointsHelper.MapToResponse(updatedIdea);

        await SendAsync(response, cancellation: ct);
    }
}

public class DeleteIdeaEndpoint : Endpoint<string, bool>
{
    private readonly IEntityRepository<Idea, string> _ideasRepository;

    public DeleteIdeaEndpoint(IEntityRepository<Idea, string> ideasRepository)
    {
        ArgumentNullException.ThrowIfNull(ideasRepository);
        _ideasRepository = ideasRepository;
    }

    public override void Configure()
    {
        Delete("api/ideas/{id}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(string id, CancellationToken ct)
    {
        var idea = await _ideasRepository.GetByIdAsync(id, ct);

        idea.MarkAsDeleted();
        await SendAsync(true, 204, cancellation: ct);
    }
}

public static class IdeaEndpointsHelper
{
    public static IdeaResponseModel MapToResponse(Idea idea)
    {
        return new IdeaResponseModel
        {
            Id = idea.Id,
            Title = idea.Title,
            Description = idea.Description,
            Author = idea.Author,
            Tags = idea.Tags,
            Attachments = idea.Attachments,
            Fields = idea.Fields,
            CreatedAt = idea.CreatedAt,
            UpdatedAt = idea.UpdatedAt,
            IsDeleted = idea.IsDeleted
        };
    }
}
