using Atelier.Core.Entities.Fields;
using Atelier.Core.Enumerations;

namespace Atelier.Core.Factories;

public static class SystemFieldFactory
{
    public static FieldBase CreateSystemField(FieldType fieldType, string label, string description)
    {
        return fieldType switch
        {
            FieldType.Select => new SelectField("Category", "The category of the idea",
                ["Technology", "Process Improvement", "Product", "Marketing"]),
            FieldType.Rating => new RatingField("Priority", "The priority of the idea", 5),
            FieldType.Checkbox => new CheckboxField("Is Completed", "Whether the idea is completed", false),
            FieldType.Date => new DateField("Due Date", "The due date for this idea", DateTime.Today.ToUniversalTime()),
            FieldType.Input => new InputField("Title", "The title of the idea", "Enter idea title"),
            FieldType.Slider => new SliderField("Progress", "The progress of the idea", 0, 100, 5),
            FieldType.Number => new NumberField("Estimated Cost", "The estimated cost of the idea", false, false),
            _ => throw new ArgumentException($"Unknown system field type: {fieldType}")
        };
    }
}
