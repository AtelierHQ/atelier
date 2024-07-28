using Atelier.Core.Entities.Fields;

namespace Atelier.Core.Factories;

public static class SystemFieldFactory
{
    public static IReadOnlyList<FieldBase> CreateSystemFields()
    {
        var systemFields = new List<FieldBase>
        {
            new SelectField("Roadmap", "The roadmap of the idea", ["Now", "Next", "Later", "Won't Do"]),
            new RatingField("Priority", "The priority of the idea", 3),
            new DateField("Start Date", "The start date for this idea", DateTime.Today.ToUniversalTime()),
            new DateField("Due Date", "The due date for this idea", DateTime.Today.AddDays(1).ToUniversalTime()),
            new RatingField("Effort", "The effort required for the idea", 5),
            new RatingField("Impact", "The impact of the idea", 5),
            new CheckboxField("Completed", "Whether the idea is completed", false),
            new SliderField("Progress", "The progress of the idea", 0, 100, 5),
            new InputField("Tags", "The tags for the idea", "tag 1, tag 2, tag 3")
        };

        return systemFields;
    }
}
