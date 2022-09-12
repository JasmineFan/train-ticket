import React, {Component, useState,useMemo,memo,useCallback,useRef,PureComponent, useEffect } from 'react';

function useCounter(count){
  const size = useSize()
  return (
    <h1>{count}, {size.height} , {size.width}</h1>
  )
}
function useCount(defaultCount){
  const [count,setCount]=useState(defaultCount)
  const it =useRef()
  useEffect(()=>{
    it.current = setInterval(()=>{
      setCount(count=>count+1)
    },1000)
  },[])
  useEffect(()=>{
    if(count>=5){
      clearInterval(it.current)
    }
  })
  return [count,setCount]
}
function useSize(){
  const [size,setSize] = useState({
    width:document.documentElement.clientWidth,
    height:document.documentElement.clientHeight
  })
  const onResize = useCallback(()=>{
    setSize({
      width:document.documentElement.clientWidth,
      height:document.documentElement.clientHeight
    })
  },[])
  useEffect(()=>{
    window.addEventListener('resize',onResize, false)
    return ()=>{
      window.removeEventListener('resize',onResize, false)
    }
  },[])
  return size
}
const App=()=>{
  const [count,setCount]=useCount(0)
  const Counter = useCounter(0)
  const size = useSize()

  return ( 
    <div> 
      <button onClick={()=>setCount(count+1)}>click {count}</button>     
      {Counter} {size.height} , {size.width}
    </div>
   );
}
 
export default App;