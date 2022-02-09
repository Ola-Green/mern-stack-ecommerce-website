import React, { useState } from "react";

export const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }

    setKeyword("");
  };

  return (
    <section className="search-bar">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <form onSubmit={submitHandler} className="search-bar-form">
              <div className="p-1 bg-light shadow-sm search-contain">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-0 bg-light"
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search favorite products ..."
                  />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-link">
                      <i className="fas fa-search fa-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
