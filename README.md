<<<<<<< HEAD
# Lipa Batangas School Heat Index Dashboard

## Overview
This project is a real-time heat index dashboard designed for school administrators in Lipa, Batangas. It provides actionable insights into local weather conditions, heat index trends, and school-specific data to help ensure student safety and informed decision-making. The dashboard features:
- Real-time weather and heat index monitoring
- Interactive charts (line, bar, pie, scatter)
- Map of the 10 largest schools in Lipa
- Weather timeline and temperature/humidity heatmap
- Secure login system for administrators
- Responsive, modern UI/UX

## Dataset Used
- **Capstone Dataset**: The system uses a synthetic dataset representing daily weather readings (temperature, humidity, heat index) for 10 major schools in Lipa City, Batangas. Data is stored in a MySQL database and can be seeded using the provided `database.sql` and `sample_data.sql` files.
- **Real-Time Data**: The backend fetches real-time weather data for Lipa City from the OpenWeatherMap API and stores it in the database.

## Installation & Running Instructions

### Prerequisites
- Node.js (v16 or higher recommended)
- MySQL Server

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Sem_Project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up the Database
- Create the database and tables, and seed sample data:
  - Import `database.sql` and `sample_data.sql` into your MySQL server:
    - Using command line:
      ```bash
      mysql -u <username> -p < database.sql
      mysql -u <username> -p < sample_data.sql
      ```
    - Or use a GUI tool like phpMyAdmin.
- Update your database credentials in a `.env` file:
  ```env
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=yourpassword
  DB_NAME=heat_index_db
  PORT=3000
  ```

### 4. Run the Server
```bash
node server.js
```
The backend will start on `http://localhost:3000` and serve the frontend from the `public/` directory.

### 5. Access the Dashboard
- Open your browser and go to: [http://localhost:3000](http://localhost:3000)
- Login with:
  - **Username:** `admin`
  - **Password:** `password`

## Dependencies
- **Backend:**
  - [express](https://www.npmjs.com/package/express)
  - [mysql2](https://www.npmjs.com/package/mysql2)
  - [axios](https://www.npmjs.com/package/axios)
  - [cors](https://www.npmjs.com/package/cors)
  - [dotenv](https://www.npmjs.com/package/dotenv)

- **Frontend:**
  - [Chart.js](https://www.chartjs.org/) (for charts)
  - [Leaflet.js](https://leafletjs.com/) (for maps)
  - [Bootstrap](https://getbootstrap.com/) (for responsive UI)

---

**For questions or support, contact the project maintainer.** 

git init
git add .
git commit -m "Initial commit" 
=======
# lipa-heat-index-dashboard
>>>>>>> 391d162d998fbb5a076576507fb169fc925dfd01
