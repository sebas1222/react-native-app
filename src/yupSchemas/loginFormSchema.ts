import * as Yup from "yup";
export const loginFormSchema = Yup.object().shape({
  email: Yup.string().required("Porfavor digite su email."),
  password: Yup.string().required("Porfavor digite su contraseña."),
});
