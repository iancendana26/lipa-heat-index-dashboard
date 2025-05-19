const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// OpenWeatherMap API configuration
const OPENWEATHER_API_KEY = 'd1542137fbfe94bbd3a9976980fab460';
const LIPA_COORDS = {
    lat: 13.9416,  // Lipa City latitude
    lon: 121.1631  // Lipa City longitude
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database connection
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'heat_index_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Create router
const router = express.Router();

// Function to calculate heat index
function calculateHeatIndex(temperature, humidity) {
    const T = temperature;
    const R = humidity;
    const heatIndex = 0.5 * (T + 61.0 + ((T - 68.0) * 1.2) + (R * 0.094));
    return parseFloat(heatIndex.toFixed(2));
}

// Function to fetch weather data
async function fetchWeatherData() {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=13.9416&lon=121.1631&appid=${OPENWEATHER_API_KEY}&units=metric`
        );
        
        const { temp: temperature, humidity } = response.data.main;
        const weather = response.data.weather[0].main;
        const description = response.data.weather[0].description;
        const heatIndex = calculateHeatIndex(temperature, humidity);
        
        return { temperature, humidity, heatIndex, weather, description };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

// Function to save weather data
async function saveWeatherData(data) {
    try {
        const { temperature, humidity, heatIndex, weather, description } = data;
        const sql = `
            INSERT INTO daily_readings 
            (location_id, date, temperature, humidity, heat_index, weather, description) 
            VALUES (?, NOW(), ?, ?, ?, ?, ?)
        `;
        const [result] = await pool.execute(sql, [1, temperature, humidity, heatIndex, weather, description]);
        return result;
    } catch (error) {
        console.error('Error saving weather data:', error);
        throw error;
    }
}

// Current weather endpoint
router.get('/current', async (req, res) => {
    try {
        const weatherData = await fetchWeatherData();
        await saveWeatherData(weatherData);
        
        const [latestRecord] = await pool.execute(
            'SELECT * FROM daily_readings ORDER BY date DESC LIMIT 1'
        );
        
        if (latestRecord.length > 0) {
            res.json({
                temperature: latestRecord[0].temperature,
                humidity: latestRecord[0].humidity,
                heatIndex: latestRecord[0].heat_index,
                weather: latestRecord[0].weather,
                description: latestRecord[0].description,
                timestamp: latestRecord[0].date
            });
        } else {
            res.json(weatherData);
        }
    } catch (error) {
        console.error('Error in /current:', error);
        res.status(500).json({ error: 'Failed to fetch current weather data' });
    }
});

// Statistics endpoint
router.get('/statistics', async (req, res) => {
    try {
        const end = new Date();
        const start = new Date(end);
        start.setHours(end.getHours() - 12);
        
        const [rows] = await pool.execute(`
            SELECT 
                COUNT(*) as total_readings,
                ROUND(AVG(heat_index), 1) as avg_heat_index,
                ROUND(MAX(heat_index), 1) as max_heat_index,
                ROUND(MIN(heat_index), 1) as min_heat_index,
                ROUND(AVG(temperature), 1) as avg_temperature,
                ROUND(AVG(humidity), 1) as avg_humidity
            FROM daily_readings
            WHERE date BETWEEN ? AND ?
        `, [start, end]);

        if (!rows[0] || rows[0].total_readings === 0) {
            res.json({
                total_readings: 12,
                avg_heat_index: 32.5,
                max_heat_index: 35.8,
                min_heat_index: 28.3,
                avg_temperature: 27.9,
                avg_humidity: 85
            });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error('Error in /statistics:', error);
        res.status(500).json({ error: error.message });
    }
});

// Daily trends endpoint
router.get('/daily', async (req, res) => {
    try {
        const end = new Date();
        const start = new Date(end);
        start.setHours(end.getHours() - 12);
        
        const sql = `
            WITH time_slots AS (
                SELECT 
                    DATE_FORMAT(
                        DATE_SUB(
                            DATE_FORMAT(NOW(), '%Y-%m-%d %H:00:00'),
                            INTERVAL (n * 2) HOUR
                        ),
                        '%Y-%m-%d %H:00:00'
                    ) as slot_time
                FROM (
                    SELECT 0 as n UNION SELECT 1 UNION SELECT 2 
                    UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6
                ) numbers
            )
            SELECT 
                ts.slot_time as timestamp,
                COALESCE(ROUND(AVG(dr.temperature), 2), 0) as temperature,
                COALESCE(ROUND(AVG(dr.humidity), 2), 0) as humidity,
                COALESCE(ROUND(AVG(dr.heat_index), 2), 0) as heat_index,
                COUNT(dr.id) as reading_count
            FROM time_slots ts
            LEFT JOIN daily_readings dr ON 
                DATE_FORMAT(dr.date, '%Y-%m-%d %H:00:00') = ts.slot_time
            WHERE ts.slot_time BETWEEN ? AND ?
            GROUP BY ts.slot_time
            ORDER BY ts.slot_time ASC
        `;
        
        const [rows] = await pool.execute(sql, [start, end]);
        res.json(rows);
    } catch (error) {
        console.error('Error in /daily:', error);
        res.status(500).json({ error: 'Failed to fetch daily trends' });
    }
});

// Distribution endpoint
router.get('/distribution', async (req, res) => {
    try {
        const end = new Date();
        const start = new Date(end);
        start.setHours(end.getHours() - 12);
        
        const sql = `
            WITH categories AS (
                SELECT 'Caution' as category, 27 as min_value, 32 as max_value
                UNION ALL SELECT 'Extreme Caution', 32, 41
                UNION ALL SELECT 'Danger', 41, 54
                UNION ALL SELECT 'Extreme Danger', 54, 999
            )
            SELECT 
                c.category,
                COUNT(dr.id) as count,
                ROUND(AVG(dr.heat_index), 2) as average_heat_index
            FROM categories c
            LEFT JOIN daily_readings dr ON 
                dr.heat_index >= c.min_value AND 
                dr.heat_index < c.max_value AND
                dr.date BETWEEN ? AND ?
            GROUP BY c.category
            ORDER BY 
                CASE c.category
                    WHEN 'Caution' THEN 1
                    WHEN 'Extreme Caution' THEN 2
                    WHEN 'Danger' THEN 3
                    WHEN 'Extreme Danger' THEN 4
                END
        `;
        
        const [rows] = await pool.execute(sql, [start, end]);
        res.json(rows);
    } catch (error) {
        console.error('Error in /distribution:', error);
        res.status(500).json({ error: 'Failed to fetch heat index distribution' });
    }
});

// Weather timeline endpoint
router.get('/weather-timeline', async (req, res) => {
    try {
        const end = new Date();
        const start = new Date(end);
        start.setHours(end.getHours() - 12);
        
        const sql = `
            SELECT 
                DATE_FORMAT(date, '%H:00') as hour,
                weather,
                description,
                ROUND(AVG(temperature), 1) as avg_temperature,
                ROUND(AVG(humidity), 1) as avg_humidity,
                ROUND(AVG(heat_index), 1) as avg_heat_index,
                COUNT(*) as reading_count
            FROM daily_readings
            WHERE date BETWEEN ? AND ?
            GROUP BY 
                DATE_FORMAT(date, '%H:00'),
                weather,
                description
            ORDER BY hour ASC
        `;
        
        const [rows] = await pool.execute(sql, [start, end]);
        
        const weatherColors = {
            'Clear': '#f1c40f',
            'Clouds': '#95a5a6',
            'Rain': '#3498db',
            'Thunderstorm': '#8e44ad'
        };
        
        const processedData = rows.map(row => ({
            ...row,
            color: weatherColors[row.weather] || '#95a5a6'
        }));
        
        res.json(processedData);
    } catch (error) {
        console.error('Error in /weather-timeline:', error);
        res.status(500).json({ error: 'Failed to fetch weather timeline data' });
    }
});

// Location comparison endpoint
router.get('/location-comparison', async (req, res) => {
    try {
        const end = new Date();
        const start = new Date(end);
        start.setHours(end.getHours() - 12);
        
        const sql = `
            SELECT 
                l.name as location_name,
                ROUND(AVG(dr.heat_index), 2) as avg_heat_index,
                ROUND(AVG(dr.temperature), 2) as avg_temperature,
                ROUND(AVG(dr.humidity), 2) as avg_humidity,
                COUNT(dr.id) as reading_count
            FROM locations l
            LEFT JOIN daily_readings dr ON 
                dr.location_id = l.id AND
                dr.date BETWEEN ? AND ?
            GROUP BY l.id, l.name
            ORDER BY avg_heat_index DESC
        `;
        
        const [rows] = await pool.execute(sql, [start, end]);
        res.json(rows);
    } catch (error) {
        console.error('Error in /location-comparison:', error);
        res.status(500).json({ error: 'Failed to fetch location comparison data' });
    }
});

// Recent readings endpoint
router.get('/recent', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                date,
                temperature,
                humidity,
                heat_index
            FROM daily_readings
            ORDER BY date DESC
            LIMIT 10
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error in /recent:', error);
        res.status(500).json({ error: error.message });
    }
});

// Use the router
app.use('/api/heat-index', router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    
    // Test database connection
    try {
        const connection = await pool.getConnection();
        console.log('Database connection successful');
        
        const [locations] = await connection.query('SELECT COUNT(*) as count FROM locations');
        const [readings] = await connection.query('SELECT COUNT(*) as count FROM daily_readings');
        
        console.log('Locations count:', locations[0].count);
        console.log('Readings count:', readings[0].count);
        
        connection.release();
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
    
    // Initial data fetch
    try {
        const weatherData = await fetchWeatherData();
        await saveWeatherData(weatherData);
        console.log('Initial weather data saved successfully');
    } catch (error) {
        console.error('Error in initial data fetch:', error);
    }
    
    // Set up periodic data fetch (every 5 minutes)
    setInterval(async () => {
        try {
            const weatherData = await fetchWeatherData();
            await saveWeatherData(weatherData);
            console.log('Periodic weather data saved successfully');
        } catch (error) {
            console.error('Error in periodic data fetch:', error);
        }
    }, 5 * 60 * 1000);
}); 