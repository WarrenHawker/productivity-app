import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './views/home/Home';
import TasksView from './views/tasks/TasksView';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<HomePage />} />
            <Route path="/tasks" element={<TasksView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
