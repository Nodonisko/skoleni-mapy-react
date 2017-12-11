import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(
  'https://api.graph.cool/simple/v1/cjau20yt102re0165cblmboid',
  {},
)

const getAllMarkers = () =>
  client.request(`
    {
    	markers: allMarkers {
        id
        lat
        lng
      }
    }
  `)

const createNewMarker = (lat, lng) =>
  client.request(
    `
      mutation ($lat: Float!, $lng: Float!) {
        marker: createMarker(
          lat: $lat
          lng: $lng
        ) {
          id
      		lat
          lng
        }
      }
    `,
    {
      lat,
      lng,
    },
  )

const updateNewMarker = (lat, lng, id) =>
  client.request(
    `
      mutation ($lat: Float!, $lng: Float!, $id: ID!) {
        marker: updateMarker(
          id: $id
          lat: $lat
          lng: $lng
        ) {
          id
        }
      }
      `,
    {
      lat,
      lng,
      id,
    },
  )

const createFormType = (schema, formData, uiSchema, name) =>
  client.request(
    `
        mutation ($schema: Json!, $formData: Json!, $uiSchema: Json!, $name: String!) {
          marker: createFormType(
        		schema: $schema
            formData: $formData
            uiSchema: $uiSchema
            name: $name
          ) {
            id
          }
        }
        `,
    {
      schema,
      formData,
      uiSchema,
      name,
    },
  )

const getAllFormTypes = () =>
  client.request(`
  {
    formTypes: allFormTypes {
      id
      name
      schema
      uiSchema
      formData
    }
  }
`)

const endpoints = {
  getAllMarkers,
  createNewMarker,
  updateNewMarker,
  createFormType,
  getAllFormTypes,
}

export default endpoints
