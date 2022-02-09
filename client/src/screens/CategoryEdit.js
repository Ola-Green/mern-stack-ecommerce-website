import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {
  listCategoryDetails,
  updateCategory,
} from "../actions/categoryActions";
import { UPDATE_CATEGORY_RESET } from "../constants/categoryConstants";

const CategoryEdit = ({ match, history }) => {
  const categoryId = match.params.id;

  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");

  const [image, setImage] = useState("");

  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const { categoryDetails } = useSelector((state) => state);
  const { loading, error, category } = categoryDetails;

  const catState = useSelector((state) => state.updateCategory);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = catState;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UPDATE_CATEGORY_RESET });
      history.push("/admin/categorylist");
    } else {
      if (!category.title || category._id !== categoryId) {
        dispatch(listCategoryDetails(categoryId));
      } else {
        setTitle(category.title);
        setCat(category.cat);
        setImage(category.image);
      }
    }
  }, [dispatch, history, categoryId, category, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/uploadCategory", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCategory({
        _id: categoryId,
        title,
        cat,
        image,
      })
    );
  };

  return (
    <div style={{ marginBottom: "50px" }}>
      <Link to="/admin/categorylist" className="btn btn-light mx-3 mt-4 px-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Category</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="cat">
              <Form.Label>Cat</Form.Label>
              <Form.Control
                type="cat"
                placeholder="Enter category name"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <div style={{ textAlign: "center" }}>
              <Button type="submit" className="btn-auth">
                Update
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default CategoryEdit;
