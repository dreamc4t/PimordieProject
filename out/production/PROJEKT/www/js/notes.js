
class Notes {

    render() {
        let toReturn = `
            <div id="notes-page">
                <div id="notes-list">
                    ${this.prepareNotesList()}
                </div>
                <div id="currently-displayed-note"></div>
            </div>
        `;
        return toReturn;
    }

    prepareNotesList() {
        let notesList = "";
        for (let note of this.getNotesFromDB()) {
            notesList += `
                <button onclick="notes.renderCurrentlyDisplayedNote(${note.id})">
                    <h2>Title: ${note.title}</h2>
                </button>
            `;
        }
        return notesList;
    }

    renderCurrentlyDisplayedNote(id) {
        let currentNoteElement = document.querySelector('#currently-displayed-note');
        for (let note of this.getNotesFromDB()) {
            if(note.id === id) {
                currentNoteElement.innerHTML = `<p>${note.text}</p>`;
            }
        }

    }

    getNotesFromDB() {
        // Create temporary mock notes while waiting for backend to get ready
        let mockNotes = [];
        for(let i = 1; i <= 15; i++) {
            mockNotes.push({
                id: i,
                title: `Note ${i}`,
                text: `this is note number ${i}`
            })
        }
        return mockNotes;

        /*
        let result = await fetch("/rest/notes", {
            method: "GET"
        });
        let notesFromDB = await result.json();
        return notesFromDB;
        */
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




