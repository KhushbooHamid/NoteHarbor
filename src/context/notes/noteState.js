import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // get a Note
  const getNotes = async () => {
    // api call

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhY2JhYTdhNTNhMmE4MGU5MDNlYWM1In0sImlhdCI6MTcwNTkwODIxOX0.3P5Y5mbuLeCG08n0wylKzlUGGFrhS74oVuTsdD3T5t0",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    // todo api call
    // api call

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhY2JhYTdhNTNhMmE4MGU5MDNlYWM1In0sImlhdCI6MTcwNTkwODIxOX0.3P5Y5mbuLeCG08n0wylKzlUGGFrhS74oVuTsdD3T5t0",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note))
   
  };

  // Delete a Note
  const deleteNote =async (id) => {
    // todo api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhY2JhYTdhNTNhMmE4MGU5MDNlYWM1In0sImlhdCI6MTcwNTkwODIxOX0.3P5Y5mbuLeCG08n0wylKzlUGGFrhS74oVuTsdD3T5t0",
      },
    });
    const json = response.json();
    console.log(json);

   const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    // If you are not using setNotes outside this function, you can remove this line
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // api call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhY2JhYTdhNTNhMmE4MGU5MDNlYWM1In0sImlhdCI6MTcwNTkwODIxOX0.3P5Y5mbuLeCG08n0wylKzlUGGFrhS74oVuTsdD3T5t0",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);


    let newNotes = JSON.parse(JSON.stringify(notes))

    // logic to edit
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes);
  };

  const pinNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/pinnote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhY2JhYTdhNTNhMmE4MGU5MDNlYWM1In0sImlhdCI6MTcwNTkwODIxOX0.3P5Y5mbuLeCG08n0wylKzlUGGFrhS74oVuTsdD3T5t0",
        },
      });
  
      console.log('Response from pinNote endpoint:', response);
  
      if (response.ok) {
        // If the response status is within the 2xx range, consider it a success
        const updatedNote = await response.json();
        return updatedNote;
      } 
      throw new Error(`Failed to pin/unpin note. Status: ${response.status}`);

    } catch (error) {
      console.error("Error pinning/unpinning note:", error);
      
    }
  };
  


  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes, pinNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
