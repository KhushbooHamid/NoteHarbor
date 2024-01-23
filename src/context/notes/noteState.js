import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
   const notesInitial = [
    {
        "_id": "65ae1ef93dc5794d4292ceba",
        "user": "65acbaa7a53a2a80e903eac5",
        "title": "my title",
        "description": "wake up early khush",
        "tag": "my tag",
        "date": "2024-01-22T07:53:29.410Z",
        "__v": 0
    },
    {
        "_id": "65ae309854a7e0727ee7b7b2",
        "user": "65acbaa7a53a2a80e903eac5",
        "title": "my title",
        "description": "wake up early khush",
        "tag": "my tag",
        "date": "2024-01-22T09:08:40.960Z",
        "__v": 0
    },
    {
        "_id": "65ae1ef93dc5794d4292ceba",
        "user": "65acbaa7a53a2a80e903eac5",
        "title": "my title",
        "description": "wake up early khush",
        "tag": "my tag",
        "date": "2024-01-22T07:53:29.410Z",
        "__v": 0
    },
    {
        "_id": "65ae309854a7e0727ee7b7b2",
        "user": "65acbaa7a53a2a80e903eac5",
        "title": "my title",
        "description": "wake up early khush",
        "tag": "my tag",
        "date": "2024-01-22T09:08:40.960Z",
        "__v": 0
    },
    {
        "_id": "65ae1ef93dc5794d4292ceba",
        "user": "65acbaa7a53a2a80e903eac5",
        "title": "my title",
        "description": "wake up early khush",
        "tag": "my tag",
        "date": "2024-01-22T07:53:29.410Z",
        "__v": 0
    },
    {
        "_id": "65ae309854a7e0727ee7b7b2",
        "user": "65acbaa7a53a2a80e903eac5",
        "title": "my title",
        "description": "wake up early khush",
        "tag": "my tag",
        "date": "2024-01-22T09:08:40.960Z",
        "__v": 0
    }
]
const [notes, setNotes]=useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;