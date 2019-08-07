import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({errors, touched, values, status}) => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    if (status) {
      setUsers([...users, status])
    }
  }, [status]);

  return(
    <Form className="form">
      <Field className="typeField" type="text" name="name" placeholder="name"/>
      {touched.name && errors.name && (
          <p className="error">{errors.name}</p>
        )}
      <Field className="typeField" type="email" name="email" placeholder="email"/>
      {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
      <Field className="typeField" type="password" name="password" placeholder="password"/>
      <label>
          Terms Of Service
          <Field
            type="checkbox"
            name="termsOfService"
            checked={values.termsOfService}
          />
        <span />
      </label>

      <button type="submit">Submit</button>
      {users.map(user => { return <h1>{user.name}</h1>})}
    </Form>
  )
}

const FormikUserForm = withFormik({
  mapPropsToValues(values) {
    return {
      name: values.name || "",
      email: values.email || "",
      password: values.password || "",
      termsOfService: values.termsOfService || false,

    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
  }),

  handleSubmit(values, { setStatus }) {
    console.log("submit", values)
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => setStatus(res.data))
      .catch(err => console.log(err))
  }
})(UserForm);

export default FormikUserForm;
