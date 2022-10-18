import React, { Component, useState, useMemo, memo, useCallback, useRef, PureComponent, useEffect } from 'react';
import './App.css'

let idSeq = Date.now()

function Control(props) {
  const { addTodo } = props
  const inputRef = useRef()
  const onSubmit = (e) => {
    e.preventDefault()      //阻止默认提交
    const newText = inputRef.current.value.trim()
    if (newText.length === 0) {
      return;
    }
    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false
    })
    inputRef.current.value = ''
  }
  return (
    <div className='control'>
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} type="text" className='new-todo' placeholder='what to do'></input>
      </form>
    </div>)
}

function TodoItem(props) {
  const { todo: {
    id, text, complete
  }
    , toggleTodo, removeToDo } = props
  const onChange = () => {
    toggleTodo(id)
  }
  const onRemove = () => { removeToDo(id)}
  return (
    <li className='todo-item'>
      <input
        type="checkbox"
        onChange={onChange}
        checked={complete}
      />
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>

    </li>
  )
}
function Todos(props) {
  const { todos, toggleTodo, removeToDo } = props
  return (
    <ul>
      {
        todos.map(todo => {
          return <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            removeToDo={removeToDo}

          />
        }

        )
      }
    </ul>
  )
}

const LS_KEY = '_$todo'

function TodoList() {
  const [todos, setTodos] = useState([])

  const addTodo = useCallback((todo) => {
    setTodos(todos => [...todos, todo])
  }, [])

  const removeToDo = useCallback((id) => {
    setTodos(todos => todos.filter(todo => {
      return todo.id != id
    }))
  }, [])

  const toggleTodo = (id) => {
    setTodos(todos => todos.map(todo => {
      return todo.id === id
        ? {
          ...todo, complete: !todo.complete
        }
        : todo
    }))
  }


  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem(LS_KEY)||[]) 
    console.log("Test",todos)
    setTodos(todos)
  }, [])

  useEffect(()=>{
    localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos])

  return (
    <div className='todo-list'>
      <Control addTodo={addTodo} />
      <Todos removeToDo={removeToDo} toggleTodo={toggleTodo} todos={todos} />
    </div>
  )
}

export default TodoList