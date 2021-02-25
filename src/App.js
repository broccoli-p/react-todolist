import React, {useState, useRef, useCallback} from 'react';
import TodoTemplate from './Component/Todo/TotoTemplate';
import TodoInsert from './Component/Todo/TodoInsert';
import TodoList from './Component/Todo/TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);
  const nextId = useRef(4);
  const onInsert = useCallback(
    text => {
      const todo = {
        id:nextId.current,
        text: text,
        checked: false
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos]
  );

  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(
          todo =>
            todo.id === id ? {...todo, checked:!todo.checked} : todo
        )
      );
    }, [todos]
  );

  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    }, [todos]
  )

  return (
    <div>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert}/>
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
      </TodoTemplate>
    </div>
  )
}

export default App;