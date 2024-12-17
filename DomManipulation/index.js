// Menu data structure
var menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
      {text: 'all', href: '/catalog/all'},
      {text: 'top selling', href: '/catalog/top'},
      {text: 'search', href: '/catalog/search'},
    ]},
    {text: 'orders', href: '#' , subLinks: [
      {text: 'new', href: '/orders/new'},
      {text: 'pending', href: '/orders/pending'},
      {text: 'history', href: '/orders/history'},
    ]},
    {text: 'account', href: '#', subLinks: [
      {text: 'profile', href: '/account/profile'},
      {text: 'sign out', href: '/account/signout'},
    ]},
];

// PART 1
let mainEl = document.querySelector("main");
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = `<h1>DOM Manipulation</h1>`;
mainEl.classList.add('flex-ctr');

// PART 2
let topMenuEl = document.querySelector("#top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
topMenuEl.classList.add('flex-around');

for (let i = 0; i < menuLinks.length; i++) {
    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", menuLinks[i].href);
    linkElement.textContent = menuLinks[i].text;
    topMenuEl.appendChild(linkElement);
}

// PART 3
let subMenuEl = document.querySelector("#sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

// PART 4
let topMenuLinks = topMenuEl.querySelectorAll("a");

// Helper function to dynamically build the submenu
function buildSubmenu(subLinks) {
    subMenuEl.innerHTML = "";
    subLinks.forEach(link => {
        const linkEl = document.createElement("a");
        linkEl.setAttribute("href", link.href);
        linkEl.textContent = link.text;
        subMenuEl.appendChild(linkEl);
    });
}

// Event listener for topMenuEl
topMenuEl.addEventListener("click", function(event) {
    event.preventDefault();
    if (event.target.tagName !== "A") return;

    topMenuLinks.forEach(link => link.classList.remove("active"));
    event.target.classList.add("active");

    const clickedLink = menuLinks.find(link => link.text === event.target.textContent);

    if (clickedLink && clickedLink.subLinks) {
        subMenuEl.style.top = "100%";
        buildSubmenu(clickedLink.subLinks);
    } else {
        subMenuEl.style.top = "0";
        subMenuEl.innerHTML = "";
    }
});

subMenuEl.addEventListener("click", function(event) {
    // Prevent default behavior
    event.preventDefault();

    // Return if the clicked element is not an <a>
    if (event.target.tagName !== "A") return;

    // Log the content of the <a> element
    console.log(event.target.textContent);

    // Set the CSS top property of subMenuEl to 0 to hide it
    subMenuEl.style.top = "0";

    // Remove the active class from all <a> elements in topMenuLinks
    topMenuLinks.forEach(link => link.classList.remove("active"));

    // Update the content of mainEl with an <h1> containing the <a>'s content
    if (event.target.textContent === "about") {
        mainEl.innerHTML = `<h1>About</h1>`;
    } else {
        mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
    }
});
