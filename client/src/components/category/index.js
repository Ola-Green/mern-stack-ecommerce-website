import React, { useEffect } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../actions/categoryActions";
import { Card } from "./card";
import "./hideScrollbar.css";

import "./globalStyles.css";

import useDrag from "./useDrag";
import Loader from "../Loader";
import Message from "../Message";

function Category() {
  const dispatch = useDispatch();

  const { getCategory } = useSelector((state) => state);

  const { categories, error, loading } = getCategory;

  const { dragStart, dragStop, dragMove } = useDrag();

  const handleDrag =
    ({ scrollContainer }) =>
    (ev) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <br />
          <h1 className = "category_title"
            
          >
            Categories
          </h1>
          <hr />

          <div onMouseLeave={dragStop} style={{ paddingTop: "20px" }}>
            <ScrollMenu
              onWheel={onWheel}
              onMouseDown={() => dragStart}
              onMouseUp={() => dragStop}
              onMouseMove={handleDrag}
            >
              {categories.map((category) => (
                <Card key={category._id} category={category} />
              ))}
            </ScrollMenu>
          </div>
        </>
      )}
    </>
  );
}
export default Category;

function onWheel(apiObj, ev) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}
