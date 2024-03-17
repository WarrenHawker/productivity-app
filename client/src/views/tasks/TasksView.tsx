import Layout from '../../components/layout/Layout';
import { Editable, useEditor } from '@wysimark/react';
import { useState } from 'react';
import { MarkdownRenderer } from '../../components/markdown/Markdown';
import useFetchTasks from '../../hooks/tasks/useFetchTasks';

const TasksView = () => {
  const [markdown, setMarkdown] = useState('');
  const editor = useEditor({});
  const { data: tasks, status, error } = useFetchTasks({ title: 'test' });

  if (status == 'pending') {
    return (
      <>
        <h3 className="center">Loading...</h3>
      </>
    );
  }

  if (status == 'error') {
    return (
      <>
        <h1 className="page-title">Tasks</h1>
        <div>
          <h3 className="center error">{(error as Error).message}</h3>
        </div>
      </>
    );
  }

  return (
    <Layout>
      <main>
        <h1>Tasks page</h1>
        <div className="content">
          <Editable editor={editor} value={markdown} onChange={setMarkdown} />
          <MarkdownRenderer>{markdown}</MarkdownRenderer>
        </div>
      </main>
    </Layout>
  );
};

export default TasksView;
