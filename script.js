document.addEventListener("DOMContentLoaded", function () {
  // --- DOM ELEMENTS (Simplified for Public View Only) ---
  // We only need elements relevant to the public sections now.
  const publicPageContainer = document.getElementById("public-page-container"); // The main public page container

  // No login/logout elements needed for a public-only view
  // const loginForm = document.getElementById("login-form");
  // const loginError = document.getElementById("login-error");
  // const logoutBtn = document.getElementById("logout-btn");
  // const sidebar = document.getElementById("sidebar");
  // const pageTitle = document.getElementById("page-title");
  // const userGreeting = document.getElementById("user-greeting");
  // const studentModal = document.getElementById("studentModal");
  // const teacherModal = document.getElementById("teacherModal");

  // --- MOCK DATA (Not relevant for this public-only display, but keeping minimal structure) ---
  // Users, students, teachers data is effectively unused as there's no login/admin features.
  const users = []; // No users needed
  let students = []; // No student data directly rendered
  let teachers = []; // No teacher data directly rendered

  // --- INITIALIZATION ---
  // For a public-only view, we directly set up public navigation and show the default section.
  function initializePublicViewOnly() {
    setupPublicNavigation(); // Set up navigation listeners for public view
    // Show the initial section based on hash or default to #home
    showPublicSection(window.location.hash);
  }
  // --- PUBLIC NAVIGATION SETUP ---
  function setupPublicNavigation() {
    // target header for click events
    const publicHeader = document.querySelector(
      "#public-page-container header"
    );
    const aboutUsPublicMenu = document.getElementById("about-us-public-menu");

    if (publicHeader) {
      publicHeader.addEventListener("click", function (e) {
        const link = e.target.closest(".public-nav-link");
        if (link) {
          e.preventDefault(); // prevent browser's default link
          window.location.hash = link.getAttribute("href"); // update the url
        }
        const toggle = e.target.closest("#about-us-public-toggle");
        if (toggle) {
          document
            .getElementById("about-us-public-dropdown")
            .classList.toggle("hidden"); // toggle dropdown visibility
        }
      });
      // close the "About Us" dropdown if a click occures outside of it.
      window.addEventListener("click", function (e) {
        if (aboutUsPublicMenu && !aboutUsPublicMenu.contains(e.target)) {
          this.document
            .getElementById("about-us-public-dropdown")
            .classList.add("hidden");
        }
      });
    }
    // Listen for hash changes to show/hide public section.
    window.addEventListener("hashchange", () => {
      showPublicSection(window.location.hash);
    });
  }
  // Manage the display of sections on the public page.
  function showPublicSection(hash) {
    const sections = document.querySelectorAll(".public-section");
    const defaultHash = "#home";
    const normalizedHash = hash || defaultHash;
    console.log(normalizedHash);

    // Hide all public sections first
    sections.forEach((section) => section.classList.add("hidden"));

    // valid public view hashes
    const activeSectionId = `${normalizedHash.substring(1)} - public`;
    console.log(activeSectionId);
    let activeSection = document.getElementById(activeSectionId);
    let validHashes = ["#home", "#news", "#intro", "#faculty"];

    if (activeSection && validHashes.includes(normalizedHash)) {
      // show the target public section .
      activeSection.classList.remove("hidden");
      // Render contenct based on the active public section.
      switch (normalizedHash) {
        case "#home":
          renderHome(document.getElementById("home-public"));
          break;
        case "#news":
          renderNews(document.getElementById("#news"));
          break;
        case "#intro":
          renderIntro(document.getElementById("intro-public"));
          break;
        case "#faculty":
          renderFaculty(document.getElementById("faculty-public"));
          break;
      }
    } else {
      // if unknow or invalid hash, default to home page
      window.location.hash = "#home";
      const homeSection = document.getElementById("home-public");
      homeSection.classList.remove("hidden");
      renderHome(homeSection);
    }
  }

  // Render function for dynamic content
  function renderHome(container) {
    container.innerHTML = `

                <div id="home-public" class="public-section">
                <div class="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h2 class="text-4xl font-bold text-gray-800 mb-4">Welcome to Hamro School (Public View)</h2>
                    <p class="text-gray-600 text-xl">Excellence in Education, Foundation for the Future.</p>
                    <p class="text-gray-500 mt-4">This is the public home page. Please log in to access more features.
                    </p>
                </div>
                <hr class="my-8 border-gray-300">
            </div>
    
    `;
  }
  // initial app load
  initializePublicViewOnly();
});
