import { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';

const HomeView = () => {
  useEffect(() => {
    import('./Home.css');
  }, []);
  return (
    <Layout>
      <main>
        <h1>Home page</h1>
      </main>
    </Layout>
  );
};

export default HomeView;
