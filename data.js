
function fetchdata(){

    fetch("fetch_data.php").
    then((res)=>{
        return res.json();
    })
    .then((data)=>{
        console.log(data);
        data.forEach(row => {
            let tableBody = document.getElementById("tablebody");
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.name}</td>
                <td>${row.email}</td>
                <td>${row.phone}</td>
                <td>${row.address}</td>
                <td>${row.gender}</td>
                <td>${row.course}</td>
                <td><button onclick="editRecord(${row.id})">Edit</button></td>
            `;
            tableBody.appendChild(tr);
        });
    })
}

fetchdata();