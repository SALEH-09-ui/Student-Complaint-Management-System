<div align="center">

🎓 Student Complaint Management System

Web-Based Student Complaint Management System

A simple and structured web application for submitting, tracking, and managing student complaints.

<p>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white">
</p>

</div>

📌 System Overview

The Student Complaint Management System (SCMS) is a PHP and MySQL based web application designed to digitalize the process of submitting and managing student complaints.

The system provides two main interfaces:

👨‍🎓 Student Panel

Student registration and login

Submit complaints

Anonymous complaint option

View complaint history

View complaint details and status

Receive administrator feedback

Withdraw complaints

Change password

🛡️ Administrator Panel

Secure administrator login

Protected dashboard

View all complaints

View individual complaint details

Update complaint status

Provide feedback

Delete complaints

Administrator logout

🔄 System Workflow

Student
   │
   ▼
Register / Login
   │
   ▼
Submit Complaint
   │
   ▼
PHP Backend
   │
   ▼
MySQL Database
   │
   ▼
Administrator
   │
   ├── Review Complaint
   ├── Update Status
   └── Provide Feedback
   │
   ▼
Student Views Status & Feedback

🖼️ Workflow Diagram



🧰 Technology Stack

Technology

Purpose

HTML5

Webpage structure

CSS3

Interface design and styling

JavaScript

Client-side interaction and requests

PHP

Backend processing and database operations

MySQL

Data storage

XAMPP

Local Apache and MySQL environment

Git & GitHub

Version control and collaboration

🗄️ Database

Database: scms_db

Main tables:

users — student account information

complaints — complaint details, status, and feedback

admins — administrator account information

The complaints table is connected to the users table through user_id.

🔐 Security

The system includes basic security mechanisms such as:

Password hashing using PHP password_hash()

Password verification using password_verify()

PHP session-based administrator authentication

Prepared SQL statements

User-specific complaint retrieval

Protected administrator operations

📂 Project Structure

SCMS/
│
├── Student Pages
├── Administrator Pages
├── PHP Backend
├── script.js
├── style.css
├── db.php
├── README.md
└── system-workflow.PNG

👥 Team Contributions

Member

Main Contribution

S.M. Saleh Ahmed

Student-side UI, HTML/CSS, integration, documentation

Sadiya

Student complaint module and related PHP functionality

Farin

Administrator module and authentication

Farhana

Complaint management operations and related backend

🌿 GitHub Branches

main
├── saleh
├── sadiya
├── farin
└── farhana

The main branch contains the integrated project, while individual branches contain each member's assigned work.

🚀 Running the Project

Install and open XAMPP.

Start Apache and MySQL.

Place the project inside:

C:\xampp\htdocs\SCMS

Create the scms_db database in phpMyAdmin.

Open:

http://localhost/SCMS/

⚠️ Run the project through XAMPP Apache, not VS Code Live Server.

📌 Project Status

Completed Academic Project

The system currently supports student authentication, complaint submission and tracking, administrator complaint management, status updates, feedback, deletion, withdrawal, and password management.

<div align="center">

🎓 Student Complaint Management System

Academic Web Development Project

</div>