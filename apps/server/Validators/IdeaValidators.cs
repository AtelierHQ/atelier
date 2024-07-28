using Atelier.Server.RequestModels;
using FastEndpoints;
using FluentValidation;

namespace Atelier.Server.Validators;

// Validators
public class CreateIdeaValidator : Validator<CreateIdeaRequestModel>
{
    public CreateIdeaValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Description).NotEmpty();
        RuleFor(x => x.Author).NotEmpty().MaximumLength(50);
        RuleFor(x => x.Tags).NotNull();
        RuleFor(x => x.Attachments).NotNull();
    }
}

public class UpdateIdeaValidator : Validator<UpdateIdeaRequestModel>
{
    public UpdateIdeaValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Description).NotEmpty();
        RuleFor(x => x.Tags).NotNull();
        RuleFor(x => x.Attachments).NotNull();
        RuleFor(x => x.FieldsValues).NotNull();
    }
}
