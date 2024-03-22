import { ReactNode, SyntheticEvent, useEffect } from 'react';

type Props = {
  children?: ReactNode;
  isOpen: boolean;
  setIsOpen: (input: boolean) => void;
};

const Overlay = ({ children, isOpen, setIsOpen }: Props) => {
  useEffect(() => {
    import('./Overlay.css');
  }, []);

  const closeOverlay = (e: SyntheticEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('overlay')) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={isOpen ? 'overlay open' : 'overlay'}
      onClick={(e) => closeOverlay(e)}
    >
      <div className="overlay-content-container">
        <div className="overlay-content">
          <i
            className="fa fa-window-close"
            id="overlay-close"
            onClick={() => setIsOpen(false)}
          ></i>
          <div className="overlay-content-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
