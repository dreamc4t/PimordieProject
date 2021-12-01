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