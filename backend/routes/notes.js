const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator')


// ROUTE 1: Get all the notes : GET "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: "Internal server error" });
    }
})

// ROUTE 2: add a new note using post : POST "/api/notes/addnote" login required
router.post('/addnote', fetchuser, [
    body('title', 'enter a valid name').isLength({ min: 1 }),
    body('description', 'description is too short').isLength({ min: 5 })
], async (req, res) => {

    try {

        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save()

        res.json(savedNote);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: "Internal server error" });
    }
})

// ROUTE 3 : update an existing note : POST "/api/notes/updatenote" login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {


        const { title, description, tag } = req.body;

        //create a new note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: "Internal server error" });
    }
})

// ROUTE 4 : delete an existing note using delete : POST "/api/notes/deletenote" login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") }

        // allow deletion only if user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Sucess": "Note has been deleted", note: note });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: "Internal server error" });
    }
})


module.exports = router;