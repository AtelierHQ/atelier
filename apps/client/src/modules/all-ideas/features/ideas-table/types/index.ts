type Idea = {
  id: string;
  title: string;
  description: string;
  author: string;
  tags: any[];
  attachments: any[];
  fieldsValues?: FieldsValue[];
  isDeleted?: boolean;
  status?: string;
};

export interface FieldsValue {
  fieldId: string;
  value: string;
}

type FieldType = 'select' | 'rating' | 'checkbox' | 'date' | 'input' | 'slider' | 'number';

type Field = {
  options?: string[];
  id: string;
  label: string;
  description: string;
  fieldType: FieldType;
  maxRating?: number;
  minDate?: string;
  maxDate: string;
  isChecked?: boolean;
  minValue?: number;
  maxValue?: number;
  step?: number;
  placeholder?: string;
};

type NewIdea = {
  [key: string]: string;
};

type ColumnsType = Record<string, { id: string; title: string; ideas: Idea[] }>;

export type { ColumnsType, Field, FieldType, Idea, NewIdea };
