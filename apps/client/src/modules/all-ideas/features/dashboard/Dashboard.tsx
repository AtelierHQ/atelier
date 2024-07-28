import { Button } from 'apps/client/src/components/ui/button';
import { IdeaCreationForm } from 'apps/client/src/modules/all-ideas/features/idea-form/IdeaForm';
import { IdeasTable } from 'apps/client/src/modules/all-ideas/features/ideas-table';
import { useState } from 'react';

type Props = {};

const AllIdeas = (props: Props) => {
  // const [open, setOpen] = useState(false);
  const [ideaModalDetails, setIdeaModalDetails] = useState({
    isOpen: false,
    initialValues: null,
  });

  const { isOpen, initialValues } = ideaModalDetails;

  const handleIdeModalDetails = (values?: any) => [
    setIdeaModalDetails({ isOpen: true, initialValues: values }),
  ];

  const handleClose = () => {
    setIdeaModalDetails({ isOpen: false, initialValues: null });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between border-b-2">
        <h1 className="text-2xl font-bold pb-4">All Ideas</h1>
        <Button onClick={() => handleIdeModalDetails()}>
          {initialValues ? 'Update Idea' : 'Create Idea'}
        </Button>
      </div>
      <IdeaCreationForm open={isOpen} initialValues={initialValues} onClose={handleClose} />
      <IdeasTable handleIdeModalDetails={handleIdeModalDetails} />
    </div>
  );
};

export { AllIdeas };
