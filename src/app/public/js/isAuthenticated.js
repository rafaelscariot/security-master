const jwt = localStorage.getItem("JWT");

if (!jwt) {
  window.location.replace("/error");
}

$.ajax({
  method: "POST",
  url: "/token/validator",
  data: { token: jwt },
}).fail(() => {
  window.location.replace("/error");
});
