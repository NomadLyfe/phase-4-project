import React from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function NewReview() {
    const { restaurantName } = useParams();
    
    const formSchema = yup.object().shape({

    })

    const formik = useFormik({
        initialValues: {

        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('')
        }
    })

    return (
        <div className='form'>
            <form>
                hello
            </form>
        </div>
    )
}

export default NewReview;