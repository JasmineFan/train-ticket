import './App.css';
import { createContext, Component } from 'react'

const FirstContext = createContext()
class App extends Component {
  state = {
    first: 60
  }
  render() {
    const { first } = this.state
    return (
      <FirstContext.Provider value={first}>
        <button
          type="button"
          onClick={() => { this.setState({ first: first - 1 }) }}> 按钮
        </button>
        <Middle />
      </FirstContext.Provider>
    )
  }
}
function Middle() {
  return <Last />
}
class Last extends Component {
  static contextType = FirstContext    //只有一个context 的时候
  render() {
    const FirstComponentValue = this.context
    return (
      <h1>这个地方是last 组件渲染的结果但是显示的是first 里面的值{FirstComponentValue}</h1>
    )
  }
}
export default App;
