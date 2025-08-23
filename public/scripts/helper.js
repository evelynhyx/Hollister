// scripts/include.js
document.addEventListener("DOMContentLoaded", () => {
  // Load header
  fetch("../public/partials/header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;
    })
    .catch(err => console.error("Header load error:", err));

  // // Load footer
  // fetch("../partials/footer.html")
  //   .then(res => res.text())
  //   .then(data => {
  //     document.getElementById("footer").innerHTML = data;
  //   })
  //   .catch(err => console.error("Footer load error:", err));
});