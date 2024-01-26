import React from 'react';
import Notes from './Notes';
import './NotesStyles.css'; // Adjust the path based on your project structure

const Home = (props) => {
  const { showAlert } = props;

  return (
    <div className="container-home mt-4 text-center">
      <h2-home className="mb-3">Welcome to NoteHarbor</h2-home>
      <p>This is a place for all your notes and thoughts.</p>
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;
