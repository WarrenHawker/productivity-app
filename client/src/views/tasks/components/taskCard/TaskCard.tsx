import { MarkdownRenderer } from '../../../../components/markdown/Markdown';
import { TaskData } from '../../../../types/task';

interface Props {
  data: TaskData;
}

const TaskCard = ({ data }: Props) => {
  return (
    <>
      <h2>{data.title}</h2>
      <h3>{data.category}</h3>
      <p>Priority: {data.priority}</p>
      <p>Status: {data.status}</p>
      {data.due_date && <p>{data.due_date as string}</p>}
      <div>
        <MarkdownRenderer>{data.content}</MarkdownRenderer>
      </div>
    </>
  );
};

export default TaskCard;
