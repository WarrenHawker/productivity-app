import Layout from '../../components/layout/Layout';
import { useEffect, useState } from 'react';
import useFetchTasks, { fetchTasks } from '../../hooks/tasks/useFetchTasks';
import { TaskData } from '../../types/task';
import TaskCard from './components/taskCard/TaskCard';
import useCreateTask from '../../hooks/tasks/useCreateTask';

const TasksView = () => {
  const { data, status, error } = useFetchTasks();
  const [sortedBy, setSortedBy] = useState<string>('priority');
  const [sections, setSections] = useState<string[]>(['high', 'medium', 'low']);
  const [searchText, setSearchText] = useState('');

  const { mutateAsync: createMutate, status: createStatus } = useCreateTask();

  useEffect(() => {
    import('./TasksView.css');
  }, []);

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

  useEffect(() => {
    const searchTasks = setTimeout(async () => {
      await fetchTasks(searchText);
    }, 2000);
    return () => clearTimeout(searchTasks);
  }, [searchText]);

  if (createStatus == 'pending') {
    return (
      <>
        <h3>creating task...</h3>
      </>
    );
  }

  if (status == 'pending') {
    return (
      <>
        <h3>Loading...</h3>
      </>
    );
  }

  if (status == 'error' || createStatus == 'error') {
    return (
      <>
        <h1>Tasks</h1>
        <div>
          <h3>{(error as Error).message}</h3>
        </div>
      </>
    );
  }

  const createNewTask = async () => {
    await createMutate({
      title: 'hello world 19',
      content: 'this is the hello world test',
      category: 'testing',
      priority: 'high',
      status: 'completed',
    });
  };

  return (
    <Layout>
      <div className="task-view-header">
        <h1>Tasks</h1>
        <div className="task-view-header-inner">
          <input
            type="text"
            placeholder="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={createNewTask} className="btn-primary">
            create task
          </button>
          <button onClick={() => setSortedBy('status')} className="btn-primary">
            sort by status
          </button>
          <button
            onClick={() => setSortedBy('category')}
            className="btn-primary"
          >
            sort by category
          </button>
        </div>
      </div>
      <main>
        {data.tasks.length > 0 ? (
          <>
            {sections.map((section, index) => {
              const filteredTasks = data.tasks.filter(
                (task: TaskData) => task[sortedBy as keyof TaskData] === section
              );
              return (
                <section key={index} className="task-section">
                  <h2>
                    {sortedBy}: {section}
                  </h2>
                  <div className="task-section-inner">
                    {filteredTasks.length > 0 ? (
                      filteredTasks.map((task: TaskData) => (
                        <TaskCard key={task._id} data={task} />
                      ))
                    ) : (
                      <h3 className="no-task">
                        No tasks found in this section
                      </h3>
                    )}
                  </div>
                </section>
              );
            })}
          </>
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
