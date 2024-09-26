let student = [];
let currentPage = 1;
const rowsPerPage = 5;
let filteredStudents = student;

const addStudents = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const lastName = document.getElementById("lastName").value;

  student.push({ name, lastName });
  console.log(student);

  document.getElementById("lastName").value = null;

  window.location.href = "index.html";

  renderTable();
};

const renderTable = () => {
  const tbody = document.getElementById("bodytable");
  tbody.innerHTML = "";

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedStudents = filteredStudents.slice(start, end);

  paginatedStudents.forEach((student) => {
    let row = document.createElement("tr");
    row.innerHTML =
      "<td>" + student.name + "</td><td>" + student.lastName + "</td>";
    tbody.appendChild(row);
  });

  const rowsToFill = rowsPerPage - paginatedStudents.length;
  for (let i = 0; i < rowsToFill; i++) {
    let emptyRow = document.createElement("tr");
    emptyRow.innerHTML = "<td>&nbsp;</td><td>&nbsp;</td>";
    tbody.appendChild(emptyRow);
  }

  updatePagination();
};

const updatePagination = () => {
  const totalPages = Math.ceil(student.length / rowsPerPage);

  document.getElementById(
    "pageNumber"
  ).innerText = `Página ${currentPage} de ${totalPages}`;

  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
};

const changePage = (direction) => {
  const totalPages = Math.ceil(student.length / rowsPerPage);

  currentPage += direction;

  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  renderTable();
};

const searchTable = () => {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();

  const filteredStudents = student.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchInput) ||
      student.lastName.toLowerCase().includes(searchInput)
    );
  });

  renderFilteredTable(filteredStudents);
};

const renderFilteredTable = (filteredStudents) => {
  const tbody = document.getElementById("bodytabla");
  tbody.innerHTML = "";

  filteredStudents.forEach((student) => {
    let row = document.createElement("tr");
    row.innerHTML =
      "<td>" + student.name + "</td><td>" + student.lastName + "</td>";
    tbody.appendChild(row);
  });
};

window.onload = () => {
  renderTable();
};
