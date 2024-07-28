import { PlusCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, type DropResult } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components//ui/card';
import { Input } from '../../../components//ui/input';
import { Button } from '../../../components/ui/button';

// Assuming Idea type is defined in your types file
import { format } from 'date-fns';
import { useFields, useIdea, useIdeas } from '../../../api';
import type { ColumnsType, Idea, NewIdea } from '../../all-ideas/features/ideas-table/types';

const KanbanBoard = () => {
  const { createWithUpdateMutation, updateIdeaMutation, deleteIdeaMutation } = useIdea();
  const { data: ideas, isLoading, error } = useIdeas();
  const { data: allFields, isLoading: isFieldsLoading } = useFields();
  const [newIdeaTitle, setNewIdeaTitle] = useState<NewIdea>();
  const loggedUser = 'John Doe';
  const statusField = allFields?.find((field) => field.label === 'Roadmap');

  const colors: { [key: string]: { bg: string; text: string } } = {
    now: { bg: 'bg-green', text: 'text-black' },
    next: { bg: 'bg-yellow', text: 'text-black' },
    later: { bg: 'bg-blue', text: 'text-blue-500' },
    never: { bg: 'bg-red', text: 'text-red-500' },
  };

  const initialColumns: ColumnsType = {
    now: { id: 'now', title: 'Now', ideas: [] },
    next: { id: 'next', title: 'Next', ideas: [] },
    later: { id: 'later', title: 'Later', ideas: [] },
    never: { id: 'never', title: 'Never', ideas: [] },
  };

  const [columns, setColumns] = useState<ColumnsType | undefined>();

  useEffect(() => {
    if (!ideas || !allFields) return;
    // Organize ideas into columns
    const newColumns = initialColumns;
    for (const idea of ideas) {
      if (!idea?.isDeleted) {
        const status = idea?.fieldsValues?.find(
          (field) => field?.fieldId === statusField?.id,
        )?.value;
        if (status && newColumns?.[status]) {
          newColumns[status].ideas.push(idea);
        } else {
          // If the status is not one of the columns, add it to the 'never' column
          newColumns.never.ideas.push(idea);
        }
      }
    }
    setColumns(newColumns);
  }, [allFields, ideas, statusField]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    if (!columns) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const [movedIdea] = sourceColumn.ideas.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceColumn.ideas.splice(destination.index, 0, movedIdea);
    } else {
      destColumn.ideas.splice(destination.index, 0, movedIdea);
      // Update the status of the idea
      const fieldValues = movedIdea?.fieldsValues?.map((field: any) => {
        if (field?.fieldId === statusField?.id) {
          return { ...field, value: destColumn.id };
        } else return field;
      });
      updateIdeaMutation.mutate({ ...movedIdea, fieldsValues: fieldValues });
    }
  };

  const addIdea = (columnId: string) => {
    if (!newIdeaTitle?.[columnId].trim()) return;

    const newIdea: Omit<Idea, 'id'> = {
      title: newIdeaTitle?.[columnId],
      description: 'sample description',
      author: loggedUser,
      tags: [],
      attachments: [],
      status: columnId,
      statusFieldId: statusField?.id,
    };

    createWithUpdateMutation.mutate(newIdea as Idea, {
      onSuccess: () => {
        setNewIdeaTitle({ ...newIdeaTitle, [columnId]: '' });
      },
    });
  };

  const deleteIdea = (ideaId: string) => {
    deleteIdeaMutation.mutate(ideaId, {
      onSuccess: () => {},
    });
  };

  if (isLoading || isFieldsLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="p-4">
      <div
        className="bg-green-100 bg-green-50 bg-red-50 bg-red-100 bg-yellow-100 bg-yellow-50 bg-blue-50 bg-blue-100"
        style={{ visibility: 'hidden', width: '0', height: '0' }}
      ></div>
      <h1 className="text-2xl font-bold mb-4">Product Roadmap</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto">
          {Object.values(columns || [])?.map((column) => (
            <div key={column.id} className="w-[25vw] min-w-[400px] max-w-[500px]">
              <Card className={`${colors[column.id]?.bg}-50`}>
                <CardHeader>
                  <CardTitle
                    className={`${colors[column.id]?.bg}-100 w-fit p-[5px] rounded text-xs ${colors[column.id]?.text}`}
                  >
                    {column.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-col flex h-[calc(100vh-200px)]">
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="min-h-[calc(100vh-300px)] overflow-y-auto flex flex-col gap-2"
                      >
                        {column.ideas.map((idea, index) => (
                          <Draggable key={`${idea.id}-card`} draggableId={idea.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-2"
                              >
                                <Card>
                                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                      {idea.title}
                                    </CardTitle>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => deleteIdea(idea.id)}
                                    >
                                      <X className="h-4 w-4 text-red-600" />
                                    </Button>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-xs text-muted-foreground ">
                                      Created At: <b>{format(idea.createdAt ?? '', 'PPpp')}</b>
                                    </p>
                                  </CardContent>
                                </Card>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <div className="mt-4 flex space-x-2">
                    <Input
                      value={newIdeaTitle?.[column.id]}
                      onChange={(e) => {
                        setNewIdeaTitle({
                          ...newIdeaTitle,
                          [column.id]: e.target.value,
                        });
                      }}
                      placeholder="New idea title"
                      className="flex-grow"
                    />
                    <Button onClick={() => addIdea(column.id)}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export { KanbanBoard };
