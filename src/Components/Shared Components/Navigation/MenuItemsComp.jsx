import { useState, useEffect, useRef } from 'react';
// 
import { Link } from 'react-router-dom';
import DropdownComp from './DropdownComp';

import {useLocation} from 'react-router-dom';

const MenuItemsComp = ({ items, depthLevel, currentLink }) => {
  const [dropdown, setDropdown] = useState(false);
  const location = useLocation();
  let locationPagePath = location.pathname;
  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (
        dropdown &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  return (
  <>
    {/* <button
    className="menu-items"
    ref={ref}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={closeDropdown}
    >
   
      {items.children && items.children.length > 0 ? (
        <>
        <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {window.innerWidth < 960 && depthLevel === 0 ? (
              items.label
            ) : (
              <Link to={items.link}>{items.label}</Link>
            )}

            {depthLevel > 0 &&
            window.innerWidth < 960 ? null : depthLevel > 0 &&
              window.innerWidth > 960 ? (
              <span>&raquo;</span>
            ) : (
              <span className="arrow" />
            )}
          </button>
          <DropdownComp
            depthLevel={depthLevel}
            submenus={items.children}
            dropdown={dropdown}
          />
        </>
      ) : (
        <Link to={items.link}>{items.label}</Link>
      )}
    </button> */}
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items.children && items.children ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => {
              console.log('top', items)
              setDropdown((prev) => !prev)}}
          >
            {window.innerWidth < 960 && depthLevel === 0 ? (
              items.label
            ) : (
              <Link to={'/' + items.label}>{items.label}</Link>
            )}

            {depthLevel > 0 &&
            window.innerWidth < 960 ? null : depthLevel > 0 &&
              window.innerWidth > 960 ? (
              <span>&raquo;</span>
            ) : (
              <span className="arrow" />
            )}
          </button>
          <DropdownComp
            depthLevel={depthLevel}
            submenus={items.children}
            dropdown={dropdown}
          />
        </>
      ) : !items.children && items.children ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => {
              console.log('BOTTOM')
              setDropdown((prev) => !prev)}}
          >
            {items.label}{' '}
            {depthLevel > 0 ? (
              <span>&raquo;</span>
            ) : (
              <span className="arrow" />
            )}
          </button>
          <DropdownComp
            depthLevel={depthLevel}
            submenus={items.children}
            dropdown={dropdown}
          />
        </>
      ) : (
        <Link style={{
          // color: 'inherit',
          // textDecoration: 'none',
          // display: 'block',
          // padding: '0.5rem',
          // transition: 'color 0.3s',
        }}
        // onMouseEnter={(e) => (e.target.style.color = 'white')}
        // onMouseLeave={(e) => (e.target.style.color = 'inherit')}
        onClick={() => {
          console.log(currentLink)
          // console.log(window.location)
          console.log('path',window.location.pathname, items.link)}} to={items.link}>{items.label}</Link>
      )}
    </li>
  </>
  );
};

export default MenuItemsComp;