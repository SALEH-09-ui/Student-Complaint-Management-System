🎓 Student Complaint Management System

<p align="center">
<b>Web-Based Student Complaint Management System</b><br>
A PHP and MySQL based academic web application for submitting, tracking, and managing student complaints.
</p>

<p align="center">








</p>

📌 Project Overview

The Student Complaint Management System (SCMS) provides a structured platform where students can submit complaints and track their progress.

The system has two main interfaces:

👨‍🎓 Student Panel — registration, login, complaint submission, complaint history, details, status, feedback, withdrawal, and password management.

🛡️ Administrator Panel — secure login, complaint review, status updates, feedback, deletion, and logout.

The application uses HTML, CSS, JavaScript, PHP, and MySQL and is designed to run locally through XAMPP.

🎯 Objectives

Provide a digital complaint submission platform.

Store complaint information in MySQL.

Allow students to track complaint status.

Support anonymous complaints.

Allow administrators to process complaints and provide feedback.

Store passwords securely using PHP password hashing.

Protect administrator pages using PHP sessions.

Demonstrate practical frontend, backend, database, and Git collaboration.

✨ Key Features

👨‍🎓 Student Features

✅ Student registration

✅ Student login

✅ Complaint submission

✅ Anonymous complaint option

✅ Complaint history

✅ Individual complaint details

✅ Complaint status tracking

✅ Administrator feedback viewing

✅ Complaint withdrawal

✅ Password change

✅ Client-side validation

🛡️ Administrator Features

🔐 Secure administrator login

🔒 PHP session-based authentication

📋 View all complaints

🔎 View individual complaint details

🔄 Update complaint status

💬 Provide feedback

🗑️ Delete complaints

🚪 Administrator logout

🛡️ Protected administrator pages

🔄 System Workflow



Workflow

Student registers or logs in.

Student submits a complaint.

PHP validates and processes the request.

Complaint data is stored in MySQL.

Student can view complaint history and details.

Administrator logs into the administrator panel.

Administrator reviews complaints.

Administrator updates status and/or provides feedback.

Changes are stored in MySQL.

Student can view the updated status and feedback.

🏗️ System Architecture

┌──────────────────────┐
│       Student        │
│      Web Browser     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ HTML / CSS / JS      │
│ Frontend Interface   │
└──────────┬───────────┘
           │ HTTP Requests
           ▼
┌──────────────────────┐
│       PHP Layer      │
│ Validation + Logic   │
└──────────┬───────────┘
           │ SQL
           ▼
┌──────────────────────┐
│        MySQL         │
│     scms_db          │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Administrator Panel  │
│ Review / Update /    │
│ Feedback / Delete    │
└──────────────────────┘

🧰 Technology Stack

Technology

Purpose

HTML5

Webpage structure

CSS3

Interface design

JavaScript

Client-side interaction

PHP

Server-side processing

MySQL

Persistent data storage

XAMPP

Apache and MySQL local server

phpMyAdmin

Database administration

Git

Version control

GitHub

Repository and collaboration

🗄️ Database Design

Database name:

scms_db

users

Field

Description

id

Primary key

name

Student name

email

Unique student email

batch

Student batch

password

Hashed password

created_at

Account creation time

complaints

Field

Description

id

Primary key

user_id

Related student

student_name

Student name

batch

Student batch

is_anonymous

Anonymous complaint flag

title

Complaint title

description

Complaint details

status

Processing / Approved / Rejected

feedback

Administrator feedback

created_at

Creation time

updated_at

Last update time

admins

Field

Description

id

Primary key

name

Administrator name

email

Unique administrator email

password

Hashed password

created_at

Account creation time

🔐 Authentication & Security

The system uses:

PHP password_hash() for password storage.

PHP password_verify() for login verification.

Prepared SQL statements for database operations.

PHP sessions for administrator authentication.

Protected administrator pages.

User-specific complaint retrieval.

Administrator-only complaint deletion.

📂 Project Structure

SCMS/
│
├── README.md
├── system-workflow.png
│
├── Student Pages
│   ├── login.html
│   ├── signup.html
│   ├── home.html
│   ├── submit-complaint.html
│   ├── my-complaints.html
│   ├── complaint-details.html
│   └── profile.html
│
├── Administrator Pages
│   ├── admin-login.html
│   ├── admin-dashboard.html
│   ├── admin-complaints.html
│   └── admin-complaint-details.html
│
├── PHP Backend
│   ├── db.php
│   ├── login.php
│   ├── signup.php
│   ├── submit-complaint.php
│   ├── get-my-complaints.php
│   ├── get-complaint.php
│   ├── change-password.php
│   ├── withdraw-complaint.php
│   ├── admin-login.php
│   ├── check-admin.php
│   ├── admin-logout.php
│   ├── get-all-complaints.php
│   ├── get-admin-complaint.php
│   ├── update-complaint.php
│   └── delete-complaint.php
│
├── script.js
└── style.css

🚀 How to Run

1. Install XAMPP

Make sure Apache and MySQL are available.

2. Place the project

C:\xampp\htdocs\SCMS

3. Start XAMPP

Start:

Apache
MySQL

4. Create the database

Open:

http://localhost/phpmyadmin

Create:

scms_db

Then create the required tables:

users
complaints
admins

5. Open the project

http://localhost/SCMS/

⚠️ Do not use VS Code Live Server. PHP and MySQL require the XAMPP Apache server.

👥 Team Contributions

S.M. Saleh Ahmed

Student-side HTML pages

CSS and interface design

Student-side integration

Registration and login integration

Complaint submission integration

Project documentation and repository organization

Sadiya

Student complaint module

Complaint details

Complaint history retrieval

Password change functionality

Student profile functionality

Related PHP backend integration

Farin

Administrator module

Administrator login interface

Administrator dashboard

Complaint management interface

Administrator authentication

Complaint retrieval backend

Farhana

Administrator complaint-management operations

Administrator complaint details

Complaint status update

Complaint deletion

Administrator logout

Withdrawal-related backend functionality

🌿 GitHub Branch Structure

main
│
├── saleh
├── sadiya
├── farin
└── farhana

The main branch contains the complete project. The member branches organize the work associated with each team member.

🧪 Main Modules

Student Module

Registration
     ↓
Login
     ↓
Student Home
     ↓
Submit Complaint
     ↓
My Complaints
     ↓
Complaint Details
     ↓
Status / Feedback

Administrator Module

Admin Login
     ↓
Authentication
     ↓
Admin Dashboard
     ↓
View Complaints
     ↓
Complaint Details
     ↓
Update Status / Feedback
     ↓
Delete / Manage Complaint
     ↓
Logout

📋 Complaint Status

Status

Meaning

processing

Complaint is currently being reviewed

approved

Complaint has been approved

rejected

Complaint has been rejected

🔮 Future Improvements

📧 Email notifications

🔔 Real-time notifications

📊 Administrator analytics dashboard

🔎 Advanced complaint search and filtering

📱 Improved mobile responsiveness

👥 Multiple administrator roles

📝 Complaint categories

📎 File attachment support

☁️ Production deployment

🛡️ Additional security and access control

🎓 Academic Purpose

This project demonstrates practical understanding of:

Frontend web development

HTML and CSS

JavaScript

PHP

MySQL

CRUD operations

Authentication

Session management

Database integration

Git and GitHub collaboration

📌 Project Status

Completed Academic Project

The system currently supports student registration, authentication, complaint submission, complaint tracking, administrator complaint management, status updates, feedback, deletion, withdrawal, and password management.

<p align="center">
<b>Student Complaint Management System</b><br>
Academic Web Development Project
</p>