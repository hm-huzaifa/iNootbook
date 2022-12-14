const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// Route 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error...!!");
  }
});

// Route 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title must be at least 3 chars long").isLength({ min: 3 }),
    body("description", "description must be at least 5 chars long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // if there are errors, return Bad requests and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const saveNote = await notes.save();
      res.json(saveNote);

      // Catch error
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error...!!");
    }
  }
);

// Route 3: Update an existing note using: PUT "/api/notes/updatenote/:id". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // Creating a newNote object
    const newNote = {};

    if (title) {
      newNote.title = title;
      console.log(newNote.title, title);
    }
    if (description) {
      newNote.description = description;
      console.log(newNote.description, description);
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found...!");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed...!!");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error...!!");
  }
});

// Route 4: Delete an existing note using: DELETE "/api/notes/deletenote/:id". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted, and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found...!");
    }

    // Allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed...!!");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error...!!");
  }
});

module.exports = router;
