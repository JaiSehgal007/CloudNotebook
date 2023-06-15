import React from 'react'
import { useContext,useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title:"",description:"",tag:""})

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Note Added Successfully","success");
    }

    const onChange= (e)=>{
        // note that the "..." represents the spread operator
        // now the following syntax means that the properties in the setnote will remain, 
        // but the properties written after that shold be added or overwrited
        setNote({...note, [e.target.name]:e.target.value})
    }
    return (
        <div>
            <div className="conatiner my-3">
                <h2>Add a Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input value={note.title} required type="text" minLength={2} className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input value={note.description} required type="text" minLength={5} className="form-control" id="description" name="description" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input value={note.tag} type="text" minLength={5} required className="form-control" id="tag" name="tag" onChange={onChange} />
                    </div>
                    <button disabled={note.title.length<2 || note.description.length<5 || note.tag.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote;