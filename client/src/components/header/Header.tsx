import { useEffect } from 'react';

const Header = () => {
  
  useEffect(() => {
    import ('./Header.css');
  },[])
  return (
    <header>
      <h2>this is the header</h2>
    </header>
  );
};

export default Header;
