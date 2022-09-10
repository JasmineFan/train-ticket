
import React, { Component, memo} from 'react'

const NewChild = memo(function Child (props) {
    return <div>{props.person.age}</div>
})

class App extends Component {
  state={
    count:1,
    person:{
      age:1
    }
  }
  callback = ()=>{}
  render() {
    const {person ,count}= this.state
    return (
      <div>
        <button 
          onClick={()=>{
            person.age++;
            this.setState({
              count
            })
            }}>test</button>
       <NewChild person={person} callback={this.callback}/>
      </div>
    )
  }
}

export default App;
