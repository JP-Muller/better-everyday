import React from 'react'

function About() {
    return (
        <div className='listStyle header'>
            <h1>About</h1>
            <hr id='hrAbout' />
            <section className='container'>
                <dfn className='aboutStyle2'>This is a React/Node/Express app to help organize your day to be more productive. You're able to save completed tasks with additional thoughts in daily entries to look through later.</dfn>
                <br/>
                <dfn className='aboutStyle'>Start now! <br /> Do something today that your future self will thank you for!</dfn>
                <iframe id='vidBox' title='video' width="560" height="315" src="https://www.youtube.com/embed/F-MYrZIeMtI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> <p className='aboutStyle'>"You play it safe, you end progression"</p>
            </section>
            <hr id='hrAbout'/>
            <p id='version'>Version: .137</p>
        </div>
    )
}


export default About