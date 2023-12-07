import * as yup from "yup";

export const adminSchema = yup.object().shape({
  name: yup.object().shape({
    firstName: yup.string().required("First Name is Required"),
    middleName: yup.string().optional(),
    lastName: yup.string().required("Last Name is Required"),
  }),
  email: yup.string().email().required("Email is Required"),
  password: yup.string().min(6).max(32).required(),
});
