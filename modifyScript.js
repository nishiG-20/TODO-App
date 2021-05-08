console.log("hey buddy")

showNotes()

// if User add a notes it to the local Storage
let addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click', (e) => {
    let addTxt = document.getElementById('addTxt')
    let addTitle = document.getElementById('addTitle')
    
    notesContent = {
        title: addTitle.value,
        note: addTxt.value
    }

    let notes = localStorage.getItem('notes')
    if (notes === null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes)
    }
    notesObj.push(notesContent)
    localStorage.setItem("notes", JSON.stringify(notesObj))
    addTxt.value = ""
    addTitle.value = " "
    showNotes()
})

//Function to Show Notes from Local Storage
function showNotes() {
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes)
    }
    let html = ""
    notesObj.forEach((element, index) => {
        html += `
        <div class="noteCards card my-2 mx-2" style="width: 18rem;">
           <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
                 <p class="card-text">${element.note}</p>
                 <button id="${index}"onclick="deleteNotes(this.id)" class="btn btn-primary">Delete Note</button>
           </div>
        </div>`
    })
    //document.getElementById('notes').innerHTML=html
    let notesElem = document.getElementById('notes')
    if (notesObj.length !== 0) {
        notesElem.innerHTML = html
    } else {
        notesElem.innerHTML = `Nothing to show Use "Add a Note" Section above to add notes.`
    }
}

// Function to delete the notes
function deleteNotes(index) {
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(notesObj))
    showNotes()
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCards');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})