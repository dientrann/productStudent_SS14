let students = [
  {
    id: Date.now() * Math.random(),
    studentName: "Trần Văn A",
    studentPhone: "0964968163",
    studentAge: 20,
    studentSex: true, //True: Nam
  },
  {
    id: Date.now() * Math.random(),
    studentName: "Trần Văn B",
    studentPhone: "0964968163",
    studentAge: 10,
    studentSex: true, //True: Nam
  },
];

function renderTable(students) {
  let tableBodyEl = document.getElementById("tableBody");
  let dataTable = ``;
  let i = 1;
  for (let student of students) {
    dataTable += `
        <tr>
        <td><input type="checkbox" class="check" name="${
          student.id
        }" onclick="itemCheck()" /></td>
          <td>${i++}</td>
          <td>${student.studentName}</td>
          <td>${student.studentPhone}</td>
          <td>${student.studentAge}</td>
          <td>${student.studentSex ? "Nam" : "Nữ"}</td>
          <td>
            <button type="button" onclick="showModalUpdate(), renderModalUpdate(${
              student.id
            })" class="btn btn-success">Update</button>
            <button type="button" onclick="showModal(), renderDelete(${
              student.id
            })" class="btn btn-danger">Delete</button>
          </td>
        </tr>
        `;
  }
  tableBodyEl.innerHTML = dataTable;
}
renderTable(students);

let statusStudents = false;
function sortFolowAge() {
  let sortStudentAge = [...students];
  if (!statusStudents) {
    for (let i = 0; i < sortStudentAge.length - 1; i++) {
      for (let j = i + 1; j < sortStudentAge.length; j++) {
        if (sortStudentAge[i].studentAge > sortStudentAge[j].studentAge) {
          let temp = sortStudentAge[i];
          sortStudentAge[i] = sortStudentAge[j];
          sortStudentAge[j] = temp;
        }
      }
    }
    renderTable(sortStudentAge);
    statusStudents = true;
  } else {
    renderTable(students);
    statusStudents = false;
  }
}

function addStudent(event) {
  event.preventDefault();

  let newStudent = {
    id: Date.now() * Math.random(),
    studentName: event.target.studentName.value,
    studentPhone: event.target.studentPhone.value,
    studentAge: event.target.studentAge.value,
    studentSex: event.target.sex.value == "Nam" ? true : false,
  };
  students.push(newStudent);

  renderTable(students);
}

function deleteStudent(studentID) {
  for (let i in students) {
    if (students[i].id == studentID) {
      students.splice(i, 1);
    }
  }
  renderTable(students);
}

function updateStudent(event, studentID) {
  event.preventDefault();

  for (let i in students) {
    if (students[i].id == studentID) {
      students[i] = {
        ...students[i],
        studentName:
          event.target.studentName.value == ""
            ? students[i].studentName
            : event.target.studentName.value,
        studentPhone:
          event.target.studentPhone.value == ""
            ? students[i].studentPhone
            : event.target.studentPhone.value,
        studentAge:
          event.target.studentAge.value == ""
            ? students[i].studentAge
            : event.target.studentAge.value,
        studentSex: event.target.sex.value == "Nam" ? true : false,
      };
      break;
    }
  }
  renderTable(students);
}
function searchStudents(event) {
  event.preventDefault();

  let dataSearch = event.target.search.value.toLowerCase();
  let listSearch = [];

  for (let student of students) {
    if (student.studentName.toLowerCase().includes(dataSearch)) {
      listSearch.push(student);
    }
  }
  renderTable(listSearch);
}

function studentsCheck() {
  let checkEl = document.getElementsByClassName("check");
  let studentsIdCheck = [];

  for (let check of checkEl) {
    if (check.checked) {
      studentsIdCheck.push(check.name);
    }
  }
  return studentsIdCheck;
}

function deleteStudentsCheck() {
  let checkStudents = studentsCheck();
  for (let idStudent of checkStudents) {
    deleteStudent(idStudent);
  }
}

function checkAll() {
  let checkAllEl = document.getElementById("checkAll");
  let itemChecks = document.getElementsByClassName("check");
  if (checkAllEl.checked) {
    for (let check of itemChecks) {
      check.checked = true;
    }
  } else {
    for (let check of itemChecks) {
      check.checked = false;
    }
  }
}

function itemCheck() {
  let checkAllEl = document.getElementById("checkAll");
  let itemChecks = document.getElementsByClassName("check");
  for (let i in itemChecks) {
    if (!itemChecks[i].checked) {
      checkAllEl.checked = false;
      break;
    }
    if (itemChecks[itemChecks.length - 1].checked) {
      checkAllEl.checked = true;
      break;
    }
  }
}

//Modal Delete

function showModal() {
  let modalDeleteEl = document.getElementById("modalDelete");
  modalDeleteEl.style.display = "block";
  window.onclick = function (event) {
    if (event.target == modalDeleteEl) {
      modalDeleteEl.style.display = "none";
    }
  };
}

function closeModal() {
  let modalDeleteEl = document.getElementById("modalDelete");
  modalDeleteEl.style.display = "none";
}

function renderDeleteList() {
  let checkStudents = studentsCheck();
  let dataCheck = `<h5>Danh Sách Xóa:</h5>`;
  for (let id of checkStudents) {
    for (let student of students) {
      if (student.id == id) {
        dataCheck += `<p>${student.studentName}</p>`;
      }
    }
  }
  document.getElementById("listDelete").innerHTML = dataCheck;
  document.getElementById("btnModal").innerHTML = `
  <button
    type="button"
    class="btn btn-danger"
    onclick="deleteStudentsCheck(),closeModal()"
  >
  Delete
  </button>
  <button type="button" class="btn btn-secondary" onclick="closeModal()">
    Cancel
  </button>`;
}

function renderDelete(studentID) {
  let dataDelete = ``;
  for (let student of students) {
    if (student.id == studentID) {
      dataDelete += `
          <h6>Name: ${student.studentName}</h6>
          <p>Phone: ${student.studentPhone}</p>
          <p>Age: ${student.studentAge}</p>
          <p>Sex: ${student.studentSex ? "Nam" : "Nữ"} </p>
        `;
    }
  }
  document.getElementById("listDelete").innerHTML = dataDelete;
  document.getElementById("btnModal").innerHTML = `
  <button
    type="button"
    class="btn btn-danger"
    onclick="deleteStudent(${studentID}),closeModal()"
  >
  Delete
  </button>
  <button type="button" class="btn btn-secondary" onclick="closeModal()">
    Cancel
  </button>`;
}

// Modal Update

function showModalUpdate() {
  let modalUpdateEl = document.getElementById("modalUpdate");
  modalUpdateEl.style.display = "block";

  window.onclick = function (event) {
    if (event.target == modalUpdateEl) {
      modalUpdateEl.style.display = "none";
    }
  };
}

function closeModalUpdate() {
  let modalDeleteEl = document.getElementById("modalUpdate");
  modalDeleteEl.style.display = "none";
}

function renderModalUpdate(studentID) {
  let studentUpdate = {};
  for (let student of students) {
    if (student.id == studentID) {
      studentUpdate = student;
    }
  }

  document.getElementById("bodyModalUpdate").innerHTML = `
  <form id="updateStudent" onsubmit="closeModalUpdate(), updateStudent(event,${studentID})">
  Name:
  <div class="form-floating mb-3">
    <input
      type="text"
      class="form-control"
      id="inputName"
      placeholder="Name"
      name="studentName"
    />
    <label for="inputName">${studentUpdate.studentName}</label>
  </div>
  Phone:
  <div class="form-floating mb-3">
    <input
      type="text"
      class="form-control"
      id="inputPhone"
      placeholder="Phone"
      name="studentPhone"
    />
    <label for="inputPhone">${studentUpdate.studentPhone}</label>
  </div>
  Age:
  <div class="form-floating mb-3">
    <input
      type="number"
      class="form-control"
      id="inputAge"
      placeholder="Age"
      name="studentAge"
    />
    <label for="inputAge">${studentUpdate.studentAge}</label>
  </div>
  <div id="radioSex">
    <div class="form-check mb-3">
      <input
        class="form-check-input"
        type="radio"
        name="sex"
        value="Nam"
        id="radioNam"
      />
      <label class="form-check-label" for="flexRadioDefault1">
        Nam
      </label>
    </div>
    <div class="form-check mb-3">
      <input
        class="form-check-input"
        type="radio"
        name="sex"
        value="Nữ"
        id="radioNu"
      />
      <label class="form-check-label" for="flexRadioDefault2">
        Nữ
      </label>
    </div>
  </div>
  <div id="btnModalUpdate">
    <button type="submit" class="btn btn btn-success">Update</button>
    <button
      type="button"
      class="btn btn-secondary"
      onclick="closeModalUpdate()"
    >
      Cancel
    </button>
  </div>
  </form>
  `;
  if (studentUpdate.studentSex) {
    document.getElementById("radioNam").checked = true;
  } else {
    document.getElementById("radioNu").checked = true;
  }
}
