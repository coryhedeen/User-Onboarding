import React from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({errors, touched, values}) => {
  return(
    <Form>
      <Field type="text" name="name" placeholder="name"/>
      <Field type="email" name="email" placeholder="email"/>
      <Field type="password" name="password" placeholder="password"/>
      <label>
          Terms Of Service
          <Field
            type="checkbox"
            name="termsOfService"
            checked={values.termsOfService}
          />
        <span className="checkmark"/>
      </label>
      <button type="submit">Submit</button>
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

  handleSubmit(values) {
    console.log("submit", values)

  }
})(UserForm);

export default FormikUserForm;
