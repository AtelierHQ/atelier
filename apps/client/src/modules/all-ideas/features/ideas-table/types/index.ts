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
  id: string;
  description: string;
  name: string;
  label: string;
  custom: boolean;
  type: FieldType;
  configurations: {
    options: string[];
  } | null;
};

type NewIdea = {
  [key: string]: string;
};

type ColumnsType = Record<string, { id: string; title: string; ideas: Idea[] }>;

export { ColumnsType, Field, FieldType, Idea, NewIdea };
