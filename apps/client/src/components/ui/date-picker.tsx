'use client';

import { format } from 'date-fns';
import * as React from 'react';

import { CalendarIcon } from '@radix-ui/react-icons';
import { cn } from '../../lib/utils';
import { Button } from './button';
import { Calendar } from './calender';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

type Props = {
  value?: Date;
  onChange?: (date?: Date) => void;
};

export function DatePicker({ value, onChange }: Props) {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const handleDateChange = (date?: Date) => {
    setDate(date);
    onChange && onChange(date);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={handleDateChange} required={false} />
      </PopoverContent>
    </Popover>
  );
}
