import { IdeaCreationForm } from 'apps/client/src/modules/all-ideas/features/idea-form/IdeaForm';
import { IdeasTable } from 'apps/client/src/modules/all-ideas/features/ideas-table';

type Props = {};

const AllIdeas = (props: Props) => {
  const initialValues = {
    title: 'This is a custom title for the idea',
    description: {
      '1c9df015-11b3-4cd1-831f-66f5b4111d57': {
        id: '1c9df015-11b3-4cd1-831f-66f5b4111d57',
        value: [
          {
            id: '7cc8b180-5920-4e57-9c46-cee26bef206a',
            type: 'code',
            children: [
              {
                text: "import Blockquote from '@yoopta/blockquote'\nimport { HeadingTwo } from '@yoopta/headings';\n\nconst plugins = [\n  //...otherplugins\n  Blockquote.extend({\n    options: {\n      HTMLAttributes: {\n        className: s.blockquote,\n      },\n    },\n  }),\n  HeadingTwo.extend({\n    options: {\n      HTMLAttributes: {\n        style: {\n          color: 'green',\n        },\n      },\n    },\n  })\n]",
              },
            ],
            props: {
              nodeType: 'void',
              language: 'javascript',
              theme: 'VSCode',
            },
          },
        ],
        type: 'Code',
        meta: {
          order: 9,
          depth: 1,
        },
      },
      '1a1ce913-6ab1-4487-bfc3-deec5651966a': {
        id: '1a1ce913-6ab1-4487-bfc3-deec5651966a',
        value: [
          {
            id: 'c9c52908-f9df-4018-b867-81b34e1e2998',
            type: 'paragraph',
            children: [
              {
                text: '',
              },
            ],
            props: {
              nodeType: 'block',
            },
          },
        ],
        type: 'Paragraph',
        meta: {
          order: 7,
          depth: 0,
        },
      },
    },
  };
  return (
    <div className="flex flex-col gap-4">
      <h1>AllIdeas</h1>
      <div className="flex justify-end">
        <IdeaCreationForm />
        <IdeaCreationForm initialValues={initialValues} />
      </div>
      <IdeasTable />
    </div>
  );
};

export { AllIdeas };
