import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Map,
  Marker,
  Popup,
  TileLayer,
  Circle,
  FeatureGroup,
  GeoJSON,
} from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import './Map.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet-draw/dist/leaflet.draw.css'

const myIcon = L.icon({
  iconUrl: require('../images/circleMarker.png'),
  iconSize: [25, 25],
  popupAnchor: [-3, -76],
})
console.log(L)

const layerFromGeojson = new L.GeoJSON()

console.log(layerFromGeojson)

class MyMap extends Component {
  static propTypes = {
    marker: PropTypes.object,
    onMarkerPositionChange: PropTypes.func.isRequired,
  }

  state = {
    center: [0.5, 102.0],
    zoom: 13,
    viewport: {},
  }

  marker = null

  updateMarkerPosition = () => {
    const latLng = this.marker.leafletElement.getLatLng()
    console.log(latLng)
    this.props.onMarkerPositionChange(latLng)
  }

  onViewportChanged = viewport => {
    this.setState({ viewport })
    console.log('Viewport position changed', viewport)
  }

  handleMapClick = params => {
    console.log('Cliked to position', params.latlng)
  }

  render() {
    const { center, zoom, viewport } = this.state
    const { marker } = this.props
    const markerPosition = [marker.lat, marker.lng]

    return (
      <Map
        onClick={this.handleMapClick}
        center={center}
        zoom={zoom}
        onViewportChanged={this.onViewportChanged}
        viewport={viewport}
      >
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup>
          <EditControl
            position="topright"
            onEdited={e => console.log(e)}
            onCreated={console.log}
            onDeleted={console.log}
          />
          <GeoJSON
            enable
            data={{
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'LineString',
                    coordinates: [
                      [102.0, 0.0],
                      [103.0, 1.0],
                      [104.0, 0.0],
                      [105.0, 1.0],
                    ],
                  },
                },
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Polygon',
                    coordinates: [
                      [
                        [100.0, 0.0],
                        [101.0, 0.0],
                        [101.0, 1.0],
                        [100.0, 1.0],
                        [100.0, 0.0],
                      ],
                    ],
                  },
                  properties: {
                    prop0: 'value0',
                    prop1: { this: 'that' },
                  },
                },
              ],
            }}
          />
        </FeatureGroup>
        <Marker
          icon={myIcon}
          draggable
          onDragend={this.updateMarkerPosition}
          position={markerPosition}
          opacity={0.75}
          ref={markerRef => {
            this.marker = markerRef
          }}
        >
          <Popup minWidth={90}>
            <span onClick={this.toggleDraggable}>
              {JSON.stringify(this.state.marker)}
            </span>
          </Popup>
        </Marker>
      </Map>
    )
  }
}

export default MyMap
