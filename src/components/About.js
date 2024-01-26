import React from 'react';

const About = () => {
  // Inline styles
  const containerStyle = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: 'auto',
    marginTop: '50px',
  };

  const headingStyle = {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  };

  const textStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '15px',
  };

  const emailStyle = {
    fontSize: '18px',
    color: '#007bff',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>About Us</h1>
      <p style={textStyle}>
        Welcome to my note-taking application! This application allows you to
        manage your notes efficiently. You can add, edit, delete
        your important notes. Stay organized with my user-friendly interface.
      </p>
      <p style={textStyle}>
        Feel free to explore and make the most out of note-taking features.
        If you have any questions or feedback, don't hesitate to reach out to me.
      </p>
      <p style={emailStyle}>
        Contact me at: <a href="khushboohamid786@gmail.com">khushboohamid786@gmail.com</a>
      </p>
    </div>
  );
};

export default About;
