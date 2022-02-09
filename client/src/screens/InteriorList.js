import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";

import {
  listInteriors,
  interiorDelete,
  interiorCreate,
} from "../actions/interiorActions";
import { CREATE_INTERIOR_RESET } from "../constants/interiorConstants";

const InteriorList = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const { interiorList } = useSelector((state) => state);
  const { loading, error, interiors, page, pages } = interiorList;

  const { deleteInterior } = useSelector((state) => state);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deleteInterior;

  const { createInterior } = useSelector((state) => state);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    interior: createdInterior,
  } = createInterior;

  const { userLogin } = useSelector((state) => state);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: CREATE_INTERIOR_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/interior/${createdInterior._id}/edit`);
    } else {
      dispatch(listInteriors("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdInterior,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this interior?")) {
      dispatch(interiorDelete(id));
    }
  };

  const createInteriorHandler = () => {
    dispatch(interiorCreate());
  };

  return (
    <div style={{ marginTop: "120px", padding: "20px" }}>
      <Row className="align-items-center">
        <Col>
          <h1>Interiors</h1>
        </Col>
        <Col className="text-right">
          <Button
            style={{
              transition: "all ease-in-out 0.4s",
              fontWeight: "500",
              background: "lightslategray",
              color: "white",
              cursor: "pointer",
              marginRight: "10px",
            }}
            className="my-3"
            onClick={createInteriorHandler}
          >
            <i className="fas fa-plus fa-lg" style={{ cursor: "pointer" }}></i>
            Add Interior
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {interiors.map((interior) => (
                <tr key={interior._id}>
                  <td>{interior._id}</td>
                  <td>{interior.title}</td>

                  <td>
                    <LinkContainer to={`/admin/interior/${interior._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(interior._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </div>
  );
};

export default InteriorList;
