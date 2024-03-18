import { MarkdownRenderer } from '../../../../components/markdown/Markdown';
import { TaskData } from '../../../../types/task';
import { formatDate } from '../../../../utils/functions';
import { useEffect } from 'react';

interface Props {
  data: TaskData;
}

const TaskCard = ({ data }: Props) => {
  const { status, priority, title, category, due_date, content } = data;
  
  useEffect(() => {
    import('./TaskCard.css')
  },[])

  let statusBGColor = '';
  let statusTextColor = '';
  switch (status) {
    case 'not started':
      statusBGColor = 'orange';
      statusTextColor = 'black';
      break;
    case 'started':
      statusBGColor = 'blue';
      statusTextColor = 'white';
      break;
    case 'completed':
      statusBGColor = 'green';
      statusTextColor = 'white';
      break;
    default:
      break;
  }
  const statusStyle = {
    backgroundColor: statusBGColor,
    color: statusTextColor,
  };

  let priorityDivColor = '';
  switch (priority) {
    case 'low':
      priorityDivColor = 'green';
      break;
    case 'medium':
      priorityDivColor = 'orange';
      break;
    case 'high':
      priorityDivColor = 'red';
      break;
    default:
      break;
  }

  const priorityDivStyle = {
    backgroundColor: priorityDivColor,
  };

  return (
    <article className='task-card'>
      <div style={priorityDivStyle} className='priority-div'></div>
      <div className='task-card-inner'>
        <p className='task-status' style={statusStyle}>
          {status}
        </p>
        <h2>{title}</h2>
        {due_date && (
          <p className='due-date'>{formatDate(due_date)}</p>
        )}
        <div className='category'>
          <p>Category</p>
          <h4>{category}</h4>
        </div>
      </div>
      {/* <div>
        <MarkdownRenderer>{content}</MarkdownRenderer>
      </div> */}
    </article>
  );
};

export default TaskCard;
