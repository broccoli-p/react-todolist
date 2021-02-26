import React from 'react';
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';


// const TodoListItem = ({todo, onRemove, onToggle}) => {
// 위 방식으로 하면 style이 깨짐 -. 아래 방식 사용
const TodoListItem = ({todo, onRemove, onToggle, style}) => {
  const {id, text, checked} = todo;

  return (
    <div className="TodoListItem-virtualized" sytle={style}>
      <div className="TodoListItem">
        <div className={cn('checkbox', {checked})} onClick={() => onToggle(id)}>
          {checked ? <MdCheckBox/> : <MdCheckBoxOutlineBlank />}
          <div className="text">{text}</div>
        </div>
        <div className="remove" onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline/>
        </div>
      </div>
    </div>
  )
}

// React.memo를 이용하여 변경 사항이 있는 컬럼만 변경
// 하지만 큰 변화는 없다(기존 2500건 : 0.8s, 적용 2500건 : 0.6s)
// 이 경우 todo, onRemove, onToggle 이 변경되어야 리렌더링한다.
export default React.memo(TodoListItem);