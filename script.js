document.addEventListener("DOMContentLoaded", function () {
  // --- STATE MANAGEMENT ---
  // Stores the currently logged-in user object
  let currentUser = null;

  // --- DOM ELEMENTS ---
  // References to key HTML elements for manipulation
  const loginPage = document.getElementById("login-page");
  const appContainer = document.getElementById("app-container");
  const loginForm = document.getElementById("login-form");
  const loginError = document.getElementById("login-error");
  const logoutBtn = document.getElementById("logout-btn");
  const sidebar = document.getElementById("sidebar");
  const pageTitle = document.getElementById("page-title");
  const userGreeting = document.getElementById("user-greeting");
  const studentModal = document.getElementById("studentModal");
  const teacherModal = document.getElementById("teacherModal");

  // --- MOCK DATA ---
  // In-memory data for users, students, and teachers.
  // In a real application, this would come from a backend API or database.
  const users = [
    { username: "admin", password: "password", role: "admin" },
    {
      username: "student1",
      password: "password",
      role: "student",
      studentId: 1,
    },
    {
      username: "student2",
      password: "password",
      role: "student",
      studentId: 2,
    },
  ];

  let students = [
    {
      id: 1,
      name: "Alice Johnson",
      grade: "10",
      academicYear: "2024-2025",
      contact: "alice@example.com",
      address: "123 Maple St, Springfield",
      parent: "John Johnson",
      marks: { Math: 95, Science: 88, History: 92, English: 94 },
    },
    {
      id: 2,
      name: "Bob Smith",
      grade: "11",
      academicYear: "2024-2025",
      contact: "bob@example.com",
      address: "456 Oak Ave, Springfield",
      parent: "Jane Smith",
      marks: { Math: 82, Science: 76, History: 88, English: 85 },
    },
    {
      id: 3,
      name: "Charlie Brown",
      grade: "9",
      academicYear: "2024-2025",
      contact: "charlie@example.com",
      address: "789 Pine Ln, Springfield",
      parent: "Chris Brown",
      marks: { Math: 78, Science: 81, History: 75, English: 80 },
    },
    {
      id: 4,
      name: "Diana Prince",
      grade: "10",
      academicYear: "2024-2025",
      contact: "diana@example.com",
      address: "101 Elm Ct, Springfield",
      parent: "Diana Prince Sr.",
      marks: { Math: 99, Science: 95, History: 98, English: 97 },
    },
    {
      id: 5,
      name: "Ethan Hunt",
      grade: "12",
      academicYear: "2024-2025",
      contact: "ethan@example.com",
      address: "212 Birch Rd, Springfield",
      parent: "Ethan Hunt Sr.",
      marks: { Math: 89, Science: 91, History: 85, English: 88 },
    },
    {
      id: 6,
      name: "Fiona Glenanne",
      grade: "11",
      academicYear: "2024-2025",
      contact: "fiona@example.com",
      address: "321 Cedar Dr, Springfield",
      parent: "Michael Westen",
      marks: { Math: 91, Science: 93, History: 89, English: 92 },
    },
    {
      id: 7,
      name: "George Costanza",
      grade: "10",
      academicYear: "2024-2025",
      contact: "george@example.com",
      address: "456 Walnut St, Springfield",
      parent: "Frank Costanza",
      marks: { Math: 72, Science: 68, History: 75, English: 78 },
    },
    {
      id: 8,
      name: "Harry Potter",
      grade: "9",
      academicYear: "2024-2025",
      contact: "harry@example.com",
      address: "4 Privet Drive, Springfield",
      parent: "James Potter",
      marks: { Math: 88, Science: 90, History: 85, English: 87 },
    },
    {
      id: 9,
      name: "Irene Adler",
      grade: "12",
      academicYear: "2024-2025",
      contact: "irene@example.com",
      address: "221B Baker St, Springfield",
      parent: "Mr. Adler",
      marks: { Math: 96, Science: 94, History: 97, English: 98 },
    },
    {
      id: 10,
      name: "Jack Sparrow",
      grade: "11",
      academicYear: "2024-2025",
      contact: "jack@example.com",
      address: "The Black Pearl, Springfield",
      parent: "Captain Teague",
      marks: { Math: 65, Science: 70, History: 80, English: 72 },
    },
    {
      id: 11,
      name: "Kate Austen",
      grade: "10",
      academicYear: "2024-2025",
      contact: "kate@example.com",
      address: "Oceanic Flight 815, Springfield",
      parent: "Diane Janssen",
      marks: { Math: 85, Science: 88, History: 82, English: 89 },
    },
    {
      id: 12,
      name: "Luke Skywalker",
      grade: "9",
      academicYear: "2024-2025",
      contact: "luke@example.com",
      address: "Tatooine, Springfield",
      parent: "Darth Vader",
      marks: { Math: 80, Science: 82, History: 78, English: 81 },
    },
    {
      id: 13,
      name: "Michael Scott",
      grade: "12",
      academicYear: "2024-2025",
      contact: "michael@example.com",
      address: "Dunder Mifflin, Springfield",
      parent: "Mr. Scott",
      marks: { Math: 70, Science: 65, History: 72, English: 75 },
    },
    {
      id: 14,
      name: "Neo Anderson",
      grade: "11",
      academicYear: "2024-2025",
      contact: "neo@example.com",
      address: "The Matrix, Springfield",
      parent: "The Architect",
      marks: { Math: 99, Science: 99, History: 99, English: 99 },
    },
    {
      id: 15,
      name: "Olivia Dunham",
      grade: "10",
      academicYear: "2024-2025",
      contact: "olivia@example.com",
      address: "Fringe Division, Springfield",
      parent: "Walter Bishop",
      marks: { Math: 92, Science: 95, History: 90, English: 93 },
    },
    {
      id: 16,
      name: "Peter Parker",
      grade: "9",
      academicYear: "2024-2025",
      contact: "peter@example.com",
      address: "Queens, Springfield",
      parent: "Aunt May",
      marks: { Math: 94, Science: 96, History: 88, English: 91 },
    },
    {
      id: 17,
      name: "Quinn Fabray",
      grade: "12",
      academicYear: "2024-2025",
      contact: "quinn@example.com",
      address: "McKinley High, Springfield",
      parent: "Judy Fabray",
      marks: { Math: 87, Science: 85, History: 92, English: 94 },
    },
    {
      id: 18,
      name: "Rachel Green",
      grade: "11",
      academicYear: "2024-2025",
      contact: "rachel@example.com",
      address: "Central Perk, Springfield",
      parent: "Dr. Leonard Green",
      marks: { Math: 78, Science: 80, History: 85, English: 88 },
    },
    {
      id: 19,
      name: "Sheldon Cooper",
      grade: "10",
      academicYear: "2024-2025",
      contact: "sheldon@example.com",
      address: "Caltech, Springfield",
      parent: "Mary Cooper",
      marks: { Math: 100, Science: 100, History: 95, English: 98 },
    },
    {
      id: 20,
      name: "Tony Stark",
      grade: "12",
      academicYear: "2024-2025",
      contact: "tony@example.com",
      address: "Stark Tower, Springfield",
      parent: "Howard Stark",
      marks: { Math: 98, Science: 99, History: 92, English: 95 },
    },
    {
      id: 21,
      name: "Uhura Nyota",
      grade: "11",
      academicYear: "2024-2025",
      contact: "uhura@example.com",
      address: "USS Enterprise, Springfield",
      parent: "Mr. Uhura",
      marks: { Math: 90, Science: 92, History: 88, English: 94 },
    },
    {
      id: 22,
      name: "Vito Corleone",
      grade: "10",
      academicYear: "2024-2025",
      contact: "vito@example.com",
      address: "Corleone Compound, Springfield",
      parent: "Antonio Andolini",
      marks: { Math: 85, Science: 82, History: 90, English: 86 },
    },
    {
      id: 23,
      name: "Walter White",
      grade: "9",
      academicYear: "2024-2025",
      contact: "walter@example.com",
      address: "308 Negra Arroyo Lane, Springfield",
      parent: "Mr. White",
      marks: { Math: 99, Science: 100, History: 85, English: 90 },
    },
    {
      id: 24,
      name: "Xena Warrior",
      grade: "12",
      academicYear: "2024-2025",
      contact: "xena@example.com",
      address: "Amphipolis, Springfield",
      parent: "Cyrene",
      marks: { Math: 88, Science: 85, History: 95, English: 89 },
    },
    {
      id: 25,
      name: "Yoda Master",
      grade: "11",
      academicYear: "2024-2025",
      contact: "yoda@example.com",
      address: "Dagobah, Springfield",
      parent: "The Force",
      marks: { Math: 95, Science: 95, History: 95, English: 95 },
    },
    {
      id: 26,
      name: "Zelda Princess",
      grade: "10",
      academicYear: "2024-2025",
      contact: "zelda@example.com",
      address: "Hyrule Castle, Springfield",
      parent: "King Rhoam",
      marks: { Math: 92, Science: 90, History: 94, English: 93 },
    },
    {
      id: 27,
      name: "Arthur Dent",
      grade: "9",
      academicYear: "2024-2025",
      contact: "arthur@example.com",
      address: "Earth, Mostly Harmless",
      parent: "Mr. Dent",
      marks: { Math: 75, Science: 72, History: 78, English: 80 },
    },
    {
      id: 28,
      name: "Buffy Summers",
      grade: "12",
      academicYear: "2024-2025",
      contact: "buffy@example.com",
      address: "Sunnydale High, Springfield",
      parent: "Joyce Summers",
      marks: { Math: 89, Science: 87, History: 91, English: 92 },
    },
    {
      id: 29,
      name: "Clark Kent",
      grade: "11",
      academicYear: "2024-2025",
      contact: "clark@example.com",
      address: "Smallville, Springfield",
      parent: "Jonathan Kent",
      marks: { Math: 94, Science: 93, History: 92, English: 95 },
    },
    {
      id: 30,
      name: "Dana Scully",
      grade: "10",
      academicYear: "2024-2025",
      contact: "dana@example.com",
      address: "FBI Headquarters, Springfield",
      parent: "William Scully",
      marks: { Math: 96, Science: 98, History: 93, English: 97 },
    },
  ];

  let teachers = [
    {
      id: 1,
      name: "David Williams",
      subject: "Math",
      contact: "david.w@example.com",
    },
    {
      id: 2,
      name: "Emily Davis",
      subject: "Science",
      contact: "emily.d@example.com",
    },
    {
      id: 3,
      name: "Frank Miller",
      subject: "History",
      contact: "frank.m@example.com",
    },
  ];

  // --- LOGIN/LOGOUT LOGIC ---
  // Handles user login form submission
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    // Find if a user with matching credentials exists
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      currentUser = user; // Set current user
      sessionStorage.setItem("currentUser", JSON.stringify(currentUser)); // Store user in session storage
      initializeApp(); // Initialize the main application view
    } else {
      loginError.classList.remove("hidden"); // Show login error message
    }
  });

  // Handles user logout
  logoutBtn.addEventListener("click", function () {
    currentUser = null; // Clear current user
    sessionStorage.removeItem("currentUser"); // Remove user from session storage
    window.location.hash = "#home"; // Redirect to public home page
    initializePublicView(); // Show the public view
  });

  // Displays the login screen and hides the app container
  function showLoginScreen() {
    appContainer.classList.add("hidden");
    loginPage.classList.remove("hidden");
    sidebar.innerHTML = ""; // Clear sidebar content
    loginError.classList.add("hidden"); // Hide any previous login errors
    loginForm.reset(); // Reset the login form
  }

  // --- INITIALIZATION ---
  // Initializes the application view after a successful login
  function initializeApp() {
    loginPage.classList.add("hidden"); // Hide login page
    appContainer.classList.remove("hidden"); // Show app container

    buildSidebar(currentUser.role); // Build sidebar based on user role
    setupNavigation(); // Set up navigation listeners

    // Display welcome message based on user role
    if (currentUser.role === "admin") {
      userGreeting.textContent = "Welcome, Admin";
    } else if (currentUser.role === "student") {
      const studentData = students.find((s) => s.id === currentUser.studentId);
      userGreeting.textContent = `Welcome, ${studentData.name}`;
    }

    // Define routes accessible by admin and student roles
    const adminRoutes = [
      "#home",
      "#news",
      "#dashboard",
      "#students",
      "#teachers",
      "#calendar",
      "#intro",
      "#faculty",
    ];
    const studentRoutes = [
      "#home",
      "#news",
      "#profile",
      "#marksheet",
      "#idcard",
      "#calendar",
      "#intro",
      "#faculty",
    ];
    let currentHash = window.location.hash;

    let isAuthorized = false;
    // Check if the current hash is authorized for the current user's role
    if (currentUser.role === "admin" && adminRoutes.includes(currentHash)) {
      isAuthorized = true;
    } else if (
      currentUser.role === "student" &&
      studentRoutes.includes(currentHash)
    ) {
      isAuthorized = true;
    }

    // Redirect to home if no hash or unauthorized hash
    if (!currentHash || !isAuthorized) {
      window.location.hash = "#home";
    } else {
      showSection(currentHash); // Show the requested section
    }
  }

  // Initializes the public (not logged in) view
  function initializePublicView() {
    loginPage.classList.remove("hidden"); // Show login page
    appContainer.classList.add("hidden"); // Hide app container
    setupPublicNavigation(); // Set up public navigation listeners
    showPublicSection(window.location.hash); // Show the current public section
  }

  // Dynamically builds the sidebar navigation based on the user's role
  function buildSidebar(role) {
    let sidebarContent = `<div class="px-8 py-6 border-b border-gray-700"><h2 class="text-2xl font-semibold">School Portal</h2></div><nav class="flex-1 px-4 py-4">`;

    // Always include Home, News, and About Us for all roles
    sidebarContent += `
            <a href="#home" class="nav-link flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 rounded-lg"><i class="fas fa-home mr-3"></i> Home</a>
            <a href="#news" class="nav-link flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg"><i class="fas fa-newspaper mr-3"></i> News</a>
            <div class="mt-2">
                <button id="about-us-toggle" class="w-full flex justify-between items-center px-4 py-2 text-gray-100 hover:bg-gray-700 rounded-lg">
                    <span class="flex items-center"><i class="fas fa-info-circle mr-3"></i> About Us</span>
                    <i class="fas fa-chevron-down transform transition-transform duration-200"></i>
                </button>
                <div id="about-us-dropdown" class="hidden pl-8 py-2">
                    <a href="#intro" class="nav-link block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 rounded-lg">Introduction</a>
                    <a href="#faculty" class="nav-link block px-4 py-2 mt-1 text-sm text-gray-200 hover:bg-gray-600 rounded-lg">Faculty</a>
                </div>
            </div>
        `;

    // Add role-specific navigation items
    if (role === "admin") {
      sidebarContent += `
                <a href="#dashboard" class="nav-link flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg"><i class="fas fa-tachometer-alt mr-3"></i> Dashboard</a>
                <a href="#students" class="nav-link flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg"><i class="fas fa-user-graduate mr-3"></i> Students</a>
                <a href="#teachers" class="nav-link flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg"><i class="fas fa-chalkboard-teacher mr-3"></i> Teachers</a>
            `;
    } else if (role === "student") {
      sidebarContent += `
                <a href="#profile" class="nav-link flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg"><i class="fas fa-user-circle mr-3"></i> My Profile</a>
                <a href="#marksheet" class="nav-link flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg"><i class="fas fa-poll-h mr-3"></i> Marksheet</a>
                <a href="#idcard" class="nav-link flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg"><i class="fas fa-id-card mr-3"></i> ID Card</a>
            `;
    }

    sidebarContent += `<a href="#calendar" class="nav-link flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg"><i class="fas fa-calendar-alt mr-3"></i> Calendar</a>`;
    sidebarContent += `</nav>`;
    sidebar.innerHTML = sidebarContent; // Inject generated HTML into sidebar
  }

  // --- NAVIGATION ---
  // Sets up event listeners for internal navigation links (when logged in)
  function setupNavigation() {
    // Listen for hash changes in the URL to show/hide sections
    window.addEventListener("hashchange", () => {
      if (currentUser) showSection(window.location.hash);
    });

    // Handle clicks within the sidebar for navigation and dropdowns
    sidebar.addEventListener("click", function (e) {
      const link = e.target.closest(".nav-link");
      if (link) {
        e.preventDefault(); // Prevent default link behavior
        window.location.hash = link.getAttribute("href"); // Update URL hash
      }

      const toggle = e.target.closest("#about-us-toggle");
      if (toggle) {
        const dropdown = document.getElementById("about-us-dropdown");
        const icon = toggle.querySelector(".fa-chevron-down");
        dropdown.classList.toggle("hidden"); // Toggle dropdown visibility
        icon.classList.toggle("rotate-180"); // Rotate icon for visual feedback
      }
    });
  }

  // Sets up event listeners for public navigation links (when not logged in)
  function setupPublicNavigation() {
    const publicHeader = document.querySelector("#login-page header"); // Target the header for public navigation clicks
    const aboutUsPublicMenu = document.getElementById("about-us-public-menu");
    if (publicHeader) {
      publicHeader.addEventListener("click", function (e) {
        const link = e.target.closest(".public-nav-link");
        if (link) {
          e.preventDefault(); // Prevent default link behavior
          window.location.hash = link.getAttribute("href"); // Update URL hash
        }

        const toggle = e.target.closest("#about-us-public-toggle");
        if (toggle) {
          document
            .getElementById("about-us-public-dropdown")
            .classList.toggle("hidden"); // Toggle dropdown visibility
        }
      });

      // Close dropdown if clicked outside of the About Us menu area
      window.addEventListener("click", function (e) {
        if (!aboutUsPublicMenu.contains(e.target)) {
          document
            .getElementById("about-us-public-dropdown")
            .classList.add("hidden");
        }
      });
    }
    // Listen for hash changes to show/hide public sections
    window.addEventListener("hashchange", () => {
      if (!currentUser) showPublicSection(window.location.hash);
    });
  }

  // Hides all sections and displays the one corresponding to the given hash
  function showSection(hash) {
    const sections = document.querySelectorAll("#app-container .section");
    const defaultHash = "#home";
    const normalizedHash = hash || defaultHash;

    // Hide all sections and clear their content
    sections.forEach((section) => {
      section.innerHTML = "";
      section.classList.remove("active");
    });

    const activeSection = document.querySelector(
      `#app-container ${normalizedHash}`
    );
    if (activeSection) {
      activeSection.classList.add("active"); // Show the active section
      // Update the page title in the header
      pageTitle.textContent =
        normalizedHash.charAt(1).toUpperCase() + normalizedHash.slice(2);

      // Render content based on the active section and user role
      const studentData =
        currentUser.role === "student"
          ? students.find((s) => s.id === currentUser.studentId)
          : null;
      switch (normalizedHash) {
        case "#home":
          renderHome(document.getElementById("home"));
          break;
        case "#news":
          renderNews(document.getElementById("news"));
          break;
        case "#intro":
          renderIntro(document.getElementById("intro"));
          break;
        case "#faculty":
          renderFaculty(document.getElementById("faculty"));
          break;
        case "#dashboard":
          renderAdminDashboard();
          break;
        case "#students":
          renderStudentManagement();
          break;
        case "#teachers":
          renderTeacherManagement();
          break;
        case "#calendar":
          renderCalendar(document.getElementById("calendar"));
          break;
        case "#profile":
          renderStudentProfile(studentData);
          break;
        case "#marksheet":
          renderMarksheet(studentData);
          break;
        case "#idcard":
          renderIdCard(studentData);
          break;
      }
    }
  }

  // Hides all public sections and displays the one corresponding to the given hash
  function showPublicSection(hash) {
    const sections = document.querySelectorAll(".public-section");
    const defaultHash = "#home";
    const normalizedHash = hash || defaultHash;

    sections.forEach((section) => section.classList.add("hidden")); // Hide all public sections

    const activeSectionId = `${normalizedHash.substring(1)}-public`;
    let activeSection = document.getElementById(activeSectionId);
    // Special handling for the login page, as its ID doesn't follow the -public convention
    if (normalizedHash === "#login") {
      activeSection = document.getElementById("login-container");
    }

    if (activeSection) {
      activeSection.classList.remove("hidden"); // Show the active public section
      // Render content for specific public sections
      switch (normalizedHash) {
        case "#home":
          renderHome(document.getElementById("home-public"));
          break;
        case "#news":
          renderNews(document.getElementById("news-public"));
          break;
        case "#intro":
          renderIntro(document.getElementById("intro-public"));
          break;
        case "#faculty":
          renderFaculty(document.getElementById("faculty-public"));
          break;
      }
    } else {
      // If no valid hash, default to home-public
      const homeSection = document.getElementById("home-public");
      homeSection.classList.remove("hidden");
      renderHome(homeSection);
    }
  }

  // --- RENDER FUNCTIONS ---
  // Renders the content for the Home section
  function renderHome(container) {
    container.innerHTML = `
            <div class="bg-white p-8 rounded-lg shadow-lg text-center">
                <h2 class="text-4xl font-bold text-gray-800 mb-4">Welcome to Hamro School</h2>
                <p class="text-gray-600 text-xl">Excellence in Education, Foundation for the Future.</p>
            </div>
        `;
  }

  // Renders the content for the News section
  function renderNews(container) {
    container.innerHTML = `
            <div class="bg-white p-8 rounded-lg shadow-lg">
                <h2 class="text-3xl font-bold text-gray-800 mb-6">Latest News</h2>
                <div class="space-y-6">
                    <div class="border-b pb-4">
                        <h3 class="text-2xl font-semibold text-gray-800">Annual Sports Day Announced</h3>
                        <p class="text-sm text-gray-500 mb-2">July 15, 2025</p>
                        <p class="text-gray-600">Get ready for a day of fun and competition! Our annual sports day will be held on August 10th. Sign-ups for events are now open.</p>
                    </div>
                    <div class="border-b pb-4">
                        <h3 class="text-2xl font-semibold text-gray-800">Science Fair Winners</h3>
                        <p class="text-sm text-gray-500 mb-2">July 10, 2025</p>
                        <p class="text-gray-600">Congratulations to the winners of this year's science fair! The projects were outstanding, showcasing incredible creativity and scientific inquiry.</p>
                    </div>
                    <div>
                        <h3 class="text-2xl font-semibold text-gray-800">Parent-Teacher Meetings</h3>
                        <p class="text-sm text-gray-500 mb-2">July 5, 2025</p>
                        <p class="text-gray-600">Parent-teacher meetings for the current term will be held on July 25th and 26th. Please schedule your appointments through the portal.</p>
                    </div>
                </div>
            </div>
        `;
  }

  // Renders the content for the Introduction (About Us) section
  function renderIntro(container) {
    container.innerHTML = `
            <div class="bg-white p-8 rounded-lg shadow-lg">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">About Hamro School</h2>
                <p class="text-gray-700 text-lg mb-6">
                    Your central hub for managing and accessing all school-related information.
                </p>
                <div class="border-t pt-6">
                    <p class="text-gray-600 mb-4">
                        Hamro School is dedicated to providing a nurturing and challenging environment that encourages high expectations for success. We are committed to fostering a community of learners where students are empowered to reach their full potential. Our curriculum is designed to be comprehensive and is supported by a wide range of co-curricular activities that help in the holistic development of our students.
                    </p>
                    <p class="text-gray-600">
                        Whether you are an administrator, a teacher, or a student, this portal is designed to provide you with the tools and resources you need to succeed.
                    </p>
                </div>
            </div>
        `;
  }

  // Renders the content for the Faculty section, displaying teacher cards
  function renderFaculty(container) {
    let facultyCards = teachers
      .map(
        (teacher) => `
            <div class="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                <div class="p-3 rounded-full bg-indigo-100">
                    <i class="fas fa-chalkboard-teacher text-indigo-500 text-2xl"></i>
                </div>
                <div>
                    <h3 class="text-xl font-semibold text-gray-800">${teacher.name}</h3>
                    <p class="text-gray-600">${teacher.subject}</p>
                    <p class="text-sm text-gray-500">${teacher.contact}</p>
                </div>
            </div>
        `
      )
      .join("");

    container.innerHTML = `
            <h2 class="text-3xl font-bold text-gray-800 mb-6">Our Faculty</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${facultyCards}
            </div>
        `;
  }

  // Renders the Admin Dashboard with key statistics
  function renderAdminDashboard() {
    const dashboard = document.getElementById("dashboard");
    dashboard.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-blue-500 bg-opacity-20"><i class="fas fa-user-graduate text-blue-500 text-2xl"></i></div>
                        <div class="ml-4"><p class="text-gray-600">Total Students</p><p id="total-students-stat" class="text-2xl font-semibold text-gray-900">${students.length}</p></div>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-green-500 bg-opacity-20"><i class="fas fa-chalkboard-teacher text-green-500 text-2xl"></i></div>
                        <div class="ml-4"><p class="text-gray-600">Total Teachers</p><p id="total-teachers-stat" class="text-2xl font-semibold text-gray-900">${teachers.length}</p></div>
                    </div>
                </div>
            </div>`;
  }

  // Renders the Student Management section with list, filters, and add button
  function renderStudentManagement() {
    const container = document.getElementById("students");
    container.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-semibold text-gray-800">Student List</h2>
                    <button id="addStudentBtn" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Add Student</button>
                </div>
                <div class="flex flex-wrap items-end gap-4 mb-4">
                    <div>
                        <label for="gradeFilter" class="block text-sm font-medium text-gray-700">Filter by Grade:</label>
                        <select id="gradeFilter" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"></select>
                    </div>
                    <div>
                        <label for="studentSearch" class="block text-sm font-medium text-gray-700">Search by Name:</label>
                        <input type="text" id="studentSearch" placeholder="Enter student name..." class="mt-1 block w-full pl-3 pr-4 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead><tr class="text-gray-600 bg-gray-50"><th class="py-3 px-4">ID</th><th class="py-3 px-4">Name</th><th class="py-3 px-4">Grade</th><th class="py-3 px-4">Contact</th><th class="py-3 px-4">Actions</th></tr></thead>
                        <tbody id="student-list" class="text-gray-700"></tbody>
                    </table>
                </div>
                <div id="pagination-controls" class="flex justify-between items-center mt-4"></div>
            </div>`;

    setupStudentCrud(); // Initialize CRUD functionalities for students
  }

  // Renders the Teacher Management section with list and add button
  function renderTeacherManagement() {
    const container = document.getElementById("teachers");
    container.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-semibold text-gray-800">Teacher List</h2>
                    <button id="addTeacherBtn" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Add Teacher</button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead><tr class="text-gray-600 bg-gray-50"><th class="py-3 px-4">ID</th><th class="py-3 px-4">Name</th><th class="py-3 px-4">Subject</th><th class="py-3 px-4">Contact</th><th class="py-3 px-4">Actions</th></tr></thead>
                        <tbody id="teacher-list" class="text-gray-700"></tbody>
                    </table>
                </div>
            </div>`;

    setupTeacherCrud(); // Initialize CRUD functionalities for teachers
  }

  // --- STUDENT-SPECIFIC RENDER FUNCTIONS ---
  // Renders the student's personal profile
  function renderStudentProfile(studentData) {
    const container = document.getElementById("profile");
    if (!studentData) {
      container.innerHTML = `<div class="p-6 text-red-500 font-semibold">You do not have permission to view this page or the student data is not available.</div>`;
      return;
    }
    container.innerHTML = `
            <div class="bg-white p-8 rounded-lg shadow-lg">
                <div class="flex items-center mb-6">
                    <img class="h-24 w-24 rounded-full object-cover mr-6" src="https://placehold.co/100x100/6366f1/white?text=${studentData.name.charAt(
                      0
                    )}" alt="Student avatar">
                    <h2 class="text-3xl font-bold text-gray-800">${
                      studentData.name
                    }</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                    <div><p class="font-semibold text-gray-600">Student ID:</p><p class="text-lg text-gray-900">${
                      studentData.id
                    }</p></div>
                    <div><p class="font-semibold text-gray-600">Academic Year:</p><p class="text-lg text-gray-900">${
                      studentData.academicYear
                    }</p></div>
                    <div><p class="font-semibold text-gray-600">Grade:</p><p class="text-lg text-gray-900">${
                      studentData.grade
                    }</p></div>
                    <div><p class="font-semibold text-gray-600">Contact Email:</p><p class="text-lg text-gray-900">${
                      studentData.contact
                    }</p></div>
                    <div><p class="font-semibold text-gray-600">Parent/Guardian:</p><p class="text-lg text-gray-900">${
                      studentData.parent
                    }</p></div>
                    <div class="md:col-span-2"><p class="font-semibold text-gray-600">Address:</p><p class="text-lg text-gray-900">${
                      studentData.address
                    }</p></div>
                </div>
            </div>`;
  }

  // Renders the student's marksheet with subject-wise marks, total, and average
  function renderMarksheet(studentData) {
    const container = document.getElementById("marksheet");
    if (!studentData) {
      container.innerHTML = `<div class="p-6 text-red-500 font-semibold">You do not have permission to view this page or the student data is not available.</div>`;
      return;
    }
    const marks = studentData.marks;
    const subjects = Object.keys(marks);
    const totalMarks = subjects.reduce(
      (acc, subject) => acc + marks[subject],
      0
    );
    const average = (totalMarks / subjects.length).toFixed(2);

    let tableRows = subjects
      .map(
        (subject) => `
            <tr class="border-b border-gray-200">
                <td class="py-3 px-4">${subject}</td>
                <td class="py-3 px-4 text-center">${marks[subject]}</td>
                <td class="py-3 px-4 text-center">${
                  marks[subject] >= 40
                    ? '<span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Pass</span>'
                    : '<span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full">Fail</span>'
                }</td>
            </tr>
        `
      )
      .join("");

    container.innerHTML = `
            <div class="bg-white p-8 rounded-lg shadow-lg">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">Marksheet for ${studentData.name} (${studentData.academicYear})</h2>
                    <button id="download-marksheet-btn" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center">
                        <i class="fas fa-download mr-2"></i> Download PDF
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead><tr class="text-gray-600 bg-gray-50"><th class="py-3 px-4">Subject</th><th class="py-3 px-4 text-center">Marks (out of 100)</th><th class="py-3 px-4 text-center">Status</th></tr></thead>
                        <tbody class="text-gray-700">${tableRows}</tbody>
                        <tfoot>
                            <tr class="font-bold bg-gray-100"><td class="py-4 px-4 text-right">Total Marks:</td><td class="py-4 px-4 text-center">${totalMarks}</td><td></td></tr>
                            <tr class="font-bold bg-gray-100"><td class="py-4 px-4 text-right">Average Percentage:</td><td class="py-4 px-4 text-center">${average}%</td><td></td></tr>
                        </tfoot>
                    </table>
                </div>
            </div>`;

    // Attach event listener for PDF download
    document
      .getElementById("download-marksheet-btn")
      .addEventListener("click", () => downloadMarksheetAsPDF(studentData));
  }

  // Renders the student's ID card
  function renderIdCard(studentData) {
    const container = document.getElementById("idcard");
    if (!studentData) {
      container.innerHTML = `<div class="p-6 text-red-500 font-semibold">You do not have permission to view this page or the student data is not available.</div>`;
      return;
    }

    container.innerHTML = `
            <div class="flex flex-col items-center">
                <div class="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
                    <div class="flex flex-col items-center">
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">Hamro School</h2>
                        <img class="h-32 w-32 rounded-full object-cover my-4" src="https://placehold.co/128x128/6366f1/white?text=${studentData.name.charAt(
                          0
                        )}" alt="Student avatar">
                        <h3 class="text-xl font-semibold text-gray-800">${
                          studentData.name
                        }</h3>
                        <p class="text-gray-600">Student ID: ${
                          studentData.id
                        }</p>
                        <p class="text-gray-600">Grade: ${studentData.grade}</p>
                        <p class="text-gray-600">Academic Year: ${
                          studentData.academicYear
                        }</p>
                    </div>
                </div>
                <button id="download-idcard-btn" class="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center">
                    <i class="fas fa-download mr-2"></i> Download ID Card
                </button>
            </div>
        `;

    // Attach event listener for ID card PDF download
    document
      .getElementById("download-idcard-btn")
      .addEventListener("click", () => downloadIdCardAsPDF(studentData));
  }

  // --- PDF DOWNLOAD FUNCTION ---
  // Generates and downloads a PDF of the student's marksheet
  function downloadMarksheetAsPDF(studentData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add header to PDF
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Hamro School", doc.internal.pageSize.getWidth() / 2, 22, {
      align: "center",
    });

    // Add document title and student information
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text("Official Marksheet", doc.internal.pageSize.getWidth() / 2, 32, {
      align: "center",
    });
    doc.setFontSize(12);
    doc.text(`Student Name: ${studentData.name}`, 14, 45);
    doc.text(`Grade: ${studentData.grade}`, 14, 51);
    doc.text(`Academic Year: ${studentData.academicYear}`, 14, 57);

    // Prepare table data for marksheet
    const tableColumn = ["Subject", "Marks (out of 100)", "Status"];
    const tableRows = [];

    Object.keys(studentData.marks).forEach((subject) => {
      const mark = studentData.marks[subject];
      const status = mark >= 40 ? "Pass" : "Fail";
      const rowData = [subject, mark, status];
      tableRows.push(rowData);
    });

    // Generate table using jspdf-autotable
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 65, // Start table below student info
      didDrawPage: function (data) {
        // Add footer to each page
        doc.setFontSize(10);
        const footerText = `© 2025 Hamro School. All rights reserved.`;
        doc.text(
          footerText,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.height - 10,
          { align: "center" }
        );
      },
      foot: [
        [
          { content: "Total Marks:", styles: { halign: "right" } },
          {
            content: Object.values(studentData.marks)
              .reduce((a, b) => a + b, 0)
              .toString(),
            styles: { halign: "center" },
          },
          "", // Empty cell for status column
        ],
        [
          { content: "Average Percentage:", styles: { halign: "right" } },
          {
            content: `${(
              Object.values(studentData.marks).reduce((a, b) => a + b, 0) /
              Object.keys(studentData.marks).length
            ).toFixed(2)}%`,
            styles: { halign: "center" },
          },
          "", // Empty cell for status column
        ],
      ],
      footStyles: {
        fontStyle: "bold",
      },
    });

    // Save the PDF
    doc.save(`Marksheet_${studentData.name.replace(/ /g, "_")}.pdf`);
  }

  // Generates and downloads a PDF of the student's ID card
  function downloadIdCardAsPDF(studentData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Design the ID card layout
    doc.setFillColor(243, 244, 246); // Light gray background
    doc.roundedRect(10, 10, 85, 55, 3, 3, "F"); // Rounded rectangle for the card

    // Add school name
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Hamro School", 52.5, 20, { align: "center" });

    // Placeholder for student image (drawing a grey rectangle with 'Photo' text)
    doc.setFillColor(229, 231, 235);
    doc.rect(15, 25, 30, 30, "F");
    doc.setTextColor(156, 163, 175);
    doc.text("Photo", 30, 40, { align: "center" });

    // Add student details
    doc.setTextColor(0, 0, 0); // Reset text color to black
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(studentData.name, 50, 30); // Student Name

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`ID: ${studentData.id}`, 50, 38); // Student ID
    doc.text(`Grade: ${studentData.grade}`, 50, 44); // Student Grade
    doc.text(`Year: ${studentData.academicYear}`, 50, 50); // Academic Year

    // Save the PDF
    doc.save(`ID_Card_${studentData.name.replace(/ /g, "_")}.pdf`);
  }

  // --- SHARED FUNCTIONS ---
  // Renders a placeholder for the Calendar section
  function renderCalendar() {
    const container = document.getElementById("calendar");
    container.innerHTML = `<div class="bg-white p-6 rounded-lg shadow"><h2 class="text-xl font-semibold text-gray-800 mb-4">Events Calendar</h2><p>A dynamic calendar would be displayed here, showing school events, holidays, and exam schedules.</p></div>`;
  }

  // --- CRUD & EVENT SETUP (for Admin Panel) ---
  // Sets up functionalities for Student Management (add, edit, delete, filter, search, paginate)
  function setupStudentCrud() {
    const gradeFilter = document.getElementById("gradeFilter");
    const studentSearch = document.getElementById("studentSearch");
    const studentList = document.getElementById("student-list");
    const paginationControls = document.getElementById("pagination-controls");

    let currentPage = 1;
    const rowsPerPage = 10;

    // Displays the list of students based on current filters and pagination
    function displayStudents() {
      const filterGrade = gradeFilter.value;
      const searchTerm = studentSearch.value;
      let filteredStudents = students;

      // Apply grade filter
      if (filterGrade !== "All Grades" && filterGrade) {
        filteredStudents = filteredStudents.filter(
          (s) => s.grade === filterGrade
        );
      }
      // Apply search by name
      if (searchTerm) {
        filteredStudents = filteredStudents.filter((s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
      const startIndex = (currentPage - 1) * rowsPerPage;
      const paginatedStudents = filteredStudents.slice(
        startIndex,
        startIndex + rowsPerPage
      );

      // Render student list rows
      studentList.innerHTML =
        paginatedStudents.length > 0
          ? paginatedStudents
              .map(
                (s) => `
                <tr class="border-b border-gray-200 hover:bg-gray-50" data-id="${s.id}">
                    <td class="py-3 px-4">${s.id}</td><td class="py-3 px-4">${s.name}</td><td class="py-3 px-4">${s.grade}</td><td class="py-3 px-4">${s.contact}</td>
                    <td class="py-3 px-4"><button class="text-blue-500 hover:text-blue-700 mr-2 edit-btn"><i class="fas fa-edit"></i></button><button class="text-red-500 hover:text-red-700 delete-btn"><i class="fas fa-trash"></i></button></td>
                </tr>`
              )
              .join("")
          : `<tr><td colspan="5" class="text-center py-4">No students found.</td></tr>`;

      setupPagination(totalPages); // Update pagination controls
    }

    // Sets up the pagination buttons and displays current page info
    function setupPagination(totalPages) {
      paginationControls.innerHTML = `
                <button id="prev-page" class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed" ${
                  currentPage === 1 ? "disabled" : ""
                }>Previous</button>
                <span class="text-gray-700">Page ${currentPage} of ${
        totalPages > 0 ? totalPages : 1
      }</span>
                <button id="next-page" class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed" ${
                  currentPage === totalPages || totalPages === 0
                    ? "disabled"
                    : ""
                }>Next</button>
            `;

      // Event listeners for pagination buttons
      document.getElementById("prev-page").addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          displayStudents();
        }
      });

      document.getElementById("next-page").addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage++;
          displayStudents();
        }
      });
    }

    // Populates the grade filter dropdown with unique grades
    function populateGradeFilter() {
      const grades = [
        "All Grades",
        ...new Set(students.map((s) => s.grade).sort((a, b) => a - b)),
      ];
      gradeFilter.innerHTML = grades
        .map((g) => `<option value="${g}">${g}</option>`)
        .join("");
    }

    // Event listener to open add student modal
    document
      .getElementById("addStudentBtn")
      .addEventListener("click", () => openStudentModal());
    // Event listener to save student (add/edit)
    document.getElementById("saveStudentBtn").addEventListener("click", () => {
      saveStudent();
      displayStudents(); // Re-render students after saving
    });
    // Event listener to close student modal
    document
      .getElementById("closeStudentModal")
      .addEventListener("click", () => studentModal.classList.add("hidden"));

    // Event delegation for edit and delete buttons on student list
    studentList.addEventListener("click", (e) => {
      const id = e.target.closest("tr")?.dataset.id;
      if (e.target.closest(".edit-btn")) openStudentModal(id);
      if (e.target.closest(".delete-btn")) {
        deleteStudent(id);
        displayStudents(); // Re-render students after deleting
      }
    });

    // Event listeners for filter and search input changes
    gradeFilter.addEventListener("change", () => {
      currentPage = 1; // Reset to first page on filter change
      displayStudents();
    });
    studentSearch.addEventListener("input", () => {
      currentPage = 1; // Reset to first page on search change
      displayStudents();
    });

    populateGradeFilter(); // Initialize grade filter options
    displayStudents(); // Initial display of students
  }

  // Opens the student modal for adding a new student or editing an existing one
  function openStudentModal(id = null) {
    const form = document.getElementById("studentForm");
    form.reset(); // Clear form fields
    document.getElementById("studentId").value = ""; // Clear hidden ID field
    if (id) {
      const student = students.find((s) => s.id == id);
      document.getElementById("studentModalTitle").textContent = "Edit Student";
      // Populate form with student data for editing
      document.getElementById("studentId").value = student.id;
      document.getElementById("studentName").value = student.name;
      document.getElementById("studentGrade").value = student.grade;
      document.getElementById("studentAcademicYear").value =
        student.academicYear;
      document.getElementById("studentContact").value = student.contact;
    } else {
      document.getElementById("studentModalTitle").textContent = "Add Student";
    }
    studentModal.classList.remove("hidden"); // Show the modal
  }

  // Saves (adds or updates) student data
  function saveStudent() {
    const id = document.getElementById("studentId").value;
    const name = document.getElementById("studentName").value;
    const grade = document.getElementById("studentGrade").value;
    const academicYear = document.getElementById("studentAcademicYear").value;
    const contact = document.getElementById("studentContact").value;

    // Validate Name (only alphabets and spaces)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      alert("Student name must contain only alphabetic characters and spaces.");
      return; // Stop the function if validation fails
    }

    // Validate Email Format
    const emailRegex = /^\S+@\S+\.\S+$/; // Basic email regex
    if (!emailRegex.test(contact)) {
      alert("Please enter a valid email address for student contact.");
      return; // Stop the function if validation fails
    }

    // Basic check for all required fields
    if (!name || !grade || !academicYear || !contact) {
      alert("All fields are required for student information.");
      return;
    }

    if (id) {
      // If ID exists, update existing student
      const index = students.findIndex((s) => s.id == id);
      students[index] = {
        ...students[index], // Keep existing properties
        name,
        grade,
        academicYear,
        contact,
      };
    } else {
      // If no ID, add new student
      const newId =
        students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1; // Generate new ID
      students.push({
        id: newId,
        name,
        grade,
        academicYear,
        contact,
        address: "", // Default empty values for new student
        parent: "",
        marks: {},
      });
    }
    studentModal.classList.add("hidden"); // Hide the modal
    // Update dashboard student count if element exists
    const statElement = document.getElementById("total-students-stat");
    if (statElement) {
      statElement.textContent = students.length;
    }
  }

  // Deletes a student by ID
  function deleteStudent(id) {
    students = students.filter((s) => s.id != id); // Filter out the student to be deleted
    // Update dashboard student count if element exists
    const statElement = document.getElementById("total-students-stat");
    if (statElement) {
      statElement.textContent = students.length;
    }
  }

  // Sets up functionalities for Teacher Management (add, edit, delete)
  function setupTeacherCrud() {
    const teacherList = document.getElementById("teacher-list");

    // Renders the list of teachers in the table
    function renderTeachersList() {
      teacherList.innerHTML = teachers
        .map(
          (t) => `
                <tr class="border-b border-gray-200 hover:bg-gray-50" data-id="${t.id}">
                    <td class="py-3 px-4">${t.id}</td><td class="py-3 px-4">${t.name}</td><td class="py-3 px-4">${t.subject}</td><td class="py-3 px-4">${t.contact}</td>
                    <td class="py-3 px-4"><button class="text-blue-500 hover:text-blue-700 mr-2 edit-btn"><i class="fas fa-edit"></i></button><button class="text-red-500 hover:text-red-700 delete-btn"><i class="fas fa-trash"></i></button></td>
                </tr>`
        )
        .join("");
    }

    // Event listener to open add teacher modal
    document
      .getElementById("addTeacherBtn")
      .addEventListener("click", () => openTeacherModal());
    // Event listener to save teacher (add/edit)
    document
      .getElementById("saveTeacherBtn")
      .addEventListener("click", saveTeacher);
    // Event listener to close teacher modal
    document
      .getElementById("closeTeacherModal")
      .addEventListener("click", () => teacherModal.classList.add("hidden"));

    // Event delegation for edit and delete buttons on teacher list
    teacherList.addEventListener("click", (e) => {
      const id = e.target.closest("tr")?.dataset.id;
      if (e.target.closest(".edit-btn")) openTeacherModal(id);
      if (e.target.closest(".delete-btn")) deleteTeacher(id);
    });

    renderTeachersList(); // Initial display of teachers
  }

  // Opens the teacher modal for adding a new teacher or editing an existing one
  function openTeacherModal(id = null) {
    const form = document.getElementById("teacherForm");
    form.reset(); // Clear form fields
    document.getElementById("teacherId").value = ""; // Clear hidden ID field
    if (id) {
      const teacher = teachers.find((t) => t.id == id);
      document.getElementById("teacherModalTitle").textContent = "Edit Teacher";
      // Populate form with teacher data for editing
      document.getElementById("teacherId").value = teacher.id;
      document.getElementById("teacherName").value = teacher.name;
      document.getElementById("teacherSubject").value = teacher.subject;
      document.getElementById("teacherContact").value = teacher.contact;
    } else {
      document.getElementById("teacherModalTitle").textContent = "Add Teacher";
    }
    teacherModal.classList.remove("hidden"); // Show the modal
  }

  // Saves (adds or updates) teacher data
  function saveTeacher() {
    const id = document.getElementById("teacherId").value;
    const name = document.getElementById("teacherName").value;
    const subject = document.getElementById("teacherSubject").value;
    const contact = document.getElementById("teacherContact").value;
    // Basic check for all required fields
    if (!name || !subject || !contact) return;

    if (id) {
      // If ID exists, update existing teacher
      const index = teachers.findIndex((t) => t.id == id);
      teachers[index] = { ...teachers[index], name, subject, contact };
    } else {
      // If no ID, add new teacher
      const newId =
        teachers.length > 0 ? Math.max(...teachers.map((t) => t.id)) + 1 : 1; // Generate new ID
      teachers.push({ id: newId, name, subject, contact });
    }
    teacherModal.classList.add("hidden"); // Hide the modal
    renderTeacherManagement(); // Re-render teachers list
    // Update dashboard teacher count if element exists
    const statElement = document.getElementById("total-teachers-stat");
    if (statElement) {
      statElement.textContent = teachers.length;
    }
  }

  // Deletes a teacher by ID
  function deleteTeacher(id) {
    teachers = teachers.filter((t) => t.id != id); // Filter out the teacher to be deleted
    renderTeacherManagement(); // Re-render teachers list
    // Update dashboard teacher count if element exists
    const statElement = document.getElementById("total-teachers-stat");
    if (statElement) {
      statElement.textContent = teachers.length;
    }
  }

  // --- CHECK SESSION ON PAGE LOAD ---
  // Checks if a user is already logged in from a previous session
  const savedUser = sessionStorage.getItem("currentUser");
  if (savedUser) {
    currentUser = JSON.parse(savedUser); // Restore current user from session storage
    initializeApp(); // Initialize app for logged-in user
  } else {
    initializePublicView(); // Show public view if no user is logged in
  }
});
