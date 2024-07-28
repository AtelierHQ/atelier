using Atelier.Core.Entities.Fields;
using Atelier.Core.Enumerations;
using Atelier.Core.Factories;
using Atelier.Core.Interfaces;
using Atelier.Server.ResponseModels;
using FastEndpoints;
using Newtonsoft.Json;

namespace Atelier.Server.Endpoints;

public class InitializeSystemFieldsEndpoints : EndpointWithoutRequest
{
    private readonly IEntityRepository<FieldBase, string> _fieldsRepository;

    public InitializeSystemFieldsEndpoints(IEntityRepository<FieldBase, string> fieldsRepository)
    {
        ArgumentNullException.ThrowIfNull(fieldsRepository);

        _fieldsRepository = fieldsRepository;
    }

    public override void Configure()
    {
        Post("/api/d/init-fields");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var systemFields = SystemFieldFactory.CreateSystemFields();

        foreach (var field in systemFields)
        {
            await _fieldsRepository.CreateAsync(field, ct);
        }

        await SendAsync("System fields created successfully.", 201, ct);
    }
}

public class GetAllFieldsEndpoints : EndpointWithoutRequest
{
    private readonly IEntityRepository<FieldBase, string> _fieldsRepository;

    public GetAllFieldsEndpoints(IEntityRepository<FieldBase, string> fieldsRepository)
    {
        ArgumentNullException.ThrowIfNull(fieldsRepository);

        _fieldsRepository = fieldsRepository;
    }

    public override void Configure()
    {
        Get("/api/fields");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var fields = await _fieldsRepository.GetAllAsync(0, 0, ct);
        var fieldsWithFieldTypeStrings = fields.Select(FieldsHelper.MapToResponseModel).ToList();
        await SendAsync(fieldsWithFieldTypeStrings, 200, ct);
    }
}

public static class FieldsHelper
{
    public static FieldBaseResponseModel MapToResponseModel(FieldBase field)
    {
        return field switch
        {
            SelectField selectField => new SelectFieldResponseModel
            {
                Id = field.Id,
                Label = field.Label,
                Description = field.Description,
                FieldType = EnumHelper.GetStringValue(field.FieldType),
                Options = selectField.Options
            },
            RatingField ratingField => new RatingFieldResponseModel
            {
                Id = field.Id,
                Label = field.Label,
                Description = field.Description,
                FieldType = EnumHelper.GetStringValue(field.FieldType),
                MaxRating = ratingField.MaxRating
            },
            CheckboxField checkboxField => new CheckboxFieldResponseModel
            {
                Id = field.Id,
                Label = field.Label,
                Description = field.Description,
                FieldType = EnumHelper.GetStringValue(field.FieldType),
                IsChecked = checkboxField.IsChecked
            },
            DateField dateField => new DateFieldResponseModel
            {
                Id = field.Id,
                Label = field.Label,
                Description = field.Description,
                FieldType = EnumHelper.GetStringValue(field.FieldType),
                MinDate = dateField.MinDate,
                MaxDate = dateField.MaxDate
            },
            InputField inputField => new InputFieldResponseModel
            {
                Id = field.Id,
                Label = field.Label,
                Description = field.Description,
                FieldType = EnumHelper.GetStringValue(field.FieldType),
                Placeholder = inputField.Placeholder
            },
            SliderField sliderField => new SliderFieldResponseModel
            {
                Id = field.Id,
                Label = field.Label,
                Description = field.Description,
                FieldType = EnumHelper.GetStringValue(field.FieldType),
                MinValue = sliderField.MinValue,
                MaxValue = sliderField.MaxValue,
                Step = sliderField.Step
            },
            NumberField numberField => new NumberFieldResponseModel
            {
                Id = field.Id,
                Label = field.Label,
                Description = field.Description,
                FieldType = EnumHelper.GetStringValue(field.FieldType),
                IsDecimal = numberField.IsDecimal,
                AllowNegative = numberField.AllowNegative
            },
            _ => throw new ArgumentException("Invalid FieldType")
        };
    }
}
