let notes = [];

document.onload = showNotes()

async function showNotes() {
    let result = await fetch('/rest/notes') 
    notes = await result.json();
    renderNotes();
}

function renderNotes() {
    let notesList = document.getElementById("notes-list");
    notesList.innerHTML = ""; 
    
    for (let note of notes) {
        let notesLi = `
        <p>
            Title: ${note.title} <br>
            Text: ${note.text} <br>
        </p>
        `;
        notesList.innerHTML += notesLi;
    }
}

let testknapp = document.getElementById("testbutton");
testknapp.addEventListener("click", addNote)

/* ADD NOTE */ 
async function addNote() {
    console.log("Adding new note!");
    let note = {
        title: "test-title-for-text-note",
        text: "text text text test test test"
    }

    let result = await fetch("/rest/notes", {
        method: "POST",
        body: JSON.stringify(note)
    });

}




