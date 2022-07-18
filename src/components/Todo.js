import React, { useState, useEffect } from 'react';

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';

/* カスタムフック */
import useStorage from '../hooks/storage';

/* ライブラリ */
import {getKey} from "../lib/util";
import useFirebase from "../lib/firebase";


function Todo() {
  const [items, getItems, addItems, updateItems, deleteItems] = useFirebase();
  
  const [filter, setFilter] = React.useState('ALL');

  //   useEffect(() => {
  //   getItems();
  //   console.log(items);
  // });

  const displayItems = items.filter(item => {
    if (filter === 'ALL') return true;
    if (filter === 'TODO') return !item.done;
    if (filter === 'DONE') return item.done;
  });
  
  const handleCheck = checkedItem => {
    checkedItem.done = !checkedItem.done;
    updateItems(checkedItem);
  };
  
  const handleAdd = text => {
    addItems({ key: getKey(), text, done: false });
  };
  
  const handleFilterChange = value => setFilter(value);

  return (
    <article className="panel is-danger">
      <div className="panel-heading">
        <span className="icon-text">
          <span className="icon">
            <i className="fas fa-calendar-check"></i>
          </span>
          <span> ITSS Todoアプリ</span>
        </span>
      </div>
      <Input onAdd={handleAdd} />
      <Filter
        onChange={handleFilterChange}
        value={filter}
      />
      {displayItems.map((item, index) => (
        <TodoItem 
          key={index}
          item={item}
          onCheck={handleCheck}
        />
      ))}
      <div className="panel-block">
        {displayItems.length} items
      </div>
      <div className="panel-block">
        <button className="button is-light is-fullwidth" onClick={deleteItems}>
          全てのToDoを削除
        </button>
      </div>
    </article>
  );
}

export default Todo;