import { useState, useEffect, lazy } from 'react';
import Layout from '../../components/Layout/Layout';
import { TaskData } from '../../types/task';
import { fetchData } from '../../utils/functions';
import TaskCard from './components/TaskCard/TaskCard';
import TaskCardExpanded from './components/TaskCardExpanded/TaskCardExpanded';

const Overlay = lazy(() => import('../../components/Overlay/Overlay'));

type Tasks = {
  tasks: TaskData[];
};

const TasksView = () => {
  const [sortedBy, setSortedBy] = useState<string>('priority');
  const [sections, setSections] = useState<string[]>(['high', 'medium', 'low']);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState<Tasks>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    import('./Tasks.css');
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setError(null);
    setLoading(true);
    try {
      const taskData = await fetchData('task/all');
      setData(taskData);
    } catch (err) {
      setError(err as string);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (data) {
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
    }
  }, [data, sortedBy]);

  useEffect(() => {
    const searchTasks = setTimeout(() => {}, 2000);
    return () => clearTimeout(searchTasks);
  }, [searchText]);

  if (!data) {
    return <></>;
  }

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  const setSelected = (data: TaskData) => {
    setSelectedTask(data);
    setOverlayOpen(true);
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
          <button className="btn btn-primary">create task</button>
          <button
            onClick={() => setSortedBy('status')}
            className="btn btn-primary"
          >
            sort by status
          </button>
          <button
            onClick={() => setSortedBy('category')}
            className="btn btn-primary"
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
                        <TaskCard
                          key={task._id}
                          data={task}
                          setSelected={setSelected}
                        />
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
      <Overlay
        setIsOpen={setOverlayOpen}
        isOpen={overlayOpen}
        children={<TaskCardExpanded data={selectedTask} />}
      />
    </Layout>
  );
};

export default TasksView;

{
  /* <Editable editor={editor} value={markdown} onChange={setMarkdown} /> */
}
