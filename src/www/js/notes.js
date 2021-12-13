
class Notes {

    render() {
        let toReturn = `
            <div id="notes-page">
                <div id="notes-menu">
                    <div id="add-note" class="note-list-item" onclick="notes.addNote()">
                        <h2>+</h2>
                    </div>
                    <div id="notes-list">
                        
                    </div>
                </div>
                <div id="currently-displayed-note">
                    <input id="notes-input" type="text-note">
                </div>
                <div id="currently-displayed-note"></div>
            </div>
        `;
        this.renderNotesList();
        return toReturn;
    }

    //skapa en ny note
    async addNote() {
        
    }

    //rendera listan där man kan välja vilken note man vill se
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

    //Styr färgen på list-items så man ser vilken note som är vald
    async markButtonAsActive(id) {
        for (let note of await this.getNotesFromDB()) {
            if(note.note_id === id) {
                document.getElementById(`note-button-${note.note_id}`).style.backgroundColor = "rgb(200,200,160)";
            } else {
                document.getElementById(`note-button-${note.note_id}`).style.backgroundColor = "beige";
            }
        }
    }

    //rendera den valda anteckningen så den visas på höger sida
    async renderCurrentlyDisplayedNote(id) {
        let currentNoteElement = document.querySelector('#currently-displayed-note');
        for (let note of await this.getNotesFromDB()) {
            if(note.note_id === id) {
                currentNoteElement.textContent = note.text;
            }
        }

    }

    //fetcha alla anteckningar
    async getNotesFromDB() {
        let result = await fetch('/rest/notes');
        let notesFromDB = await result.json();
        return notesFromDB;
    }
}




