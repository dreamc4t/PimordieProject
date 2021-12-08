
class Notes {

    render() {
        
        let toReturn = `
            <div id="notes-page">
                <div id="notes-list">
                    <button>
                        <h2 id="add-note">- Add note -</h2>
                    </button>
                </div>
                <div id="currently-displayed-note"></div>
            </div>
        `;

        this.renderNotesList();
        
        return toReturn;
    }

    async renderNotesList() {
        let notesList = "";
        for (let note of await this.getNotesFromDB()) {
            notesList += `
                <button onclick="notes.renderCurrentlyDisplayedNote(${note.note_id})">
                    <h2>${note.id}Title: ${note.title}</h2>
                </button>
            `;
        }
        document.querySelector('#notes-list').insertAdjacentHTML('beforeend', notesList);
    }

    async renderCurrentlyDisplayedNote(id) {
        let currentNoteElement = document.querySelector('#currently-displayed-note');
        for (let note of await this.getNotesFromDB()) {
            if(note.note_id === id) {
                currentNoteElement.innerHTML = `<p>${note.text}</p>`;
            }
        }

    }

    async getNotesFromDB() {
        // Create temporary mock notes while waiting for backend to get ready
        /*let mockNotes = [];
        for(let i = 1; i <= 15; i++) {
            mockNotes.push({
                id: i,
                title: `Note ${i}`,
                text: `this is note number ${i}`
            })
        }
        return mockNotes;*/

        
        let result = await fetch('/rest/notes');
        let notesFromDB = await result.json();
        console.log('test')
        console.log(notesFromDB);
        return notesFromDB;
        
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




