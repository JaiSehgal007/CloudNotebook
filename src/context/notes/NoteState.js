//  here we will be defining a state that will be accessible to all
import NoteContext from "./noteContext";
import { useState } from "react";

//  this notestate will be providing all the state of the note
const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    // get allnotes

    const getNotes = async () => {
        // API CALL

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4Nzk2ZTQ5MGVkODY4ZDk3NDk2OGZkIn0sImlhdCI6MTY4NjY0MTAyN30.on6eO9ID5jgbnKGi2ASHHh09rWh0V9cR5IFIubRxSKE"
            },
        });

        const json=await response.json();
        // console.log(json);
        setNotes(json);
        // note that concat returns the array where as push updates the array
    }


    // add a note
    const addNote = async (title, description, tag) => {
        // API CALL

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4Nzk2ZTQ5MGVkODY4ZDk3NDk2OGZkIn0sImlhdCI6MTY4NjY0MTAyN30.on6eO9ID5jgbnKGi2ASHHh09rWh0V9cR5IFIubRxSKE"
            },
            body: JSON.stringify({title,description,tag}),
        });

        const json = await response.json();
        setNotes(notes.concat(json))        
    }

    // delete a note
    const deleteNote = async (id) => {
        //API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4Nzk2ZTQ5MGVkODY4ZDk3NDk2OGZkIn0sImlhdCI6MTY4NjY0MTAyN30.on6eO9ID5jgbnKGi2ASHHh09rWh0V9cR5IFIubRxSKE"
            },
        });

        const json=await response.json();
        console.log(json);

        // deleting fron=m the frontend
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }
    // edit a note
    const editNote = async (id, title, description, tag) => {
        // API CALL

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4Nzk2ZTQ5MGVkODY4ZDk3NDk2OGZkIn0sImlhdCI6MTY4NjY0MTAyN30.on6eO9ID5jgbnKGi2ASHHh09rWh0V9cR5IFIubRxSKE"
            },
            body: JSON.stringify({title,description,tag}),
        });

        const json =await response.json();
        console.log(json);

        // json.parse is used to create a deep copy
        let newNotes=JSON.parse(JSON.stringify(notes))
        // LOGIC TO EDIT IN CLIENT
        for (let index = 0; index < newNotes.length; index++) {
            if (newNotes[index]._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes }} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;





