    
    // readEntry (entries component) functionality for dummy data list
    
    {/* <section className='entry-container-preview'>
                    <div id='entry-preview'>
                        <h2> Post Preview </h2>
                        <hr />
                        <div id='entry-date'>
                            {list[i].date} <div> {+i + 1}/{this.state.list.length}</div>
                        </div>
                        <hr />
                        <section id='image-of-day'>
                            <h3><i><b>Image of the Day</b></i></h3>
                            <img src={list[i].imageOfDay} alt='Preview Imagery' />
                        </section>
                        <div id='completed-task-preview'>
                            <hr />
                            <h3><i className='icon far fa-check-square checkIcon' /> <u>Completed Tasks</u> <i className='icon far fa-check-square entryIconRight' /></h3>
                            <ul id='completed-task-list-preview' key='targetTask'>
                                <div><li> {list[i].completedTasks[0]} </li></div>
                                <div><li> {list[i].completedTasks[1]} </li></div>
                                <div><li> {list[i].completedTasks[2]} </li></div>
                                <div><li> {list[i].completedTasks[3]} </li></div>
                                <div><li> {list[i].completedTasks[4]} </li></div>
                            </ul>
                        </div>
                        < hr />
                        <div id='entry-of-day-preview'>
                            <h3 id='entry-of-day-header-preview'><u>Additional Thoughts</u></h3>
                            <div id='entry-of-day-text-preview' >

                                {editing ? (<textarea wrap='soft' id='update-thought' defaultValue={list[i].thought} onChange={(e) => this.handleChange(e.target.value)} onKeyDown={this.handleEditingDone} />) : (
                                    <p>{list[i].entry}</p>
                                )}
                            </div>
                            <hr />
                        </div>
                        <div className="button-row"  >
                            <button className="nextPrev" onClick={this.handlePrevious} onKeyDown={this.handleKeyPrev}>{'< Previous'}</button>
                            <div className="middle-buttons">
                                <button className="buttons" onClick={this.handleEditing}>Edit Thought</button>
                                <button className="buttons" onClick={() => this.deleteEntry(i)} >Delete</button>
                            </div>
                            <button className="nextPrev" onClick={this.handleNext} onKeyDown={this.handleKeyNext}>{'Next >'}</button>
                        </div>
                    </div>
                </section> */}