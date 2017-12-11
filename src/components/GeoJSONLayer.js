import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Marker, Circle, Polygon } from 'react-leaflet'

class GeoJSONLayer extends Component {
  static propTypes = {
    data: PropTypes.object,
  }

  render() {
    const { data, ...restProps } = this.props
    console.log('neco', restProps)
    return data.features.map(({ geometry }) => {
      if (geometry.type === 'Polygon') {
        return <Polygon positions={geometry.coordinates} {...restProps} />
      }
      return null
    })
  }
}

export default GeoJSONLayer
