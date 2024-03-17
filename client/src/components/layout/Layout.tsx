import { PropsWithChildren } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {children}
      <ReactQueryDevtools />
      <Footer />
    </>
  );
};
export default Layout;
