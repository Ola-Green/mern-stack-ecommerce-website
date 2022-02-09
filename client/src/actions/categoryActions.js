import axios from "axios";
import * as categoryConstants from "../constants/categoryConstants";
import { logout } from "./userActions";

export const categoryCreate = () => async (dispatch, getState) => {
  try {
    dispatch({ type: categoryConstants.CREATE_CATEGORY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/categories/category`, {}, config);

    dispatch({
      type: categoryConstants.CREATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: categoryConstants.CREATE_CATEGORY_FAIL,
      payload: message,
    });
  }
};

export const listCategories =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: categoryConstants.CATEGORY_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/categories/category?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: categoryConstants.CATEGORY_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: categoryConstants.CATEGORY_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: categoryConstants.GET_CATEGORY_REQUEST });

    const { data } = await axios.get("/api/categories/listcategory");

    dispatch({ type: categoryConstants.GET_CATEGORY_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: categoryConstants.GET_CATEGORY_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateCategory = (cat) => async (dispatch, getState) => {
  try {
    dispatch({
      type: categoryConstants.UPDATE_CATEGORY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/categories/category/${cat._id}`,
      cat,
      config
    );

    dispatch({
      type: categoryConstants.UPDATE_CATEGORY_SUCCESS,
      payload: data,
    });
    dispatch({
      type: categoryConstants.CATEGORY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: categoryConstants.UPDATE_CATEGORY_FAIL,
      payload: message,
    });
  }
};

export const listCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: categoryConstants.CATEGORY_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/categories/category/${id}`);

    dispatch({
      type: categoryConstants.CATEGORY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: categoryConstants.CATEGORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const categoryDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: categoryConstants.DELETE_CATEGORY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/categories/category/${id}`, config);

    dispatch({
      type: categoryConstants.DELETE_CATEGORY_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: categoryConstants.DELETE_CATEGORY_FAIL,
      payload: message,
    });
  }
};
