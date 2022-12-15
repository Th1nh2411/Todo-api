
    var todoApi = 'http://localhost:3000/todo-list'

function start(){
    getTodo(renderTodo)
    handleCreateForm()
}
start()
// Function
function getTodo(callback){
    fetch(todoApi)
    .then(respone => respone.json())
    .then(callback)
}
function createTodo(data, callback){
    var options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch(todoApi, options)
        .then(respone => respone.json())
        .then(callback)
}
function renderTodo(todos){
        // var doneItem = document.querySelector('.todo-item')
        var htmls = todos.map(function(todo){
        if (todo.isDone == true){
            var doneItem = 'todo-item-done'
            BtnDone =''
            var isComplete = "Done"
        }else {
            var BtnDone = '<button onclick="handleUpdateDone('+todo.id+')">Done?</button>'
            doneItem = ''
            isComplete = "Not Done"
        }
        return `
            <li class="todo-item ${doneItem} todo-item-${todo.id}">
                <div class="todo-detail">
                <h3>${todo.name}</h3>
                <p>${todo.description}</p>
                <div>${isComplete}</div>
                </div>
                <div class="todo-button">
                <button onclick="handleDeleteTodo(${todo.id})">Delete</button>
                <button onclick="handleUpdateForm(${todo.id})">Edit</button>
                ${BtnDone}
                </div>
            </li>
        `
        
     })
     document.querySelector('.todo-list').innerHTML= htmls.join('')
      
      
      
}
function handleCreateForm(){
    var createBtn = document.querySelector('#create')
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value
        var description = document.querySelector('input[name="description"]').value
        var formData = {
            name: name,
            description: description,
            isDone: false

        }

        createTodo(formData ,function(todo) { 
            // console.log(todo)
            if (todo.isDone){
            var doneItem = 'todo-item-done'
            BtnDone =''
            var isComplete = "Done"
            }else {
            var BtnDone = '<button onclick="handleUpdateDone('+todo.id+')">Done?</button>'
            doneItem = ''
            isComplete = "Not Done"
        }   
            var htmls =`
                    <li class="todo-item ${doneItem} todo-item-${todo.id}">
                        <div class="todo-detail">
                        <h3>${todo.name}</h3>
                        <p>${todo.description}</p>
                        <div>${isComplete}</div>
                    </div>
                    <div class="todo-button">
                    <button onclick="handleDeleteTodo(${todo.id})">Delete</button>
                    <button onclick="handleUpdateForm(${todo.id})">Edit</button>
                    ${BtnDone}
                    </div>
                    </li>`
            document.querySelector('.todo-list ').innerHTML += htmls
        }
        )
    }
}
function handleUpdateForm(id){
    // console.log(id)
    var updateBtn = document.querySelector("#create")
    updateBtn.textContent = "Update"
    document.querySelector("input[name='name']").value = document.querySelector(".todo-item-" + id + " h3").textContent
    document.querySelector("input[name='description']").value = document.querySelector(".todo-item-" + id + " p").textContent
    updateBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value
        var description = document.querySelector('input[name="description"]').value
        var formData = {
            name: name,
            description: description,
        }
        console.log(formData)
        handleUpdate(id, formData)
    }
}
function handleUpdateDone(id){
    var name = document.querySelector(".todo-item-" + id + " h3").textContent
    var description = document.querySelector(".todo-item-" + id + " p").textContent
    var formData = {
            name: name,
            description: description,
            isDone: true
        }
        handleUpdate(id, formData)

}
function handleDeleteTodo(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }

    fetch(todoApi + '/' + id, options)
        .then(respone => respone.json())
        .then(function(){
            var deleteItem = document.querySelector('.todo-item-' + id)
            console.log(deleteItem)
            if (deleteItem){
                deleteItem.remove()
            }
        })
}
function handleUpdate(id,data){
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }

    fetch(todoApi + '/' + id, options)
        .then(respone => respone.json())
        .then(function(todo){
            var updateItem = document.querySelector('.todo-item-' + id)
            if (todo.isDone){
            var doneItem = 'todo-item-done'
            BtnDone =''
            var isComplete = "Done"
            }else {
            var BtnDone = '<button onclick="handleUpdateDone('+todo.id+')">Done?</button>'
            doneItem = ''
            isComplete = "Not Done"
            }
            console.log(updateItem)
            if (updateItem){
                updateItem.outerHTML = `
                    <li class="todo-item ${doneItem} todo-item-${todo.id}">
                        <div class="todo-detail">
                        <h3>${todo.name}</h3>
                        <p>${todo.description}</p>
                        <div>${isComplete}</div>
                    </div>
                    <div class="todo-button">
                    <button onclick="handleDeleteTodo(${todo.id})">Delete</button>
                    <button onclick="handleUpdateForm(${todo.id})">Edit</button>
                    ${BtnDone}
                    </div>
                     </li>
                `
            }
        })
}