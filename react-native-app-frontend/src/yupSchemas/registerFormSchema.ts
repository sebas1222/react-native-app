import * as Yup from "yup";

export const registerFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Porfavor digite su nombre")
    .min(3, "El nombre debe tener almenos 3 caracteres"),
  email: Yup.string()
    .required("Porfavor digite su email")
    .min(10, "El nombre debe tener almenos 10 caracteres"),
  password: Yup.string()
    .required("Porfavor digite su contraseña")
    .min(5, "La contraseña debe tener almenos 5 caracteres"),
  re_password: Yup.string()
    .required("Confirme su contraseña")
    .oneOf(
      [Yup.ref("password"), null || ""],
      "Las contraseñas deben coincidir"
    ),
});
