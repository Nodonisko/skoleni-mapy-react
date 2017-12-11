import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-jsonschema-form'
import './AddItemForm.css'
import SelectType from './SelectType'

import simpleFormSchema from '../schemas/simple'
import twoFormSchema from '../schemas/two'

const log = type => console.log.bind(console, type)

class AddItemForm extends Component {
  static propTypes = {
    marker: PropTypes.object,
    types: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  state = {
    formSchema: null,
  }

  componentWillReceiveProps(nextProps) {
    console.log('Neco', nextProps)

    this.setState({
      formSchema: {
        ...this.state.formSchema,
        formData: {
          ...this.state.formSchema.formData,
          lat: nextProps.marker.lat,
          lng: nextProps.marker.lng,
        },
      },
    })
  }

  handleTypeChange = selectedTypeId => {
    const selectedType =
      this.props.types.find(type => type.id === selectedTypeId) || null

    console.log(selectedType)
    this.setState({ formSchema: selectedType })
  }

  handleFormChange = form => {
    this.setState({
      formSchema: {
        ...this.state.formSchema,
        formData: form.formData,
      },
    })
  }

  neco = () => {}

  render() {
    const { formSchema } = this.state
    const { types } = this.props

    return (
      <div className="additemform_container">
        <SelectType types={types} onTypeChange={this.handleTypeChange} />
        {formSchema ? (
          <Form
            {...formSchema}
            onChange={this.handleFormChange}
            onSubmit={this.handleFormSubmit}
            onError={log('errors')}
          />
        ) : null}
      </div>
    )
  }
}

export default AddItemForm
