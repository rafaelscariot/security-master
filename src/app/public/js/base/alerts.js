const alerts = document.querySelector("#alerts");

// get regions
$.ajax({
  method: "GET",
  url: `/activitie/${localStorage.getItem("JWT")}`,
})
  .done((data) => {
    data.forEach((activitie, index) => {
      let tr = document.createElement("tr");

      const date = new Date(activitie.occurredDate);

      tr.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${activitie.occurredRegion}</td>
            <td>${activitie.type}</td>
            <td>${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}</td>
        `;

      alerts.appendChild(tr);
    });
  })
  .fail((data) => {
    console.log(data.responseJSON.message.replace("Error: Error: ", ""));
  });
