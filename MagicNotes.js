console.log('Applying Local Storage cocenpts')
showNotes()
// function to add a note on clicking button Add Notes

let addBtn=document.getElementById('addBtn')
addBtn.addEventListener('click',function (e) {
    let addTextArea=document.getElementById('addTextArea')
    let notesLSKey=localStorage.getItem('notesLSKey')
    if(notesLSKey==null){
        notesLSKeyObj=[]
    }
    else{
        notesLSKeyObj=JSON.parse(notesLSKey)
    }
    notesLSKeyObj.push(addTextArea.value)
    localStorage.setItem('notesLSKey',JSON.stringify(notesLSKeyObj))
    addTextArea.value=''
    showNotes()
})


// function to show the existing and newly added notes

function showNotes(){
    let notesLSKey=localStorage.getItem('notesLSKey')
    let html=''
    if(notesLSKey==null){
        notesLSKeyObj=[]
    }
    else{
        notesLSKeyObj=JSON.parse(notesLSKey)
    }
    Array.from(notesLSKeyObj).forEach(function(element,index){
    html+=` <div class ="notecard">
            <div class="card my-2 mx-2"  style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">Note${index+1}</h5>
            <p class="card-text">${element}</p>
            <button id='${index}' onclick="deleteNotes(this.id)" class="my-2 btn btn-primary">Delete</button>
            </div>
            </div>
            </div>`
    })

    let newNotesAdded=document.getElementById('newNotesId')
    if(notesLSKeyObj.length==0){
        newNotesAdded.innerHTML='Notes are not yet created'
    }
    else{
        newNotesAdded.innerHTML=html
}
}

// function to delete an existing Note

function deleteNotes(index){
    console.log(` I am deleting ${index+1}`)
    let notesLSKey=localStorage.getItem('notesLSKey')
    if(notesLSKey==null){
        notesLSKeyObj=[]
    }
    else{
        notesLSKeyObj=JSON.parse(notesLSKey)
    }
    notesLSKeyObj.splice(index,1)
    localStorage.setItem('notesLSKey',JSON.stringify(notesLSKeyObj))
    showNotes()
}


// search option to search notes

let searchText=document.getElementById('searchText')
searchText.addEventListener('input',function(){
    let inputValue=searchText.value.toLowerCase()
    console.log(inputValue)
    let notecards=document.getElementsByClassName('notecard')
    Array.from(notecards).forEach(function(element){
        let cardtext=element.getElementsByTagName('p')[0].innerText.toLowerCase()
        if(cardtext.includes(inputValue)){
            element.style.display='block'
        }
        else{
            element.style.display='none'
        }
    })
})

// Further Features
// 1. Add title
// 2. Mark a note as Imp
// 3.separate notes by user
// 4.sync and host to web server