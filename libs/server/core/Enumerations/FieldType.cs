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

public static class EnumHelper
{
    public static string GetStringValue(Enum value)
    {
        var type = value.GetType();
        var memberInfo = type.GetMember(value.ToString());
        var attributes = memberInfo[0].GetCustomAttributes(typeof(EnumMemberAttribute), false);
        return attributes.Length > 0 ? ((EnumMemberAttribute)attributes[0]).Value : value.ToString();
    }
}
