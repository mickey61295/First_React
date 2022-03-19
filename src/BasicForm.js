import { useFormik } from 'formik'
import * as yup from 'yup'

const formValidationSchema = yup.object({
	password: yup
		.string()
		.min(8, 'Password must be at least 8 characters long')
		.max(12, 'Password must be at most 12 characters long')
		.required('Password is required'),
	email: yup
		.string()
		.min(5, 'Email must be minimum 5 characters')
		.required('Email is required'),
})

export function BasicForm() {
	const formik = useFormik({
		initialValues: { email: '', password: '' },
		validationSchema: formValidationSchema,
		onSubmit: (values) => {
			console.log(values)
			formik.resetForm()
		},
	})
	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<input
					value={formik.values.email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					type="email"
					name="email"
					placeholder="email"
				/>
				<br />
				{formik.errors.email}
				<br />
				<input
					value={formik.values.password}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					type="password"
					name="password"
					placeholder="password"
				/>
				<br />
				{formik.touched.password && formik.errors.password}
				<br />
				<button type="submit">Submit</button>
			</form>
		</>
	)
}
