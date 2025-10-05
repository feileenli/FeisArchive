const content = document.getElementById("content");
const basePath = "/FeisArchive";

// load a page into <main> 
async function loadPage(path) {
  //default
  let page = "pages/home.html";

  if (path === "/outfits") page = "pages/outfits.html";
  if (path === "/writing") page = "pages/writing.html"; 

  try {
    const res = await fetch(page);
    const html = await res.text();

    // temp div will contain the main content we want
    const temp = document.createElement("div"); 
    temp.innerHTML = html;

    // grab the main content we want  
    const main = temp.querySelector("main"); 
    if (main) {
      content.innerHTML = main.innerHTML; 
    }
  } catch (err) {
    content.innerHTML = "<h2>404 Not Found</h2>";
  }

}

// handle link clicks 
document.addEventListener("click", e => {
  //when a link is clicked, grab that link object
  const link = e.target.closest("a[data-link]"); 

  if (link) {
    // prevent the default event of a link being clicked
    e.preventDefault();
    // instead, load the page with the url in that link object 
    const url = link.getAttribute("href"); 
    // history.pushState(null, "", url);
    history.pushState(null, "", basePath + url);
    loadPage(url);
  }
});

// handle back/forward buttons 
window.addEventListener("popstate", () => {
  loadPage(location.pathname);
});

// load the current page on first visit 
loadPage(location.pathname); 

