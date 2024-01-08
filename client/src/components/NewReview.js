import React from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function NewReview({ history }) {
    const { restaurantName, address } = useParams();
    
    const formSchema = yup.object().shape({
        title: yup.string().required('Must enter title').max(20),
        stars: yup.number().positive().integer().required('Must enter number of stars').typeError('Please enter an Integer').max(5),
        review: yup.string().required('Must enter review').max(500)
    })

    const formik = useFormik({
        initialValues: {
            title: "",
            stars: 0,
            review: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            values.restaurant = restaurantName
            values.address = address
            fetch('/reviews', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2)
            }).then(resp => resp.json()).then(() => {
                history.push(`/${restaurantName}/${address}/reviews`)
            })
        }
    })

    return (
        <div className='form'>
            <form className='newreview'>
                <label id='title'>Create a title: </label>
				<input className='titleInput' type='text' name='title' onChange={formik.handleChange} value={formik.values.title} maxLength={50} placeholder='Maximum of 50 characters...' />
				<br />
				<label id='stars'>Enter number of stars (0 through 5): </label>
				<input className='starsInput' type='number' name='stars' onChange={formik.handleChange} value={formik.values.stars} min={0} max={5} />
				<br />
                <label id='review'>Enter your review: </label>
				<textarea className='reviewInput' name='review' onChange={formik.handleChange} value={formik.values.review} rows={5} maxLength={500} placeholder='Maximum of 500 characters...' />
                <br />
				<button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default NewReview;