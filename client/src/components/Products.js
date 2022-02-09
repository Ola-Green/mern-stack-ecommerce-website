import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { listProducts } from "../actions/productActions";
import { ProductCard } from "./product/productcard/index";

import Paginate from "./Paginate";
import Message from "./Message";
import Loader from "./Loader";

export const Products = ({ cat, filters, match }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const { productList } = useSelector((state) => state);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, cat));
  }, [dispatch, keyword, pageNumber, cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {cat
              ? filteredProducts.map((item) => (
                  <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                    <ProductCard product={item} match={match} />
                  </Col>
                ))
              : products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <ProductCard product={product} match={match} />
                  </Col>
                ))}
          </Row>

          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};
