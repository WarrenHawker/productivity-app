import { Routes, Route, BrowserRouter } from 'react-router-dom';
import TasksView from './views/tasks/TasksView';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomeView from './views/home/HomeView';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<HomeView />} />
            <Route path="/tasks" element={<TasksView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
