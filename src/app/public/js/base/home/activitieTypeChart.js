let activitieTypes = {
  car: 0,
  motorbike: 0,
  person: 0,
  bike: 0,
  bus: 0,
};

$.ajax({
  method: "GET",
  url: `/activitie/${localStorage.getItem("JWT")}`,
})
  .done((data) => {
    data.forEach((activitie) => {
      activitie.type == "Carro" ? activitieTypes.car++ : activitieTypes.car;
      activitie.type == "Motocicleta"
        ? activitieTypes.motorbike++
        : activitieTypes.motorbike;
      activitie.type == "Pessoa"
        ? activitieTypes.person++
        : activitieTypes.person;
      activitie.type == "Ônibus" ? activitieTypes.bus++ : activitieTypes.bus;
      activitie.type == "Bicicleta"
        ? activitieTypes.bike++
        : activitieTypes.bike;
    });

    let ctx = document.getElementById("activitieTypeChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Pessoa", "Carro", "Motocicleta", "Bicicleta", "Ônibus"],
        datasets: [
          {
            label: "Número total de atividades suspeitas por tipo de evento",
            data: [
              activitieTypes.person,
              activitieTypes.car,
              activitieTypes.motorbike,
              activitieTypes.bike,
              activitieTypes.bus,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
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
