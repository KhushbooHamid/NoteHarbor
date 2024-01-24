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
    console.log(json);
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
    const json = response.json();
    console.log(json);

    console.log("adding a new note");
    const note = {
      _id: "65awe309854a7e0727ee7b7b2",
      user: "65acbaa7a53a2a80e903eac5",
      title: title,
      description: description,
      tag: tag,
      date: "2024-01-22T09:08:40.960Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
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


    console.log("deleting the node with id" + id);
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhY2JhYTdhNTNhMmE4MGU5MDNlYWM1In0sImlhdCI6MTcwNTkwODIxOX0.3P5Y5mbuLeCG08n0wylKzlUGGFrhS74oVuTsdD3T5t0",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);

    // logic to edit
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
