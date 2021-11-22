const isLast7days = (date) => {
  let last7days = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
  return date >= last7days ? true : false;
};

let activitieDays = {
  sunday: 0,
  monday: 0,
  tuesday: 0,
  wednesday: 0,
  thursday: 0,
  friday: 0,
  saturday: 0,
};

$.ajax({
  method: "GET",
  url: `/activitie/${localStorage.getItem("JWT")}`,
})
  .done((data) => {
    data.forEach((activitie) => {
      occurredDate = new Date(activitie.occurredDate);

      if (isLast7days(occurredDate)) {
        // 0 - sunday, 1 - monday, 2 - tuesday, 3 - wednesday, 4 - thursday, 5 - friday, 6 - saturday
        occurredActivitieDay = occurredDate.getDay();

        occurredActivitieDay === 0
          ? activitieDays.sunday++
          : activitieDays.sunday;
        occurredActivitieDay === 1
          ? activitieDays.monday++
          : activitieDays.monday;
        occurredActivitieDay === 2
          ? activitieDays.tuesday++
          : activitieDays.tuesday;
        occurredActivitieDay === 3
          ? activitieDays.wednesday++
          : activitieDays.wednesday;
        occurredActivitieDay === 4
          ? activitieDays.thursday++
          : activitieDays.thursday;
        occurredActivitieDay === 5
          ? activitieDays.friday++
          : activitieDays.friday;
        occurredActivitieDay === 6
          ? activitieDays.saturday++
          : activitieDays.saturday;
      }
    });

    let ctx = document.getElementById("last7daysActivitie").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Domingo",
          "Segunda-feira",
          "Terça-feira",
          "Quarta-feira",
          "Quinta-feira",
          "Sexta-feira",
          "Sábado",
        ],
        datasets: [
          {
            label: "Eventos dos últimos 7 dias por dia da semana",
            data: [
              activitieDays.sunday,
              activitieDays.monday,
              activitieDays.tuesday,
              activitieDays.wednesday,
              activitieDays.thursday,
              activitieDays.friday,
              activitieDays.saturday,
            ],
            backgroundColor: ["rgba(54, 162, 235, 0.2)"],
            borderColor: ["rgba(75, 192, 192, 1)"],
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
