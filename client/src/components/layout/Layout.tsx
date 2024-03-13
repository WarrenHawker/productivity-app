import { PropsWithChildren } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
export default Layout;
