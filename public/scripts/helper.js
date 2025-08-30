// // scripts/include.js
// document.addEventListener("DOMContentLoaded", () => {
//   // Load header
//   fetch("../public/partials/header.html", {mode: 'no-cors'})
//     .then(res => res.text())
//     .then(data => {
//       document.getElementById("header").innerHTML = data;
//     })
//     .catch(err => console.error("Header load error:", err));

//   // // Load footer
//   // fetch("../partials/footer.html")
//   //   .then(res => res.text())
//   //   .then(data => {
//   //     document.getElementById("footer").innerHTML = data;
//   //   })
//   //   .catch(err => console.error("Footer load error:", err));
// });

async function inject(id, relativePath) {
  // Build path relative to *this script’s* location
  const url = new URL(relativePath, import.meta.url);

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);

    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  } catch (err) {
    console.error(`Failed to load ${relativePath}:`, err);
  }
}

// Inject header and footer
inject("header", "../partials/header.html");
inject("footer", "../partials/footer.html");

