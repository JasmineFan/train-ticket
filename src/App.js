import React, {Component, useState,useMemo,memo,useCallback,useRef,PureComponent } from 'react';


class Counter extends Component{
  speak(){
    console.log('now Counter is '+this.props.count)
  }
  render(){
    const {props} =this
    return(
      <h1 onClick={props.onClick}>{props.count}</h1>
    )
  }
}

const App=()=>{
  const [count,setCount]=useState(0)

  const double=useMemo(()=>{
    return count*2
  },[count==3])

  const onClick=useCallback(()=>{
    console.log('onClick')
    console.log(counterRef.current)
    counterRef.current.speak()
  },[])

  const counterRef=useRef()

  return ( 
    <div> 
      <button onClick={()=>setCount(count+1)}>click</button>     
      <Counter ref={counterRef} count={double} onClick={onClick} />
    </div>
   );
}
 
export default App;