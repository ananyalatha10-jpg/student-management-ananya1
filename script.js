// Dummy Student Data

let students = [
    {
        regNo: "23IT001",
        name: "Arun Kumar",
        email: "arun@gmail.com",
        phone: "9876543210",
        department: "IT",
        year: "III"
    },

    {
        regNo: "23CSE002",
        name: "Priya Sharma",
        email: "priya@gmail.com",
        phone: "9876543211",
        department: "CSE",
        year: "III"
    },

    {
        regNo: "24ECE003",
        name: "Rahul Kumar",
        email: "rahul@gmail.com",
        phone: "9876543212",
        department: "ECE",
        year: "II"
    },

    {
        regNo: "22MECH004",
        name: "Karthik Raj",
        email: "karthik@gmail.com",
        phone: "9876543213",
        department: "MECH",
        year: "IV"
    }
];


// Page Navigation

function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    if (pageId === "students") {
        displayStudents();
    }

    updateDashboard();
}


// Display Students

function displayStudents() {

    const table = document.getElementById("studentTable");

    const search = document
        .getElementById("search")
        .value
        .toLowerCase();

    const department = document
        .getElementById("departmentFilter")
        .value;

    const year = document
        .getElementById("yearFilter")
        .value;

    const sort = document
        .getElementById("sortFilter")
        .value;


    let filtered = students.filter(student => {

        const matchesSearch =
            student.name.toLowerCase().includes(search) ||
            student.regNo.toLowerCase().includes(search);

        const matchesDepartment =
            department === "" ||
            student.department === department;

        const matchesYear =
            year === "" ||
            student.year === year;

        return matchesSearch &&
               matchesDepartment &&
               matchesYear;
    });


    // Sorting

    if (sort === "nameAsc") {
        filtered.sort((a,b) => a.name.localeCompare(b.name));
    }

    if (sort === "nameDesc") {
        filtered.sort((a,b) => b.name.localeCompare(a.name));
    }

    if (sort === "regAsc") {
        filtered.sort((a,b) => a.regNo.localeCompare(b.regNo));
    }

    if (sort === "regDesc") {
        filtered.sort((a,b) => b.regNo.localeCompare(a.regNo));
    }


    table.innerHTML = "";


    if (filtered.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;padding:30px;">
                    No students found
                </td>
            </tr>
        `;

        return;
    }


    filtered.forEach(student => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${student.regNo}</td>

            <td>${student.name}</td>

            <td>${student.department}</td>

            <td>${student.year}</td>

            <td>${student.email}</td>

            <td>${student.phone}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent('${student.regNo}')">
                    ✏️ Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent('${student.regNo}')">
                    🗑️ Delete
                </button>

            </td>
        `;

        table.appendChild(row);
    });
}


// Add Student

document.getElementById("studentForm").addEventListener("submit", function(event) {

    event.preventDefault();


    const regNo = document.getElementById("regNo").value.trim();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const department = document.getElementById("department").value;
    const year = document.getElementById("year").value;


    // Duplicate Register Number

    const duplicate = students.some(
        student => student.regNo.toLowerCase() === regNo.toLowerCase()
    );

    if (duplicate) {
        alert("Register Number already exists!");
        return;
    }


    // Add new student

    students.push({
        regNo,
        name,
        email,
        phone,
        department,
        year
    });


    alert("Student added successfully!");


    document.getElementById("studentForm").reset();

    updateDashboard();

    showPage("students");

});


// Delete Student

function deleteStudent(regNo) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
        return;
    }


    students = students.filter(
        student => student.regNo !== regNo
    );


    alert("Student deleted successfully!");

    displayStudents();

    updateDashboard();
}


// Edit Student

function editStudent(regNo) {

    const student = students.find(
        student => student.regNo === regNo
    );

    if (!student) return;


    const newName = prompt(
        "Enter new student name:",
        student.name
    );

    if (newName === null || newName.trim() === "") {
        return;
    }


    student.name = newName.trim();

    alert("Student updated successfully!");

    displayStudents();
}


// Dashboard

function updateDashboard() {

    document.getElementById("totalStudents").innerText =
        students.length;


    const it = students.filter(
        student => student.department === "IT"
    ).length;

    const cse = students.filter(
        student => student.department === "CSE"
    ).length;

    const ece = students.filter(
        student => student.department === "ECE"
    ).length;

    const mech = students.filter(
        student => student.department === "MECH"
    ).length;


    document.getElementById("itCount").innerText = it;
    document.getElementById("cseCount").innerText = cse;
    document.getElementById("eceCount").innerText = ece;

    document.getElementById("itCount2").innerText = it;
    document.getElementById("cseCount2").innerText = cse;
    document.getElementById("eceCount2").innerText = ece;
    document.getElementById("mechCount").innerText = mech;
}


// Initial Load

updateDashboard();
displayStudents();