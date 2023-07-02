const fs = require("fs/promises")
const path = require("path")
const chalk = require("chalk")

const notesPath = path.join(__dirname, "db.json")

async function addNote(title) {

    const notes = await getNotes()

    const note = {
        title,
        id: Date.now().toString()
    }

    notes.unshift(note)

    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.green.inverse("Note added!"))
}

async function getNotes() {
    
    const notes = await fs.readFile(notesPath, {encoding: "utf-8"})

    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
    const notes = await getNotes()

    console.log(chalk.bgBlue("List of notes:"))
    notes.forEach(note => {
        console.log(chalk.blue(note.title))
    });
}

async function editNote({id, title}) {
    const notes = await getNotes()

    const editedArr = notes.map((el)=>{
        if(el.id === id) {
            return {id, title}
        }
        return el
    })
    await fs.writeFile(notesPath, JSON.stringify(editedArr))
    console.log(chalk.blue("Note edited"))
}

async function removeNote(id) {
    const notes = await getNotes()

    const filtredNotes = notes.filter((note)=> {
        return String(note.id) !== id
    })

    await fs.writeFile(notesPath, JSON.stringify(filtredNotes))
    console.log("Note "+ chalk.red("deleted")+"!")
}

module.exports = {
    addNote, printNotes, removeNote, getNotes, editNote
}