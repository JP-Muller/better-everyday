import React from 'react'

function About() {
    return (
        <div className='list-style list-header'>
            <h1>About</h1>
            <hr id='about-hr' />
            <section className='about-container'>
                <dfn className='aboutStyle2'>This is a full stack react app to help organize your day to be more productive. You're able to save completed tasks with additional thoughts in daily entries to look through later.</dfn>
                <br />
                <dfn className='about-style'>Start now! <br /> Do something today that your future self will thank you for!</dfn>
                <iframe id='vid-box' title='video' width="560" height="315" src="https://www.youtube.com/embed/F-MYrZIeMtI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> <p className='about-style'>"You play it safe, you end progression"</p>
            </section>
            <hr id='hrAbout' />
            <p id='version'>Version: .137</p>
        </div>
    )
}


export default About