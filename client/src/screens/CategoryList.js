import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";

import {
  listCategories,
  categoryDelete,
  categoryCreate,
} from "../actions/categoryActions";
import { CREATE_CATEGORY_RESET } from "../constants/categoryConstants";

const CategoryList = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const { categoryList } = useSelector((state) => state);
  const { loading, error, categories, page, pages } = categoryList;

  const { deleteCategory } = useSelector((state) => state);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deleteCategory;

  const { createCategory } = useSelector((state) => state);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    category: createdCategory,
  } = createCategory;

  const { userLogin } = useSelector((state) => state);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: CREATE_CATEGORY_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/category/${createdCategory._id}/edit`);
    } else {
      dispatch(listCategories("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdCategory,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(categoryDelete(id));
    }
  };

  const createCategoryHandler = () => {
    dispatch(categoryCreate());
  };

  return (
    <div style={{ marginTop: "50px", marginBottom: "50px", padding: "20px" }}>
      <Row className="align-items-center">
        <Col>
          <h1>Categories</h1>
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
            onClick={createCategoryHandler}
          >
            <i className="fas fa-plus fa-lg" style={{ cursor: "pointer" }}></i>
            Create Category
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
                <th>CAT</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category._id}</td>
                  <td>{category.title}</td>
                  <td>{category.cat}</td>
                  <td>
                    <LinkContainer to={`/admin/category/${category._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(category._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
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

export default CategoryList;
