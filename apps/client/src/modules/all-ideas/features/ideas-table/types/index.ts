type Idea = {
  id: string;
  author: string;
  title: string;
  description: string;
  tags: any[];
  attachments: any[];
  [k: string]: any;
};

type FieldType = 'select' | 'rating' | 'checkbox' | 'date' | 'input' | 'slider' | 'number';

type Field = {
  id: string;
  value: string | number;
  description: string;
  name: string;
  custom: boolean;
  type: FieldType;
  configurations: {
    options: string[];
  } | null;
};

export { Field, Idea };
