import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, updateNote, pinNote } = context;

  const { note } = props;

  return (
    <div className={`col-md-3 ${note.pinned ? "pinned" : ""}`}>
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => {
                deleteNote(note._id);
                // props.showAlert("Deleted successfully", "success");
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2 "
              onClick={() => {
                props.updateNote(note);
              }}
            ></i>
            {/* <i
              className={`fa-solid fa-thumbtack mx-2 ${
                note.pinned ? "pinned" : ""
              }`}
              onClick={()=>{
                props.handlePin(note._id);
              }}
            ></i> */}
            {/* not working properly in fe requires time */}
            {/* data-bs-toggle="modal" data-bs-target="#exampleModal" */}
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
