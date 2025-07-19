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

  // --- MOCK DATA ---
  // In a real application, this data would come from a server/database.
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
      sessionStorage.setItem("currentUser", JSON.stringify(currentUser)); // Use session storage to persist login
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
    sidebar.innerHTML = ""; // Clear sidebar
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
      window.location.hash = window.location.hash || "#dashboard"; // Keep current hash or default
      initializeAdminDashboard();
    } else if (currentUser.role === "student") {
      const studentData = students.find((s) => s.id === currentUser.studentId);
      userGreeting.textContent = `Welcome, ${studentData.name}`;
      window.location.hash = window.location.hash || "#profile"; // Keep current hash or default
      initializeStudentDashboard(studentData);
    }
    showSection(window.location.hash); // Show the correct section based on hash
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

    sections.forEach((section) => section.classList.remove("active"));

    const activeSection = document.querySelector(normalizedHash);
    if (activeSection) {
      activeSection.classList.add("active");
      pageTitle.textContent =
        normalizedHash.charAt(1).toUpperCase() + normalizedHash.slice(2);
    }
  }

  // --- ADMIN-SPECIFIC FUNCTIONS ---
  function initializeAdminDashboard() {
    renderAdminDashboard();
    renderStudentManagement();
    renderTeacherManagement();
    renderCalendar();
  }

  function renderAdminDashboard() {
    const dashboard = document.getElementById("dashboard");
    dashboard.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-blue-500 bg-opacity-20"><i class="fas fa-user-graduate text-blue-500 text-2xl"></i></div>
                        <div class="ml-4"><p class="text-gray-600">Total Students</p><p class="text-2xl font-semibold text-gray-900">${students.length}</p></div>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-green-500 bg-opacity-20"><i class="fas fa-chalkboard-teacher text-green-500 text-2xl"></i></div>
                        <div class="ml-4"><p class="text-gray-600">Total Teachers</p><p class="text-2xl font-semibold text-gray-900">${teachers.length}</p></div>
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
            </div>`;

    const gradeFilter = document.getElementById("gradeFilter");
    const studentSearch = document.getElementById("studentSearch");

    function populateGradeFilter() {
      const grades = [
        "All Grades",
        ...new Set(students.map((s) => s.grade).sort((a, b) => a - b)),
      ];
      gradeFilter.innerHTML = grades
        .map((g) => `<option value="${g}">${g}</option>`)
        .join("");
    }

    function renderStudentsList(filterGrade = "All Grades", searchTerm = "") {
      const studentList = document.getElementById("student-list");
      let filteredStudents = students;
      if (filterGrade !== "All Grades" && filterGrade)
        filteredStudents = filteredStudents.filter(
          (s) => s.grade === filterGrade
        );
      if (searchTerm)
        filteredStudents = filteredStudents.filter((s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

      studentList.innerHTML =
        filteredStudents.length > 0
          ? filteredStudents
              .map(
                (s) => `
                <tr class="border-b border-gray-200 hover:bg-gray-50">
                    <td class="py-3 px-4">${s.id}</td><td class="py-3 px-4">${s.name}</td><td class="py-3 px-4">${s.grade}</td><td class="py-3 px-4">${s.contact}</td>
                    <td class="py-3 px-4">
                        <button class="text-blue-500 hover:text-blue-700 mr-2"><i class="fas fa-edit"></i></button>
                        <button class="text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>`
              )
              .join("")
          : `<tr><td colspan="5" class="text-center py-4">No students found.</td></tr>`;
    }

    gradeFilter.addEventListener("change", () =>
      renderStudentsList(gradeFilter.value, studentSearch.value)
    );
    studentSearch.addEventListener("input", () =>
      renderStudentsList(gradeFilter.value, studentSearch.value)
    );

    populateGradeFilter();
    renderStudentsList();
  }

  function renderTeacherManagement() {
    const container = document.getElementById("teachers");
    container.innerHTML = `<div class="bg-white p-6 rounded-lg shadow"><h2 class="text-xl font-semibold text-gray-800 mb-4">Teacher Management</h2><p>Teacher management functionality would be displayed here.</p></div>`;
  }

  // --- STUDENT-SPECIFIC FUNCTIONS ---
  function initializeStudentDashboard(studentData) {
    renderStudentProfile(studentData);
    renderMarksheet(studentData);
    renderCalendar();
  }

  function renderStudentProfile(studentData) {
    const container = document.getElementById("profile");
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
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Marksheet for ${studentData.name}</h2>
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead><tr class="text-gray-600 bg-gray-50"><th class="py-3 px-4">Subject</th><th class="py-3 px-4 text-center">Marks (out of 100)</th><th class="py-3 px-4 text-center">Status</th></tr></thead>
                        <tbody class="text-gray-700">${tableRows}</tbody>
                        <tfoot>
                            <tr class="font-bold bg-gray-100">
                                <td class="py-4 px-4 text-right">Total Marks:</td>
                                <td class="py-4 px-4 text-center">${totalMarks}</td>
                                <td></td>
                            </tr>
                            <tr class="font-bold bg-gray-100">
                                <td class="py-4 px-4 text-right">Average Percentage:</td>
                                <td class="py-4 px-4 text-center">${average}%</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>`;
  }

  // --- SHARED FUNCTIONS ---
  function renderCalendar() {
    const container = document.getElementById("calendar");
    container.innerHTML = `<div class="bg-white p-6 rounded-lg shadow"><h2 class="text-xl font-semibold text-gray-800 mb-4">Events Calendar</h2><p>A dynamic calendar would be displayed here, showing school events, holidays, and exam schedules.</p></div>`;
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
