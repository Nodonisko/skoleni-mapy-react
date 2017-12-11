import React from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import PropTypes from 'prop-types'

class SelectType extends React.Component {
  static propTypes = {
    onTypeChange: PropTypes.func.isRequired,
    types: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  handleTypeChange = event => {
    const formTypeId = event.target.value
    this.props.onTypeChange(formTypeId)
  }

  render() {
    const { types } = this.props

    return (
      <Form>
        <FormGroup>
          <Label for="exampleSelect">Select</Label>
          <Input
            onChange={this.handleTypeChange}
            type="select"
            name="select"
            id="exampleSelect"
          >
            <option>----------------</option>
            {types.map(type => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </Input>
        </FormGroup>
      </Form>
    )
  }
}

export default SelectType
