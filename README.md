# Full Stack Developer Assignment Solution 🚀

Hi there! 👋 I'm a recent graduate passionate about web development, and this repository contains my solution for the Full Stack Developer assignment. I was really excited to tackle these tasks as they allowed me to apply and showcase the skills I've been developing in web development. This project was a great learning experience, especially in building interactive UIs and working with data!

## Project Overview & Tasks ✨

This assignment was broken down into a few key parts, each in its own folder:

*   **Task 1: Frontend Charts** (Found in `task1_frontend_charts/`)
    *   **1a: Interactive Bar Chart** (`task1a_bar_chart/`): Developed a dynamic bar chart with three variables (Product, TotalSales, TotalValue) to visualize product performance. I made sure it matched the look and feel of the example provided, loading data dynamically from a CSV file.
    *   **1b: Interactive Gauge Chart** (`task1b_gauge_chart/`): Created a cool gauge chart that updates based on monthly selections. It displays a value and categorizes it into Low, Medium, or High status, complete with tooltips, all driven by data from a CSV file.

*   **Task 2: Analytical Dashboard [Frontend Focus]** (Found in `task2_fullstack_dashboard/`)
    *   Built an interactive dashboard to display sales analytics from a CSV dataset.
    *   Focused on creating a user-friendly interface with a sidebar for filters (Region, Product Category, Sales Rep) and various chart visualizations (Sales Over Time, Sales by Region, etc.).
    *   Implemented a basic role simulation (Sales Rep, Admin) on the frontend to demonstrate how UI elements or permissions could change. Since a full backend database wasn't mandatory, this part is handled client-side.

## Key Learnings & Skills Demonstrated 💡

Through this project, I got to practice and demonstrate my understanding of:

*   **Frontend Development:** HTML, CSS, and modern JavaScript (ES6+).
*   **JavaScript Libraries:**
    *   **Chart.js:** For creating the bar chart in Task 1a and all the visualizations in the Task 2 dashboard.
    *   **ApexCharts.js:** For the sleek gauge chart in Task 1b.
    *   **PapaParse:** For efficiently parsing CSV data directly in the browser for Task 2.
*   **Dynamic Data Handling:** Fetching data from external JSON and CSV files and using it to render UI components dynamically, avoiding hard-coding.
*   **Interactive UI/UX:** Building responsive charts and user-driven interfaces with filters and dynamic updates.
*   **Data Visualization:** Choosing appropriate chart types to represent data effectively.
*   **Basic Full-Stack Concepts:** While Task 2 is frontend-focused for data handling, I considered how a frontend interacts with data sources and designed the ERD. The role simulation also touches upon concepts of user permissions.
*   **Version Control:** Using Git and GitHub for project management (you're looking at it!).
*   **Problem Solving:** Figuring out how to meet the specific requirements of each chart and the dashboard, and debugging along the way!

## 🛠️ Technologies Used

*   HTML5
*   CSS3
*   JavaScript (ES6+)
*   **Chart.js**
*   **ApexCharts.js**
*   **PapaParse**

## 📁 Project Structure

```
assignment/
├── task1_frontend_charts/
│   ├── task1a_bar_chart/          # Interactive Bar Chart
│   │   ├── index.html
│   │   ├── script.js
│   │   ├── style.css
│   │   └── data_bar_chart.json
│   └── task1b_gauge_chart/        # Interactive Gauge Chart
│       ├── index.html
│       ├── script.js
│       ├── style.css
│       └── data_gauge_chart.json
├── task2_fullstack_dashboard/     # Analytical Dashboard
│   ├── erd.md                     # Entity Relationship Diagram
│   ├── frontend/
│   │   ├── index.html
│   │   ├── script.js
│   │   ├── style.css
│   │   ├── sales_data.csv         # Sample data for dashboard
│   │   └── papaparse.min.js       # PapaParse library
│   └── backend/                   # Placeholder, as database was not mandatory
└── README.md                      # This file!
```

## 🧑‍💻 How to Run (Step-by-Step)

**General Prerequisite: Local Web Server**
To run the HTML files that fetch local data (`.json`, `.csv`), you'll need to serve them via a local web server. Directly opening them using the `file:///` protocol will likely result in CORS errors and prevent the data from loading.

Popular options:
1.  **VS Code Live Server Extension:** If you're using VS Code, install the "Live Server" extension. Right-click the `index.html` file for the task you want to run and select "Open with Live Server".
2.  **Python:** Navigate to the specific task directory (e.g., `assignment/task1_frontend_charts/task1a_bar_chart/`) in your terminal and run:
    ```bash
    python -m http.server
    ```
    Then open `http://localhost:8000` (or the port shown) in your browser.
3.  **Node.js:** If you have Node.js, you can install `http-server` globally:
    ```bash
    npm install -g http-server
    ```
    Then navigate to the task directory and run `http-server`. Open the URL it provides.

---

**1. Task 1a: Bar Chart**
   1. Navigate to the `task1_frontend_charts/task1a_bar_chart/` directory.
   2. Serve `index.html` using a local web server (see "General Prerequisite" above).
   3. Open the served page in your browser.

**2. Task 1b: Gauge Chart**
   1. Navigate to the `task1_frontend_charts/task1b_gauge_chart/` directory.
   2. Serve `index.html` using a local web server.
   3. Open the served page in your browser.

**3. Task 2: Analytical Dashboard**
   2. For the dashboard application, navigate to the `task2_fullstack_dashboard/frontend/` directory.
   3. Serve `index.html` using a local web server.
   4. Open the served page in your browser. You can interact with filters and see the charts update!

## 📝 Notes from a Fresh Graduate

*   This project was a fantastic learning opportunity for me! I put a lot of effort into understanding the requirements and implementing them as best as I could.
*   I tried my best to write clean, readable, and understandable code.
*   For Task 2, the "fullstack" aspect is primarily frontend-driven using a CSV file for data, as a full backend database wasn't mandatory. The role-based features are simulated on the client-side to demonstrate the concept.
*   I focused on meeting the core requirements, ensuring dynamic data loading (no hard coding!), and creating a good user experience with the interactive visualizations.
*   I'm always learning and growing as a developer! If you have any feedback, suggestions for improvement, or spot anything I could have done better, I'd be really grateful to hear them. It helps me learn!

## 🌱 Future Improvements (If I had more time!)

If I were to continue working on this, I might explore:

*   **For Task 2:**
    *   Connecting to an actual backend API and database (e.g., using Node.js/Express with SQLite or a cloud database like Firebase/Supabase).
    *   Implementing proper authentication for the roles instead of client-side simulation.
    *   Adding more sophisticated filtering options (like date ranges).
*   **General:**
    *   Writing unit tests for some of the JavaScript logic.
    *   Enhancing the responsiveness and accessibility further.
    *   Adding more complex chart interactions or drill-down capabilities.

## 🙋‍♂️ About Me

Hi! I'm a recent graduate super passionate about web development, creating intuitive user experiences, and constantly learning new technologies. I'm eager to contribute to exciting projects and grow my skills in a professional environment.

Feel free to connect with me or reach out!

## 📬 Contact

*   **Email:** `syedishmum15@gmail.com`
*   **LinkedIn:** `https://www.linkedin.com/in/i-ahnaf/`
*   **GitHub:** `https://github.com/SyedIshmumAhnaf`

---

Thank you for reviewing my assignment! 🙏 