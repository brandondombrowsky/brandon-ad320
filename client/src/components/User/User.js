import React from 'react'
import { useLocation } from 'react-router-dom'

const User = () => {

    console.log('in the user component')
    
    let location = useLocation()
    const firstName = location?.state?.user?.firstName
    const lastName = location?.state?.user?.lastName
    const _id = location?.state?.user?._id
    const email = location?.state?.user?.email
    const decks = location?.state?.user?.decks
    
    return (
        <div>
            <p>{ firstName }</p>
            <p>{ lastName }</p>
            <p>{ email }</p>
            <p>{ _id }</p> 
            <ul>
                { decks.map(( deck ) => {
                    return <li key={ deck._id }>{ deck.name }</li>
                })}
            </ul>       
        </div>
    )
}

export default User