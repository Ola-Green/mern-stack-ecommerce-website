import React from "react";
import { Link } from "react-router-dom";

export const Carousel = () => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          className="active"
        ></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>

      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="/images/5.jpg"
            className="d-block w-100"
            alt="First Slide"
          />

          <div className="carousel-caption d-none d-md-block">
            <h5
              className="animated bounceInRight"
              style={{ animationDelay: "1s" }}
            >
              Creative Agency
            </h5>
            <p
              className="animated bounceInLeft"
              style={{ animationDelay: "2s",color: "#f3f3f3" }}
            >
              Make your fashion ideas and dreams come alive at Kaiso Clothing
              
            </p>
            <p
              className="animated bounceInRight"
              style={{ animationDelay: "3s" }}
            >
              <Link to="/about">More Info</Link>
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="/images/2.jpg"
            alt="Second Slide"
            className="d-block w-100"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5
              className="animated slideInDown"
              style={{ animationDelay: "1s" }}
            >
              Training Institute
            </h5>
            <p className="animated fadeInUp" style={{ animationDelay: "2s" }}>
              Learn Tailoring and Dressmaking in our six months, certified training program starting in February 2022
            </p>
            <p className="animated zoomIn" style={{ animationDelay: "3s",  }}>
              <a href="/about">More Info</a>
            </p>
          </div>
        </div>

        <div className="carousel-item">
          <img
            src="/images/3.jpg"
            alt="Third Slide"
            className="d-block w-100"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5 className="animated zoomIn" style={{ animationDelay: "1s" }}>
              Modelling Agency
            </h5>
            <p className="animated fadeInLeft" style={{ animationDelay: "2s", color: "#f3f3f3" }}>
              Attend our modelling auditions and stand a chance to model some of our collections in our upcoming events.
            </p>
            <p className="animated zoomIn" style={{ animationDelay: "3s" }}>
              <a href="/about">More Info</a>
            </p>
          </div>
        </div>
      </div>
      <a
        href="#carouselExampleIndicators"
        className="carousel-control-prev"
        role="button"
        data-slide="prev"
      >
        {/* <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span> */}
        <span className="sr-only">Previous</span>
      </a>

      <a
        href="#carouselExampleIndicators"
        className="carousel-control-next"
        role="button"
        data-slide="next"
      >
        {/* <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span> */}
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};
