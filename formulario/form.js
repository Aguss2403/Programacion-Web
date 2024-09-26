/*javascrip manipula DOM (document object mmodel) osea los elementos de html (TODO lo que este en body)
*/
let student = [];

const addStudents = (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;

    student.push({name, lastName});
    console.log(student);

    showTable();

    document.getElementById('name').value = null;
    document.getElementById('lastName').value = null;

};

const showTable = () => {
    const tbody = document.getElementById('bodytabla');
    tbody.innerHTML = "";

    student.forEach((student)=> {
        let row = document.createElement('tr');
        row.innerHTML = '<td>' + student.name + '</td><td>' + student.lastName + '</td>';
        
        tbody.appendChild(row);
    }); 
};
