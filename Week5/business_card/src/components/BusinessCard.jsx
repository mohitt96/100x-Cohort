/* eslint-disable react/prop-types */
import './BusinessCard.css';

export function BusinessCard({name, description, interests, linkedIn, twitter, otherSocialMedia}) {
    return (
        <div className='card'>
            <h2 className='name'>{name}</h2>
            <p className='description'>{description}</p>
            <h3 className='interestsHeader'>Interests</h3>
            <ul className='interestsList'>
                {interests.map((interest) => (
                    <li key={interest} className='interestItem'>{interest}</li>
                ))}
            </ul>
            <div className='socialLinks'>
                <a href={linkedIn} target="_blank" rel="noopener noreferrer" className='link' style={{ marginLeft: 0 }}>LinkedIn</a>
                <a href={twitter} target="_blank" rel="noopener noreferrer" className='link'>Twitter</a>
                {otherSocialMedia && 
                    <a href={otherSocialMedia.link} target="_blank" rel="noopener noreferrer" className='link'>{otherSocialMedia.label}</a>}
            </div>
        </div>
    )
}