using Atelier.Core.Enumerations;

namespace Atelier.Core.Entities.Fields;

public class SelectField : FieldBase
{
    public override FieldType FieldType => FieldType.Select;

    public List<string> Options { get; private set; }

    public SelectField(string label, string description, List<string> options) : base(label, description)
    {
        ArgumentNullException.ThrowIfNull(options);
        Options = options;
    }
}
