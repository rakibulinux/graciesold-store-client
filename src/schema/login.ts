import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is Required"),
  password: yup.string().min(6).max(32).required(),
});
export const registerSchema = yup.object().shape({
  name: yup.string().required("Your Full Name is Required"),
  email: yup.string().email().required("Email is Required"),
  role: yup.string().optional(),
  password: yup.string().min(6).max(32).required(),
});
