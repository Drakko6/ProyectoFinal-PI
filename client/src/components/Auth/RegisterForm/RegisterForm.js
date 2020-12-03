import React, { useState } from "react";
import "./RegisterForm.scss";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import "../../../gql/user";
import { REGISTER } from "../../../gql/user";
import { toast } from "react-toastify";
import { estados } from "./estados";

// import logo from "../../../assets/png/instaclone.png";

const RegisterForm = ({ setShowLogin }) => {
  const states = estados.map((estado, index) => ({
    key: index,
    text: estado.name,
    value: estado.name,
  }));
  const [register] = useMutation(REGISTER);
  const [cities, setCities] = useState([]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),

      username: Yup.string()
        .matches(
          /^[a-zA-Z0-9-]*$/,
          "El nombre de usuario no puede tener espacios"
        )
        .required("El nombre de usuario es obligatorio"),
      email: Yup.string()
        .email("El correo no es válido")
        .required("El correo es obligatorio"),
      password: Yup.string()
        .required("La contraseña es obligatoria")
        .oneOf([Yup.ref("repeatPassword")], "Las contraseñas deben coincidir"),

      repeatPassword: Yup.string()
        .required("La contraseña es obligatoria")
        .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir"),
      state: Yup.string().required("El estado es obligatorio"),

      town: Yup.string().required("El municipio es obligatorio"),
    }),

    onSubmit: async (formData) => {
      try {
        const newUser = formData;
        delete newUser.repeatPassword;

        await register({
          variables: {
            input: newUser,
          },
        });
        toast.success("Usuario Registrado correctamente");
        toast.info("Revisa tu correo para confirmar tu cuenta");
        setShowLogin(true);
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    },
  });

  const onSelectState = (e, value) => {
    // setStateSelected(value);
    if (!value) {
      return;
    }
    let ciudades = estados.find((state) => state.name === value).states;

    ciudades = ciudades.map((ciudad, index) => ({
      key: index,
      text: ciudad,
      value: ciudad,
    }));
    setCities(ciudades);
  };

  const handleChange = (e, { name, value }) =>
    formik.setFieldValue(name, value);

  return (
    <>
      {/* <Image src={logo} className="logo-inicio" /> */}

      <h2 className="register-form-title">Únete a la comunidad de perritos</h2>
      <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          placeholder="Nombre"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name && true}
        />
        <Form.Input
          type="text"
          placeholder="Nombre de usuario"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.errors.username && true}
        />
        <Form.Input
          type="text"
          placeholder="Correo electronico"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email && true}
        />
        <Form.Input
          type="password"
          placeholder="Contraseña"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password && true}
        />
        <Form.Input
          type="password"
          placeholder="Repetir Contraseña"
          name="repeatPassword"
          onChange={formik.handleChange}
          value={formik.values.repeatPassword}
          error={formik.errors.repeatPassword && true}
        />
        {/* Aquí select de estados */}

        <Form.Dropdown
          clearable
          fluid
          search
          onChange={(e, { value, name }) => {
            handleChange(e, { name, value });
            onSelectState(e, value);
          }}
          name="state"
          value={formik.values.state}
          placeholder="Estado"
          options={states}
          selection
          error={formik.errors.estado && true}
        ></Form.Dropdown>

        {/* Aquí select de ciudades */}

        <Form.Dropdown
          clearable
          fluid
          search
          onChange={handleChange}
          name="town"
          value={formik.values.town}
          placeholder="Municipio"
          options={cities}
          selection
          error={formik.errors.ciudad && true}
        ></Form.Dropdown>

        <Button type="submit" className="btn-submit">
          Registrarse
        </Button>

        {/* <Button type="button" onClick={formik.handleReset}>
          Reiniciar Formulario
        </Button> */}
      </Form>
    </>
  );
};

function initialValues() {
  return {
    name: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    state: "",
    town: "",
  };
}

export default RegisterForm;
