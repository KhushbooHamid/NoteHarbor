const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Route 1: Get all the notes using: GET "/api/notes/getuser". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
 
});

//Route 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body("description", "Description must be atleast 5 characters").isLength({min: 5,}),
  ],
  async (req, res) => {
    try {
        const {title, description, tag} = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
    
        const saveNote = await note.save();
        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
   
  }
);

//Route 3: Update an existing Note using PUT. Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const {title, description, tag} = req.body;
  try {
    
  
  //create a new note object
  const newNote = {};
  if(title){newNote.title = title};
  if(description){newNote.description = description};
  if(tag){newNote.tag = tag};

  //find the note to be updated and update it
  let note = await Note.findById(req.params.id);
  if(!note){res.status(404).send("Not Found")}

  if(note.user.toString() !== req.user.id){ //if updater is not the one whose note it is
    return res.status(401).send("Not Allowed");
  }

  note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
  res.json({note});
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error");
}
})


//Route 4: Delete an existing Note using DELETE. Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  const {title, description, tag} = req.body;
try {
  

  //find the note to be deleted and delete it
  let note = await Note.findById(req.params.id);
  if(!note){res.status(404).send("Not Found")}

  //Allow deletion only if user owns this note
  if(note.user.toString() !== req.user.id){ //if updater is not the one whose note it is
    return res.status(401).send("Not Allowed");
  }

  note = await Note.findByIdAndDelete(req.params.id)
  res.json({"Success":"note has been deleted", note: note});
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error");
}
})



//Route 5: Pin/Unpin a Note using PUT. Login required
router.put('/pinnote/:id', fetchuser, async (req, res) => {
  try {
    // Find the note by ID
    let note = await Note.findById(req.params.id);

    // Check if the note exists
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Check if the user owns the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Toggle the pinned status
    note.pinned = !note.pinned;

    // Save the updated note
    const updatedNote = await note.save();

    res.json(updatedNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;

module.exports = router;
