
class Notes {

    constructor() {
        this.render();
        //document.getElementById("testbutton").addEventListener("click", addNote);
    }

    render() {
        return `
            <div id="notes-list"></div>  Här är det notes från JS via DATABASEN
            <button id="testbutton">TESTKNAPP</button>
        `;
    }

    showNotes() {
        let notesList = document.getElementById("notes-list");
        notesList.innerHTML = "";
        let notes = this.getNotesFromDB();
        for (let note of notes) {
        notesList.insertAdjacentHTML('beforeend', `
            <p>
                Title: ${note.title} <br>
                Text: ${note.text} <br>
            </p>
        `);
        }
    }

    getNotesFromDB() {
        //result = await fetch('/rest/notes');
        //notes = await result.json();
        let notes = [];
        notes.push({
            title: 'title-test',
            text: 'text-test'
        });
        return notes;
    }

}
/*
let notes = [];



async function showNotes() {
    let result = await fetch('/rest/notes') 
    notes = await result.json();
    renderNotes();
}

function renderNotesPage() {
    return `
    <div id="notes-list"></div>  Här är det notes från JS via DATABASEN
    <button id="testbutton">TESTKNAPP</button>
    `
}

function renderNotes() {
    let notesList = document.getElementById("notes-list");
    notesList.innerHTML = "";
    for (let note of notes) {
        notesList.insertAdjacentHTML('beforeend', `
        <p>
            Title: ${note.title} <br>
            Text: ${note.text} <br>
        </p>
        `);
    }
}


/* ADD NOTE */ 
/*async function addNote() {
    console.log("Adding new note!");
    let note = {
        title: "test-title-for-text-note",
        text: "text text text test test test"
    }

    let result = await fetch("/rest/notes", {
        method: "POST",
        body: JSON.stringify(note)
    });
}*/




