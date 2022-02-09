import axios from "axios";
import * as interiorConstants from "../constants/interiorConstants";
import { logout } from "./userActions";

export const interiorCreate = () => async (dispatch, getState) => {
  try {
    dispatch({ type: interiorConstants.CREATE_INTERIOR_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/interiors/interior`, {}, config);

    dispatch({
      type: interiorConstants.CREATE_INTERIOR_SUCCESS,
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
      type: interiorConstants.CREATE_INTERIOR_FAIL,
      payload: message,
    });
  }
};

export const getInteriors = () => async (dispatch) => {
  try {
    dispatch({ type: interiorConstants.GET_INTERIOR_REQUEST });

    const { data } = await axios.get("/api/interiors/interior");

    dispatch({ type: interiorConstants.GET_INTERIOR_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: interiorConstants.GET_INTERIOR_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateInterior = (inte) => async (dispatch, getState) => {
  try {
    dispatch({
      type: interiorConstants.UPDATE_INTERIOR_REQUEST,
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
      `/api/interiors/interior/${inte._id}`,
      inte,
      config
    );

    dispatch({
      type: interiorConstants.UPDATE_INTERIOR_SUCCESS,
      payload: data,
    });
    dispatch({
      type: interiorConstants.INTERIOR_DETAILS_SUCCESS,
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
      type: interiorConstants.UPDATE_INTERIOR_FAIL,
      payload: message,
    });
  }
};

export const interiorDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: interiorConstants.DELETE_INTERIOR_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/interiors/interior/${id}`, config);

    dispatch({
      type: interiorConstants.DELETE_INTERIOR_SUCCESS,
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
      type: interiorConstants.DELETE_INTERIOR_FAIL,
      payload: message,
    });
  }
};

export const listInteriorDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: interiorConstants.INTERIOR_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/interiors/interior/${id}`);

    dispatch({
      type: interiorConstants.INTERIOR_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: interiorConstants.INTERIOR_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listInteriors =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: interiorConstants.INTERIOR_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/interiors/listinterior?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: interiorConstants.INTERIOR_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: interiorConstants.INTERIOR_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
