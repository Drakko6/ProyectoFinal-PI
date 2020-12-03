import React, { useCallback, useState } from "react";
import { Modal, Icon, Button, Dimmer, Loader, Form } from "semantic-ui-react";
import "./ModalUpload.scss";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { PUBLISH } from "../../../gql/post";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";

export default function ModalUpload({ show, setShow }) {
  const isMovil = useMediaQuery({ query: "(max-width: 600px)" });

  const [fileUpload, setFileUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");

  const [publish] = useMutation(PUBLISH);

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFileUpload({
      type: "image",
      file,
      preview: URL.createObjectURL(file),
    });
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop, //le pasa la imagen automaticamente
  });

  const onCLose = () => {
    setIsLoading(false);
    setFileUpload(null);
    setShow(false);
    setText("");
  };

  const onPublish = async () => {
    try {
      setIsLoading(true);
      const result = await publish({
        variables: {
          input: {
            file: fileUpload.file,
            text: text,
          },
        },
      });
      const { data } = result;
      if (!data.publish.status) {
        toast.warning("Error en la publicación");
        isLoading(false);
      } else {
        onCLose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal size="small" open={show} onClose={onCLose} className="modal-upload">
      <Form className="post-form">
        <Form.Input
          placeholder="Escribe algo breve sobre tu foto"
          name="post-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          // value={formik.values.comment}
          // onChange={formik.handleChange}
          // error={formik.errors.comment && true}
        />
      </Form>

      <div
        {...getRootProps()}
        className="dropzone"
        style={fileUpload && { border: 0 }}
      >
        {!fileUpload && (
          <>
            <Icon name="cloud upload" />

            {isMovil ? <p>Agregar foto</p> : <p>Arrasta tu foto aquí</p>}
            <input {...getInputProps()} />
          </>
        )}
      </div>

      {fileUpload?.type === "image" && (
        <div
          className="image"
          style={{ backgroundImage: `url("${fileUpload.preview}")` }}
        />
      )}

      {fileUpload && (
        <Button className="btn-upload  btn-action" onClick={onPublish}>
          Publicar
        </Button>
      )}

      {isLoading && (
        <Dimmer active className="publishing">
          <Loader />
          <p>Publicando...</p>
        </Dimmer>
      )}
    </Modal>
  );
}
