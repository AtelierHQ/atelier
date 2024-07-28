import { Checkbox } from '../components/ui/checkbox';
import { DatePicker } from '../components/ui/date-picker';
import { Input } from '../components/ui/input';
import { Rating } from '../components/ui/rating';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import type { Field } from '../modules/all-ideas/features/ideas-table/types';

const cellMapper = (
  field: Field,
  value: string | number | boolean,
  onChange: (newValue: any) => void,
) => {
  const { fieldType: type, options = [] } = field;
  switch (type) {
    case 'checkbox':
      return (
        <Checkbox
          checked={value === 'true'}
          onCheckedChange={(checked) => onChange(checked?.toString())}
        />
      );
    case 'select': {
      return (
        <Select onValueChange={(value) => onChange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={value ?? 'Value'} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option: any) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }
    case 'date': {
      const date = value && typeof value === 'string' ? new Date(value) : undefined;
      return <DatePicker value={date} onChange={(date) => onChange(date)} />;
    }
    case 'input': {
      return (
        <Input
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    }
    case 'rating':
      return (
        <Rating
          rating={+value as number}
          onRatingChange={(rating) => onChange(rating?.toString())}
        />
      );
    case 'slider':
      return <Slider value={[+value]} onValueChange={(value) => onChange(value[0]?.toString())} />;
    case 'number':
      return (
        <Input
          type="number"
          value={value as number}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      );
    default:
      return <></>;
  }
};

export { cellMapper };
