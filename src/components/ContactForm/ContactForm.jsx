import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";

export default function ContactForm() {
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    number: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Must be at least 3 characters")
      .max(50, "Must be 50 characters or less")
      .required("Required"),
    number: Yup.string()
      .matches(
        /^\+380\d{9}$/,
        "Phone number must be in the format: +380XXXXXXXXX"
      )
      .required("Required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact(values));
    resetForm();
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <Form className={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" className={styles.input} />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="number">Number</label>
            <Field name="number" type="text" className={styles.input} />
            <ErrorMessage
              name="number"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>
              Add contact
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
