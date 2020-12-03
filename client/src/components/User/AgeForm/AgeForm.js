import React from "react";
import "./AgeForm.scss";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";

export default function AgeForm({
  setShowModal,
  currentYears,
  currentMonths,
  refetch,
}) {
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: {
      years: currentYears || null,
      months: currentMonths || null,
    },
    validationSchema: Yup.object({
      years: Yup.number(),
      months: Yup.number(),
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
        toast.error("Error al actualizar la edad");
      }
    },
  });

  return (
    <Form className="breed-form" onSubmit={formik.handleSubmit}>
      <Form.Field>
        <label>Años</label>
        <input
          type="number"
          max={20}
          name="years"
          value={formik.values.years}
          onChange={formik.handleChange}
        />
      </Form.Field>

      <Form.Field>
        <label>Meses</label>
        <input
          type="number"
          max={12}
          name="months"
          value={formik.values.months}
          onChange={formik.handleChange}
        />
      </Form.Field>

      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
}
