# B'flow

This document explains how to run the B'flow project locally and how it's hosted on Render. Follow these steps to get everything up and running smoothly.

**Developed by**

- Jenna Perunka
- Eeli Purola
- Joona Koistinaho
- Atte Blomqvist
- Daniel Mwai
- Joonas Kallio

As part of the Bachelor's project, Spring 2025.

---

### Project Setup

To initialize and run the project locally:

1.  **Backend (API):**
    *   Navigate to the API directory: `cd api`
    *   Create a virtual environment: `python3 -m venv venv` (Use `python` if `python3` isn't available)
    *   Activate the virtual environment: `.\venv\Scripts\activate` (It may also be the bin folder for your system)
    *   Install Flask: `pip install -r requirements.txt`

2.  **Frontend (Client):**
    *   Navigate to the client directory: `cd client`
    *   Install dependencies: `npm install`

3.  **Run the Project:**
    *   Execute the `start.bat` script: `cmd /c start.bat` ( You may need to modify thi to fit your system)

If everything worked you should see the message hello in your browser


---


### Application on the Internet (Render Deployment)

The application is already deployed and live on Render. 

**Website: https://bflow-prod.onrender.com**

However, if you make changes to the frontend, you must rebuild the frontend and move the new build folder into the backend directory (api/) for the changes to take effect online. This ensures that the static frontend is properly served by the backend in the deployed environment.

1. **Build the Frontend**

    * Open your terminal
    * Navigate to the client directory: `cd client`
    * Create a new build of the frontend: `npm run build`

2. **Move Build Folder to Backend Root**
    * After the build completes, move the generated "build" folder into the backend root directory.

3. **Commit and Push changes**
   * Commit the changes to your Git repository and push them to GitHub

4. **Go to Render page**
   * Go to your [Render dashboard](https://dashboard.render.com/)
   * Click on the service named bflow_prod
   * In the top right corner, click the Manual Deploy button
   * Select Deploy latest commit
   * From the "logs" page, you can monitor the deployment status and check for any errors

### Note!

When using Render, you must use **Relative URLs** in API Calls:

    ✅ Correct: ```const baseUrl = "/api/categories";```

    ❌ Avoid hardcoded URLs like: ```http://localhost:3001/api/login```

This ensures API calls work in production when the frontend and backend are served from the same domain.


---


### Render Configuration (Manual Deployment)

If someone wants to deploy the project manually using Render, follow the steps below. Also you will have to make a build version of the frontend for this to work (check above).

This article could be helpful when doing this: 
https://medium.com/@MichoelRivkin/how-to-deploy-a-flask-react-app-with-an-sqlite-database-7c6521ffe169

1. Create a New Web Service

    * Go to your Render Dashboard
    * Click "New" → "Web Service"
    * Connect your GitHub repository to Render


2. Backend Configuration

    Language: Python 3

        Note: "requirements.txt" file in the backend should contain all necessary dependencies automatically.

    Branch: main

    Region: Frankfurt (or your closest available region)

    Root Directory: api

    Build Command: ```pip install -r requirements.txt```

    Start Command: ```gunicorn app:app```

    Instance Type: Choose any instance type that suits your needs

        Free instances spin down after periods of inactivity, so they may take a few seconds to start again when accessed.
    

    **Finally, click the "Deploy Web Service" button!**
