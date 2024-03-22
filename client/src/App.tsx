import { Routes, Route, BrowserRouter } from 'react-router-dom';
import TasksView from './views/Tasks/Tasks';
import HomeView from './views/Home/Home';
import ReactDOM from 'react-dom/client';
import './global.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<HomeView />} />
          <Route path="/tasks" element={<TasksView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
