let filePosts = [];
console.log("Hej här var der files.js");

async function getFilePosts() {
    let result = await fetch('/rest/files')
    filePosts = await result.json();
    console.log("Hejsan försöker getFilePosts")

    console.log(filePosts);

    renderFilePosts()
}

function renderFilePosts() {
    let currentNoteId = document.querySelector(".save-button").getAttribute("id");
    let filePostList = document.querySelector('#file-container');
    filePostList.innerHTML = "";
    
    for(let file of filePosts) {
        if(file.note_id == currentNoteId) {
            let fileName = file.fileUrl.replace('/uploads/', '')
            let postLi =`
                    <div class="single-image-container">
                        ${fileName}
                        <img class="img-tests" src="${file.fileUrl}" alt="Filename: ${fileName}" id='imgId${file.file_id}'>
                        <button class='delete-class' id='del${file.file_id}'>Delete file</button>
                        <a href='${file.fileUrl}' download class='downloadFile'> <button>Download</button>
                        </a>
                    </div>
            `;
            
            filePostList.innerHTML += postLi;
        }
    }

   

    document.querySelectorAll(".delete-class").forEach(item => {
        item.addEventListener("click", deteleFile)
    }); 

}

async function addFile(e) {
    console.log("Add file tester")
    e.preventDefault();

     // upload image with FormData
     let files = document.querySelector('input[type=file]').files;
     let formData = new FormData();
 
     for(let file of files) {
         formData.append('files', file, file.name);
     }
 
     // upload selected files to server
     let uploadResult = await fetch('/api/file-upload', {
         method: 'POST',
         body: formData
     });
 
     // get the uploaded image url from response
     let fileUrl = await uploadResult.text();
     let note_id = document.querySelector(".save-button").getAttribute("id");
     console.log(note_id);
     // create a post object containing values from inputs
     // and the uploaded image url
     let post = {
        note_id: note_id,
        fileUrl: fileUrl
     }
 
     let result = await fetch("/rest/files", {
         method: "POST",
         body: JSON.stringify(post)
     });
 
     filePosts.push(post)
     toggleFiles();
     toggleFiles();
 
     console.log(await result.text())

}

async function deteleFile() {
    console.log("Delete file tester")
    idTodelete = this.id.replace('del', '')
    let yesOrNo = confirm("Are you sure?");
    
        if (yesOrNo == true) {
            let file = {
                file_id: idTodelete
            }
        
            let result = await fetch('/rest/files/' + idTodelete, {
                method: 'delete',
                body: JSON.stringify(file)
            });
            console.log("Deleting id with id number " + idTodelete)
            toggleFiles();
            toggleFiles();//Ett sätt att rendera om bilderna som visas så att den borttagna bilden försvinner
        }

        else {
            console.log("ok inget jävla deletande då")
        }
}
