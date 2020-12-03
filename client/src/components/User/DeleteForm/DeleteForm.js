import React from "react";
import { Form, Button } from "semantic-ui-react";
import "./DeleteForm.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../../../gql/user";
import { toast } from "react-toastify";

export default function DeleteForm({ currentUser, setShowModal, logout }) {
  const [deleteUser] = useMutation(DELETE_USER);

  const formik = useFormik({
    initialValues: {
      user: "",
    },
    validationSchema: Yup.object({
      user: Yup.string().oneOf([currentUser]),
    }),
    onSubmit: async () => {
      try {
        await deleteUser();
        logout();
      } catch (error) {
        toast.error("Error al borrar el usuario");
      }
    },
  });

  return (
    <Form className="delete-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        placeholder="Escribe tu nombre de usuario para confirmar"
        name="user"
        value={formik.values.user}
        onChange={formik.handleChange}
        error={formik.errors.user && true}
      />

      <Button type="submit" className="btn-submit btn-danger">
        Eliminar Usuario
      </Button>
    </Form>
  );
}
