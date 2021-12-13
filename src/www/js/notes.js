
class Notes {

    render() {
        let toReturn = `
            <div id="notes-page">
                <div id="notes-list">
                    <button>
                        <h2 id="add-note">- Add note -</h2>
                    </button>
                </div>
                <div id="currently-displayed-note">
                <input id="notes-input" type="text">
                </div>
            </div>
        `;
        this.renderNotesList();
        return toReturn;
    }

    async renderNotesList() {
        let notesList = "";
        for (let note of await this.getNotesFromDB()) {
            notesList += `
                <button id="note-button-${note.note_id}" onclick="notes.renderCurrentlyDisplayedNote(${note.note_id}); notes.markButtonAsActive(${note.note_id})">
                    <h2>${note.title}</h2>
                </button>
            `;
        }
        document.querySelector('#notes-list').insertAdjacentHTML('beforeend', notesList);
    }

    async markButtonAsActive(id) {
        for (let note of await this.getNotesFromDB()) {
            if(note.note_id === id) {
                document.getElementById(`note-button-${note.note_id}`).style.backgroundColor = "rgb(200,200,160)";
            } else {
                document.getElementById(`note-button-${note.note_id}`).style.backgroundColor = "beige";
            }
        }
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
        let result = await fetch('/rest/notes');
        let notesFromDB = await result.json();
        return notesFromDB;
        
    }

    async updateNotes(){
        
        do{
            let textUpdate = document.querySelector("#notes-input").value;
        }while
        

        //setTimeout(1000);
    }
}




