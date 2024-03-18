import Layout from '../../components/layout/Layout';
import { useEffect, useState } from 'react';
import useFetchTasks from '../../hooks/tasks/useFetchTasks';
import { TaskData } from '../../types/task';
import TaskCard from './components/taskCard/TaskCard';

const TasksView = () => {
  const { data, status, error } = useFetchTasks();
  const [sortedBy, setSortedBy] = useState<string>('priority');
  const [sections, setSections] = useState<string[]>(['high', 'medium', 'low']);

  useEffect(() => {
    import('./TasksView.css');
  },[])
  
  useEffect(() => {
    switch (sortedBy) {
      case 'priority':
        setSections(['high', 'medium', 'low']);
        break;
      case 'status':
        setSections(['not started', 'started', 'completed']);
        break;
      case 'category':
        setSections(() => {
          const uniqueCategories: string[] = [
            ...new Set(data.tasks.map((task: TaskData) => task.category)),
          ] as string[];
          return uniqueCategories;
        });
        break;
      default:
        break;
    }
  }, [sortedBy]);

  console.log(data);

  if (status == 'pending') {
    return (
      <>
        <h3>Loading...</h3>
      </>
    );
  }

  if (status == 'error') {
    return (
      <>
        <h1>Tasks</h1>
        <div>
          <h3>{(error as Error).message}</h3>
        </div>
      </>
    );
  }

  return (
    <Layout>
      <main>
        <h1>Tasks page</h1>
        <button onClick={() => setSortedBy('status')}>sort by status</button>
        <button onClick={() => setSortedBy('category')}>
          sort by category
        </button>
        {data.tasks.length > 0 ? (
          <div>
            {sections.map((section, index) => {
              const filteredTasks = data.tasks.filter(
                (task: TaskData) => task[sortedBy as keyof TaskData] === section
              );
              return (
                <section key={index} className='task-section'>
                  <h2>
                    {sortedBy}: {section}
                  </h2>
                  <div className='task-section-inner'>
                    {filteredTasks.length > 0 ? (
                      filteredTasks.map((task: TaskData) => (
                        <TaskCard key={task._id} data={task} />
                      ))
                    ) : (
                      <h3 className='no-task'>
                        No tasks found in this section
                      </h3>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <h3>No tasks found</h3>
        )}
      </main>
    </Layout>
  );
};

export default TasksView;

{
  /* <Editable editor={editor} value={markdown} onChange={setMarkdown} /> */
}
