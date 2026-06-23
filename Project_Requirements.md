##### About myself
Hello. I have a fairly heavy project. Let me tell you a little about myself. I work with React. I also learned TypeScript. I usually do the styling in my projects with module.scss files (although I also know Tailwind, but I use it for short, minor stylings)
Recently, our training course also taught us Next JS. It was very difficult to learn. Now I wanted to work on the final project together so that it would work perfectly.
Since the number of requests in the requirements message is large, I think it's better to proceed step by step. I already completed some tasks such as the installation packages, adding a header with login modal, Home page and the contents in it. I am very new to NextJS.
The project has two parts, front and back, which they provided us with the files that are with Django to handle the api endpoints to do our project with.
By the way, I do not know the backend and Django at all. I just set it up, built a superuser account, and installed requirements.txt. For the pages i only checked the endpoints. please help and guide me through each step. So I will send the text now.
##### The project
Requested text:
Learn English
The goal is to build an English language educational web application that uses the Django Rest framework backend. The project includes user sections (student and teacher), dashboards, payment and admin management.
This project should be implemented with Next.js and use the redux toolkit for state management and React query for API request management.

Project details:
**Overall project structure and technologies:**
+ Using next.js for server-side rendering, routing and SEO optimization
+ Using typescript if possible to write more maintainable code

**User interface and design tips (UI/UX):**
I use module.scss. for styling. I put the file right next to the pages
The design should be responsive - Use cards to display courses - Display messages with Toast - Add dark mode - Show loading when receiving data - Use loading / skeleton for API requests - Use standard forms with validation with react hook form

**Home page:**
The following items should be displayed on the home page:
+ A list of popular courses
+ A number of selected professors
+ Latest blog articles

**Data:**
The backend API must be used to fill these sections. Define the endpoints in the relevant sections.

###### Authentication:
The user authentication process in the backend is done as JWT Cookie-Based Authentication.

**Register:**
Post method - Address: api/register - Description: This endpoint is used to create a new user account.
At this point, the user can register as a student or a Tutor.

**Login:**
POST method - Address: api/login - Description: Receive access, referesh token and automatically store them in HttpOnly Cookies

**Me:**
GET method - Address: api/me - Description: Receive logged in user information

**Logout:**
POST method - Address: api/logout - Description: Log out the user from the system and delete the tokens stored in the cookie.

Important note about JWT Token: After logging in, the user receives his token in the cookie. Subsequent requests from the Axios side do not require any special headers, as withCredentials automatically sends cookies.
###### Student Dashboard:
This section is designed specifically for students and includes the ability to view and edit personal information, view enrolled courses, and manage assignments.

**Features:**
**view profile:**
Method: GET - Address: /api/students/me - Description: Get student user profile information.

**Edit profile:**
Method: PATCH - Address api/students/me/profile - Description: Edit profile information (such as name, age, language level, etc.)

**Dashboard Data:**
Method: GET - Address: api/students/me/dashboard - Description: List of enrolled courses, progress, and information about payment status

**Enroll in course:**
Method: POST - Address: api/enrollments - Description: A student can submit a registration request by selecting a course. The status of this registration is approved or rejected by the Admin.

**User design suggestion:** The Student dashboard section should include the following sections: profile for viewing and editing information - My courses for a list of courses being studied - payments for displaying payment status - Homeworks for a list of registered assignments
###### Tutor Dashboard
The section for tutors is designed with two display modes:
**Pre-Approval mode**
If the is_approved field in the tutor profile is False. A multi-step form for completing information should be displayed on the Tutor Dashboard page (create profile form). At the end, a message waiting for the admin will be displayed.
**Post-Approval mode**
If the is_approved field is True, the tutor can enter his dashboard and have access to full features.

**Features:**
**Create Profile:**
Method: POST - Address: api/tutors/create_profile - Description: The tutor sends his basic information, documents, education, and educational background. (Submit Form-Data / Multipart)

**My Dashboard:**
Get method - URL api/tutors/my_dashboard - Description: Display general information about the teacher such as number of students, satisfaction rate, active courses and comments

**Course management:**
GET,POST,PATCH,DELETE methods
in api/courses - Description: Complete management of creating, editing, deleting and viewing courses

**Review management:**
Display a list of feedback received from students in the teacher dashboard
###### Tutor approval process
The tutor approval process is done by the admin through the Django admin panel.
Steps: 
1. The tutor submits the profile creation form at api/tutors/create_profile. 
2. The admin enters the tutors section in Django Admin.
3. There, he changes the is_approved status to true.
4. After approval, the tutor can enter his full dashboard.
###### Payment & Enrollment
**Enrollment flow:**
1. Student sends a request to enroll in a course via POST/api/enrollments.
2. A new record is created in the Enrollment model with an initial status of pending.
3. Admin approves or rejects the enrollment status via the Django admin panel.
4. After admin approval, the student gets access to the course content. Currently, the online payment system is not enabled in the current version. However, for simulation, the admin is responsible for manually approving the payment status in the Admin panel.
###### Important notes for the front-end team:
**Axios Configuration**
To communicate with the server, Axios must be configured with the withCredentials:true option so that cookies are automatically sent in requests.
const api=axios.create({baseURL:"http://localhost:8000/api/",withCredentials:true,})

**React Query / Redux Toolkit**
Use React Query or Redux Toolkit to manage data and improve caching. React Query is very suitable for fetching data from the API, and Redux toolkit is recommended for maintaining user state and session.
Form handling
Use React Hook Form X with Zod for validation to manage forms.
In registration and login forms, errors received from the server must be clearly displayed to the user.
**UI and design**
Use TailwindCSS, sass(I prefer sass. Tailwind is better for little stylings) and Lucide Icons to design the user interface.
Sensitive pages such as dashboard, register, login should be designed in a right-aligned and responsive manner.

**Admin panel interaction**
In the development environment, the front-end team can use the following address to review data, change payment status, and approve instructors:
http://localhost:8000/admin
From this panel, you can log in, manage users, approve or reject instructors, and change payment status.
###### Recommended API Communication Architecture
Axios service
Create one or more services for endpoints in a folder like src/services/. For example:
+ auth.service.js
+ courses.service.js
+ tutors.service.js
+ blog.service.js
+ student.service.js
+ tutor.service.js
All services should use Axios with cookies enabled.
React Query
For GET requests and data updates:
useQuery
For operations like sign up/submit form useMutation
After Mutation, refresh data with queryClient.invalidateQueries() or refetch.

Redux toolkit
For user state and authentication:
Create a slice for auth
Important information includes: login state, user role, profile data if needed

Pages and paths (Checklist)
+ /(Home)
+ /login
+ /register/student
+ /register/tutor
+ /courses
+ /tutors
+ /blog
+ /dashboard/student
+ /dashboard/student/edit
+ /dashboard/tutor

Deliverables:
+ Project GitHub repository
+ Successful registration and login implementation
+ Student and teacher dashboard implementation
+ Proper communication with backend api
+ The home page should display information about popular professors and articles, etc.
+ Student registration should be done in the correct path and registered correctly in the system.
+ Teacher registration should be done in the correct path.
+ Login should be done in the /login path and the user should be guided based on role
+ All API requests should be made with withCredentials
+ Student dashboard should display data according to the endpoint.
+ Student profile editing should be done with PATCH and the correct endpoint
+ Course registration by the student should have a pending status.
+ Teacher dashboard should be limited before full approval
+ Teacher profile form should be sent to the correct endpoint.
+ List of courses/approved professors/ blog articles should be displayed from the API.
+ UI section should include Toast, loading, dark mode.