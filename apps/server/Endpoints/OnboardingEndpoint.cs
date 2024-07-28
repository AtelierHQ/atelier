using Atelier.Core.Entities.Fields;
using Atelier.Core.Enumerations;
using Atelier.Core.Factories;
using Atelier.Core.Interfaces;
using FastEndpoints;

namespace Atelier.Server.Endpoints;

public class OnboardingEndpoint : EndpointWithoutRequest
{
    private readonly IEntityRepository<FieldBase, string> _fieldsRepository;

    public OnboardingEndpoint(IEntityRepository<FieldBase, string> fieldsRepository)
    {
        ArgumentNullException.ThrowIfNull(fieldsRepository);

        _fieldsRepository = fieldsRepository;
    }

    public override void Configure()
    {
        Post("/api/d/onboard");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var systemFields = (from FieldType fieldType in Enum.GetValues(typeof(FieldType))
            select SystemFieldFactory.CreateSystemField(fieldType)).ToList();

        foreach (var field in systemFields)
        {
            await _fieldsRepository.CreateAsync(field, ct);
        }

        await SendAsync("System fields created successfully.", 201, ct);
    }
}
