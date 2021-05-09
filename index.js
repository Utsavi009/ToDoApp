const input = document.querySelector("#input-text");
const addButton = document.getElementById("add-input");
const myArray = [];
const addInput = () => {
    const incompletedTasks = document.getElementById("incomplete-list");
    const completedTasks = document.getElementById("complete-list");
    const newLi = document.createElement("li");
    const text = document.createElement("p");
    const divBtn = document.createElement("div");
    const editBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const chckBtn = document.createElement("button");


    editBtn.innerHTML = "<i class='fas fa-pencil-alt'></i>";
    delBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";
    chckBtn.innerHTML = "<i class='fas fa-check-square'></i>";

    const paragpraphs = (document.getElementsByTagName("p"));
    let duplicate = false;
    for (let i = 0; i <paragpraphs.length; i++) {
        if (input.value === paragpraphs[i].innerHTML) {
            duplicate = true;
        }
    }

    // .innerHTML
    if (duplicate) {
        window.alert("This task already exists")
    }
    else if (input.value !== "") {
            text.innerHTML = input.value;
            // local storage is shared among websites, so keys need to be very specific
            window.localStorage.setItem(`ToDoList inc ${text.innerHTML}`,text.innerHTML);
            console.log(localStorage); // delete this after test
            input.value = "";
            incompletedTasks.appendChild(newLi);
            newLi.appendChild(text);
            newLi.appendChild(divBtn);
            divBtn.appendChild(editBtn);
            divBtn.appendChild(delBtn);
            divBtn.appendChild(chckBtn);
    }  else {
        window.alert("Please enter a task");
    }

    chckBtn.addEventListener("click", function () {
        const listEntry = this.parentNode.parentNode;
        if (listEntry.parentNode === incompletedTasks) {
            listEntry.remove();
            completedTasks.appendChild(listEntry);
            editBtn.style.display = "none"
            // localStorage key should also tell us which list this paragraph should be added to.
            // afaik localStorage doesn't allow to change keys, so entry needs to remove and created anew.
            window.localStorage.removeItem(`ToDoList inc ${text.innerHTML}`)
            window.localStorage.setItem(`ToDoList comp ${text.innerHTML}`, text.innerHTML);
            console.log(localStorage);
        } else {
            listEntry.remove();
            incompletedTasks.appendChild(listEntry);
            editBtn.style.display = "block"
            window.localStorage.removeItem(`ToDoList comp ${text.innerHTML}`)
            window.localStorage.setItem(`ToDoList inc ${text.innerHTML}`, text.innerHTML);
            console.log(localStorage);
        }
    });

    delBtn.addEventListener("click", function () {
        const listEntry = this.parentNode.parentNode;
        listEntry.parentNode === incompletedTasks ? window.localStorage.removeItem(`ToDoList inc ${text.innerHTML}`) : window.localStorage.removeItem(`ToDoList comp ${text.innerHTML}`)
        listEntry.remove();
        console.log(localStorage)
    });

    editBtn.addEventListener("click", function () {
        let promptInput = prompt("Update your task", text.innerHTML);
        const paragpraphs = (document.getElementsByTagName("p"));
        let duplicate = false;
        for (let i = 0; i <paragpraphs.length; i++) {
            if (promptInput === paragpraphs[i].innerHTML) {
            duplicate = true;
            }
        }
        if (duplicate) {
            window.alert("Task already exists")
        } else if (promptInput !== "") {
            window.localStorage.removeItem(`ToDoList inc ${text.innerHTML}`)
            text.innerText = promptInput;
            window.localStorage.setItem(`ToDoList inc ${text.innerHTML}`, text.innerHTML);
        } else {
            window.alert("As charming as it would be to have an empty task, but no ;)")
        }
    });
/*window.localStorage.removeItem(`ToDoList inc ${text.innerHTML}`)
                text.innerText = prompt("Update your task", text.innerHTML);
                window.localStorage.setItem(`ToDoList inc ${text.innerHTML}`, text.innerHTML);*/
}

const openPage = () => {
    const incompletedTasks = document.getElementById("incomplete-list");
    const completedTasks = document.getElementById("complete-list");
    for (let i = 0; i <localStorage.length; i++) {
        // only do something if key in localStorage is from this site
        if (localStorage.key(i).includes("ToDoList")) {
            let key = localStorage.key(i) 
            //console.log(window.localStorage.getItem(localStorage.key(i)))
            //console.log(localStorage.key(i))
            const newLi = document.createElement("li");
            const text = document.createElement("p");
            const divBtn = document.createElement("div");
            const editBtn = document.createElement("button");
            const delBtn = document.createElement("button");
            const chckBtn = document.createElement("button");

            editBtn.innerHTML = "<i class='fas fa-pencil-alt'></i>";
            delBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";
            chckBtn.innerHTML = "<i class='fas fa-check-square'></i>";

            text.innerHTML = window.localStorage.getItem(key);
            newLi.appendChild(text);
            newLi.appendChild(divBtn);
            divBtn.appendChild(editBtn);
            divBtn.appendChild(delBtn);
            divBtn.appendChild(chckBtn);
            // add to correct section
            if (key.includes("inc")) {
                incompletedTasks.appendChild(newLi);
            } else if (key.includes("comp")){
                completedTasks.appendChild(newLi);
                editBtn.style.display = "none"
            }
            
            chckBtn.addEventListener("click", function () {
                const listEntry = this.parentNode.parentNode;
                
                if (listEntry.parentNode === incompletedTasks) {
                    listEntry.remove();
                    completedTasks.appendChild(listEntry);
                    editBtn.style.display = "none"
                    // localStorage key should also tell us which list this paragraph should be added to.
                    // afaik localStorage doesn't allow to change keys, so entry needs to remove and created anew.
                    window.localStorage.removeItem(`ToDoList inc ${text.innerHTML}`)
                    window.localStorage.setItem(`ToDoList comp ${text.innerHTML}`, text.innerHTML);
                    console.log(localStorage);
                } else {
                    listEntry.remove();
                    incompletedTasks.appendChild(listEntry);
                    editBtn.style.display = "block"
                    window.localStorage.removeItem(`ToDoList comp ${text.innerHTML}`)
                    window.localStorage.setItem(`ToDoList inc ${text.innerHTML}`, text.innerHTML);
                    console.log(localStorage);
                }
            });
        
            delBtn.addEventListener("click", function () {
                const listEntry = this.parentNode.parentNode;
                listEntry.parentNode === incompletedTasks ? window.localStorage.removeItem(`ToDoList inc ${text.innerHTML}`) : window.localStorage.removeItem(`ToDoList comp ${text.innerHTML}`)
                listEntry.remove();
                console.log(localStorage)
            });
        
            editBtn.addEventListener("click", function () {
                let promptInput = prompt("Update your task", text.innerHTML);
                const paragpraphs = (document.getElementsByTagName("p"));
                let duplicate = false;
                for (let i = 0; i <paragpraphs.length; i++) {
                    if (promptInput === paragpraphs[i].innerHTML) {
                    duplicate = true;
                    }
                }
                if (duplicate) {
                    window.alert("Task already exists")
                } else if (promptInput !== "") {
                    window.localStorage.removeItem(`ToDoList inc ${text.innerHTML}`)
                    text.innerText = promptInput;
                    window.localStorage.setItem(`ToDoList inc ${text.innerHTML}`, text.innerHTML);
                } else {
                    window.alert("As charming as it would be to have an empty task, but no ;)")
                }
            });   
        }
        
    }
}

addButton.addEventListener("click", addInput);
input.addEventListener("keyup", (e)=>{
    (e.keyCode === 13 ? addInput(e) : null);
})

/*    MediaQuery */


const changePlaceholderText = () => {
    let x = window.matchMedia("(max-width: 400px)")
    if (x.matches) {
        document.getElementsByTagName("input")[0].setAttribute("placeholder", "Task");
    } else {
        document.getElementsByTagName("input")[0].setAttribute("placeholder", "Enter your task");
    }
}


changePlaceholderText();
window.addEventListener('resize', changePlaceholderText);


/*   End Of  MediaQuery */

openPage();
console.log(localStorage)
// a