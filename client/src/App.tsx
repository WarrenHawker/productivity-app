import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './views/home/Home';
import TODOPage from './views/TODO/TODO';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<HomePage />} />
          <Route path="/todo" element={<TODOPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
