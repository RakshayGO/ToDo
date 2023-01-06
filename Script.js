
function searchfunction() {
    let filter = document.getElementById('searched').value.toUpperCase();
    console.log(filter);
    let data = document.getElementById('tableBody');
    let tr = data.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
        td1 = tr[i].getElementsByTagName('td')[0];
        td2 = tr[i].getElementsByTagName('td')[1];

        td1text = td1.textContent.toUpperCase();
        td2text = td2.textContent.toUpperCase();

        if (td1text.indexOf(filter) > -1 || td2text.indexOf(filter) > -1) {
            tr[i].style.display = "";
        }
        else {
            tr[i].style.display = "none";
        }
    }
}


function getAndUpdate() {
    console.log("Updating List...");
    tit = document.getElementById('title').value;
    document.getElementById('title').value = '';
    desc = document.getElementById('description').value;
    document.getElementById('description').value = '';
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    update();
}

function update() {
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    // Populate the table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td> 
            <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td> 
            </tr>`;
    });
    tableBody.innerHTML = str;
}
add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();

function deleted(itemIndex) {
    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();

}

function clearStorage() {
    if (confirm("Do you areally want to clear?")) {
        console.log('Clearing the storage')
        localStorage.clear();
        update()
    }
}