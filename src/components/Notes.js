import noteContext from "../context/notes/noteContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();

  const { notes, getNotes, editNote, pinNote} = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/login");

    }
    // eslint-disable-next-line
  }, []);

  // ``````````````````````````````````````````````````
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6;

  const currentNotes = notes.slice((currentPage - 1) * notesPerPage, currentPage * notesPerPage);
  // ``````````````````````````````````````````````````

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    // props.showAlert("Updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); //spread operator so that the new properties gets added
  };

  // `````````````````````````````````````````````

  const handlePin = async (noteId) => {
    console.log('Calling pinNote with noteId:', noteId);
    
    try {
      const response = await pinNote(noteId);
      
      if (response.ok) {
        const updatedNote = await response.json();
        console.log('Response from pinNote endpoint:', updatedNote);
        // Update the state with the updated note as needed
      } else {
        console.error('Invalid response from pinNote endpoint:', response);
        // Handle the response as an error (e.g., show an error message to the user)
      }
    } catch (error) {
      console.error('Error pinning/unpinning note:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };
  
  
  
  



  // `````````````````````````````````````````````
  const totalPages = Math.ceil(notes.length / notesPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  // `````````````````````````````````````````````

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title " className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2 style={{ fontSize: "2rem", color: "#007bff" }}>Your Notes</h2>
        <div
          className="container mx-2"
          style={{ textAlign: "center", color: "#555" }}
        >
          {currentNotes.length === 0 && " No notes to display"}
        </div>
        {currentNotes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              updateNote={updateNote}
              showAlert={props.showAlert}
              note={note}
              handlePin={handlePin}
              pinNote={pinNote}
            />
          );
        })}
      </div>

{/* ``````````````````````````````````````````` */}

 {/* Pagination controls */}
 <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <Link
              onClick={() => paginate(number)}
              className={`page-link ${currentPage === number ? 'active' : ''}`}
              to="/"
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
{/* ``````````````````````````````````````````` */}
    </>
  );
};

export default Notes;
