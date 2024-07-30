import React from 'react';
import './DynamicPackageList.css';

const DynamicPackageList = ({items}) => {
    // const items = ['item1', 'item2']
    return (
        <>
            <h3 className='dynamic-list-title'>
                Available Packages
            </h3>
        <div className="dynamic-list">
          {items?.map((item, index) => (
            <div className="dynamic-list-item" key={index} onClick={() => console.log(item)}>
              <div className="item-content">{item}</div>
              <div className="item-hover"></div>
            </div>
          ))}
        </div>
        </>
      );
}

export default DynamicPackageList