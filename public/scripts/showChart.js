var collectedData = JSON.parse(collectedDataGlobal.features);
console.log(collectedData);

var dots = parseInt(collectedData.dots);
var container = document.getElementById('container');

//ДАННЫЕ

var labelArr = [];
for (let i = 0; i < dots; i++) {
    labelArr.push(`${i/10}мс`);
}

for (let i = 0; i < collectedData.measures.length; i++) {
    let tmpID = `graph_${i}`;
    let tmpDiv = document.createElement('canvas');
    tmpDiv.classList.add('graphBucket');
    tmpDiv.setAttribute('id', tmpID);
    container.appendChild(tmpDiv);
    var hrr = document.createElement('hr')
    container.appendChild(hrr)
}

for (let i = 0; i < collectedData.measures.length; i++) {
    let labels = labelArr;
    var data = {
        labels: labels,
        datasets: [{
            label: `Напряжение`,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: collectedData.measures[i],
        }]
    };
    
    var config = {
        type: 'line',
        data: data,
        options: {}
    };
    var myChart = new Chart(
        document.getElementById(`graph_${i}`),
        config
    );
}

var amplitude;
var period;
var frequency;

var rounded = function(number){
    return +number.toFixed(4);
}

var amplitudeDiv = document.getElementById('aplitude');
amplitudeDiv.innerHTML += `${rounded(Math.max.apply(null, collectedData.measures[0]) - Math.min.apply(null, collectedData.measures[0]))}В`
console.log(amplitude);

// function randomInteger(min, max) {
//     let rand = min + Math.random() * (max + 1 - min);
//     return Math.floor(rand);
// }

// var randArr = [];
// var labelArr = [];

// const labels = labelArr;

// const data = {
// labels: labels,
// datasets: [{
//         label: 'My First dataset',
//         backgroundColor: 'rgb(255, 99, 132)',
//         borderColor: 'rgb(255, 99, 132)',
//         data: randArr,
//     }]
// };

// const config = {
//     type: 'line',
//     data: data,
//     options: {}
// };

// const myChart = new Chart(
//     document.getElementById('myChart'),
//     config
// );