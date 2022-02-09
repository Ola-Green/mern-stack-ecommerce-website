import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export const ActivateEmail = () => {
  const { activation_token } = useParams();

  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (activation_token) {
      const activateEmail = async () => {
        try {
          const res = await axios.post("/api/activate", { activation_token });
          setSuccess(res.data.msg);
        } catch (err) {
          err.response.data.msg && setErr(err.response.data.msg);
        }
      };

      activateEmail();
    }
  }, [activation_token]);

  return (
    <>
      {err && (
        <div className="jumbotron bg-danger text-white mt-5">
          <h1 className="display-4">OOPS!</h1>
          <p className="lead">{err}</p>
        </div>
      )}
      {success && (
        <div className="jumbotron bg-success text-white mt-5">
          <h1 className="display-4">Hello, There!</h1>
          <p className="lead">{success}</p>
          <hr className="my-4" />
          <p>Thanks for signing up to our commnunity.</p>
          <p className="lead">
            <Link className="btn btn-primary btn-lg" to="/login" role="button">
              PROCEED TO LOGIN PAGE
            </Link>
          </p>
        </div>
      )}
    </>
  );
};
