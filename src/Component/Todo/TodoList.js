import React, {useCallback} from 'react';
import {List} from 'react-virtualized';
import TodoListItem from './TodoListItem';


const TodoList = ({todos, onRemove, onToggle}) => {
  const rowRenderer = useCallback(({index, key, style}) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          />
      );
    },
    [onRemove, onToggle, todos]
  )
  console.log(todos.length);
  return (
    <List
      className="TodoList"
      width={512}
      height={513} // 전체 높이
      rowCount={todos.length}
      rowHeight={57}
      rowRenderer={rowRenderer} // 렌더링 시 사용
      list={todos} // 배열
      style={{outline:'none'}} // 기본 outline style 제거
      />
    // 아래 대신 위 소스를 이용하요 스크롤 될 경우 렌더링
    // <div className="TodoList">
    //   {todos.map(todo => (
    //     <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle}/>
    //   ))}
    // </div>
  )
}

export default React.memo(TodoList);