document.addEventListener("DOMContentLoaded", function () {
  // --- STATE MANAGEMENT ---
  let currentUser = null;

  // --- DOM ELEMENTS ---
  const loginContainer = document.getElementById("login-container");
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
      contact: "alice@example.com",
      address: "123 Maple St, Springfield",
      parent: "John Johnson",
      marks: { Math: 95, Science: 88, History: 92, English: 94 },
    },
    {
      id: 2,
      name: "Bob Smith",
      grade: "11",
      contact: "bob@example.com",
      address: "456 Oak Ave, Springfield",
      parent: "Jane Smith",
      marks: { Math: 82, Science: 76, History: 88, English: 85 },
    },
    {
      id: 3,
      name: "Charlie Brown",
      grade: "9",
      contact: "charlie@example.com",
      address: "789 Pine Ln, Springfield",
      parent: "Chris Brown",
      marks: { Math: 78, Science: 81, History: 75, English: 80 },
    },
    {
      id: 4,
      name: "Diana Prince",
      grade: "10",
      contact: "diana@example.com",
      address: "101 Elm Ct, Springfield",
      parent: "Diana Prince Sr.",
      marks: { Math: 99, Science: 95, History: 98, English: 97 },
    },
    {
      id: 5,
      name: "Ethan Hunt",
      grade: "12",
      contact: "ethan@example.com",
      address: "212 Birch Rd, Springfield",
      parent: "Ethan Hunt Sr.",
      marks: { Math: 89, Science: 91, History: 85, English: 88 },
    },
    {
      id: 6,
      name: "Fiona Glenanne",
      grade: "11",
      contact: "fiona@example.com",
      address: "321 Cedar Dr, Springfield",
      parent: "Michael Westen",
      marks: { Math: 91, Science: 93, History: 89, English: 92 },
    },
    {
      id: 7,
      name: "George Costanza",
      grade: "10",
      contact: "george@example.com",
      address: "456 Walnut St, Springfield",
      parent: "Frank Costanza",
      marks: { Math: 72, Science: 68, History: 75, English: 78 },
    },
    {
      id: 8,
      name: "Harry Potter",
      grade: "9",
      contact: "harry@example.com",
      address: "4 Privet Drive, Springfield",
      parent: "James Potter",
      marks: { Math: 88, Science: 90, History: 85, English: 87 },
    },
    {
      id: 9,
      name: "Irene Adler",
      grade: "12",
      contact: "irene@example.com",
      address: "221B Baker St, Springfield",
      parent: "Mr. Adler",
      marks: { Math: 96, Science: 94, History: 97, English: 98 },
    },
    {
      id: 10,
      name: "Jack Sparrow",
      grade: "11",
      contact: "jack@example.com",
      address: "The Black Pearl, Springfield",
      parent: "Captain Teague",
      marks: { Math: 65, Science: 70, History: 80, English: 72 },
    },
    {
      id: 11,
      name: "Kate Austen",
      grade: "10",
      contact: "kate@example.com",
      address: "Oceanic Flight 815, Springfield",
      parent: "Diane Janssen",
      marks: { Math: 85, Science: 88, History: 82, English: 89 },
    },
    {
      id: 12,
      name: "Luke Skywalker",
      grade: "9",
      contact: "luke@example.com",
      address: "Tatooine, Springfield",
      parent: "Darth Vader",
      marks: { Math: 80, Science: 82, History: 78, English: 81 },
    },
    {
      id: 13,
      name: "Michael Scott",
      grade: "12",
      contact: "michael@example.com",
      address: "Dunder Mifflin, Springfield",
      parent: "Mr. Scott",
      marks: { Math: 70, Science: 65, History: 72, English: 75 },
    },
    {
      id: 14,
      name: "Neo Anderson",
      grade: "11",
      contact: "neo@example.com",
      address: "The Matrix, Springfield",
      parent: "The Architect",
      marks: { Math: 99, Science: 99, History: 99, English: 99 },
    },
    {
      id: 15,
      name: "Olivia Dunham",
      grade: "10",
      contact: "olivia@example.com",
      address: "Fringe Division, Springfield",
      parent: "Walter Bishop",
      marks: { Math: 92, Science: 95, History: 90, English: 93 },
    },
    {
      id: 16,
      name: "Peter Parker",
      grade: "9",
      contact: "peter@example.com",
      address: "Queens, Springfield",
      parent: "Aunt May",
      marks: { Math: 94, Science: 96, History: 88, English: 91 },
    },
    {
      id: 17,
      name: "Quinn Fabray",
      grade: "12",
      contact: "quinn@example.com",
      address: "McKinley High, Springfield",
      parent: "Judy Fabray",
      marks: { Math: 87, Science: 85, History: 92, English: 94 },
    },
    {
      id: 18,
      name: "Rachel Green",
      grade: "11",
      contact: "rachel@example.com",
      address: "Central Perk, Springfield",
      parent: "Dr. Leonard Green",
      marks: { Math: 78, Science: 80, History: 85, English: 88 },
    },
    {
      id: 19,
      name: "Sheldon Cooper",
      grade: "10",
      contact: "sheldon@example.com",
      address: "Caltech, Springfield",
      parent: "Mary Cooper",
      marks: { Math: 100, Science: 100, History: 95, English: 98 },
    },
    {
      id: 20,
      name: "Tony Stark",
      grade: "12",
      contact: "tony@example.com",
      address: "Stark Tower, Springfield",
      parent: "Howard Stark",
      marks: { Math: 98, Science: 99, History: 92, English: 95 },
    },
    {
      id: 21,
      name: "Uhura Nyota",
      grade: "11",
      contact: "uhura@example.com",
      address: "USS Enterprise, Springfield",
      parent: "Mr. Uhura",
      marks: { Math: 90, Science: 92, History: 88, English: 94 },
    },
    {
      id: 22,
      name: "Vito Corleone",
      grade: "10",
      contact: "vito@example.com",
      address: "Corleone Compound, Springfield",
      parent: "Antonio Andolini",
      marks: { Math: 85, Science: 82, History: 90, English: 86 },
    },
    {
      id: 23,
      name: "Walter White",
      grade: "9",
      contact: "walter@example.com",
      address: "308 Negra Arroyo Lane, Springfield",
      parent: "Mr. White",
      marks: { Math: 99, Science: 100, History: 85, English: 90 },
    },
    {
      id: 24,
      name: "Xena Warrior",
      grade: "12",
      contact: "xena@example.com",
      address: "Amphipolis, Springfield",
      parent: "Cyrene",
      marks: { Math: 88, Science: 85, History: 95, English: 89 },
    },
    {
      id: 25,
      name: "Yoda Master",
      grade: "11",
      contact: "yoda@example.com",
      address: "Dagobah, Springfield",
      parent: "The Force",
      marks: { Math: 95, Science: 95, History: 95, English: 95 },
    },
    {
      id: 26,
      name: "Zelda Princess",
      grade: "10",
      contact: "zelda@example.com",
      address: "Hyrule Castle, Springfield",
      parent: "King Rhoam",
      marks: { Math: 92, Science: 90, History: 94, English: 93 },
    },
    {
      id: 27,
      name: "Arthur Dent",
      grade: "9",
      contact: "arthur@example.com",
      address: "Earth, Mostly Harmless",
      parent: "Mr. Dent",
      marks: { Math: 75, Science: 72, History: 78, English: 80 },
    },
    {
      id: 28,
      name: "Buffy Summers",
      grade: "12",
      contact: "buffy@example.com",
      address: "Sunnydale High, Springfield",
      parent: "Joyce Summers",
      marks: { Math: 89, Science: 87, History: 91, English: 92 },
    },
    {
      id: 29,
      name: "Clark Kent",
      grade: "11",
      contact: "clark@example.com",
      address: "Smallville, Springfield",
      parent: "Jonathan Kent",
      marks: { Math: 94, Science: 93, History: 92, English: 95 },
    },
    {
      id: 30,
      name: "Dana Scully",
      grade: "10",
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
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      currentUser = user;
      sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
      initializeApp();
    } else {
      loginError.classList.remove("hidden");
    }
  });

  logoutBtn.addEventListener("click", function () {
    currentUser = null;
    sessionStorage.removeItem("currentUser");
    showLoginScreen();
  });

  function showLoginScreen() {
    appContainer.classList.add("hidden");
    loginContainer.classList.remove("hidden");
    sidebar.innerHTML = "";
    loginError.classList.add("hidden");
    loginForm.reset();
  }

  // --- INITIALIZATION ---
  function initializeApp() {
    loginContainer.classList.add("hidden");
    appContainer.classList.remove("hidden");

    buildSidebar(currentUser.role);
    setupNavigation();

    if (currentUser.role === "admin") {
      userGreeting.textContent = "Welcome, Admin";
    } else if (currentUser.role === "student") {
      const studentData = students.find((s) => s.id === currentUser.studentId);
      userGreeting.textContent = `Welcome, ${studentData.name}`;
    }

    // --- Role-based Route Guarding ---
    const adminRoutes = ["#dashboard", "#students", "#teachers", "#calendar"];
    const studentRoutes = ["#profile", "#marksheet", "#calendar"];
    let currentHash = window.location.hash;

    let isAuthorized = false;
    if (currentUser.role === "admin" && adminRoutes.includes(currentHash)) {
      isAuthorized = true;
    } else if (
      currentUser.role === "student" &&
      studentRoutes.includes(currentHash)
    ) {
      isAuthorized = true;
    }

    // If there's no hash or the user is on an unauthorized page, redirect to their default.
    if (!currentHash || !isAuthorized) {
      window.location.hash =
        currentUser.role === "admin" ? "#dashboard" : "#profile";
    } else {
      showSection(currentHash);
    }
  }

  function buildSidebar(role) {
    let sidebarContent = `<div class="px-8 py-6 border-b border-gray-700"><h2 class="text-2xl font-semibold">School Portal</h2></div><nav class="flex-1 px-4 py-4">`;
    if (role === "admin") {
      sidebarContent += `
                <a href="#dashboard" class="nav-link flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 rounded-lg"><i class="fas fa-tachometer-alt mr-3"></i> Dashboard</a>
                <a href="#students" class="nav-link flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg"><i class="fas fa-user-graduate mr-3"></i> Students</a>
                <a href="#teachers" class="nav-link flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg"><i class="fas fa-chalkboard-teacher mr-3"></i> Teachers</a>
                <a href="#calendar" class="nav-link flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg"><i class="fas fa-calendar-alt mr-3"></i> Calendar</a>
            `;
    } else if (role === "student") {
      sidebarContent += `
                <a href="#profile" class="nav-link flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 rounded-lg"><i class="fas fa-user-circle mr-3"></i> My Profile</a>
                <a href="#marksheet" class="nav-link flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg"><i class="fas fa-poll-h mr-3"></i> Marksheet</a>
                <a href="#calendar" class="nav-link flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded-lg"><i class="fas fa-calendar-alt mr-3"></i> Calendar</a>
            `;
    }
    sidebarContent += `</nav>`;
    sidebar.innerHTML = sidebarContent;
  }

  // --- NAVIGATION ---
  function setupNavigation() {
    window.addEventListener("hashchange", () =>
      showSection(window.location.hash)
    );

    sidebar.addEventListener("click", function (e) {
      const link = e.target.closest(".nav-link");
      if (link) {
        e.preventDefault();
        window.location.hash = link.getAttribute("href");
      }
    });
  }

  function showSection(hash) {
    const sections = document.querySelectorAll(".section");
    const defaultHash = currentUser
      ? currentUser.role === "admin"
        ? "#dashboard"
        : "#profile"
      : "#";
    const normalizedHash = hash || defaultHash;

    sections.forEach((section) => {
      section.innerHTML = ""; // Clear content on navigation
      section.classList.remove("active");
    });

    const activeSection = document.querySelector(normalizedHash);
    if (activeSection) {
      activeSection.classList.add("active");
      pageTitle.textContent =
        normalizedHash.charAt(1).toUpperCase() + normalizedHash.slice(2);

      // Render content for the active section
      const studentData =
        currentUser.role === "student"
          ? students.find((s) => s.id === currentUser.studentId)
          : null;
      switch (normalizedHash) {
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
          renderCalendar();
          break;
        case "#profile":
          renderStudentProfile(studentData);
          break;
        case "#marksheet":
          renderMarksheet(studentData);
          break;
      }
    }
  }

  // --- ADMIN-SPECIFIC RENDER FUNCTIONS ---
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

    setupStudentCrud();
  }

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

    setupTeacherCrud();
  }

  // --- STUDENT-SPECIFIC RENDER FUNCTIONS ---
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
                    <div><p class="font-semibold text-gray-600">Grade:</p><p class="text-lg text-gray-900">${
                      studentData.grade
                    }</p></div>
                    <div><p class="font-semibold text-gray-600">Student ID:</p><p class="text-lg text-gray-900">${
                      studentData.id
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
                    <h2 class="text-2xl font-bold text-gray-800">Marksheet for ${studentData.name}</h2>
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

    document
      .getElementById("download-marksheet-btn")
      .addEventListener("click", () => downloadMarksheetAsPDF(studentData));
  }

  // --- PDF DOWNLOAD FUNCTION ---
  function downloadMarksheetAsPDF(studentData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Marksheet", 14, 22);
    doc.setFontSize(12);
    doc.text(`Student Name: ${studentData.name}`, 14, 32);
    doc.text(`Grade: ${studentData.grade}`, 14, 38);

    const tableColumn = ["Subject", "Marks (out of 100)", "Status"];
    const tableRows = [];

    Object.keys(studentData.marks).forEach((subject) => {
      const mark = studentData.marks[subject];
      const status = mark >= 40 ? "Pass" : "Fail";
      const rowData = [subject, mark, status];
      tableRows.push(rowData);
    });

    const totalMarks = Object.values(studentData.marks).reduce(
      (a, b) => a + b,
      0
    );
    const average = (
      totalMarks / Object.keys(studentData.marks).length
    ).toFixed(2);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      didDrawPage: function (data) {
        // Footer
        doc.setFontSize(12);
        doc.text(
          `Total Marks: ${totalMarks}`,
          14,
          doc.internal.pageSize.height - 20
        );
        doc.text(
          `Average Percentage: ${average}%`,
          14,
          doc.internal.pageSize.height - 14
        );
      },
    });

    doc.save(`Marksheet_${studentData.name.replace(/ /g, "_")}.pdf`);
  }

  // --- SHARED FUNCTIONS ---
  function renderCalendar() {
    const container = document.getElementById("calendar");
    container.innerHTML = `<div class="bg-white p-6 rounded-lg shadow"><h2 class="text-xl font-semibold text-gray-800 mb-4">Events Calendar</h2><p>A dynamic calendar would be displayed here, showing school events, holidays, and exam schedules.</p></div>`;
  }

  // --- CRUD & EVENT SETUP ---
  function setupStudentCrud() {
    const gradeFilter = document.getElementById("gradeFilter");
    const studentSearch = document.getElementById("studentSearch");
    const studentList = document.getElementById("student-list");
    const paginationControls = document.getElementById("pagination-controls");

    let currentPage = 1;
    const rowsPerPage = 10;

    function displayStudents() {
      const filterGrade = gradeFilter.value;
      const searchTerm = studentSearch.value;
      let filteredStudents = students;

      if (filterGrade !== "All Grades" && filterGrade) {
        filteredStudents = filteredStudents.filter(
          (s) => s.grade === filterGrade
        );
      }
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

      setupPagination(totalPages);
    }

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

    function populateGradeFilter() {
      const grades = [
        "All Grades",
        ...new Set(students.map((s) => s.grade).sort((a, b) => a - b)),
      ];
      gradeFilter.innerHTML = grades
        .map((g) => `<option value="${g}">${g}</option>`)
        .join("");
    }

    document
      .getElementById("addStudentBtn")
      .addEventListener("click", () => openStudentModal());
    document.getElementById("saveStudentBtn").addEventListener("click", () => {
      saveStudent();
      displayStudents();
    });
    document
      .getElementById("closeStudentModal")
      .addEventListener("click", () => studentModal.classList.add("hidden"));

    studentList.addEventListener("click", (e) => {
      const id = e.target.closest("tr")?.dataset.id;
      if (e.target.closest(".edit-btn")) openStudentModal(id);
      if (e.target.closest(".delete-btn")) {
        deleteStudent(id);
        displayStudents();
      }
    });

    gradeFilter.addEventListener("change", () => {
      currentPage = 1;
      displayStudents();
    });
    studentSearch.addEventListener("input", () => {
      currentPage = 1;
      displayStudents();
    });

    populateGradeFilter();
    displayStudents();
  }

  function openStudentModal(id = null) {
    const form = document.getElementById("studentForm");
    form.reset();
    document.getElementById("studentId").value = "";
    if (id) {
      const student = students.find((s) => s.id == id);
      document.getElementById("studentModalTitle").textContent = "Edit Student";
      document.getElementById("studentId").value = student.id;
      document.getElementById("studentName").value = student.name;
      document.getElementById("studentGrade").value = student.grade;
      document.getElementById("studentContact").value = student.contact;
    } else {
      document.getElementById("studentModalTitle").textContent = "Add Student";
    }
    studentModal.classList.remove("hidden");
  }

  function saveStudent() {
    const id = document.getElementById("studentId").value;
    const name = document.getElementById("studentName").value;
    const grade = document.getElementById("studentGrade").value;
    const contact = document.getElementById("studentContact").value;
    if (!name || !grade || !contact) return;

    if (id) {
      const index = students.findIndex((s) => s.id == id);
      students[index] = { ...students[index], name, grade, contact };
    } else {
      const newId =
        students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
      students.push({
        id: newId,
        name,
        grade,
        contact,
        address: "",
        parent: "",
        marks: {},
      });
    }
    studentModal.classList.add("hidden");
    const statElement = document.getElementById("total-students-stat");
    if (statElement) {
      statElement.textContent = students.length;
    }
  }

  function deleteStudent(id) {
    students = students.filter((s) => s.id != id);
    const statElement = document.getElementById("total-students-stat");
    if (statElement) {
      statElement.textContent = students.length;
    }
  }

  function setupTeacherCrud() {
    const teacherList = document.getElementById("teacher-list");

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

    document
      .getElementById("addTeacherBtn")
      .addEventListener("click", () => openTeacherModal());
    document
      .getElementById("saveTeacherBtn")
      .addEventListener("click", saveTeacher);
    document
      .getElementById("closeTeacherModal")
      .addEventListener("click", () => teacherModal.classList.add("hidden"));

    teacherList.addEventListener("click", (e) => {
      const id = e.target.closest("tr")?.dataset.id;
      if (e.target.closest(".edit-btn")) openTeacherModal(id);
      if (e.target.closest(".delete-btn")) deleteTeacher(id);
    });

    renderTeachersList();
  }

  function openTeacherModal(id = null) {
    const form = document.getElementById("teacherForm");
    form.reset();
    document.getElementById("teacherId").value = "";
    if (id) {
      const teacher = teachers.find((t) => t.id == id);
      document.getElementById("teacherModalTitle").textContent = "Edit Teacher";
      document.getElementById("teacherId").value = teacher.id;
      document.getElementById("teacherName").value = teacher.name;
      document.getElementById("teacherSubject").value = teacher.subject;
      document.getElementById("teacherContact").value = teacher.contact;
    } else {
      document.getElementById("teacherModalTitle").textContent = "Add Teacher";
    }
    teacherModal.classList.remove("hidden");
  }

  function saveTeacher() {
    const id = document.getElementById("teacherId").value;
    const name = document.getElementById("teacherName").value;
    const subject = document.getElementById("teacherSubject").value;
    const contact = document.getElementById("teacherContact").value;
    if (!name || !subject || !contact) return;

    if (id) {
      const index = teachers.findIndex((t) => t.id == id);
      teachers[index] = { ...teachers[index], name, subject, contact };
    } else {
      const newId =
        teachers.length > 0 ? Math.max(...teachers.map((t) => t.id)) + 1 : 1;
      teachers.push({ id: newId, name, subject, contact });
    }
    teacherModal.classList.add("hidden");
    renderTeacherManagement();
    const statElement = document.getElementById("total-teachers-stat");
    if (statElement) {
      statElement.textContent = teachers.length;
    }
  }

  function deleteTeacher(id) {
    teachers = teachers.filter((t) => t.id != id);
    renderTeacherManagement();
    const statElement = document.getElementById("total-teachers-stat");
    if (statElement) {
      statElement.textContent = teachers.length;
    }
  }

  // --- CHECK SESSION ON PAGE LOAD ---
  const savedUser = sessionStorage.getItem("currentUser");
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    initializeApp();
  } else {
    showLoginScreen();
  }
});
