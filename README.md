# InternHunt Project

This project contains two main parts:

- **backend**:  
  Contains the backend API and server-side logic (Node.js, Express).

- **frontend**:  
  Contains the frontend web application built with React and Vite.

---

## CI/CD Setup

The project uses AWS Amplify for automated Continuous Integration and Continuous Deployment (CI/CD).

- The `amplify.yml` file at the root configures Amplify to build and deploy the frontend app automatically on every code push.
- The build process installs dependencies, builds the frontend from the `frontend` folder, and deploys the production-ready app.

---

## How to Run Locally

### Backend

Navigate to the `backend` folder to install dependencies and start the backend server.

### Frontend

Navigate to the `frontend` folder to install dependencies and start the frontend dev server.

---

## Environment Variables

Sensitive environment variables (such as database credentials and API keys) are not committed to the repository. They are managed securely using Amplify environment variables or other secret management solutions.

---

This setup ensures a clear separation of frontend and backend code and an automated deployment pipeline.
