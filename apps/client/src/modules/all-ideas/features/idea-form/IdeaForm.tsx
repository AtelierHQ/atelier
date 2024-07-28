import { type YooptaContentValue, createYooptaEditor } from '@yoopta/editor';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useIdea } from '../../../../api/useIdea';
import Editor from '../../../../components/editor';
import { Button } from '../../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../components/ui/dialog';
import { Input } from '../../../../components/ui/input';
import { cellMapper } from '../../../../utils/cellMapper';
import { WITH_BASIC_INIT_VALUE } from '../../../../utils/initValue';

type FieldType = {
  id: string;
  value: string | number;
  description: string;
  name: string;
  custom: boolean;
  type: string;
  configurations: any;
};

type IdeaCreationFormProps = {
  initialValues?: any;
};

function IdeaCreationForm({ initialValues }: IdeaCreationFormProps) {
  const { register, handleSubmit, control, getValues } = useForm();
  const editor = useMemo(() => createYooptaEditor(), []);
  const [description, setDescription] = useState<YooptaContentValue>(
    initialValues?.description || WITH_BASIC_INIT_VALUE,
  );
  const {
    createIdeaMutation: { mutate: postIdea },
  } = useIdea();

  const onSubmit = () => {
    const values = getValues();
    const valuesWithDescription = { ...values, description: JSON.stringify(editor.children) };
    postIdea(valuesWithDescription);
  };
  // const fields: FieldType[] = [
  //   {
  //     id: 'status',
  //     value: '',
  //     description: 'Select the current status of the idea',
  //     name: 'Status',
  //     custom: false,
  //     type: 'select',
  //     configurations: {
  //       options: ['New', 'In Progress', 'Completed', 'On Hold'],
  //     },
  //   },
  //   {
  //     id: 'priority',
  //     value: '',
  //     description: 'Set the priority of the idea',
  //     name: 'Priority',
  //     custom: false,
  //     type: 'select',
  //     configurations: {
  //       options: ['Urgent', 'High', 'Medium', 'Low', 'None'],
  //     },
  //   },
  //   {
  //     id: 'labels',
  //     value: '',
  //     description: 'Add labels to the idea',
  //     name: 'Labels',
  //     custom: false,
  //     type: 'select',
  //     configurations: {
  //       options: ['Label 1', 'Label 2', 'Label 3'],
  //     },
  //   },
  //   {
  //     id: 'startDate',
  //     value: '',
  //     description: 'Set the start date for the idea',
  //     name: 'Start date',
  //     custom: false,
  //     type: 'date',
  //     configurations: null,
  //   },
  //   {
  //     id: 'dueDate',
  //     value: '',
  //     description: 'Set the due date for the idea',
  //     name: 'Due date',
  //     custom: false,
  //     type: 'date',
  //     configurations: null,
  //   },
  //   {
  //     id: 'value',
  //     value: '',
  //     description: 'Set the value of the idea',
  //     name: 'Value',
  //     custom: true,
  //     type: 'number',
  //     configurations: null,
  //   },
  //   {
  //     id: 'effort',
  //     value: '',
  //     description: 'Set the effort required for the idea',
  //     name: 'Effort',
  //     custom: true,
  //     type: 'number',
  //     configurations: null,
  //   },
  //   {
  //     id: 'author',
  //     value: '',
  //     description: 'Set the author of the idea',
  //     name: 'Author',
  //     custom: false,
  //     type: 'select',
  //     configurations: {
  //       options: ['Author 1', 'Author 2', 'Author 3'],
  //     },
  //   },
  // ];

  // function getValueFromFieldId(id: string) {
  //   return fields.find((field) => field.id === id)?.value;
  // }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{initialValues ? 'Update Idea' : 'Create Idea'}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1080px] min-w-960">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span className="font-medium">New Idea</span>
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          defaultValue={initialValues?.title}
        >
          <Input
            id="title"
            placeholder="Title"
            className="text-lg font-medium"
            {...register('title')}
          />

          <div className="max-h-[650px] border rounded-md p-6 overflow-auto">
            <Editor description={description} editor={editor} />
          </div>

          <div className="flex flex-wrap gap-2">
            {/* {fields?.map((field) => (
              <div key={field.id} className="w-40">
                <Controller
                  name={field.id}
                  control={control}
                  defaultValue={initialValues?.author || field.value}
                  render={({ field }) =>
                    cellMapper(field, getValueFromFieldId(field?.id), (newValue) =>
                      console.log(newValue),
                    )
                  }
                />
              </div>
            ))} */}
          </div>
        </form>
        <DialogFooter className="flex justify-end border-t pt-4 mt-4">
          <div>
            <Button
              variant="outline"
              className="bg-red-400 text-white hover:bg-red-500 hover:text-white mr-2"
            >
              Discard Idea
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" onClick={onSubmit}>
              Create Idea
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { IdeaCreationForm };
