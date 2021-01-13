import {AttributeActionTypes, Attribute, GET_ATTRIBUTES_REQUEST, GET_ATTRIBUTES_SUCCESS} from "./types"

export const getAttributesRequest = (): AttributeActionTypes => ({
  type: GET_ATTRIBUTES_REQUEST
})

export const getAttributesSuccess = (attributes: Attribute[]): AttributeActionTypes => ({
  type: GET_ATTRIBUTES_SUCCESS,
  attributes
})