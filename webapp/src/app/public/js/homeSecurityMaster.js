// var ctx = document.getElementById("myChart").getContext('2d');
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ["Quintal", "Varanda", "Garagem", "Área de serviço"],
//         datasets: [{
//             label: 'Atividades suspeitas',
//             data: [12, 19, 3, 5],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255,99,132,1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });

// var ctxL = document.getElementById("lineChart").getContext('2d');
// var myLineChart = new Chart(ctxL, {
//     type: 'line',
//     data: {
//         labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
//         datasets: [{
//             label: "Atividades suspeitas",
//             data: [65, 59, 80, 81, 56, 62],
//             backgroundColor: [
//                 'rgba(105, 0, 132, .2)',
//             ],
//             borderColor: [
//                 'rgba(200, 99, 132, .7)',
//             ],
//             borderWidth: 2
//         }
//         ]
//     },
//     options: {
//         responsive: true
//     }
// });

// function formatDate(date) {
//     var dd = date.getDate();
//     var mm = date.getMonth() + 1;
//     var yyyy = date.getFullYear();
//     if (dd < 10) { dd = '0' + dd }
//     if (mm < 10) { mm = '0' + mm }
//     date = dd + '/' + mm + '/' + yyyy;
//     return date
// }

// var last7days = [];
// for (var i = 0; i < 7; i++) {
//     var d = new Date();
//     d.setDate(d.getDate() - i);
//     last7days.push(formatDate(d))
// }

// const userId = localStorage.getItem('userID');

// let xhr = new XMLHttpRequest();
// xhr.open("POST", 'http://localhost:3000/search/alerts', true);
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.send(JSON.stringify({
//     userID: userId
// }));

// xhr.onreadystatechange = function () {
//     if (this.readyState != 4) return;

//     if (this.status == 200) {
//         let response = JSON.parse(this.responseText);

//         let last7daysActivities = {
//             '1': 0,
//             '2': 0,
//             '3': 0,
//             '4': 0,
//             '5': 0,
//             '6': 0,
//             '7': 0
//         }

//         response.forEach(alert => {
//             day = alert.date.split('/');
//             if (day[0].length === 1) {
//                 day = '0'+alert.date;
//             } else {
//                 day = alert.date;
//             }

//             if (day === last7days[0]) {
//                 last7daysActivities['1']++;
//             } else if (day === last7days[1]) {
//                 last7daysActivities['2']++;
//             } else if (day === last7days[2]) {
//                 last7daysActivities['3']++;
//             } else if (day === last7days[3]) {
//                 last7daysActivities['4']++;
//             } else if (day === last7days[4]) {
//                 last7daysActivities['5']++;
//             } else if (day === last7days[5]) {
//                 last7daysActivities['6']++;
//             } else if (day === last7days[6]) {
//                 last7daysActivities['7']++;
//             }
//         });

//         let hours = {
//             '1': 0,
//             '2': 0,
//             '3': 0,
//             '4': 0,
//             '5': 0
//         }

//         response.forEach(alert => {
//             let alertHour = alert.hour.replace(':', '.');
//             let floatHour = parseFloat(alertHour);

//             if (floatHour >= 0.00 && floatHour <= 5.00) {
//                 hours['1']++;
//             } else if (floatHour >= 5.1 && floatHour <= 10.00) {
//                 hours['2']++;
//             } else if (floatHour >= 10.01 && floatHour <= 15.00) {
//                 hours['3']++;
//             } else if (floatHour >= 15.01 && floatHour <= 20.00) {
//                 hours['4']++;
//             } else if (floatHour >= 20.01 && floatHour <= 23.59) {
//                 hours['5']++;
//             }
//         });

//         new Chart(document.getElementById("horizontalBar"), {
//             "type": "horizontalBar",
//             "data": {
//                 "labels": ["00:00 - 05:00", "05:01 - 10:00", "10:01 - 15:00", "15:01 - 20:00", "20:01 - 23:59"],
//                 "datasets": [{
//                     "label": "Atividades suspeitas",
//                     "data": [hours['1'], hours['2'], hours['3'], hours['4'], hours['5']],
//                     "fill": false,
//                     "backgroundColor": [" rgba(54, 162, 235, 0.2)", "rgba(255, 159, 64, 0.2)",
//                         "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(201, 203, 207, 0.2)"
//                     ],
//                     "borderColor": ["rgb(54, 162, 235)", "rgb(255, 159, 64)", "rgb(255, 205, 86)",
//                         "rgb(75, 192, 192)", "rgba(201, 203, 207)"
//                     ],
//                     "borderWidth": 1
//                 }]
//             },
//             "options": {
//                 "scales": {
//                     "xAxes": [{
//                         "ticks": {
//                             "beginAtZero": true
//                         }
//                     }]
//                 }
//             }
//         });

//         var ctx = document.getElementById("myChart7").getContext('2d');
//         var myChart = new Chart(ctx, {
//             type: 'bar',
//             data: {
//                 labels: [last7days[0], last7days[1], last7days[2], last7days[3], last7days[4], last7days[5], last7days[6]],
//                 datasets: [{
//                     label: 'Atividades suspeitas',
//                     data: [last7daysActivities['1'], last7daysActivities['2'], last7daysActivities['3'], last7daysActivities['4'], last7daysActivities['5'], last7daysActivities['6'], last7daysActivities['7']],
//                     backgroundColor: [
//                         'rgba(255, 99, 132, 0.2)',
//                         'rgba(54, 162, 235, 0.2)',
//                         'rgba(255, 206, 86, 0.2)',
//                         'rgba(75, 192, 192, 0.2)',
//                         'rgba(255, 99, 132, 0.2)',
//                         'rgba(54, 162, 235, 0.2)',
//                         'rgba(255, 206, 86, 0.2)',
//                     ],
//                     borderColor: [
//                         'rgba(255,99,132,1)',
//                         'rgba(54, 162, 235, 1)',
//                         'rgba(255, 206, 86, 1)',
//                         'rgba(75, 192, 192, 1)',
//                         'rgba(255,99,132,1)',
//                         'rgba(54, 162, 235, 0.2)',
//                         'rgba(255, 206, 86, 0.2)',
//                     ],
//                     borderWidth: 1
//                 }]
//             },
//             options: {
//                 scales: {
//                     yAxes: [{
//                         ticks: {
//                             beginAtZero: true
//                         }
//                     }]
//                 }
//             }
//         });
//     }
// };
