let regionDetections = {};
let labels = [];
let detections = [];

$.ajax({
  method: "GET",
  url: `/region/${localStorage.getItem("JWT")}`,
}).done((data) => {
  data.forEach((region) => {
    let regionName = region.name;
    labels.push(regionName);
    regionDetections[regionName] = 0;
  });
});

$.ajax({
  method: "GET",
  url: `/activitie/${localStorage.getItem("JWT")}`,
})
  .done((data) => {
    data.forEach((activitie) => {
      if (activitie.occurredRegion in regionDetections) {
        regionName = activitie.occurredRegion;
        regionDetections[regionName]++;
      }
    });

    Object.values(regionDetections).forEach((value) => {
      detections.push(value);
    });

    let ctx = document.getElementById("activitieRegionHour").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Total de atividades por região",
            data: detections,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      },
      tension: 0.1,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  })
  .fail((data) => {
    console.log(data.responseJSON.message.replace("Error: Error: ", ""));
  });
