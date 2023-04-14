import * as Yup from "yup";

export const registerFormSchema = Yup.object().shape({
  name: Yup.string().required("Porfavor digite su nombre"),
  email: Yup.string().required("Porfavor digite su email"),
  password: Yup.string().required("Porfavor digite su contraseña"),
  re_password: Yup.string()
    .required("Confirme su contraseña")
    .oneOf(
      [Yup.ref("password"), null || ""],
      "Las contraseñas deben coincidir"
    ),
});
