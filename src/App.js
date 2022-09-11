
import React, { useState, createContext, useContext} from 'react'

const CountContext = createContext()
function Child(){
  const count = useContext(CountContext)
  return <div>{count}</div>
}
function App(){
  const [count, setCount] = useState(0)
  return (
    <div>
        <button 
          onClick={()=>{setCount(count+1)}}>
            Click{count} 
          </button>
          <CountContext.Provider value ={count}>
            <Child/>
          </CountContext.Provider>
      </div>
  )
}
export default App
