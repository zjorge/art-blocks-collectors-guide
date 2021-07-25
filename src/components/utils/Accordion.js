import React, {useState} from 'react'
import './Accordion.css'

function Accordion({children, title}) {

  const [collapsed, setCollapsed] = useState(true);

  return (
    <div>
      <div 
        className="bold-text clickable"
        onClick={() => {setCollapsed(!collapsed)}}
      >
        {title} {collapsed ? "+" : "-"}
      </div>
      {!collapsed && <div>
        {children}
      </div>}
    </div>
  );

}

export default Accordion;
