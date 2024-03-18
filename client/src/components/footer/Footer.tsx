import { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    import ('./Footer.css');
  },[])
  return (
    <footer>
      <h2>this is the footer</h2>
    </footer>
  );
};

export default Footer;
