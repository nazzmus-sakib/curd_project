let form = document.getElementById('exampleModal'),
titleInput = form.querySelector('input[type = text]'),
dateInput = form.querySelector('input[type = date]'),
textareaInput = form.querySelector('textarea'),
msg = document.querySelectorAll('.msg'),
parentDiv = document.querySelector('.posts'),
addBtn = document.getElementById('add')


form.addEventListener('submit',(event)=>{
    event.preventDefault();
    formValidation()
})

let formValidation = function() {
    if(titleInput.value === '' || textareaInput.value === ''){
       msg.forEach(function(x) {
            x.innerHTML = 'Enter enter a value';
             x.style.color = 'red'
       })  
    } else{
        acceptData()
        addBtn.setAttribute('data-bs-dismiss', 'modal')
        addBtn.click()

       function checkBlank (){
        addBtn.setAttribute('data-bs-dismiss', '')
       }
       checkBlank()
    }
}

let data = [];

let acceptData = function() {
    data.push({
        text : titleInput.value,
        date : dateInput.value,
        desc : textareaInput.value 
    })
   localStorage.setItem('data', JSON.stringify(data))
    createData()
}
let resetForm = function() {
    titleInput.value = ''
    dateInput.value = ''
    textareaInput.value = ''
}
let createData = function() {
    parentDiv.innerHTML = ''
    data.map(function(x,y){
        return  parentDiv.innerHTML += ` <div id = ${y}>
        <span class="fw-bold">${x.text}</span>
        <span class="small">${x.date}</span><br>
        <p>${x.desc}</p>
        <div class="options">
            <i class="fas fa-edit" onclick = "editDiv(this)" data-bs-toggle="modal" data-bs-target="form"></i>
            <i class="fas fa-trash-alt" onclick= "deleteDiv(this)"></i>
        </div>
    </div>`
    })
   

    resetForm()
}
let deleteDiv = function(event) {
    event.parentElement.parentElement.remove()
    data.splice(event.parentElement.parentElement.id,1)
    localStorage.setItem('data', JSON.stringify(data))
    console.log(data)

}

let editDiv = function(event) {
    let selected = event.parentElement.parentElement;
    titleInput.value = selected.children[0].innerHTML;
    dateInput.value =  selected.children[1].innerHTML;
    textareaInput.value = selected.children[3].innerHTML;

   deleteDiv(event)
}

let getDataOnScreen = function() {
    data = JSON.parse(localStorage.getItem('data'))
    createData()
}
getDataOnScreen()
