import React, { Component } from 'react'
import './App.css'
import 'typeface-roboto' // eslint-disable-line
import Button from 'material-ui/Button'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button raised color="primary">
          To get started
        </Button>
      </div>
    )
  }
}

export default App
