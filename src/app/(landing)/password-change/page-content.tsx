// "use client";
// import withPageRequiredGuest from "@/services/auth/with-page-required-guest";
// import { useForm, FormProvider, useFormState } from "react-hook-form";
// import { useAuthResetPasswordService } from "@/services/api/services/auth";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useSnackbar } from "notistack";
// import { useRouter } from "next/navigation";
// import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
// import { useTranslation } from "@/services/i18n/client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// type PasswordChangeFormData = {
//   password: string;
//   passwordConfirmation: string;
// };

// const useValidationSchema = () => {
//   const { t } = useTranslation("password-change");

//   return yup.object().shape({
//     password: yup
//       .string()
//       .min(6, t("password-change:inputs.password.validation.min"))
//       .required(t("password-change:inputs.password.validation.required")),
//     passwordConfirmation: yup
//       .string()
//       .oneOf(
//         [yup.ref("password")],
//         t("password-change:inputs.passwordConfirmation.validation.match")
//       )
//       .required(
//         t("password-change:inputs.passwordConfirmation.validation.required")
//       ),
//   });
// };

// function FormActions() {
//   const { t } = useTranslation("password-change");
//   const { isSubmitting } = useFormState();

//   return (
//     <Button
//       variant="secondary"
//       color="primary"
//       type="submit"
//       disabled={isSubmitting}
//     >
//       {t("password-change:actions.submit")}
//     </Button>
//   );
// }

// function Form() {
//   const { enqueueSnackbar } = useSnackbar();
//   const fetchAuthResetPassword = useAuthResetPasswordService();
//   const { t } = useTranslation("password-change");
//   const validationSchema = useValidationSchema();
//   const router = useRouter();

//   const methods = useForm<PasswordChangeFormData>({
//     resolver: yupResolver(validationSchema),
//     defaultValues: {
//       password: "",
//     },
//   });

//   const { handleSubmit, setError } = methods;

//   const onSubmit = async (formData: PasswordChangeFormData) => {
//     const params = new URLSearchParams(window.location.search);
//     const hash = params.get("hash");
//     if (!hash) return;

//     const { data, status } = await fetchAuthResetPassword({
//       password: formData.password,
//       hash,
//     });

//     if (status === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
//       (Object.keys(data.errors) as Array<keyof PasswordChangeFormData>).forEach(
//         (key) => {
//           setError(key, {
//             type: "manual",
//             message: t(
//               `password-change:inputs.${key}.validation.server.${data.errors[key]}`
//             ),
//           });
//         }
//       );

//       return;
//     }

//     if (status === HTTP_CODES_ENUM.NO_CONTENT) {
//       enqueueSnackbar(t("password-change:alerts.success"), {
//         variant: "success",
//       });

//       router.replace("/sign-in");
//     }
//   };

//   return (
//     <FormProvider {...methods}>
//       <div>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div>
//             <div>
//               <h1>{t("password-change:title")}</h1>
//             </div>
//             <div>
//               <Input
//                 name="password"
//                 // label={t("password-change:inputs.password.label")}
//                 type="password"
//               />
//             </div>
//             <div>
//               <Input
//                 name="passwordConfirmation"
//                 // label={t("password-change:inputs.passwordConfirmation.label")}
//                 type="password"
//               />
//             </div>

//             <div>
//               <FormActions />
//             </div>
//           </div>
//         </form>
//       </div>
//     </FormProvider>
//   );
// }

// function PasswordChange() {
//   return <Form />;
// }

// export default withPageRequiredGuest(PasswordChange);
