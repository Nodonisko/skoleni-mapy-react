const schema = {
  title: 'A registration form',
  description: 'A simple form example.',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Name',
    },
    lat: {
      type: 'number',
      title: 'Lat',
    },
    lng: {
      type: 'number',
      title: 'Lng',
    },
  },
}

const uiSchema = {}

const formData = {
  name: 'Radio tower',
  lat: 17.23123312,
  lng: 40.231289129,
}

export default { schema, formData, uiSchema }
