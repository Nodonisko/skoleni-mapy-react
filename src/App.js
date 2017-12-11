import React, { Component } from 'react'
import './App.css'
import AddItemForm from './components/AddItemForm'
import 'bootstrap/dist/css/bootstrap.css'
import { Button } from 'reactstrap'
import endpoints from './lib/api'
import Map from './components/Map'

class App extends Component {
  state = {
    showAddItemForm: false,
    formTypes: [],
    marker: {
      lat: 49.58634388584286,
      lng: 17.2496509552002,
    },
  }

  componentDidMount() {
    endpoints.getAllFormTypes().then(data => {
      this.setState({ formTypes: data.formTypes })
    })
  }

  handleAddItem = () => {
    this.setState({ showAddItemForm: true })
  }

  handleMarkerPositionChange = latLng => {
    console.log('marker position change', latLng)
    this.setState({ marker: { ...latLng } })
  }

  render() {
    const { formTypes, marker } = this.state

    return (
      <div className="App">
        <div className="AddItemForm">
          {this.state.showAddItemForm && (
            <AddItemForm types={formTypes} marker={marker} />
          )}
          {!this.state.showAddItemForm && (
            <Button onClick={this.handleAddItem}>Pridat</Button>
          )}
        </div>
        <div className="map">
          <Map
            marker={marker}
            onMarkerPositionChange={this.handleMarkerPositionChange}
          />
        </div>
      </div>
    )
  }
}

export default App
