import './App.css';
import  {createContext, Component} from 'react'

const FirstContext = createContext(100) //这个100 是比如没有FirstContext.Provider 的时候会用这个默认值
const OnlineContext = createContext()
class App extends Component {
  state = {
    first:60,
    online:false
  }
  render() {
    const {first, online} = this.state
    return(
    // <FirstContext.Provider value={first}>
      <OnlineContext.Provider value={online}>
        <button 
          type="button" 
          onClick={()=>{this.setState({first:first-1})}}> 按钮
        </button>
        <button 
          type="button" 
          onClick={()=>{this.setState({online:!online})}}> 按钮改变online 值
        </button>
        <Middle/>
      </OnlineContext.Provider>
    // </FirstContext.Provider>
    )
  }
}
function Middle(){
  return <Last/>
}
function Last(){
  return (
    <FirstContext.Consumer>
      {
        FirstComponentValue=>(
          <OnlineContext.Consumer>
            {online=> <h1>这个地方是last 组件渲染的结果但是显示的是first 里面的值 {FirstComponentValue}, 然后是online 的值 {String(online)}</h1>}
          </OnlineContext.Consumer>
        )      
      }
    </FirstContext.Consumer>
  )
}
export default App;
