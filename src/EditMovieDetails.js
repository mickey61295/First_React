import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { API } from './global'
import * as yup from 'yup'
import { useFormik } from 'formik'

const movieValidationSchema = yup.object({
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

export function EditMovieDetails() {
	const { id } = useParams()
	const [movie, setMovie] = useState()
	useEffect(() => {
		fetch(`${API}/${id}`)
			.then((data) => data.json())
			.then((data) => setMovie(data))
	}, [id])

	return movie ? <EditMovieForm movie={movie} /> : 'Loading...'
}

function EditMovieForm({ movie }) {
	const id = movie.id
	const navigate = useNavigate()
	const formik = useFormik({
		initialValues: {
			name: movie.name,
			poster: movie.poster,
			rating: movie.rating,
			summary: movie.summary,
			trailer: movie.trailer,
		},
		validationSchema: movieValidationSchema,
		onSubmit: (values) => {
			fetch(`${API}/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			})
				.then((data) => data.json())
				.then(() => navigate('/movies'))
		},
	})
	return (
		<form onSubmit={formik.handleSubmit} className="AddMovie">
			<input
				className="add-movie-input"
				name="name"
				value={formik.values.name}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				placeholder="Enter a movie name"
			/>
			<span className="error">{formik.touched.name && formik.errors.name}</span>
			<input
				className="add-movie-input"
				name="poster"
				value={formik.values.poster}
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
				value={formik.values.rating}
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
				value={formik.values.summary}
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
				value={formik.values.trailer}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				placeholder="Enter a trailer url"
			/>
			<span className="error">
				{formik.touched.trailer && formik.errors.trailer}
			</span>
			<Button type="submit" color="success" variant="contained">
				Save
			</Button>
		</form>
	)
}
