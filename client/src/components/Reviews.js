import React, { useEffect, useState } from 'react';

function Reviews() {
    const [reviews, setReviews] = useState(null)

    useEffect(() => {
        fetch('/reviews')
        .then(resp => resp.json())
        .then(reviews => console.log(reviews))
    }, [])

    const renderedReviews = reviews.map((review) => {
        return (
            <div className='result'>

            </div>
        )
    })

    return (
        <div className='results'>
            {renderedReviews}
        </div>
    )
}

export default Reviews;