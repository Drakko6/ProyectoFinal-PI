import React from "react";
import "./BreedForm.scss";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";

export default function BreedForm({ setShowModal, currentBreed, refetch }) {
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: {
      breed: currentBreed || "",
    },
    validationSchema: Yup.object({
      breed: Yup.string().required(),
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
        toast.error("Error al actualizar la raza");
      }
    },
  });

  return (
    <Form className="breed-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        placeholder="Actualiza tu raza"
        name="breed"
        value={formik.values.breed}
        onChange={formik.handleChange}
        error={formik.errors.breed && true}
      />

      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
}
