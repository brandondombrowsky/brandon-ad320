import React from "react";
import './CardNav.css'

const cardLinks = ['Card A', 'Card B', 'Card C', 'Card D', 'Card E', 'Card F', 'Card G', 'Card H']
function CardNav() {
    return (
        <div className='card-nav'>
            <ul>
               {cardLinks.map((link) => {
                   return (<li>{link}</li>)
               })}
            </ul>
        </div>
    )
}

export default CardNav;