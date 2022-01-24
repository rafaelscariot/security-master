const isLast24hrs = (date) => {
  let yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  return date >= yesterday;
};

let activitieTimes = {
  "00:00 - 05:00": 0,
  "05:01 - 10:00": 0,
  "10:01 - 15:00": 0,
  "15:01 - 20:00": 0,
  "20:01 - 23:59": 0,
};

$.ajax({
  method: "GET",
  url: `/activitie/${localStorage.getItem("JWT")}`,
})
  .done((data) => {
    data.forEach((activitie) => {
      if (isLast24hrs(new Date(activitie.occurredDate))) {
        let activitieHour = `${new Date(
          activitie.occurredDate
        ).getHours()}.${new Date(activitie.occurredDate).getMinutes()}`;

        activitieHour >= 0.0 && activitieHour <= 5.0
          ? activitieTimes["00:00 - 05:00"]++
          : activitieTimes["00:00 - 05:00"];
        activitieHour >= 5.01 && activitieHour <= 10.0
          ? activitieTimes["05:01 - 10:00"]++
          : activitieTimes["05:01 - 10:00"];
        activitieHour >= 10.01 && activitieHour <= 15.0
          ? activitieTimes["10:01 - 15:00"]++
          : activitieTimes["10:01 - 15:00"];
        activitieHour >= 15.01 && activitieHour <= 20.0
          ? activitieTimes["15:01 - 20:00"]++
          : activitieTimes["15:01 - 20:00"];
        activitieHour >= 20.01 && activitieHour <= 23.59
          ? activitieTimes["20:01 - 23:59"]++
          : activitieTimes["20:01 - 23:59"];
      }
    });

    let ctx = document.getElementById("last24hrsActivities").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "00:00 - 05:00",
          "05:01 - 10:00",
          "10:01 - 15:00",
          "15:01 - 20:00",
          "20:01 - 23:59",
        ],
        datasets: [
          {
            label: "Registros das últimas 24 horas por intervalo de horário",
            data: [
              activitieTimes["00:00 - 05:00"],
              activitieTimes["05:01 - 10:00"],
              activitieTimes["10:01 - 15:00"],
              activitieTimes["15:01 - 20:00"],
              activitieTimes["20:01 - 23:59"],
            ],
            backgroundColor: ["rgba(153, 102, 255, 0.2)"],
            borderColor: ["rgba(153, 102, 255, 1)"],
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
    console.info(data.responseJSON.message.replace("Error: Error: ", ""));
  });
