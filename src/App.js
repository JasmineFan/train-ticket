
import React, { Component, lazy, Suspense } from 'react'
const About = lazy(() => import('./About.js'))

class App extends Component {
  state = {
    hasError: false
  }
  static getDerivedStateFromError(){
    return {
      hasError:true
    }
  }
  render() {
    if(this.state.hasError) {
      return <div>error</div>
    }
    return (
      <div>
        <Suspense fallback={<div>loading</div>}>
          <About />
        </Suspense>
      </div>
    )
  }
}

export default App;
