using System.Runtime.Serialization;

namespace Atelier.Core.Enumerations;

public enum FieldType
{
    [EnumMember(Value = "select")] Select,
    [EnumMember(Value = "rating")] Rating,
    [EnumMember(Value = "checkbox")] Checkbox,
    [EnumMember(Value = "date")] Date,
    [EnumMember(Value = "input")] Input,
    [EnumMember(Value = "slider")] Slider,
    [EnumMember(Value = "number")] Number
}
