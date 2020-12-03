import React from "react";
import "./OwnerForm.scss";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";

export default function OwnerForm({ setShowModal, currentOwner, refetch }) {
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: {
      owner: currentOwner || "",
    },
    validationSchema: Yup.object({
      owner: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      try {
        await updateUser({
          variables: {
            input: formData,
          },
        });

        refetch();
        setShowModal(false);
      } catch (error) {
        toast.error("Error al actualizar al dueño");
      }
    },
  });

  return (
    <Form className="owner-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        placeholder="Dinos quién es tu humano"
        name="owner"
        value={formik.values.owner}
        onChange={formik.handleChange}
        error={formik.errors.owner && true}
      />

      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
}
