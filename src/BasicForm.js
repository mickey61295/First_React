import { useFormik } from "formik";
import * as yup from "yup";

const formValidationSchema = yup.object({
    email: yup.string().min(5),
    password: yup.string().min(7, "Password must be at least 7 characters").required("Password is required"),

});

export function BasicForm() {
    const formik = useFormik({
        initialValues: {
            email:"",
            password:"",
        },
        validationSchema: formValidationSchema,
        onSubmit: (values) => {
            console.log("onSubmit",values);
        }
    });
  return (
        <form onSubmit={formik.handleSubmit}>
            <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? formik.errors.email : null}
            <br />
            <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? formik.errors.password : null}
            <br />
            <button type="submit">Submit</button>
        </form>
  );
}
