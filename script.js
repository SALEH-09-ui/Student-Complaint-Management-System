/* =========================================================
   STUDENT COMPLAINT MANAGEMENT SYSTEM
   COMPLETE FRONTEND JAVASCRIPT

   NOTE:
   This version uses localStorage temporarily.
   Later localStorage will be replaced by PHP + MySQL.
   ========================================================= */


/* =========================================================
   1. STORAGE KEYS
   ========================================================= */

const STORAGE = {
    USERS: "scms_users",
    CURRENT_USER: "scms_current_user",
    COMPLAINTS: "scms_complaints",
    ADMIN_LOGIN: "scms_admin_login"
};


/* =========================================================



/* =========================================================
   3. BASIC HELPERS
   ========================================================= */

function getData(key, defaultValue = []) {

    try {

        const data = localStorage.getItem(key);

        if (!data) {
            return defaultValue;
        }

        return JSON.parse(data);

    } catch (error) {

        console.error("Storage error:", error);

        return defaultValue;
    }
}


function saveData(key, data) {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );
}


function getCurrentUser() {

    return getData(
        STORAGE.CURRENT_USER,
        null
    );
}


function setCurrentUser(user) {

    saveData(
        STORAGE.CURRENT_USER,
        user
    );
}


function clearCurrentUser() {

    localStorage.removeItem(
        STORAGE.CURRENT_USER
    );
}


function getComplaints() {

    return getData(
        STORAGE.COMPLAINTS,
        []
    );
}


function saveComplaints(complaints) {

    saveData(
        STORAGE.COMPLAINTS,
        complaints
    );
}


/* =========================================================
   4. PASSWORD SHOW / HIDE
   ========================================================= */

function togglePassword(inputId, button) {

    const input =
        document.getElementById(inputId);

    if (!input) {
        return;
    }

    if (input.type === "password") {

        input.type = "text";

        if (button) {
            button.textContent = "Hide";
        }

    } else {

        input.type = "password";

        if (button) {
            button.textContent = "Show";
        }
    }
}


/* =========================================================
   5. EMAIL VALIDATION
   ========================================================= */

function isValidEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);
}


/* =========================================================
   6. CREATE DEMO DATA
   ========================================================= */

function initializeDemoData() {

    let users =
        getData(
            STORAGE.USERS,
            []
        );


    if (users.length === 0) {

        users.push({

            id: "student-001",

            name: "Demo Student",

            email: "student@gmail.com",

            batch: "65",

            password: "123456"
        });


        saveData(
            STORAGE.USERS,
            users
        );
    }


    let complaints =
        getComplaints();


    if (complaints.length === 0) {

        complaints = [

            {
                id: 1,

                userId: "student-001",

                name: "Anonymous",

                anonymous: true,

                batch: "65",

                title:
                    "Classroom facilities need improvement",

                description:
                    "The classroom fan and several lights are not functioning properly. This is creating difficulty for students during regular classes.",

                status: "processing",

                feedback:
                    "Under review",

                date:
                    "28 September 2026"
            },


            {
                id: 2,

                userId: "student-001",

                name: "Demo Student",

                anonymous: false,

                batch: "65",

                title:
                    "Library seating problem",

                description:
                    "There are not enough seats available in the library during regular study hours.",

                status: "approved",

                feedback:
                    "Issue forwarded to the appropriate authority.",

                date:
                    "25 September 2026"
            },


            {
                id: 3,

                userId: "student-001",

                name: "Anonymous",

                anonymous: true,

                batch: "65",

                title:
                    "Water supply issue",

                description:
                    "Water supply is not available in the building after a certain period of the day.",

                status: "rejected",

                feedback:
                    "This appears to be a duplicate complaint.",

                date:
                    "20 September 2026"
            }

        ];


        saveComplaints(
            complaints
        );
    }
}


/* =========================================================
   7. SIGNUP
   ========================================================= */

function validateSignupForm(event) {

    if (event) {
        event.preventDefault();
    }

    const name =
        document.getElementById("studentName");

    const email =
        document.getElementById("studentEmail");

    const batch =
        document.getElementById("studentBatch");

    const password =
        document.getElementById("studentPassword");

    const confirmPassword =
        document.getElementById("confirmPassword");

    const terms =
        document.getElementById("terms");


    if (
        !name ||
        !email ||
        !batch ||
        !password ||
        !confirmPassword
    ) {
        return false;
    }


    name.value =
        name.value.trim();

    email.value =
        email.value.trim().toLowerCase();

    batch.value =
        batch.value.trim();


    if (name.value.length < 2) {

        alert("Please enter your full name.");

        name.focus();

        return false;
    }


    if (!isValidEmail(email.value)) {

        alert("Please enter a valid email address.");

        email.focus();

        return false;
    }


    if (batch.value.length === 0) {

        alert("Please enter your batch.");

        batch.focus();

        return false;
    }


    if (password.value.length < 6) {

        alert(
            "Password must contain at least 6 characters."
        );

        password.focus();

        return false;
    }


    if (password.value !== confirmPassword.value) {

        alert("Passwords do not match.");

        confirmPassword.focus();

        return false;
    }


    if (terms && !terms.checked) {

        alert(
            "Please agree to use the system responsibly."
        );

        return false;
    }


    /* ================================
       SEND DATA TO PHP + MYSQL
    ================================= */

    const formData = new FormData();

    formData.append("name", name.value);
    formData.append("email", email.value);
    formData.append("batch", batch.value);
    formData.append("password", password.value);


    fetch("signup.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        if (data.success) {

            alert(data.message);

            window.location.href =
                "login.html";

        } else {

            alert(data.message);

        }

    })
    .catch(error => {

        console.error("Signup error:", error);

        alert(
            "Unable to connect to the server."
        );

    });


    return false;
}


/* =========================================================
   8. STUDENT LOGIN
   ========================================================= */

function validateLoginForm(event) {

    if (event) {
        event.preventDefault();
    }

    const email =
        document.getElementById("loginEmail");

    const password =
        document.getElementById("loginPassword");


    if (!email || !password) {
        return false;
    }


    email.value =
        email.value.trim().toLowerCase();


    if (!isValidEmail(email.value)) {

        alert("Please enter a valid email address.");

        email.focus();

        return false;
    }


    if (password.value.length === 0) {

        alert("Please enter your password.");

        password.focus();

        return false;
    }


    const formData = new FormData();

    formData.append("email", email.value);
    formData.append("password", password.value);


    fetch("login.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        if (data.success) {

            setCurrentUser(data.user);

            alert(data.message);

            window.location.href =
                "home.html";

        } else {

            alert(data.message);

            password.focus();
        }

    })
    .catch(error => {

        console.error("Login error:", error);

        alert(
            "Unable to connect to the server."
        );

    });


    return false;
}


/* =========================================================
   9. ADMIN LOGIN
   ========================================================= */

function validateAdminLoginForm(event) {

    if (event) {
        event.preventDefault();
    }

    const email =
        document.getElementById("adminEmail");

    const password =
        document.getElementById("adminPassword");


    if (!email || !password) {
        return false;
    }


    email.value =
        email.value.trim().toLowerCase();


    if (!isValidEmail(email.value)) {

        alert(
            "Please enter a valid admin email address."
        );

        email.focus();

        return false;
    }


    if (password.value.length === 0) {

        alert(
            "Please enter your admin password."
        );

        password.focus();

        return false;
    }


    const formData = new FormData();

    formData.append("email", email.value);
    formData.append("password", password.value);


    fetch("admin-login.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        if (data.success) {

            window.location.href =
                "admin-dashboard.html";

        } else {

            alert(data.message);

            password.focus();
        }

    })
    .catch(error => {

        console.error(
            "Admin login error:",
            error
        );

        alert(
            "Unable to connect to the server."
        );

    });


    return false;
}

/* =========================================================
   10. ADMIN AUTH CHECK
   ========================================================= */

function checkAdminAuthentication() {

    const adminPages = [
        "admin-dashboard.html",
        "admin-complaints.html",
        "admin-complaint-details.html"
    ];

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();

    if (!adminPages.includes(currentPage)) {
        return true;
    }

    fetch("check-admin.php", {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {

        if (!data.loggedIn) {
            window.location.href =
                "admin-login.html";
        }

    })
    .catch(error => {

        console.error(
            "Admin authentication error:",
            error
        );

        window.location.href =
            "admin-login.html";

    });

    return true;
}
checkAdminAuthentication();

/* =========================================================
   11. STUDENT AUTH CHECK
   ========================================================= */

function checkStudentAuthentication() {

    const currentUser =
        getCurrentUser();


    const studentPages = [

        "home.html",

        "submit-complaint.html",

        "my-complaints.html",

        "complaint-details.html",

        "profile.html"

    ];


    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    if (
        studentPages.includes(currentPage) &&
        !currentUser
    ) {

        window.location.href =
            "login.html";

        return false;
    }


    return true;
}


/* =========================================================
   12. ANONYMOUS COMPLAINT
   ========================================================= */

function toggleAnonymousName() {

    const checkbox =
        document.getElementById(
            "anonymousComplaint"
        );

    const nameInput =
        document.getElementById(
            "complaintName"
        );


    if (!checkbox || !nameInput) {

        return;
    }


    if (checkbox.checked) {

        nameInput.value = "";

        nameInput.disabled = true;

        nameInput.placeholder =
            "Name hidden for anonymous complaint";

        nameInput.style.backgroundColor =
            "#f1f5f9";

    } else {

        nameInput.disabled = false;

        nameInput.placeholder =
            "Enter your name";

        nameInput.style.backgroundColor =
            "#ffffff";
    }
}


/* =========================================================
   13. COMPLAINT CHARACTER COUNTER
   ========================================================= */

function updateComplaintCharacterCount() {

    const complaintText =
        document.getElementById(
            "complaintText"
        );

    const characterCount =
        document.getElementById(
            "characterCount"
        );


    if (
        !complaintText ||
        !characterCount
    ) {

        return;
    }


    characterCount.textContent =
        complaintText.value.length;
}


/* =========================================================
   14. ADMIN FEEDBACK CHARACTER COUNTER
   ========================================================= */

function updateFeedbackCharacterCount() {

    const feedback =
        document.getElementById(
            "adminFeedback"
        );

    const characterCount =
        document.getElementById(
            "feedbackCharacterCount"
        );


    if (
        !feedback ||
        !characterCount
    ) {

        return;
    }


    characterCount.textContent =
        feedback.value.length;
}


/* =========================================================
   15. SUBMIT COMPLAINT
   ========================================================= */

function validateComplaintForm(event) {

    if (event) {
        event.preventDefault();
    }

    const currentUser = getCurrentUser();

    if (!currentUser) {

        alert("Please login before submitting a complaint.");

        window.location.href = "login.html";

        return false;
    }


    const name =
        document.getElementById("complaintName");

    const batch =
        document.getElementById("complaintBatch");

    const complaint =
        document.getElementById("complaintText");

    const anonymous =
        document.getElementById("anonymousComplaint");


    if (!batch || !complaint || !anonymous) {
        return false;
    }


    batch.value =
        batch.value.trim();

    complaint.value =
        complaint.value.trim();


    if (batch.value.length === 0) {

        alert("Please enter your batch.");

        batch.focus();

        return false;
    }


    if (!anonymous.checked) {

        if (
            !name ||
            name.value.trim().length < 2
        ) {

            alert(
                "Please enter your name or submit anonymously."
            );

            if (name) {
                name.focus();
            }

            return false;
        }
    }


    if (complaint.value.length < 5) {

        alert(
            "Please provide a more detailed complaint."
        );

        complaint.focus();

        return false;
    }


    /* ================================
       SEND COMPLAINT TO PHP + MYSQL
    ================================= */

    const formData = new FormData();

    formData.append(
        "user_id",
        currentUser.id
    );

    formData.append(
        "student_name",
        anonymous.checked
            ? "Anonymous"
            : name.value.trim()
    );

    formData.append(
        "batch",
        batch.value
    );

    formData.append(
        "is_anonymous",
        anonymous.checked ? "true" : "false"
    );

    formData.append(
        "description",
        complaint.value
    );


    fetch("submit-complaint.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        if (data.success) {

            alert(data.message);

            window.location.href =
                "my-complaints.html";

        } else {

            alert(data.message);

        }

    })
    .catch(error => {

        console.error(
            "Complaint submission error:",
            error
        );

        alert(
            "Unable to connect to the server."
        );

    });


    return false;
}


/* =========================================================
   16. GET COMPLAINT BY URL ID
   ========================================================= */

function getComplaintFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        Number(
            params.get("id")
        );


    const complaints =
        getComplaints();


    if (!Number.isNaN(id)) {

        return complaints.find(
            complaint =>
                Number(complaint.id) === id
        );
    }


    return complaints[0] || null;
}


/* =========================================================
   17. STATUS TEXT
   ========================================================= */

function getStatusText(status) {

    if (status === "approved") {

        return "Approved";
    }


    if (status === "rejected") {

        return "Rejected";
    }


    return "Processing";
}


/* =========================================================
   18. UPDATE MY COMPLAINTS PAGE
   ========================================================= */

function renderMyComplaints() {

    const currentUser = getCurrentUser();

    if (!currentUser) {
        return;
    }


    const formData = new FormData();

    formData.append(
        "user_id",
        currentUser.id
    );


    fetch("get-my-complaints.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        if (!data.success) {

            console.error(
                "Failed to load complaints:",
                data.message
            );

            return;
        }


        const complaints = data.complaints;


        /* ================================
           SUMMARY COUNTS
        ================================= */

        const total =
            complaints.length;

        const processing =
            complaints.filter(
                c => c.status === "processing"
            ).length;

        const approved =
            complaints.filter(
                c => c.status === "approved"
            ).length;

        const rejected =
            complaints.filter(
                c => c.status === "rejected"
            ).length;


        const summaryValues =
            document.querySelectorAll(
                ".summary-card strong"
            );


        if (summaryValues.length >= 4) {

            summaryValues[0].textContent =
                total;

            summaryValues[1].textContent =
                processing;

            summaryValues[2].textContent =
                approved;

            summaryValues[3].textContent =
                rejected;
        }


        /* ================================
           COMPLAINT CARDS
        ================================= */

        const cards =
            document.querySelectorAll(
                ".complaint-card"
            );


        complaints.forEach(
            (complaint, index) => {

                if (!cards[index]) {
                    return;
                }


                const card =
                    cards[index];


                const number =
                    card.querySelector(
                        ".complaint-number"
                    );

                const title =
                    card.querySelector("h3");

                const badge =
                    card.querySelector(
                        ".status-badge"
                    );

                const preview =
                    card.querySelector(
                        ".complaint-preview"
                    );

                const feedback =
                    card.querySelector(
                        ".feedback-preview"
                    );

                const view =
                    card.querySelector(
                        ".view-btn"
                    );


                if (number) {

                    number.textContent =
                        "Complaint #" +
                        String(complaint.id)
                            .padStart(3, "0");
                }


                if (title) {

                    title.textContent =
                        complaint.title;
                }


                if (badge) {

                    badge.textContent =
                        getStatusText(
                            complaint.status
                        );

                    badge.classList.remove(
                        "processing",
                        "approved",
                        "rejected"
                    );

                    badge.classList.add(
                        complaint.status
                    );
                }


                if (preview) {

                    preview.textContent =
                        complaint.description;
                }


                if (feedback) {

                    feedback.textContent =
                        "Admin feedback: " +
                        complaint.feedback;
                }


                if (view) {

                    view.href =
                        "complaint-details.html?id=" +
                        complaint.id;
                }


                /* Show card */

                card.style.display = "";
            }
        );


        /* Hide unused static cards */

        for (
            let i = complaints.length;
            i < cards.length;
            i++
        ) {

            cards[i].style.display =
                "none";
        }

    })
    .catch(error => {

        console.error(
            "Complaint loading error:",
            error
        );

    });
}
/* =========================================================
   19. UPDATE STUDENT COMPLAINT DETAILS
   ========================================================= */

function renderStudentComplaintDetails() {

    const currentUser = getCurrentUser();

    if (!currentUser) {
        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );

    const complaintId =
        Number(params.get("id"));


    if (!complaintId) {
        return;
    }


    const formData = new FormData();

    formData.append(
        "complaint_id",
        complaintId
    );

    formData.append(
        "user_id",
        currentUser.id
    );


    fetch("get-complaint.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        if (!data.success) {

            alert(data.message);

            window.location.href =
                "my-complaints.html";

            return;
        }


        const complaint =
            data.complaint;


        /* ================================
           PAGE HEADING
        ================================= */

        const heading =
            document.querySelector(
                ".complaint-detail-heading h2"
            );

        if (heading) {

            heading.textContent =
                "Complaint #" +
                String(complaint.id)
                    .padStart(3, "0");
        }


        /* ================================
           STATUS BADGE
        ================================= */

        const topBadge =
            document.querySelector(
                ".complaint-detail-heading .status-badge"
            );

        if (topBadge) {

            topBadge.textContent =
                getStatusText(
                    complaint.status
                );

            topBadge.classList.remove(
                "processing",
                "approved",
                "rejected"
            );

            topBadge.classList.add(
                complaint.status
            );
        }


        /* ================================
           TITLE
        ================================= */

        const title =
            document.querySelector(
                ".detail-card-header h3"
            );

        if (title) {

            title.textContent =
                complaint.title;
        }


        /* ================================
           STUDENT INFORMATION
        ================================= */

        const metaItems =
            document.querySelectorAll(
                ".detail-meta .meta-item"
            );


        metaItems.forEach(item => {

            const label =
                item.querySelector("span");

            const value =
                item.querySelector("strong");


            if (!label || !value) {
                return;
            }


            const labelText =
                label.textContent
                    .trim()
                    .toLowerCase();


            if (
                labelText.includes(
                    "student name"
                )
            ) {

                value.textContent =
                    complaint.name;
            }


            else if (
                labelText.includes(
                    "batch"
                )
            ) {

                value.textContent =
                    complaint.batch;
            }


            else if (
                labelText.includes(
                    "submitted"
                )
            ) {

                value.textContent =
                    complaint.date;
            }


            else if (
                labelText.includes(
                    "complaint id"
                )
            ) {

                value.textContent =
                    "#" +
                    String(complaint.id)
                        .padStart(3, "0");
            }

        });


        /* ================================
           FULL COMPLAINT
        ================================= */

        const complaintText =
            document.querySelector(
                ".complaint-full-text"
            );

        if (complaintText) {

            complaintText.textContent =
                complaint.description;
        }


        /* ================================
           STATUS SECTION
        ================================= */

        updateVisibleStatus(
            complaint.status
        );


        /* ================================
           ADMIN FEEDBACK
        ================================= */

        const feedback =
    document.querySelector(
        ".feedback-content p:not(.no-feedback)"
    );

if (feedback) {

    feedback.textContent =
        complaint.feedback ||
        "No feedback has been provided yet.";
}


        /* ================================
           PRESERVE COMPLAINT ID
        ================================= */

        document.querySelectorAll(
            'a[href="complaint-details.html"]'
        ).forEach(link => {

            link.href =
                "complaint-details.html?id=" +
                complaint.id;

        });

    })
    .catch(error => {

        console.error(
            "Complaint details error:",
            error
        );

        alert(
            "Unable to load complaint details."
        );

    });
}


/* =========================================================
   20. STATUS DESCRIPTION
   ========================================================= */

function getStatusDescription(status) {

    if (status === "approved") {

        return (
            "This complaint has been approved " +
            "by the administration."
        );
    }


    if (status === "rejected") {

        return (
            "This complaint has been rejected " +
            "by the administration."
        );
    }


    return (
        "This complaint is currently under review."
    );
}


/* =========================================================
   21. ADMIN COMPLAINT LIST
   ========================================================= */

function renderAdminComplaints() {

    fetch("get-all-complaints.php", {
        method: "POST"
    })
    .then(response => response.json())
    .then(data => {

        if (!data.success) {
            alert(data.message);
            return;
        }

        const complaints = data.complaints || [];


        /* ================================
           SUMMARY COUNTS
        ================================= */

        const totalCount = complaints.length;

        const processingCount =
            complaints.filter(
                complaint => complaint.status === "processing"
            ).length;

        const approvedCount =
            complaints.filter(
                complaint => complaint.status === "approved"
            ).length;

        const rejectedCount =
            complaints.filter(
                complaint => complaint.status === "rejected"
            ).length;


        /* ================================
           UPDATE SUMMARY CARDS
        ================================= */

        const summaryCards =
            document.querySelectorAll(".summary-card");

        summaryCards.forEach(card => {

            const titleElement =
                card.querySelector("h3, .summary-title, .card-title");

            const numberElement =
                card.querySelector(
                    ".summary-number, .number, .count, h2"
                );

            if (!titleElement || !numberElement) {
                return;
            }

            const title =
                titleElement.textContent
                    .trim()
                    .toLowerCase();

            if (title.includes("total")) {
                numberElement.textContent =
                    totalCount;
            }

            else if (title.includes("processing")) {
                numberElement.textContent =
                    processingCount;
            }

            else if (title.includes("approved")) {
                numberElement.textContent =
                    approvedCount;
            }

            else if (title.includes("rejected")) {
                numberElement.textContent =
                    rejectedCount;
            }

        });


        /* ================================
           COMPLAINT CARDS
        ================================= */

        const cards =
            document.querySelectorAll(".complaint-card");


        complaints.forEach((complaint, index) => {

            if (!cards[index]) {
                return;
            }


            const card = cards[index];


            /* Student name */

            const nameElement =
                card.querySelector(
                    ".student-name, .complainant-name"
                );

            if (nameElement) {
                nameElement.textContent =
                    complaint.anonymous
                        ? "Anonymous"
                        : complaint.name;
            }


            /* Batch */

            const batchElement =
                card.querySelector(
                    ".batch, .student-batch"
                );

            if (batchElement) {
                batchElement.textContent =
                    "Batch " + complaint.batch;
            }


            /* Complaint title */

            const titleElement =
                card.querySelector(
                    "h3, .complaint-title"
                );

            if (titleElement) {
                titleElement.textContent =
                    complaint.title;
            }


            /* Complaint description */

            const descriptionElement =
                card.querySelector(
                    ".complaint-description, p"
                );

            if (descriptionElement) {
                descriptionElement.textContent =
                    complaint.description;
            }


            /* Date */

            const dateElement =
                card.querySelector(
                    ".complaint-date, .date"
                );

            if (dateElement) {
                dateElement.textContent =
                    complaint.date;
            }


            /* Status */

            const statusElement =
                card.querySelector(
                    ".status-badge"
                );

            if (statusElement) {

                statusElement.textContent =
                    getStatusText(
                        complaint.status
                    );

                statusElement.classList.remove(
                    "processing",
                    "approved",
                    "rejected"
                );

                statusElement.classList.add(
                    complaint.status
                );
            }


            /* View Details link */

            const viewLink =
    card.querySelector(
        'a[href*="complaint-details"]'
    );

if (viewLink) {

    viewLink.href =
        "admin-complaint-details.html?id=" +
        complaint.id;
}


            /* Make card visible */

            card.style.display = "";

        });


        /* ================================
           HIDE UNUSED STATIC CARDS
        ================================= */

        for (
            let i = complaints.length;
            i < cards.length;
            i++
        ) {

            cards[i].style.display = "none";

        }

    })
    .catch(error => {

        console.error(
            "Admin complaints error:",
            error
        );

        alert(
            "Unable to load complaints."
        );

    });
}


/* =========================================================
   22. ADMIN COMPLAINT DETAILS
   ========================================================= */

function renderAdminComplaintDetails() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const complaintId =
        Number(params.get("id"));


    if (!complaintId) {
        return;
    }


    const formData =
        new FormData();

    formData.append(
        "complaint_id",
        complaintId
    );


    fetch("get-admin-complaint.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        if (!data.success) {

            alert(data.message);
            return;
        }


        const complaint =
            data.complaint;


        /* =================================
           PAGE HEADING
        ================================= */

        const heading =
            document.querySelector(
                ".complaint-detail-heading h2"
            );

        if (heading) {

            heading.textContent =
                "Complaint #" +
                String(complaint.id)
                    .padStart(3, "0");
        }


        /* =================================
           TOP STATUS BADGE
        ================================= */

        const topBadge =
            document.querySelector(
                ".complaint-detail-heading .status-badge"
            );

        if (topBadge) {

            topBadge.textContent =
                getStatusText(
                    complaint.status
                );

            topBadge.classList.remove(
                "processing",
                "approved",
                "rejected"
            );

            topBadge.classList.add(
                complaint.status
            );
        }


        /* =================================
           COMPLAINT TITLE
        ================================= */

        const title =
            document.querySelector(
                ".detail-card-header h3"
            );

        if (title) {

            title.textContent =
                complaint.title;
        }


        /* =================================
           STUDENT INFORMATION
        ================================= */

        const metaItems =
            document.querySelectorAll(
                ".detail-meta .meta-item"
            );

        metaItems.forEach(item => {

            const label =
                item.querySelector("span");

            const value =
                item.querySelector("strong");

            if (!label || !value) {
                return;
            }

            const labelText =
                label.textContent
                    .trim()
                    .toLowerCase();


            if (
                labelText.includes(
                    "student name"
                )
            ) {

                value.textContent =
                    complaint.anonymous
                        ? "Anonymous"
                        : complaint.name;
            }


            else if (
                labelText.includes(
                    "batch"
                )
            ) {

                value.textContent =
                    complaint.batch;
            }


            else if (
                labelText.includes(
                    "submitted"
                )
            ) {

                value.textContent =
                    complaint.date;
            }


            else if (
                labelText.includes(
                    "complaint id"
                )
            ) {

                value.textContent =
                    "#" +
                    String(complaint.id)
                        .padStart(3, "0");
            }

        });


        /* =================================
           COMPLAINT DESCRIPTION
        ================================= */

        const fullText =
            document.querySelector(
                ".complaint-full-text"
            );

        if (fullText) {

            fullText.textContent =
                complaint.description;
        }


        /* =================================
           STATUS SELECT
        ================================= */

        const statusSelect =
            document.getElementById(
                "complaintStatus"
            );

        if (statusSelect) {

            statusSelect.value =
                complaint.status;
        }


        /* =================================
           FEEDBACK
        ================================= */

        const feedback =
            document.getElementById(
                "adminFeedback"
            );

        if (feedback) {

            feedback.value =
                complaint.feedback || "";

            if (
                typeof updateFeedbackCharacterCount ===
                "function"
            ) {

                updateFeedbackCharacterCount();
            }
        }


        /* =================================
           CURRENT STATUS DISPLAY
        ================================= */

        updateVisibleStatus(
            complaint.status
        );

    })
    .catch(error => {

        console.error(
            "Admin complaint details error:",
            error
        );

        alert(
            "Unable to load complaint details."
        );

    });
}


/* =========================================================
   23. UPDATE VISIBLE STATUS
   ========================================================= */

function updateVisibleStatus(status) {

    const statusDisplay =
        document.querySelector(
            ".status-display"
        );

    const statusDot =
        document.querySelector(
            ".status-dot"
        );

    const statusTitle =
        document.querySelector(
            ".status-display strong"
        );

    const statusDescription =
        document.querySelector(
            ".status-display p"
        );


    /* -----------------------------------------
       Main status display
    ----------------------------------------- */

    if (
        statusDisplay &&
        statusTitle &&
        statusDescription
    ) {

        statusTitle.textContent =
            getStatusText(status);


        statusDescription.textContent =
            getStatusDescription(status);


        statusDisplay.classList.remove(
            "processing-status",
            "approved-status",
            "rejected-status"
        );


        if (status === "approved") {

            statusDisplay.classList.add(
                "approved-status"
            );

        }

        else if (status === "rejected") {

            statusDisplay.classList.add(
                "rejected-status"
            );

        }

        else {

            statusDisplay.classList.add(
                "processing-status"
            );
        }
    }


    /* -----------------------------------------
       Status dot
    ----------------------------------------- */

    if (statusDot) {

        statusDot.classList.remove(
            "processing-dot",
            "approved-dot",
            "rejected-dot"
        );


        if (status === "approved") {

            statusDot.classList.add(
                "approved-dot"
            );

        }

        else if (status === "rejected") {

            statusDot.classList.add(
                "rejected-dot"
            );

        }

        else {

            statusDot.classList.add(
                "processing-dot"
            );
        }
    }


    /* -----------------------------------------
       Top status badge
    ----------------------------------------- */

    const topBadge =
        document.querySelector(
            ".complaint-detail-heading .status-badge"
        );


    if (topBadge) {

        topBadge.textContent =
            getStatusText(status);


        topBadge.classList.remove(
            "processing",
            "approved",
            "rejected"
        );


        topBadge.classList.add(
            status
        );
    }
}


/* =========================================================
   24. ADMIN UPDATE COMPLAINT
   ========================================================= */

function validateAdminComplaintForm() {

    const params =
        new URLSearchParams(window.location.search);

    const complaintId =
        Number(params.get("id"));

    if (!complaintId) {
        alert("Invalid complaint.");
        return false;
    }


    /* ================================
       GET STATUS
    ================================= */

    const statusSelect =
        document.querySelector(
            'select[name="status"], #complaintStatus, #status'
        );

    const status =
        statusSelect
            ? statusSelect.value
            : "processing";


    /* ================================
       GET FEEDBACK
    ================================= */

    const feedbackField =
    document.querySelector(
        'textarea[name="adminFeedback"], #adminFeedback'
    );

    const feedback =
        feedbackField
            ? feedbackField.value.trim()
            : "";


    /* ================================
       SEND TO PHP
    ================================= */

    const formData =
        new FormData();

    formData.append(
        "complaint_id",
        complaintId
    );

    formData.append(
        "status",
        status
    );

    formData.append(
        "feedback",
        feedback
    );


    fetch("update-complaint.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        if (!data.success) {

            alert(data.message);
            return;
        }


        alert(
            "Complaint updated successfully."
        );


        /* Go back to Admin Complaints */

        window.location.href =
            "admin-complaints.html";

    })
    .catch(error => {

        console.error(
            "Update complaint error:",
            error
        );

        alert(
            "Unable to update complaint."
        );

    });


    return false;
}

/* =========================================================
   25. DELETE COMPLAINT
   ========================================================= */

function deleteComplaint() {

    const complaint =
        getComplaintFromURL();

    if (!complaint) {

        alert(
            "Complaint could not be found."
        );

        return false;
    }

    const confirmed =
        confirm(
            "Are you sure you want to delete this complaint?\n\nThis action cannot be undone."
        );

    if (!confirmed) {
        return false;
    }

    const formData =
        new FormData();

    formData.append(
        "complaint_id",
        complaint.id
    );

    fetch("delete-complaint.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        if (data.success) {

            alert(
                "Complaint deleted successfully."
            );

            window.location.href =
                "admin-complaints.html";

        } else {

            alert(
                data.message ||
                "Failed to delete complaint."
            );
        }

    })
    .catch(error => {

        console.error(
            "Delete complaint error:",
            error
        );

        alert(
            "Something went wrong while deleting the complaint."
        );
    });

    return false;
}


/* =========================================================
   26. WITHDRAW COMPLAINT
   ========================================================= */

function withdrawComplaint() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const complaintId =
        Number(
            params.get("id")
        );

    if (!complaintId) {

        alert(
            "Complaint could not be found."
        );

        return false;
    }

    const confirmed =
        confirm(
            "Are you sure you want to withdraw this complaint?"
        );

    if (!confirmed) {
        return false;
    }

    const currentUser =
        getCurrentUser();

    if (!currentUser) {

        alert(
            "You must be logged in."
        );

        return false;
    }

    const formData =
        new FormData();

    formData.append(
        "complaint_id",
        complaintId
    );

    formData.append(
        "user_id",
        currentUser.id
    );

    fetch("withdraw-complaint.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        if (data.success) {

            alert(
                "Complaint withdrawn successfully."
            );

            window.location.href =
                "my-complaints.html";

        } else {

            alert(
                data.message ||
                "Failed to withdraw complaint."
            );
        }

    })
    .catch(error => {

        console.error(
            "Withdraw complaint error:",
            error
        );

        alert(
            "Something went wrong while withdrawing the complaint."
        );
    });

    return false;
}
/* =========================================================
   27. PROFILE PAGE
   ========================================================= */

function renderProfile() {

    const user =
        getCurrentUser();


    if (!user) {

        return;
    }


    /* -----------------------------------------
       Profile name
    ----------------------------------------- */

    const nameElements =
        document.querySelectorAll(
            ".profile-name"
        );


    nameElements.forEach(
        element => {

            element.textContent =
                user.name;
        }
    );


    /* -----------------------------------------
       Profile email
    ----------------------------------------- */

    const emailElements =
        document.querySelectorAll(
            ".profile-email"
        );


    emailElements.forEach(
        element => {

            element.textContent =
                user.email;
        }
    );


    /* -----------------------------------------
       Profile batch
    ----------------------------------------- */

    const batchElements =
        document.querySelectorAll(
            ".profile-batch"
        );


    batchElements.forEach(
        element => {

            element.textContent =
                user.batch;
        }
    );


    /* -----------------------------------------
       Common profile fields
    ----------------------------------------- */

    const profileValues =
        document.querySelectorAll(
            ".profile-field strong"
        );


    if (profileValues.length >= 3) {

        profileValues[0].textContent =
            user.name;

        profileValues[1].textContent =
            user.email;

        profileValues[2].textContent =
            user.batch;
    }
}


/* =========================================================
   28. CHANGE PASSWORD
   ========================================================= */

function validateChangePassword() {

    const currentPassword =
        document.getElementById("currentPassword");

    const newPassword =
        document.getElementById("newPassword");

    const confirmNewPassword =
        document.getElementById("confirmNewPassword");

    if (
        !currentPassword ||
        !newPassword ||
        !confirmNewPassword
    ) {
        return false;
    }

    const currentUser =
        getCurrentUser();

    if (!currentUser) {

        alert(
            "Please login first."
        );

        return false;
    }

    if (
        newPassword.value.length < 6
    ) {

        alert(
            "New password must contain at least 6 characters."
        );

        newPassword.focus();

        return false;
    }

    if (
        newPassword.value !==
        confirmNewPassword.value
    ) {

        alert(
            "New passwords do not match."
        );

        confirmNewPassword.focus();

        return false;
    }

    if (
        currentPassword.value ===
        newPassword.value
    ) {

        alert(
            "New password must be different from your current password."
        );

        return false;
    }

    const formData =
        new FormData();

    formData.append(
        "user_id",
        currentUser.id
    );

    formData.append(
        "current_password",
        currentPassword.value
    );

    formData.append(
        "new_password",
        newPassword.value
    );

    fetch("change-password.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        if (data.success) {

            currentPassword.value = "";
            newPassword.value = "";
            confirmNewPassword.value = "";

            alert(
                "Password changed successfully!"
            );

        } else {

            alert(
                data.message ||
                "Failed to change password."
            );
        }

    })
    .catch(error => {

        console.error(
            "Change password error:",
            error
        );

        alert(
            "Something went wrong while changing the password."
        );
    });

    return false;
}


/* =========================================================
   29. GET USER PASSWORD
   ========================================================= */

function getUserPassword(userId) {

    const users =
        getData(
            STORAGE.USERS,
            []
        );


    const user =
        users.find(
            item =>
                item.id ===
                userId
        );


    return user
        ? user.password
        : null;
}


/* =========================================================
   30. LOGOUT
   ========================================================= */

function confirmLogout() {
    const currentPage = window.location.pathname.toLowerCase();

    // Student logout
    localStorage.removeItem(STORAGE.CURRENT_USER);


    // Redirect based on current page
    if (currentPage.includes("admin-")) {
        window.location.href = "admin-login.html";
    } else {
        window.location.href = "login.html";
    }

    return false;
}


/* =========================================================
   31. ADMIN LOGOUT
   ========================================================= */

function adminLogout() {

    fetch("admin-logout.php", {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {

        

        window.location.href = "admin-login.html";

    })
    .catch(error => {

        console.error("Admin logout error:", error);

        window.location.href = "admin-login.html";

    });
}


/* =========================================================
   32. HOME PAGE USER INFORMATION
   ========================================================= */

function renderHomeUser() {

    const user =
        getCurrentUser();


    if (!user) {

        return;
    }


    /* -----------------------------------------
       Student name
    ----------------------------------------- */

    const welcomeElements =
        document.querySelectorAll(
            ".student-name"
        );


    welcomeElements.forEach(
        element => {

            element.textContent =
                user.name;
        }
    );


    /* -----------------------------------------
       Student batch
    ----------------------------------------- */

    const batchElements =
        document.querySelectorAll(
            ".student-batch"
        );


    batchElements.forEach(
        element => {

            element.textContent =
                user.batch;
        }
    );
}


/* =========================================================
   33. AUTO-FILL COMPLAINT FORM
   ========================================================= */

function autoFillComplaintForm() {

    const user =
        getCurrentUser();


    if (!user) {

        return;
    }


    const batch =
        document.getElementById(
            "complaintBatch"
        );

    const name =
        document.getElementById(
            "complaintName"
        );


    if (batch) {

        batch.value =
            user.batch;
    }


    if (name) {

        name.value =
            user.name;
    }
}


/* =========================================================
   34. PAGE INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* -----------------------------------------
           Initialize demo data
        ----------------------------------------- */

        initializeDemoData();


        /* -----------------------------------------
           Authentication
        ----------------------------------------- */

        checkStudentAuthentication();

        document.addEventListener("DOMContentLoaded", function () {
    
});


        /* -----------------------------------------
           Complaint character counter
        ----------------------------------------- */

        const complaintText =
            document.getElementById(
                "complaintText"
            );


        if (complaintText) {

            complaintText.addEventListener(
                "input",
                updateComplaintCharacterCount
            );


            updateComplaintCharacterCount();
        }


        /* -----------------------------------------
           Admin feedback character counter
        ----------------------------------------- */

        const adminFeedback =
            document.getElementById(
                "adminFeedback"
            );


        if (adminFeedback) {

            adminFeedback.addEventListener(
                "input",
                updateFeedbackCharacterCount
            );


            updateFeedbackCharacterCount();
        }


        /* -----------------------------------------
           Anonymous complaint
        ----------------------------------------- */

        const anonymousCheckbox =
            document.getElementById(
                "anonymousComplaint"
            );


        if (anonymousCheckbox) {

            anonymousCheckbox.addEventListener(
                "change",
                toggleAnonymousName
            );


            toggleAnonymousName();
        }


        /* -----------------------------------------
           Complaint form auto-fill
        ----------------------------------------- */

        if (
            document.getElementById(
                "complaintBatch"
            )
        ) {

            autoFillComplaintForm();
        }


        /* -----------------------------------------
           Student complaint list
        ----------------------------------------- */

        if (
            window.location.pathname
                .split("/")
                .pop() ===
            "my-complaints.html"
        ) {

            renderMyComplaints();
        }


        /* -----------------------------------------
           Admin complaint list
        ----------------------------------------- */

        if (
            window.location.pathname
                .split("/")
                .pop() ===
            "admin-complaints.html"
        ) {

            renderAdminComplaints();
        }


       const currentPage =
    window.location.pathname
        .split("/")
        .pop();

if (currentPage === "complaint-details.html") {
    renderStudentComplaintDetails();
}

if (currentPage === "admin-complaint-details.html") {
    renderAdminComplaintDetails();
}


        /* -----------------------------------------
           Profile
        ----------------------------------------- */

        if (
            document.querySelector(
                ".profile-card"
            )
        ) {

            renderProfile();
        }


        /* -----------------------------------------
           Home
        ----------------------------------------- */

        if (
            document.querySelector(
                ".dashboard-options"
            )
        ) {

            renderHomeUser();
        }


        /* -----------------------------------------
           Console confirmation
        ----------------------------------------- */

        console.log(
            "SCMS JavaScript loaded successfully."
        );

    }
);