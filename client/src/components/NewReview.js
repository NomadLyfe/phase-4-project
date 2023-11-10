import React from 'react';
import { useFormik } from "formik";
import * as yup from "yup";

function NewReview() {
    
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
        <div className='result'>
            <form>
                hello
            </form>
        </div>
    )
}

export default NewReview;