import React, { useEffect, useState } from "react";
import image from '../images/fine_dining_1.jpg';

function Results({ results, history }) {
    const [restaurants, setRestaurants] = useState(null)

    useEffect(() => {
        fetch('/restaurants')
        .then((resp) => {
            if (resp.status === 200) {
                resp.json().then(data => setRestaurants(data))
            }
        })
        fetch('/rest', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json()).then(() => null)
    }, [])
    const renderedResultList = results.map((result, index) => {
        if (restaurants) {
            const matchedRestaurant = restaurants.find((restaurant) => {
                return restaurant.name === result.name && restaurant.address === result.location.display_address[0]
            })
            let averageStars = null
            let reviews = null
            if (matchedRestaurant && matchedRestaurant.reviews) {
                const totalStars = matchedRestaurant.reviews.reduce((total, review) => total + review.stars, 0)
                reviews = matchedRestaurant.reviews.length
                averageStars = Math.round((totalStars/reviews * 10))/10
            }
            return (
                <div className="result" key={result.id}>
                    <img className="resultPic" alt="Restaurant" src={image} />
                    <div className="resultInfo">
                        <h2>{index + 1}. <span>{result.name}</span></h2>
                        <h3>{result.display_phone}</h3>
                        <h3 onClick={onRestaurantClick} className="restuarantReviews"><span className="star">{'\u2605'.repeat(matchedRestaurant ? Math.round(averageStars) : 0)}</span>{'\u2606'.repeat(matchedRestaurant ? 5 - Math.round(averageStars) : 5)} {matchedRestaurant ? averageStars : 0} stars ( {matchedRestaurant ? reviews : 0} Reviews )</h3>
                        <div className="address" >{result.location.display_address.map((row, i) => <h4 key={i}>{row}</h4>)}</div>
                        <button onClick={onRestaurantClick} className="restuarantReviews">Reviews</button>
                        <button onClick={onNewReviewClick}>Leave a review</button>
                    </div>
                </div>
            )
        } else {
            return null
        }
    })

    function onRestaurantClick(e) {
        fetch('/rest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: e.target.parentNode.querySelector('h2 span').textContent, address: e.target.parentNode.querySelectorAll('h4')[0].textContent})
        }).then(resp => resp.json()).then(() => history.push('/reviews'))
    }

    function onNewReviewClick() {
        history.push('/newreview')
    }

    return (
        <div className="results">
            <h1>Here are your results!!</h1>
            {renderedResultList}
        </div>
    );
}

export default Results;