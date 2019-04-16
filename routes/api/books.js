const express = require("express");
const router = express.Router();

const Books = require("../../models/books");

// Routes

// Gets books and sorts, returns books, catchs error
router.get("/", (req, res) => {
    Books.find()
        .sort({ date: -1})
        .then(books => res.json(books))
        .catch(err => res.status(500).json(err));
})

// Posts new book. 
router.post("/", (req, res) => {
    const newBook = new Books({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        image: req.body.image,
        link: req.body.link,
        date: req.body.date
    });

    // Saves book
    newBook.save()
        .then(book => res.json(book))
        .catch(err => res.status(500).json(err));
})

// Delete route
router.delete("/:id", (req, res) => {
    Books.findByIdandDelete(req.params.id)
        .then(del => {
            if (del === null) {
                res.status(404).json({ msg: "Book ID was invalid"})
            }else{ 
                res.json(del)
            }
        })
        .catch(err => res.status(404).json({ error: err}))
})

// Update route
router.put("/:id", (req, res) => {
    Books.findByIdandUpdate({_id: req.params.id}, req.body)
        .then(result => {
            if (result === null) {
                res.status(404).json({ msg: "Book ID was invalid"})
            }else {
                res.json(result)
            }
        })
        .catch(err => res.status(404).json({ error: err}))
})
    
module.exports = router;