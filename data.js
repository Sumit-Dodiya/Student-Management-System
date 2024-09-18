function fetchdata() {
  fetch("fetch_data.php")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //   console.log(data);
      data.forEach((row) => {
        let tableBody = document.getElementById("tablebody");
        let tr = document.createElement("tr");
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
    });
}
fetchdata();

function editRecord(id) {
  fetch(`update.php?id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Populate the form fields with the fetched data
      document.getElementById("updateId").value = data[0].id;
      document.getElementById("updateName").value = data[0].name;
      document.getElementById("updateEmail").value = data[0].email;
      document.getElementById("updatePhone").value = data[0].phone;
      document.getElementById("updateAddress").value = data[0].address;

      // Set gender radio button
      // document.querySelector(`input[name="gender"][value="${data.gender}"]`).checked = true;
      console.log(data[0].gender);
      let genderRadio = document.querySelector(
        `input[name="gender"][value="${data[0].gender}"]`
      );
      if (genderRadio) {
        genderRadio.checked = true;
      } else {
        console.error("Gender value not found or incorrect:", data[0].gender);
      }
      // Set course checkboxes

      const courses = data[0].course.split(','); // Convert course string to an array
      console.log(courses)
      document.querySelectorAll('input[name="course"]').forEach((checkbox) => {
        checkbox.checked = courses.includes(checkbox.value);
      });

      document.getElementById("updatePassword").value = data[0].password;

      // Show the edit form
      document.getElementById("editForm").style.display = "block";
    })
    .catch((error) => console.error("Error fetching record:", error));
}

//send updated data
document.getElementById("updateForm").addEventListener("submit", (event) => {
  event.preventDefault();
  let courses = [];
  document
    .querySelectorAll('input[name="course"]:checked')
    .forEach((checkbox) => {
      courses.push(checkbox.value);
    });
  let newCourse = courses.toString();
  let data = {
    id: document.getElementById("updateId").value,
    name: document.getElementById("updateName").value,
    email: document.getElementById("updateEmail").value,
    phone: document.getElementById("updatePhone").value,
    address: document.getElementById("updateAddress").value,
    gender: document.querySelector('input[name="gender"]:checked').value,
    course: newCourse,
    password: document.getElementById("updatePassword").value,
  };

  console.log(data);
  fetch("update.php", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result.message);
      alert(result.message); // Show success or error message
      document.getElementById("editForm").style.display = "none"; // Hide the edit form
        // fetchdata(); // Refresh the table data
        window.location.reload();
      return false;
    })
    .catch((error) => console.error("Error updating record:", error));
});

function closeForm() {
  console.log("close");
  document.getElementById("editForm").style.display = "none";
}
