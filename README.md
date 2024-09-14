<a id="readme-top"></a>

# HireHaven - A Modern Job Board and Portfolio Management App
<p>HireHaven is a job board platform that allows users to log in, explore job listings, and apply for jobs. In addition, users can manage and update their own portfolios, providing a seamless experience for job hunting and career management. The app is built using modern web development technologies for optimal performance and user experience.</p>

[![image](https://github.com/user-attachments/assets/e51ab7c0-ce5a-496e-90f3-67ebd3ee0bb2)](https://job-board-app-alpha.vercel.app/)

## Features

<ul>
  <li>
    <strong>Job Listings: </strong>Browse and search for various job openings.
  </li>
  <li>
    <strong>Job Applications: </strong>Apply for jobs directly from the platform with a simple and intuitive process.
  </li>
  <li>
    <strong>Portfolio Management: </strong>Users can create, update, and manage their portfolios to showcase their skills and work experience.
  </li>
  <li>
    <strong>Authentication: </strong>Secure user login and account management powered by NextAuth.
  </li>
  <li>
    <strong>Responsive Design: </strong>Clean and modern design, ensuring an optimal experience across devices.
  </li>
</ul>

## How It Works

<ol>
  <li><strong>Login: </strong> Users can create an account or log in securely via NextAuth.</li>
  <li><strong>Explore Jobs: </strong> Navigate through various job listings, search by title or industry, and find relevant opportunities.</li>
  <li><strong>Apply to Jobs: </strong> Easily apply for jobs by submitting a resume and cover letter.</li>
  <li><strong>Manage Portfolio: </strong> Users can update their personal portfolios with new projects, experiences, and skills.</li>
</ol>

## Tech stack

<ul>
  <li><strong>Next.js 14:</strong> For server-side rendering and routing.</li>
    <li><strong>TypeScript:</strong> For adding static typing to the project, enhancing code quality and maintainability.</li>
    <li><strong>Prisma:</strong> For database management and data modeling.</li>
    <li><strong>Framer Motion:</strong> For beautiful animations and transitions.</li>
    <li><strong>Tailwind CSS:</strong> For modern styling and responsive design.</li>
    <li><strong>React Hook Form:</strong> For efficient and flexible form management.</li>
    <li><strong>Axios:</strong> For making API requests to Hugging Face models.</li>
    <li><strong>NextAuth:</strong> For secure authentication and authorization</li>
</ul>

## Project Structure

<ul>
  <li><strong>Job Listings Page: </strong>Displays all the available jobs.</li>
  <li><strong>Job Details Page: </strong>Provides detailed information about a specific job and allows users to apply.</li>
  <li><strong>User Portfolio Page: </strong>Where users can view and manage their personal portfolios.</li>
  <li><strong>API Integration: </strong>Handles job data fetching and user management.</li>
</ul>

## How to Run Locally

<ol>
  <li>Clone this repository: 
    
    git clone https://github.com/belgalc/job-board-app.git
</li>
<li>Navigate to the project directory:

    cd job-board-app

</li>
<li>Install dependencies:

    npm install

</li>
<li>Create a .env file and add your environment variables:
    ```
  
    DATABASE_URL =your_prisma_database_url
    NEXT_PUBLIC_API_URL=http://localhost:3000
    GOOGLE_CLIENT_ID = your_google_client_ID
    GOOGLE_CLIENT_SECRET = your_google_client_secret
    AUTH_SECRET = your_auth_secret
    ```
</li>
<li>Start the development server:

    npm run dev

</li>
<li>Open the app in your browser:

    http://localhost:3000

</li>

</ol>

## Future Features

<ul>
  <li><strong>Support for more APIs: </strong> Add other models or enhance the current emotion analysis for better accuracy. </li>
  <li><strong>Real-time updates: </strong> Analyze comments and posts from social media in real-time. </li>
  <li><strong>More Visualizations: </strong> Additional chart types for a more detailed breakdown of data. </li>
  <li><strong>Fix Translation API bug: </strong> Reimplement translation in this project since it was removed due to API bugs. </li>
</ul>
