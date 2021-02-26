import React, {useState, useRef, useCallback, useReducer} from 'react';
import TodoTemplate from './Component/Todo/TotoTemplate';
import TodoInsert from './Component/Todo/TodoInsert';
import TodoList from './Component/Todo/TodoList';

// 테스트를 위한 임시 데이터 생성
function createBulkTodos() {
  const array = [];
  for (let i=1;i<=2500;i++) {
    array.push({
      id: i,
      text: `Todo ${i}`,
      checked: false
    })
  }
  return array;
}

// useReducer을 이용하면 useState의 함수형 업데이트를 사용하는 대신
// onToggle, onRemove가 새로워지는 문제를 해결 가능
function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map(todo =>
        todo.id === action.id ? {...todo, checked: !todo.checked} : todo
      );
    default:
      return todos;
  }
}

const App = () => {
  // const [todos, setTodos] = useState([]);
  // const [todos, setTodos] = useState(createBulkTodos());
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos)
  const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
      const todo = {
        id:nextId.current,
        text: text,
        checked: false
      };
      // setTodos 아래 모두 동일한 동작
      // useState의 함수영 업데이트 사용
      // 상태 업데이트를 어떻게 할지 정의해주는 업데이트 함수 전달 -> 함수형 업데이트

      // setTodos(todos => todos.concat(todo));
      // 위 setTodos 대신 아래 새용 가능
      dispatch({type: 'INSERT', todo});
      nextId.current += 1;
    },
    [todos]
  );

  const onToggle = useCallback(
    id => {
      dispatch({type: 'TOGGLE', id});
      // settodos(todos =>
      //   todos.map(
      //     todo =>
      //       todo.id === id ? {...todo, checked:!todo.checked} : todo
      //  )
      // );
    }, [todos]
  );

  const onRemove = useCallback(
    id => {
      dispatch({type: 'REMOVE', id});
      // setTodos(todos => todos.filter(todo => todo.id !== id));
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