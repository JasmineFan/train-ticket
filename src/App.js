
import React, { Component, useState} from 'react'
class AppOld extends Component {
  state={
    count:0
  }
  render() {
    const {count}= this.state
    return (
      <div>
        <button 
          onClick={()=>{
            this.setState({
              count:count+1
            })
            }}>Click{count}</button>
      </div>
    )
  }
}
function App(){
  const [count, setCount] = useState(0)
  const [name, setName] = useState('aaa')
  return (
    <div>
        <button 
          onClick={()=>{setCount(count+1)}}>
            Click{count} , name {name}
          </button>
      </div>
  )
}
export default App;
