import React from 'react'

const backdrop = props => (
    <div className='backdrop' onClick={props.drawerClickHandler} />
)

export default backdrop;