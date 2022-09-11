
import React, { Component, useState, useEffect} from 'react'
class AppOld extends Component {
  state={
    count:0,
    size:{
      width:document.documentElement.clientWidth,
      height:document.documentElement.clientHeight,
    }
  }
  onResize = ()=>{
    this.setState({
      size:{
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight,
      }
    })
  }
  componentDidMount(){
      document.title =  this.state.count
      window.addEventListener('resize', this.onResize, false)
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.onResize, false)
  }
  componentDidUpdate(){
        document.title =  this.state.count
  }
  render() {
    const {count,size}= this.state
    return (
      <div>
        <button 
          onClick={()=>{
            this.setState({
              count:count+1
            })
            }}>Click{count}</button>
            size:{size.height}, {size.width}
      </div>
    )
  }
}
function App(){
  const [count, setCount] = useState(0)
  const [size, setSize] = useState({
    width:document.documentElement.clientWidth,
    height:document.documentElement.clientHeight,
  })

  const onResize = ()=>{
    setSize({
      width:document.documentElement.clientWidth,
      height:document.documentElement.clientHeight,
    })
  }

  useEffect(()=>{
    document.title = count
  })

  useEffect(()=>{
    window.addEventListener('resize', onResize, false)
    return ()=>{
      window.removeEventListener('resize', onResize, false)
    }
  },[])  //只调用一次，在数据的每项都不变的时候，useEffect 就不执行，不传数组，每次渲染以后都执行，空数组，就只在第一次执行一次

  return (
    <div>
        <button 
          onClick={()=>{setCount(count+1)}}>
            Click{count} 
          </button>
          size:{size.height}, {size.width}
      </div>
  )
}
export default App
