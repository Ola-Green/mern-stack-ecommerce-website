import * as categoryConstants from "../constants/categoryConstants";

export const categoryList = (state = { categories: [] }, action) => {
  switch (action.type) {
    case categoryConstants.CATEGORY_LIST_REQUEST:
      return { loading: true, categories: [] };
    case categoryConstants.CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        categories: action.payload.categories,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case categoryConstants.CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryDetails = (state = { category: {} }, action) => {
  switch (action.type) {
    case categoryConstants.CATEGORY_DETAILS_REQUEST:
      return { ...state, loading: true };
    case categoryConstants.CATEGORY_DETAILS_SUCCESS:
      return { loading: false, category: action.payload };
    case categoryConstants.CATEGORY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteCategory = (state = {}, action) => {
  switch (action.type) {
    case categoryConstants.DELETE_CATEGORY_REQUEST:
      return { loading: true };
    case categoryConstants.DELETE_CATEGORY_SUCCESS:
      return { loading: false, success: true };
    case categoryConstants.DELETE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createCategory = (state = {}, action) => {
  switch (action.type) {
    case categoryConstants.CREATE_CATEGORY_REQUEST:
      return { loading: true };
    case categoryConstants.CREATE_CATEGORY_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case categoryConstants.CREATE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case categoryConstants.CREATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const updateCategory = (state = { category: {} }, action) => {
  switch (action.type) {
    case categoryConstants.UPDATE_CATEGORY_REQUEST:
      return { loading: true };
    case categoryConstants.UPDATE_CATEGORY_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case categoryConstants.UPDATE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case categoryConstants.UPDATE_CATEGORY_RESET:
      return { category: {} };
    default:
      return state;
  }
};

export const getCategoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case categoryConstants.GET_CATEGORY_REQUEST:
      return { loading: true, categories: [] };

    case categoryConstants.GET_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: true,
        categories: action.payload,
      };
    case categoryConstants.GET_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
