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

## Complete Setup Guide

### Prerequisites
- Node.js (v16 or higher recommended)
- MySQL Server (XAMPP, WAMP, or standalone MySQL)
- Git (for version control)
- OpenWeatherMap API key (free tier)

### 1. Clone or Download the Repository
#### Option A: Using Git (Recommended)
```bash
# Clone the repository
git clone https://github.com/iancendana26/lipa-heat-index-dashboard.git

# Navigate to the project directory
cd lipa-heat-index-dashboard
```

#### Option B: Download ZIP
1. Click the "Code" button on GitHub
2. Select "Download ZIP"
3. Extract the ZIP file to your desired location
4. Open terminal/command prompt in the extracted folder

### 2. Install Dependencies
```bash
# Install Node.js dependencies
npm install
```

### 3. Set Up OpenWeatherMap API
1. **Get API Key**
   - Go to [OpenWeatherMap](https://openweathermap.org/)
   - Sign up for a free account
   - Go to "My API Keys" section
   - Copy your API key

2. **Configure API Key**
   - Create or edit `.env` file in project root
   - Add your API key:
     ```env
     OPENWEATHER_API_KEY=your_api_key_here
     ```

### 4. Set Up the Database
1. **Start your MySQL server**
   - If using XAMPP: Start Apache and MySQL from XAMPP Control Panel
   - If using WAMP: Start WAMP services
   - If using standalone MySQL: Ensure MySQL service is running

2. **Create and populate the database**
   - Open phpMyAdmin (usually at http://localhost/phpmyadmin)
   - Create a new database named `heat_index_db`
   - Import the database structure:
     - Click on the `heat_index_db` database
     - Go to "Import" tab
     - Choose `database.sql` file
     - Click "Go"
   - Import the sample data:
     - Repeat the import process for `sample_data.sql`

3. **Database Structure**
   The `heat_index_db` contains the following tables:
   - `locations`: School information
   - `weather_conditions`: Weather state data
   - `daily_readings`: Weather readings
   - `alerts`: System alerts

4. **Configure database connection**
   - Create or edit `.env` file in project root
   - Add the following (adjust values as needed):
     ```env
     # Database Configuration
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=
     DB_NAME=heat_index_db
     PORT=3000

     # API Configuration
     OPENWEATHER_API_KEY=your_api_key_here
     ```

### 5. Run the Application
```bash
# Start the server
node server.js
```

### 6. Access the Dashboard
- Open your web browser
- Go to: http://localhost:3000
- Login with:
  - **Username:** `admin`
  - **Password:** `password`

## Dependencies
- **Backend:**
  - [express](https://www.npmjs.com/package/express) - Web framework
  - [mysql2](https://www.npmjs.com/package/mysql2) - MySQL client
  - [axios](https://www.npmjs.com/package/axios) - HTTP client
  - [cors](https://www.npmjs.com/package/cors) - CORS middleware
  - [dotenv](https://www.npmjs.com/package/dotenv) - Environment variables

- **Frontend:**
  - [Chart.js](https://www.chartjs.org/) - Interactive charts
  - [Leaflet.js](https://leafletjs.com/) - Interactive maps
  - [Bootstrap](https://getbootstrap.com/) - UI framework

## Troubleshooting
1. **Database Connection Issues**
   - Verify MySQL server is running
   - Check database credentials in `.env`
   - Ensure database and tables exist
   - Default MySQL credentials:
     - Username: `root`
     - Password: `` (empty by default in XAMPP)

2. **API Key Issues**
   - Verify API key is correctly set in `.env`
   - Check if API key is active in OpenWeatherMap dashboard
   - Free tier has rate limits (60 calls/minute)

3. **Port Already in Use**
   - Change the PORT in `.env` if 3000 is occupied
   - Kill the process using the port:
     - Windows: `netstat -ano | findstr :3000`
     - Linux/Mac: `lsof -i :3000`

4. **Module Not Found Errors**
   - Delete `node_modules` folder
   - Run `npm install` again

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


=======
# lipa-heat-index-dashboard
>>>>>>> 391d162d998fbb5a076576507fb169fc925dfd01
