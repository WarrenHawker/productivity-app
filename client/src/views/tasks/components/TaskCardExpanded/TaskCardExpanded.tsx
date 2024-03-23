import { Suspense, lazy, useEffect, useState } from 'react';
import { TaskData, TaskPriority, TaskStatus } from '../../../../types/task';
import { MarkdownRenderer } from '../../../../components/Markdown/Markdown';
import { useEditor } from '@wysimark/react';
import { formatDateForInput } from '../../../../utils/functions';

const Editable = lazy(() =>
  import('@wysimark/react').then((module) => ({ default: module.Editable }))
);

type Props = {
  data: TaskData | null;
};

const TaskCardExpanded = ({ data }: Props) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<TaskPriority>();
  const [status, setStatus] = useState<TaskStatus>();
  const [dueDate, setDueDate] = useState<string>('');
  const editor = useEditor({});

  useEffect(() => {
    import('./TaskCardExpanded.css');

    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setPriority(data.priority);
      setStatus(data.status);
      if (data.due_date) {
        setDueDate(formatDateForInput(data.due_date as string));
      } else {
        setDueDate('');
      }
    }

    setEditing(false);
  }, [data]);

  const saveEdits = () => {};
  const cancelEdits = () => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setPriority(data.priority);
      setStatus(data.status);
      if (data.due_date) {
        setDueDate(formatDateForInput(data.due_date as string));
      } else {
        setDueDate('');
      }
    }
    setEditing(false);
  };

  return (
    <div className="task-expanded">
      <div className="task-expanded-header">
        <h1>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            disabled={!editing}
          />
        </h1>

        <div className="button-container">
          {editing ? (
            <>
              <button onClick={saveEdits} className="btn">
                Save
              </button>
              <button onClick={cancelEdits} className="btn">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} className="btn">
              Edit
            </button>
          )}
          <button className="btn btn-delete">Delete</button>
        </div>
      </div>
      <h2>
        <input
          type="text"
          value={category}
          onChange={(e) => {
            e.target.value;
          }}
          disabled={!editing}
        />
      </h2>
      <select
        disabled={!editing}
        onChange={(e) => setPriority(e.target.value as TaskPriority)}
      >
        <option value="high" selected={priority == 'high'}>
          High
        </option>
        <option value="medium" selected={priority == 'medium'}>
          Medium
        </option>
        <option value="low" selected={priority == 'low'}>
          Low
        </option>
      </select>

      <select
        disabled={!editing}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
      >
        <option value="not started" selected={status == 'not started'}>
          Not Started
        </option>
        <option value="started" selected={status == 'started'}>
          Started
        </option>
        <option value="completed" selected={status == 'completed'}>
          Completed
        </option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        disabled={!editing}
      />
      {editing ? (
        <Suspense fallback={<div>Loading editor...</div>}>
          <Editable editor={editor} value={content} onChange={setContent} />
        </Suspense>
      ) : (
        <MarkdownRenderer children={data?.content} />
      )}
    </div>
  );
};

export default TaskCardExpanded;
