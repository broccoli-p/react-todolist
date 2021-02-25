import React from 'react';
import './TodoTemplate.scss';


export default function TodoTemplate({children}) {
  return (
    <div className="TodoTemplate">
      <div className="app-title">TODO-List</div>
      <div className="content">{children}</div>
    </div>
  );
}