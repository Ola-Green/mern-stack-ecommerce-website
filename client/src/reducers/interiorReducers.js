import * as interiorConstants from "../constants/interiorConstants";

export const deleteInterior = (state = {}, action) => {
  switch (action.type) {
    case interiorConstants.DELETE_INTERIOR_REQUEST:
      return { loading: true };
    case interiorConstants.DELETE_INTERIOR_SUCCESS:
      return { loading: false, success: true };
    case interiorConstants.DELETE_INTERIOR_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const interiorDetails = (state = { interior: {} }, action) => {
  switch (action.type) {
    case interiorConstants.INTERIOR_DETAILS_REQUEST:
      return { ...state, loading: true };
    case interiorConstants.INTERIOR_DETAILS_SUCCESS:
      return { loading: false, interior: action.payload };
    case interiorConstants.INTERIOR_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createInterior = (state = {}, action) => {
  switch (action.type) {
    case interiorConstants.CREATE_INTERIOR_REQUEST:
      return { loading: true };
    case interiorConstants.CREATE_INTERIOR_SUCCESS:
      return { loading: false, success: true, interior: action.payload };
    case interiorConstants.CREATE_INTERIOR_FAIL:
      return { loading: false, error: action.payload };
    case interiorConstants.CREATE_INTERIOR_RESET:
      return {};
    default:
      return state;
  }
};

export const updateInterior = (state = { interior: {} }, action) => {
  switch (action.type) {
    case interiorConstants.UPDATE_INTERIOR_REQUEST:
      return { loading: true };
    case interiorConstants.UPDATE_INTERIOR_SUCCESS:
      return { loading: false, success: true, interior: action.payload };
    case interiorConstants.UPDATE_INTERIOR_FAIL:
      return { loading: false, error: action.payload };
    case interiorConstants.UPDATE_INTERIOR_RESET:
      return { interior: {} };
    default:
      return state;
  }
};

export const getInteriorReducer = (state = { interiors: [] }, action) => {
  switch (action.type) {
    case interiorConstants.GET_INTERIOR_REQUEST:
      return { loading: true, interiors: [] };

    case interiorConstants.GET_INTERIOR_SUCCESS:
      return {
        loading: false,
        success: true,
        interiors: action.payload,
      };
    case interiorConstants.GET_INTERIOR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const interiorList = (state = { interiors: [] }, action) => {
  switch (action.type) {
    case interiorConstants.INTERIOR_LIST_REQUEST:
      return { loading: true, categories: [] };
    case interiorConstants.INTERIOR_LIST_SUCCESS:
      return {
        loading: false,
        interiors: action.payload.interiors,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case interiorConstants.INTERIOR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
