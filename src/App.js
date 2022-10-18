import React, { Component, useState, useMemo, memo, useCallback, useRef, PureComponent, useEffect } from 'react';
import './App.css'
import { createAdd, createRemove, createSet, createToggle } from './action'
import reducer from './reducers'
let idSeq = Date.now()

//貌似是redux 源码类似



function bindActionCreators(actionCreators, dispatch) {
  const ret = {}
  for (let key in actionCreators) {
    ret[key] = function (...args) {
      const actionCreator = actionCreators[key]
      // console.log(actionCreator)
      const action = actionCreator(...args)
      // console.log(action)
      dispatch(action)
    }
  }
  return ret
}

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
    , dispatch } = props
  const onChange = () => {
    dispatch(createToggle(id))
  }
  const onRemove = () => {
    dispatch(createRemove(id))
  }
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
  // const { todos, toggleTodo, removeToDo } = props
  const { todos, dispatch } = props
  return (
    <ul>
      {
        todos.map(todo => {
          return <TodoItem
            key={todo.id}
            todo={todo}
            dispatch={dispatch}

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
  const [incrementCount, setIncrementCount] = useState(0)

  
  // function reducer(state, action) {
  //   const { type, payload } = action
  //   const { todos, incrementCount } = state

  //   switch (type) {
  //     case 'set':
  //       return {
  //         ...state,
  //         todos: payload,
  //         incrementCount: incrementCount + 1
  //       }
  //     case 'add':
  //       return {
  //         ...state,
  //         todos: [...todos, payload],
  //         incrementCount: incrementCount + 1
  //       }
  //     case 'remove':
  //       return {
  //         ...state,
  //         todos: todos.filter(todo => {
  //           return todo.id != payload
  //         })
  //       }
  //     case 'toggle':
  //       return {
  //         ...state,
  //         todos: todos.map(todo => {
  //           return todo.id === payload
  //             ? {
  //               ...todo, complete: !todo.complete
  //             }
  //             : todo
  //         })
  //       }

  //   }
  //   return state
  // }

 

  const dispatch = (action) => {
    const state = {
      todos,
      incrementCount
    }
    const setters = {
      todos: setTodos,
      incrementCount: setIncrementCount
    }
    const newState = reducer(state, action)
    for (let key in newState) {
      setters[key](newState[key])
    }

  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || [])
    dispatch(createSet(todos))
  }, [])

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos])

  return (
    <div className='todo-list'>
      <Control
        {
        ...bindActionCreators({ addTodo: createAdd }, dispatch)
        } />
      <Todos dispatch={dispatch} todos={todos} />
    </div>
  )
}

export default TodoList