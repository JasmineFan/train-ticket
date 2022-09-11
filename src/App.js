
import React, { useState, useMemo, memo, useCallback} from 'react'

const Child = memo(function Child(props){
  console.log('render child')
  return <div onClick={props.onclick}>{props.count}</div>
})
function App(){
  const [count, setCount] = useState(0)

  const double = useMemo(()=>{
    return count*2
  },[count===3])

  const onclick = useCallback(()=>{
    console.log('click')
  },[])



  return (
    <div>
        <button 
          onClick={()=>{setCount(count+1)}}>
            Click{count} , {double}
          </button>
            <Child count={double} onClick={onclick}/>
      </div>
  )
}
export default App
