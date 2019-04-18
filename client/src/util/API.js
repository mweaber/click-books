import Axios from "axios";

const key = "AIzaSyBuGNAny4T2kL5cAJWFJCjfoW31BKPoLSI";
const titleLimit = "10";
const authorLimit = "40";

export default {
    searchTitle(title) {
        console.log(title);
        return Axios.get(`https.googleapis.com/books/v1/volumes?q=${title}&maxResults=${titleLimit}&keys=${key}`)
    },

    searchAuthor(author) {
        console.log(author);
        return Axios.get(`https.googleapis.com/books/v1/volumes?q=${author}&maxResults=${authorLimit}&keys=${key}`)
    },

    getSavedBooks() {
        return Axios.get("/api/books")
    },

    saveBook(title, author, description, image, bookid) {
        const saveBook = {
          title: title,
          author: author,
          description: description,
          image: image,
          bookID: bookid
        }
        return Axios.post("/api/books", saveBook)
    },
    changeRead(id, newRead) {
        const updateData = {
          read: newRead
        }
        return Axios.put(`api/books/${id}`, updateData)
    },
    

      deleteBook(id) {
        return Axios.delete(`api/books/${id}`)
    }
 };