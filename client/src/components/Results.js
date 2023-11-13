import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function Results({ results, history, onSearch }) {
    const [restaurants, setRestaurants] = useState(null)
    const [page, setPage] = useState(0)
    let { queryParam, locationParam } = useParams();

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
        console.log('hi')
        fetch(`/results`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        }).then(resp => resp.json()).then(restaurants => {
            console.log(restaurants)
            onSearch(restaurants.businesses)
        })
    }, [])
    let renderedResultList = null
    if (results) {
        renderedResultList = results.map((result, index) => {
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
                        <img className="resultPic" alt="Restaurant" src={result.image_url} />
                        <div className="resultInfo">
                            <h2>{index + 1 + page}. <span>{result.name}</span></h2>
                            <h3 onClick={onRestaurantClick} className="restuarantReviews"><span className="star">{'\u2605'.repeat(matchedRestaurant ? Math.round(averageStars) : 0)}</span>{'\u2606'.repeat(matchedRestaurant ? 5 - Math.round(averageStars) : 5)} {matchedRestaurant ? averageStars : 0} stars ( {matchedRestaurant ? reviews : 0} Reviews )</h3>
                            <h4>Categories: {result.categories.map((row) => <span key={row.alias}>{row.title} </span>)}</h4>
                            <h4>Price: {result.price ? result.price : '$'}</h4>
                            <h4>{result.display_phone}</h4>
                            <div className="address" >{result.location.display_address.map((row) => <h4 key={row}>{row}</h4>)}</div>
                            <h4>{result.transactions.map((row, i) => <span key={i}>-{row === 'restaurant_reservation' ? 'reservation' : row}  </span>)}</h4>
                            <button onClick={onRestaurantClick} className="restuarantReviews">Reviews</button>
                            <button onClick={onNewReviewClick}>Leave a review</button>
                        </div>
                    </div>
                )
            } else {
                return null
            }
        })
    }

    function onRestaurantClick(e) {
        console.log(e.target.parentNode.querySelectorAll('h4')[0].textContent)
        fetch('/rest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: e.target.parentNode.querySelector('h2 span').textContent, address: e.target.parentNode.querySelectorAll('h4')[3].textContent})
        }).then(resp => resp.json()).then(() => history.push(`/reviews/${e.target.parentNode.querySelector('h2 span').textContent}`))
    }

    function onNewReviewClick() {
        history.push('/newreview')
    }

    const formik = useFormik({
        initialValues: {
            restaurant: queryParam,
            location: locationParam,
            offset: page
        },
        validationSchema: null,
        onSubmit: (values) => {
            fetch(`/results`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2)
            }).then(resp => resp.json()).then(restaurants => {
                console.log(restaurants, 1)
                onSearch(restaurants.businesses)
                setPage(values.offset)
            })
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
        <div className="results">
            <h1>Here are your results for "{queryParam}" in "{locationParam}":</h1>
            {renderedResultList}
            {page > 0 ? <button type="submit" onClick={onFormik}>Previous Page</button> : null}
            {page < 1000 ? <button type="submit" onClick={onFormik}>Next Page</button> : null}
        </div>
    );
}

export default Results;