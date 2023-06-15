import React, { useContext, useEffect, useRef,useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';


const Notes = () => {

    // fetching the initial values of notes
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line 
    }, [])

    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})

    // for triggtreing the model we are using use refrence hook
    //  and updating
    const updateNote = (currentNote) => {
        ref.current.click()
        // ref.current means the the place where the refrence is pointing and then clicking on that place
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }
    const ref = useRef(null)
    const refClose = useRef(null)


    const handleClick=(e)=>{
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click()
        // console.log(note);
    }
    const onChange= (e)=>{
        // note that the "..." represents the spread operator
        // now the following syntax means that the properties in the setnote will remain, 
        // but the properties written after that shold be added or overwrited
        setNote({...note, [e.target.name]:e.target.value})
    }
    return (
        <>
            <AddNote />
            {/* ref={ref} means jo refrence hai woh iss button ko hold kr rha hai */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input required type="text" className="form-control"  minLength={2} value={note.etitle} id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input required type="text" className="form-control" minLength={5} value={note.edescription} id="edescription" name="edescription" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" value={note.etag} required minLength={5} name="etag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<2 || note.edescription.length<5 || note.etag.length<5} type="button" className="btn btn-primary" onClick={handleClick} >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2>Your Notes</h2>
                <div className="container mx-2">
                {notes.length===0 && 'No Notes to Display'}
                </div>
                {notes.map((notes) => {
                    return <NoteItem key={notes._id} updateNote={updateNote} note={notes} />
                })}
            </div>
        </>
    )
}

export default Notes