import React from "react";
import image from '../images/fine_dining_1.jpg'

function Results({ results }) {
    const renderedResultList = results.map((result, index) => {
        return (
            <div className="result" key={result.id}>
                <img className="resultPic" src={image} />
                <div className="resultInfo">
                    <h2>{index + 1}. {result.name}</h2>
                    <h3><span className="star">{'\u2605'.repeat(1)}</span>{'\u2606'.repeat(4)} 1 stars ( {1} Reviews )</h3>
                    <h3>{result.display_phone}</h3>
                    {result.location.display_address.map(row => <h4>{row}</h4>)}
                    <button>Leave a review</button>
                </div>
            </div>
        )
    })

    return (
        <div className="results">
            <h1>Here are your results!!</h1>
            {renderedResultList}
        </div>
    );
}

export default Results;