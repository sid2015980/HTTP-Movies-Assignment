import React from "react";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";

import axios from "axios";

const MovieAdd = ({ setMovieList }) => {
  const history = useHistory();
  return (
    <div className="add-form">
      <Formik
        initialValues={{ title: "", director: "", metascore: "", stars: [] }}
        onSubmit={(values, { resetForm }) => {
          const { title, director, metascore, stars } = values;
          const arr = stars.split(",");
          const obj = {
            title,
            director,
            metascore,
            stars: arr,
          };
          axios
            .post("http://localhost:5003/api/movies", obj)
            .then((res) => {
              setMovieList(res.data);
              history.push("/");
            })
            .catch((err) => {
              console.log(err);
            });

          resetForm();
        }}
      >
        {() => (
          <Form>
            <label htmlFor="title">
              <Field type="text" name="title" id="title" placeholder="title" />
            </label>
            <label htmlFor="director">
              <Field
                type="text"
                name="director"
                id="director"
                placeholder="director"
              />
            </label>
            <label htmlFor="metascore">
              <Field
                type="number"
                name="metascore"
                id="metascore"
                placeholder="metascore"
              />
            </label>
            <label htmlFor="stars">
              <Field type="text" name="stars" id="stars" placeholder="stars" />
            </label>
            <button type="submit">add</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MovieAdd;
