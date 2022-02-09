import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {
  listInteriorDetails,
  updateInterior,
} from "../actions/interiorActions";
import { UPDATE_INTERIOR_RESET } from "../constants/interiorConstants";

const InteriorEdit = ({ match, history }) => {
  const interiorId = match.params.id;

  const [title, setTitle] = useState("");

  const [image, setImage] = useState("");

  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const { interiorDetails } = useSelector((state) => state);
  const { loading, error, interior } = interiorDetails;

  const interiorState = useSelector((state) => state.updateInterior);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = interiorState;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UPDATE_INTERIOR_RESET });
      history.push("/admin/interiorlist");
    } else {
      if (!interior.title || interior._id !== interiorId) {
        dispatch(listInteriorDetails(interiorId));
      } else {
        setTitle(interior.title);
        setImage(interior.image);
      }
    }
  }, [dispatch, history, interiorId, interior, successUpdate]);

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

      const { data } = await axios.post("/api/uploads", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateInterior({
        _id: interiorId,
        title,
        image,
      })
    );
  };

  return (
    <div style={{ marginTop: "120px", padding: "20px" }}>
      <Link to="/admin/interiorlist" className="btn btn-light">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Interior</h1>
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

export default InteriorEdit;
