import { PlusCircle, X } from 'lucide-react';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components//ui/card';
import { Input } from '../../../components//ui/input';
import { Button } from '../../../components/ui/button';

// Assuming Idea type is defined in your types file
import { useIdea, useIdeas } from '../../all-ideas/features/ideas-table/api';
import { Idea } from '../../all-ideas/features/ideas-table/types';

const KanbanBoard = () => {
  const { createIdeaMutation, updateIdeaMutation } = useIdea();
  const { data: ideas, isLoading, error } = useIdeas();
  const [newIdeaTitle, setNewIdeaTitle] = useState<string>('');

  const columns: Record<string, { id: string; title: string; ideas: Idea[] }> = {
    todo: { id: 'todo', title: 'To Do', ideas: [] },
    inprogress: { id: 'inprogress', title: 'In Progress', ideas: [] },
    done: { id: 'done', title: 'Done', ideas: [] },
  };
  console.log({ ideas });

  // Organize ideas into columns
  ideas?.forEach((idea) => {
    if (columns[idea.roadmap]) {
      columns[idea.roadmap].ideas.push(idea);
    }
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const [movedIdea] = sourceColumn.ideas.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceColumn.ideas.splice(destination.index, 0, movedIdea);
    } else {
      destColumn.ideas.splice(destination.index, 0, movedIdea);
      // Update the status of the idea
      updateIdeaMutation.mutate({ id: movedIdea.id, status: destination.droppableId });
    }
  };

  const addIdea = (columnId: string) => {
    if (!newIdeaTitle.trim()) return;

    const newIdea: Omit<Idea, 'id'> = {
      title: newIdeaTitle,
      description: '',
      status: columnId,
    };

    createIdeaMutation.mutate(newIdea as Idea, {
      onSuccess: () => {
        setNewIdeaTitle('');
      },
    });
  };

  const deleteIdea = (ideaId: string) => {
    // Implement delete mutation here
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Roadmap</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-wrap gap-4">
          {Object.values(columns).map((column) => (
            <div key={column.id} className="w-full sm:w-1/2 lg:w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle>{column.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="min-h-[200px]"
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
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-xs text-muted-foreground">
                                      {idea.description}
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
                      value={newIdeaTitle}
                      onChange={(e) => setNewIdeaTitle(e.target.value)}
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
