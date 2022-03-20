import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { API } from './global'
import * as yup from 'yup'
import { useFormik } from 'formik'

const movieValidationSchema = yup.object({
	email: yup
		.string()
		.min(4, 'Atleast 4 characters')
		.matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i),
	name: yup.string().required('Name is required'),
	poster: yup
		.string()
		.min(4, 'Poster must be minimum 4 characters')
		.required('Poster is required'),
	rating: yup
		.number()
		.typeError('Rating must be a number')
		.min(0, 'Rating must be at least 0')
		.max(10, 'Rating cannot be greater than 10')
		.required('Rating is required'),
	summary: yup
		.string()
		.min(20, 'Summary must be at least 20 characters long')
		.required('Summary is required'),
	trailer: yup
		.string()
		.min(4, 'Trailer must be minimum 4 characters')
		.required('Trailer is required'),
})

export function AddMovie() {
	const createMovie = (values) => {
		const newMovie = values
		fetch(`${API}`, {
			method: 'POST',
			body: JSON.stringify(newMovie),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((data) => data.json())
			.then(() => formik.resetForm())
			.then(() => navigate('/movies'))
	}
	const navigate = useNavigate()
	const formik = useFormik({
		initialValues: {
			name: '',
			poster: '',
			rating: '',
			summary: '',
			trailer: '',
		},
		validationSchema: movieValidationSchema,
		onSubmit: (values) => {
			createMovie(values)
		},
	})

	return (
		<form onSubmit={formik.handleSubmit} className="AddMovie">
			<input
				className="add-movie-input"
				name="name"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				placeholder="Enter a movie name"
			/>
			<span className="error">{formik.touched.name && formik.errors.name}</span>
			<input
				className="add-movie-input"
				name="poster"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				placeholder="Enter a poster url"
			/>
			<span className="error">
				{formik.touched.poster && formik.errors.poster}
			</span>
			<input
				className="add-movie-input"
				name="rating"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				placeholder="Enter a rating"
			/>
			<span className="error">
				{formik.touched.rating && formik.errors.rating}
			</span>
			<input
				className="add-movie-input"
				name="summary"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				placeholder="Enter a summary"
			/>
			<span className="error">
				{formik.touched.summary && formik.errors.summary}
			</span>
			<input
				className="add-movie-input"
				name="trailer"
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				placeholder="Enter a trailer url"
			/>
			<span className="error">
				{formik.touched.trailer && formik.errors.trailer}
				<br />
			</span>
			<Button type="submit" variant="contained">
				Add Movie
			</Button>
		</form>
	)
}
