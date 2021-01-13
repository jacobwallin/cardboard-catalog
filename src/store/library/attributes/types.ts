export const GET_ATTRIBUTES_REQUEST = "GET_ATTRIBUTES_REQUEST"
export const GET_ATTRIBUTES_SUCCESS = "GET_ATTRIBUTES_SUCCESS"

interface GetAttributesRequest {
  type: typeof GET_ATTRIBUTES_REQUEST;
}

interface GetAttributesSuccess {
  type: typeof GET_ATTRIBUTES_SUCCESS;
  attributes: Attribute[]
}

export type AttributeActionTypes = GetAttributesRequest | GetAttributesSuccess

export interface AttributeState {
  attributes: Attribute[]
}

export interface Attribute {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}