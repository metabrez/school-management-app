document.addEventListener("DOMContentLoaded", function () {
  // --- Navigation ---
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");
  const pageTitle = document.getElementById("page-title");

  function showSection(hash) {
    sections.forEach((section) => {
      if ("#" + section.id === hash) {
        section.classList.add("active");
        pageTitle.textContent = hash.charAt(1).toUpperCase() + hash.slice(2);
      } else {
        section.classList.remove("active");
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      window.location.hash = targetId;
    });
  });

  window.addEventListener("hashchange", () => {
    showSection(window.location.hash || "#dashboard");
  });

  // Initial load
  showSection(window.location.hash || "#dashboard");

  // --- Mock Data ---
  let students = [
    { id: 1, name: "Alice Johnson", grade: "10", contact: "alice@example.com" },
    { id: 2, name: "Bob Smith", grade: "11", contact: "bob@example.com" },
    {
      id: 3,
      name: "Charlie Brown",
      grade: "9",
      contact: "charlie@example.com",
    },
    { id: 4, name: "Diana Prince", grade: "10", contact: "diana@example.com" },
    { id: 5, name: "Ethan Hunt", grade: "12", contact: "ethan@example.com" },
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

  // --- Student Management ---
  const studentList = document.getElementById("student-list");
  const studentModal = document.getElementById("studentModal");
  const addStudentBtn = document.getElementById("addStudentBtn");
  const closeStudentModalBtn = document.getElementById("closeStudentModal");
  const saveStudentBtn = document.getElementById("saveStudentBtn");
  const studentForm = document.getElementById("studentForm");
  const studentModalTitle = document.getElementById("studentModalTitle");
  const gradeFilter = document.getElementById("gradeFilter");

  function populateGradeFilter() {
    const grades = [
      "All Grades",
      ...new Set(students.map((s) => s.grade).sort((a, b) => a - b)),
    ];
    const currentFilter = gradeFilter.value;
    gradeFilter.innerHTML = "";
    grades.forEach((grade) => {
      const option = document.createElement("option");
      option.value = grade;
      option.textContent = grade;
      gradeFilter.appendChild(option);
    });
    gradeFilter.value =
      currentFilter && grades.includes(currentFilter)
        ? currentFilter
        : "All Grades";
  }

  function renderStudents(filterGrade = "All Grades") {
    studentList.innerHTML = "";
    const filteredStudents =
      filterGrade === "All Grades" || !filterGrade
        ? students
        : students.filter((s) => s.grade === filterGrade);

    if (filteredStudents.length === 0) {
      studentList.innerHTML = `<tr><td colspan="5" class="text-center py-4">No students found for this grade.</td></tr>`;
    } else {
      filteredStudents.forEach((s) => {
        studentList.innerHTML += `
                    <tr class="border-b border-gray-200 hover:bg-gray-50">
                        <td class="py-3 px-4">${s.id}</td>
                        <td class="py-3 px-4">${s.name}</td>
                        <td class="py-3 px-4">${s.grade}</td>
                        <td class="py-3 px-4">${s.contact}</td>
                        <td class="py-3 px-4">
                            <button class="text-blue-500 hover:text-blue-700 mr-2" onclick="editStudent(${s.id})"><i class="fas fa-edit"></i></button>
                            <button class="text-red-500 hover:text-red-700" onclick="deleteStudent(${s.id})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `;
      });
    }
  }

  gradeFilter.addEventListener("change", (e) => {
    renderStudents(e.target.value);
  });

  addStudentBtn.addEventListener("click", () => {
    studentModalTitle.textContent = "Add Student";
    studentForm.reset();
    document.getElementById("studentId").value = "";
    studentModal.classList.remove("hidden");
  });

  closeStudentModalBtn.addEventListener("click", () => {
    studentModal.classList.add("hidden");
  });

  saveStudentBtn.addEventListener("click", () => {
    const id = document.getElementById("studentId").value;
    const name = document.getElementById("studentName").value;
    const grade = document.getElementById("studentGrade").value;
    const contact = document.getElementById("studentContact").value;

    if (name && grade && contact) {
      if (id) {
        // Edit
        const index = students.findIndex((s) => s.id == id);
        students[index] = { id: parseInt(id), name, grade, contact };
      } else {
        // Add
        const newId =
          students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
        students.push({ id: newId, name, grade, contact });
      }
      populateGradeFilter();
      renderStudents(gradeFilter.value);
      updateDashboardStats();
      studentModal.classList.add("hidden");
    }
  });

  window.editStudent = (id) => {
    const student = students.find((s) => s.id === id);
    if (student) {
      studentModalTitle.textContent = "Edit Student";
      document.getElementById("studentId").value = student.id;
      document.getElementById("studentName").value = student.name;
      document.getElementById("studentGrade").value = student.grade;
      document.getElementById("studentContact").value = student.contact;
      studentModal.classList.remove("hidden");
    }
  };

  window.deleteStudent = (id) => {
    // In a real app, you'd show a confirmation dialog.
    students = students.filter((s) => s.id !== id);
    populateGradeFilter();
    renderStudents(gradeFilter.value);
    updateDashboardStats();
  };

  // --- Teacher Management ---
  const teacherList = document.getElementById("teacher-list");
  const teacherModal = document.getElementById("teacherModal");
  const addTeacherBtn = document.getElementById("addTeacherBtn");
  const closeTeacherModalBtn = document.getElementById("closeTeacherModal");
  const saveTeacherBtn = document.getElementById("saveTeacherBtn");
  const teacherForm = document.getElementById("teacherForm");
  const teacherModalTitle = document.getElementById("teacherModalTitle");

  function renderTeachers() {
    teacherList.innerHTML = "";
    teachers.forEach((t) => {
      teacherList.innerHTML += `
                <tr class="border-b border-gray-200 hover:bg-gray-50">
                    <td class="py-3 px-4">${t.id}</td>
                    <td class="py-3 px-4">${t.name}</td>
                    <td class="py-3 px-4">${t.subject}</td>
                    <td class="py-3 px-4">${t.contact}</td>
                    <td class="py-3 px-4">
                        <button class="text-blue-500 hover:text-blue-700 mr-2" onclick="editTeacher(${t.id})"><i class="fas fa-edit"></i></button>
                        <button class="text-red-500 hover:text-red-700" onclick="deleteTeacher(${t.id})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
    });
  }

  addTeacherBtn.addEventListener("click", () => {
    teacherModalTitle.textContent = "Add Teacher";
    teacherForm.reset();
    document.getElementById("teacherId").value = "";
    teacherModal.classList.remove("hidden");
  });

  closeTeacherModalBtn.addEventListener("click", () => {
    teacherModal.classList.add("hidden");
  });

  saveTeacherBtn.addEventListener("click", () => {
    const id = document.getElementById("teacherId").value;
    const name = document.getElementById("teacherName").value;
    const subject = document.getElementById("teacherSubject").value;
    const contact = document.getElementById("teacherContact").value;

    if (name && subject && contact) {
      if (id) {
        // Edit
        const index = teachers.findIndex((t) => t.id == id);
        teachers[index] = { id: parseInt(id), name, subject, contact };
      } else {
        // Add
        const newId =
          teachers.length > 0 ? Math.max(...teachers.map((t) => t.id)) + 1 : 1;
        teachers.push({ id: newId, name, subject, contact });
      }
      renderTeachers();
      updateDashboardStats();
      teacherModal.classList.add("hidden");
    }
  });

  window.editTeacher = (id) => {
    const teacher = teachers.find((t) => t.id === id);
    if (teacher) {
      teacherModalTitle.textContent = "Edit Teacher";
      document.getElementById("teacherId").value = teacher.id;
      document.getElementById("teacherName").value = teacher.name;
      document.getElementById("teacherSubject").value = teacher.subject;
      document.getElementById("teacherContact").value = teacher.contact;
      teacherModal.classList.remove("hidden");
    }
  };

  window.deleteTeacher = (id) => {
    teachers = teachers.filter((t) => t.id !== id);
    renderTeachers();
    updateDashboardStats();
  };

  // --- Calendar ---
  const calendarContainer = document.getElementById("calendar-container");
  let currentDate = new Date();

  function renderCalendar() {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const today = new Date();

    let calendarHTML = `
            <div class="flex justify-between items-center mb-4">
                <button id="prev-month" class="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">&lt;</button>
                <h3 class="text-lg font-semibold">${currentDate.toLocaleString(
                  "default",
                  { month: "long" }
                )} ${year}</h3>
                <button id="next-month" class="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">&gt;</button>
            </div>
            <div class="grid grid-cols-7 gap-2 text-center text-sm text-gray-600 mb-2">
                <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
            </div>
            <div class="grid grid-cols-7 gap-2">
        `;

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarHTML += `<div class="p-2 rounded-lg"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      let classes = "p-2 rounded-lg hover:bg-blue-100 cursor-pointer";
      if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        classes += " bg-blue-500 text-white";
      }
      calendarHTML += `<div class="${classes}">${day}</div>`;
    }

    calendarHTML += `</div>`;
    calendarContainer.innerHTML = calendarHTML;

    document.getElementById("prev-month").addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });
    document.getElementById("next-month").addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });
  }

  // --- Dashboard Stats ---
  function updateDashboardStats() {
    document.getElementById("total-students").textContent = students.length;
    document.getElementById("total-teachers").textContent = teachers.length;
  }

  // --- Initial Render ---
  populateGradeFilter();
  renderStudents();
  renderTeachers();
  renderCalendar();
  updateDashboardStats();
});
