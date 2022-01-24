let errorAlert = $("#alert-error");
let successAlert = $("#alert-success");

$("#btnRegister").click(() => {
  let name = $("#inputName").val();
  let description = $("#inputDescription").val();
  let ipCam = $("#inputIpCam").val();
  let startTime = $("#inputStartTime").val();
  let endTime = $("#inputEndTime").val();

  if (!name || !description || !ipCam) {
    successAlert.css("display", "none");
    errorAlert.text("Campos inválidos");
    errorAlert.css("display", "block");
  } else {
    (startTime = startTime.length === 0 ? "" : startTime),
      (endTime = endTime.length === 0 ? "" : endTime),
      $.ajax({
        method: "POST",
        url: "/region",
        data: {
          token: localStorage.getItem("JWT"),
          name,
          description,
          ipCam,
          startTime,
          endTime,
          camStatus: "Ativa",
        },
      })
        .done(() => {
          errorAlert.css("display", "none");
          successAlert.text("Região cadastrada");
          successAlert.css("display", "block");
          region = "";
          description = "";
          ipCam = "";
          startTime = "";
          endTime = "";
          window.location.replace("/securitymaster/region");
        })
        .fail((data) => {
          successAlert.css("display", "none");
          errorAlert.text(
            data.responseJSON.message.replace("Error: Error: ", "")
          );
          errorAlert.css("display", "block");
        });
  }
});

// get regions
$.ajax({
  method: "GET",
  url: `/region/${localStorage.getItem("JWT")}`,
})
  .done((data) => {
    let divRegions = document.querySelector("#regions");

    data.forEach((e, index) => {
      let btn = document.createElement("button");
      btn.addEventListener("click", () => {
        $.ajax({
          method: "DELETE",
          url: `/region/${e.name}`,
        })
          .done(() => {
            tr = document.getElementById(index + 1);
            tr.remove();
            window.location.replace("/securitymaster/region");
          })
          .fail((data) => {
            console.info(data.responseJSON.message.replace("Error: ", ""));
          });
      });
      btn.style.color = "white";
      btn.className = "btn";
      btn.innerHTML = '<i class="bi bi-x-circle"></i>';

      let td = document.createElement("td");
      td.appendChild(btn);

      let tr = document.createElement("tr");
      tr.id = index + 1;

      const time =
        e.startTime.length === 0 ? "24 horas" : e.startTime + " - " + e.endTime;

      tr.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${e.name}</td>
            <td>${e.description}</td>
            <td>${time}</td>
        `;

      let btnCamStatus = document.createElement("button");

      btnCamStatus.addEventListener("click", () => {
        $.ajax({
          method: "PUT",
          url: `/region/${e.name}`,
          data: {
            camStatus: e.camStatus,
          },
        })
          .done(() => {
            window.location.replace("/securitymaster/region");
          })
          .fail((data) => {
            console.info(data.responseJSON.message.replace("Error: ", ""));
          });
      });

      btnCamStatus.style.background = "lightgray";
      btnCamStatus.style.color = "black";
      btnCamStatus.style.border = "1px solid white";
      btnCamStatus.style.borderRadius = "5px";
      btnCamStatus.textContent = `${e.camStatus} - Clique para alterar`;

      let tdCamStatus = document.createElement("td");
      tdCamStatus.appendChild(btnCamStatus);
      tr.appendChild(tdCamStatus);

      tr.appendChild(td);
      divRegions.appendChild(tr);
    });
  })
  .fail((data) => {
    console.info(data.responseJSON.message.replace("Error: Error: ", ""));
  });
