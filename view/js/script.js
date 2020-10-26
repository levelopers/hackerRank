const headers = ['SL', 'Date', 'Diagnosis', 'Weight', 'Doctor'];
const url = "https://jsonmock.hackerrank.com/api"

let patientId;
let tableHeader = document.getElementById("table-header");
let tableBody = document.getElementById("table-body");

var loader = document.getElementById('loader-view');
loader.style.display = "none";

var button = document.getElementById('submit-btn');
button.disabled = true;
button.addEventListener('click', function () {
    if (patientId) {
        loader.style.display = ""
        axios.get(url + '/medical_records?userId=' + patientId)
            .then(function (response) {
                createTable(response.data);
                loader.style.display = "none"
            }).catch(function (err) {
                loader.style.display = "none"
            })
    }
})

function onSelectChange(id) {
    button.disabled = false;
    patientId = id;
}

function createTable(data) {
    var headerRow = '';
    headers.forEach(function (h) {
        if (!h) return;
        headerRow += `<td>${h}</td>`
    })
    tableHeader.innerHTML += "<tr>" + headerRow + "</tr>"

    let bodyStr = ''
    data.data.forEach(function (d) {
        let row = "<td>" + d.id + "</td>"
            + `<td>${new Date(d.timestamp).toLocaleDateString()}</td>`
            + `<td>${d.diagnosis.name}</td>`
            + `<td>${d.meta.weight}</td>`
            + `<td>${d.doctor.name}</td>`
        bodyStr += "<tr>" + row + "</tr>"
    })
    tableBody.innerHTML = bodyStr;
}



