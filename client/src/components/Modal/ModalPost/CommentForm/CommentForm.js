import React from "react";
import "./CommentForm.scss";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../../../gql/comment";

export default function CommentForm({ post }) {
  const [addComment] = useMutation(ADD_COMMENT);

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      try {
        await addComment({
          variables: {
            input: {
              idPost: post.id,
              comment: formData.comment,
            },
          },
        });
        formik.handleReset();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form className="comment-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        placeholder="Añade un comentario..."
        name="comment"
        value={formik.values.comment}
        onChange={formik.handleChange}
        error={formik.errors.comment && true}
      />
      <Button type="submit">Publicar</Button>
    </Form>
  );
}
