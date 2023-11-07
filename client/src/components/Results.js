import React, { useEffect, useState } from "react";
import image from '../images/fine_dining_1.jpg';

function Results({ results }) {
    const [restaurants, setRestaurants] = useState(null)
    useEffect(() => {
        fetch('/restaurants')
        .then((resp) => {
            if (resp.status === 200) {
                resp.json().then(data => setRestaurants(data))
            }
        })
    }, [])
    const renderedResultList = results.map((result, index) => {
        if (restaurants) {
            const matchedRestaurant = restaurants.find((restaurant) => {
                return restaurant.name == result.name && restaurant.address == result.location.display_address[0]
            })
            let averageStars = null
            let reviews = null
            if (matchedRestaurant && matchedRestaurant.reviews) {
                const totalStars = matchedRestaurant.reviews.reduce((total, review) => total + review.stars, 0)
                reviews = matchedRestaurant.reviews.length
                averageStars = Math.round((totalStars/reviews * 10))/10
            }
            console.log(averageStars)
            return (
                <div className="result" key={result.id}>
                    <img className="resultPic" src={image} />
                    <div className="resultInfo">
                        <h2>{index + 1}. {result.name}</h2>
                        <h3>{result.display_phone}</h3>
                        <h3><span className="star">{'\u2605'.repeat(matchedRestaurant ? Math.round(averageStars) : 0)}</span>{'\u2606'.repeat(matchedRestaurant ? 5 - Math.round(averageStars) : 5)} {matchedRestaurant ? averageStars : 0} stars ( {matchedRestaurant ? reviews : 0} Reviews )</h3>
                        {result.location.display_address.map((row, i) => <h4 key={i}>{row}</h4>)}
                        <button>Leave a review</button>
                    </div>
                </div>
            )
        }
    })

    return (
        <div className="results">
            <h1>Here are your results!!</h1>
            {renderedResultList}
        </div>
    );
}

export default Results;