
// global variable
const button = document.querySelectorAll("button");
const tasks = document.querySelectorAll(".tasks");
const inputs = document.querySelectorAll("input");

// use localstorage to save tasks
let list_one;
let list_two;
let list_three;
// localStorage.clear()

// list one of plans
function listone() {
    if (localStorage.getItem("list_one")) {
        list_one = JSON.parse(localStorage.getItem("list_one"));
        list_one.forEach((l, i) => {
            tasks[0].innerHTML += ` <div class="task" draggable="true">
        <p>${list_one[i]}</p>
        <div class="actions">
            <img src="imgs/icons8-edit-24.png" alt="" class="edit">
            <img src="imgs/icons8-trash-24 (1).png" alt="" class="trash">
        </div>
        </div>`
        })
    }
    else {
        list_one = [];
        localStorage.setItem("list_one", JSON.stringify(list_one));
    }
}
listone();

// list two of inprogress
function listtwo() {
    if (localStorage.getItem("list_two")) {
        list_two = JSON.parse(localStorage.getItem("list_two"));
        list_two.forEach((l, i) => {
            tasks[1].innerHTML += ` <div class="task" draggable="true">
        <p>${list_two[i]}</p>
        <div class="actions">
            <img src="imgs/icons8-edit-24.png" alt="" class="edit">
            <img src="imgs/icons8-trash-24 (1).png" alt="" class="trash">
        </div>
        </div>`
        })
    }
    else {
        list_two = [];
        localStorage.setItem("list_two", JSON.stringify(list_two));
    }
}
listtwo()

// list three of completed
function listthree() {
    if (localStorage.getItem("list_three")) {
        list_three = JSON.parse(localStorage.getItem("list_three"));
        list_three.forEach((l, i) => {
            tasks[2].innerHTML += ` <div class="task" draggable="true">
        <p>${list_three[i]}</p>
        <div class="actions">
            <img src="imgs/icons8-edit-24.png" alt="" class="edit">
            <img src="imgs/icons8-trash-24 (1).png" alt="" class="trash">
        </div>
        </div>`
        })
    }
    else {
        list_three = [];
        localStorage.setItem("list_three", JSON.stringify(list_three));
    }
}
listthree()


// variable contain elemnt drag 
let drag = null;
// function to add task
function addTask() {
    button.forEach((btn, index) => {
        btn.addEventListener("click", function () {
            if (inputs[index].value != "") {
                tasks[index].innerHTML += ` <div class="task" draggable="true">
<p>${inputs[index].value}</p>
<div class="actions">
    <img src="imgs/icons8-edit-24.png" alt="" class="edit">
    <img src="imgs/icons8-trash-24 (1).png" alt="" class="trash">
</div>
</div>`}
            // add task to localstorage
            if (inputs[index].value != "") {
                if (index === 0) {
                    list_one.push(inputs[index].value);
                    localStorage.setItem("list_one", JSON.stringify(list_one));
                }
                if (index === 1) {
                    list_two.push(inputs[index].value);
                    localStorage.setItem("list_two", JSON.stringify(list_two));
                }
                if (index === 2) {
                    list_three.unshift(inputs[index].value);
                    localStorage.setItem("list_three", JSON.stringify(list_three));
                }
            }
            inputs[index].value = '';
            drag_drop_item();
        });
    });
    trashitem();
    edit();
}
addTask();


// function remove element when drag
function remove_drag_elemnt_from_localstorage(i, data) {
    switch (i) {
        case 0:
            list_one = JSON.parse(localStorage.getItem("list_one"));
            list_one = list_one.filter(l => {
                return l !== data;
            })
            localStorage.setItem("list_one", JSON.stringify(list_one));
            break;
        case 1:
            list_two = JSON.parse(localStorage.getItem("list_two"));
            list_two = list_two.filter(l => {
                return l !== data;
            })
            localStorage.setItem("list_two", JSON.stringify(list_two));
            break;
        case 2:
            list_three = JSON.parse(localStorage.getItem("list_three"));
            list_three = list_three.filter(l => {
                return l !== data;
            })
            localStorage.setItem("list_three", JSON.stringify(list_three));
            break;
    }
}

// function add element when drop
function add_drop_elemnt_from_localstorage(i, data) {
    switch (i) {
        case 0:
            list_one = JSON.parse(localStorage.getItem("list_one"));
            list_one.push(data);
            localStorage.setItem("list_one", JSON.stringify(list_one));
            break;
        case 1:
            list_two = JSON.parse(localStorage.getItem("list_two"));
            list_two.push(data);
            localStorage.setItem("list_two", JSON.stringify(list_two));
            break;
        case 2:
            list_three = JSON.parse(localStorage.getItem("list_three"));
            list_three.push(data);
            localStorage.setItem("list_three", JSON.stringify(list_three));
            break;
    }
}

// function to drag item and drop
function drag_drop_item() {
    const items = document.querySelectorAll(".task");
    // variable to know any category [plans ,inprogress,completed] do darg and drop 
    let x, y;
    items.forEach((item) => {
        tasks.forEach((task, i) => {
            task.addEventListener("dragstart", function () {
                x = i;
            })
            task.addEventListener("dragover", function (e) {
                e.preventDefault();
                this.style.background = "rgba(0, 0, 0, 0.09)";
            });

            task.addEventListener("dragleave", function () {
                this.style.background = "white";
            });
            task.addEventListener("drop", function () {
                this.append(drag);
                this.style.background = "white";
                y = i;
            });
        })

        item.addEventListener("dragstart", function (e) {
            this.style.opacity = "0.5";
            drag = item;
        });

        item.addEventListener("dragend", function () {
            this.style.opacity = "1";
            drag = null;
            let data = item.firstElementChild.innerHTML;
            remove_drag_elemnt_from_localstorage(x, data)
            add_drop_elemnt_from_localstorage(y, data)
        });
    });
    trashitem();
    edit();
}

drag_drop_item();

// function to delete task
function trashitem() {
    const trash = document.querySelectorAll(".trash");
    const items = document.querySelectorAll(".task");

    trash.forEach((t, i) => {
        t.addEventListener("click", function () {
            let data = items[i].firstElementChild.innerHTML;
            if (localStorage.getItem("list_one")) {
                list_one = JSON.parse(localStorage.getItem("list_one"));
                list_one = list_one.filter(l => {
                    return l !== data;
                })
                localStorage.setItem("list_one", JSON.stringify(list_one));
            }
            if (localStorage.getItem("list_two")) {
                list_two = JSON.parse(localStorage.getItem("list_two"));
                list_two = list_two.filter(l => {
                    return l !== data;
                })
                localStorage.setItem("list_two", JSON.stringify(list_two));
            }
            if (localStorage.getItem("list_three")) {
                list_three = JSON.parse(localStorage.getItem("list_three"));
                list_three = list_three.filter(l => {
                    return l !== data;
                })
                localStorage.setItem("list_three", JSON.stringify(list_three));
            }
            items[i].remove();
        })
    });
}
trashitem();

// function to edit task
function edit() {
    const edit = document.querySelectorAll(".edit");
    const task = document.querySelectorAll(".task");
    edit.forEach((t, i) => {
        t.addEventListener("click", function () {
            // p contain paragraph
            const p = task[i].firstElementChild;
            // old data
            const data1 = task[i].firstElementChild.innerHTML;
            // create input
            const input = document.createElement('input');
            input.value = p.textContent;
            p.parentNode.replaceChild(input, p);
            input.focus();

            input.addEventListener('blur', function () {
                const updatedContent = input.value;
                console.log(updatedContent);
                if (localStorage.getItem("list_one")) {
                    list_one = JSON.parse(localStorage.getItem("list_one"));
                    const index = list_one.findIndex(item => item === data1);
                    list_one[index] = updatedContent;
                    localStorage.setItem("list_one", JSON.stringify(list_one));
                }
                if (localStorage.getItem("list_two")) {
                    list_two = JSON.parse(localStorage.getItem("list_two"));
                    const index = list_two.findIndex(item => item === data1);
                    list_two[index] = updatedContent;
                    localStorage.setItem("list_two", JSON.stringify(list_two));
                }
                if (localStorage.getItem("list_three")) {
                    list_three = JSON.parse(localStorage.getItem("list_three"));
                    const index = list_three.findIndex(item => item === data1);
                    list_three[index] = updatedContent;
                    localStorage.setItem("list_three", JSON.stringify(list_three));
                }
                input.parentNode.replaceChild(p, input);
                p.textContent = updatedContent;
            });

        })

    })
}
edit();





