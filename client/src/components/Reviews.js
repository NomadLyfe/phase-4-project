import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function Reviews({ history, user }) {
    const [reviews, setReviews] = useState(null);
    const { restaurantName, address } = useParams();

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

    function handleClick() {
        if (user) {
            history.push(`/${restaurantName}/${address}/newreview`)
        } else {
            history.push('/login')
        }
    }

    return (
        <div className='results'>
            <h1>Reviews for {restaurantName}</h1>
            <button onClick={handleClick}>Leave a review</button>
            {reviews ? renderedReviews : <h3>No reviews yet, be the first to leave one!</h3>}
        </div>
    )
}

export default Reviews;