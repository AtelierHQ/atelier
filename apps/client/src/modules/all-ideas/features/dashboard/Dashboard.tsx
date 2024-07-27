import { IdeasTable } from '../ideas-table';

type Props = {};

const AllIdeas = (props: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h1>AllIdeas</h1>
      <IdeasTable />
    </div>
  );
};

export { AllIdeas };
