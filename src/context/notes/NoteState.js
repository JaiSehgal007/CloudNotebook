//  here we will be defining a state that will be accessible to all
import NoteContext from "./noteContext";
import { useState } from "react";

//  this notestate will be providing all the state of the note
const NoteState= (props)=>{
    const s1={
        "name":"Jai",
        "class":"3b"
    }
    const [state, setState] = useState(s1)
    const update=()=>{
        setTimeout(()=>{
            setState({
                "name":"hai",
                "class":"10b" 
            })
        },1000);
    }
    return (
        <NoteContext.Provider value={{state,update}} >
        {/* this is same as <NoteContext.Provider value={{state:state,update:update}} > */}
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;