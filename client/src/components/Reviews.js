import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useFormik } from "formik";

function Reviews({ history, user }) {
    const [reviews, setReviews] = useState(null);
    const [page, setPage] = useState(0);
    const { restaurantName, address } = useParams();

    useEffect(() => {
        fetch('/reviews').then(resp => resp.json()).then(reviews => setReviews(reviews))
    }, [])
    
    let renderedReviews = null
    if (reviews) {
        renderedReviews = reviews.map((review, index) => {
            if (index >= page && index < (page + 20)) {
                return (
                    <div className='result' key={review.id}>
                        <div className='resultInfo'>
                            <h2>{review.title}</h2>
                            <h3><span className="star">{'\u2605'.repeat(review.stars)}</span>{'\u2606'.repeat(5 - review.stars)} {review.stars} stars</h3>
                            <h3>{review.review}</h3>
                            <h4> - {review.user.username}</h4>
                        </div>
                    </div>
                )
            }
        })
    }

    function handleClick() {
        if (user) {
            history.push(`/${restaurantName}/${address}/newreview`)
        } else {
            history.push('/login')
        }
    }

    const formik = useFormik({
        initialValues: {
            offset: page
        },
        validationSchema: null,
        onSubmit: (values) => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setPage(values.offset)

            /*fetch('/reviews').then(resp => resp.json()).then(reviews => {
                setPage(values.offset)
                setReviews(reviews)
                window.scrollTo({ top: 0, behavior: 'smooth' })
            })*/
        }
    });

    function onFormik(e) {
        if (e.target.textContent === 'Next Page') {
            formik.values.offset = page + 20
        } else {
            formik.values.offset = page - 20
        }
        formik.handleSubmit()
    }

    return (
        <div className='results'>
            <h1>Reviews for {restaurantName}</h1>
            <button className='pageChanger' onClick={handleClick}>Leave a review</button>
            <div className='reviews'>
                {reviews ? renderedReviews : <h3>No reviews yet, be the first to leave one!</h3>}
            </div>
            <div className='pageChangers'>
                {page > 0 ? <button className="pageChanger" type="submit" onClick={onFormik}>Previous Page</button> : null}
                {document.querySelectorAll('.result').length < 20 ? <button className="pageChanger" type="submit" onClick={onFormik}>Next Page</button> : null}
            </div>
        </div>
    )
}

export default Reviews;