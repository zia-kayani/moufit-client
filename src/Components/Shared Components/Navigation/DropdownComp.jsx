import MenuItemsComp from "./MenuItemsComp";

// import MenuItems from './MenuItems';

const DropdownComp = ({ submenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : '';
  return (
    <>
    {submenus && submenus.length > 0 ? (
            <ul
            className={`dropdown ${dropdownClass} ${
              dropdown ? 'show' : ''
            }`}
          >
              
            {submenus.map((submenu, index) => (
              <MenuItemsComp
                items={submenu}
                key={index}
                depthLevel={depthLevel}
              />
            ))}
          </ul>
        ) : (
            ''
        )}
     
    </>
   
  );
};

export default DropdownComp;