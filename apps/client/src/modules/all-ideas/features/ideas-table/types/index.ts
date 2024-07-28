type Idea = {
  id: string;
  author: string;
  title: string;
  description: string;
  roadmap: string;
  tags: any[];
  attachments: any[];
  [k: string]: any;
};

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

export { Field, FieldType, Idea, NewIdea };
