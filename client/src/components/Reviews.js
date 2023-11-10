import React, { useEffect, useState } from 'react';

function Reviews() {
    const [reviews, setReviews] = useState(null)

    useEffect(() => {
        fetch('/reviews').then(resp => resp.json()).then(reviews => setReviews(reviews))
    }, [])
    
    let renderedReviews = null
    if (reviews) {
        renderedReviews = reviews.map((review) => {
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
        })
    }

    return (
        <div className='results'>
            <h1>Reviews for {}</h1>
            {renderedReviews}
        </div>
    )
}

export default Reviews;