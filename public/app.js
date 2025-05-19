// Sidebar toggle
document.getElementById('sidebarCollapse').addEventListener('click', function() {
    document.querySelector('.wrapper').classList.toggle('sidebar-minimized');
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('content').classList.toggle('active');
    document.getElementById('schoolMapSection').classList.toggle('active');
});

// Constants
const API_BASE_URL = 'http://localhost:3000/api';
const CHART_COLORS = {
    primary: '#3498db',
    secondary: '#2ecc71',
    warning: '#f1c40f',
    danger: '#e74c3c',
    info: '#1abc9c',
    dark: '#2c3e50'
};

// Global chart instances
let lineChart, pieChart, barChart, scatterChart;

// Date range object
const dateRange = {
    start: null,
    end: null
};

// School locations data (10 biggest schools in Lipa, Batangas)
const schoolLocations = [
    { name: 'Batangas State University - Lipa Campus', lat: 13.9411, lng: 121.1636 },
    { name: 'De La Salle Lipa', lat: 13.9417, lng: 121.1432 },
    { name: 'Lipa City Colleges', lat: 13.9412, lng: 121.1577 },
    { name: 'Canossa Academy Lipa', lat: 13.9419, lng: 121.1572 },
    { name: 'University of Batangas - Lipa Campus', lat: 13.9502, lng: 121.1627 },
    { name: 'AMA Computer College Lipa', lat: 13.9415, lng: 121.1620 },
    { name: 'Stonyhurst Southville International School', lat: 13.9337, lng: 121.1622 },
    { name: 'Lipa Grace Academy', lat: 13.9410, lng: 121.1585 },
    { name: 'The Mabini Academy', lat: 13.9418, lng: 121.1623 },
    { name: 'Inosloban Marawoy National High School', lat: 13.9632, lng: 121.1639 }
];

// Show/hide dashboard and map
function showDashboard() {
    document.getElementById('content').style.display = '';
    document.getElementById('schoolMapSection').style.display = 'none';
}
function showSchoolMap() {
    document.getElementById('content').style.display = 'none';
    document.getElementById('schoolMapSection').style.display = '';
    setTimeout(() => {
        initSchoolMap();
        if (schoolMapInstance) {
            schoolMapInstance.invalidateSize();
        }
        updateSchoolSuggestion();
    }, 100);
}

// Initialize the map with markers
let schoolMapInstance = null;
function initSchoolMap() {
    if (schoolMapInstance) return;
    schoolMapInstance = L.map('schoolMap').setView([13.9416, 121.1631], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(schoolMapInstance);
    schoolLocations.forEach(school => {
        L.marker([school.lat, school.lng]).addTo(schoolMapInstance)
            .bindPopup(`<b>${school.name}</b>`);
    });
}

// --- LOGIN LOGIC ---
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}
function requireLogin() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
    }
}

// Sidebar navigation logic
function setupSidebarNav() {
    const sidebarLinks = document.querySelectorAll('#sidebar .components li');
    sidebarLinks.forEach((li, idx) => {
        li.addEventListener('click', function(e) {
            if (!isLoggedIn()) {
                requireLogin();
                e.preventDefault();
                return;
            }
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            if (idx === 0) {
                showDashboard();
            } else if (idx === 1) {
                showSchoolMap();
            } // Add more tabs if needed
        });
    });
}

// Function to fetch data from API
async function fetchData(endpoint, params = {}) {
    try {
        const queryString = new URLSearchParams(params).toString();
        const url = `${API_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
        console.log('Fetching data from:', url);
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data received:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        showError(`Failed to fetch data: ${error.message}`);
        throw error;
    }
}

// Function to display error messages
function showError(message) {
    let errorDiv = document.getElementById('error-message');
    if (!errorDiv) {
        // Create error div if it doesn't exist
        errorDiv = document.createElement('div');
        errorDiv.id = 'error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px;
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
            border-radius: 4px;
            z-index: 1000;
            display: none;
        `;
        document.body.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// Update overview cards with animation
function updateOverviewCards(data) {
    const cards = {
        avgHeatIndex: document.getElementById('avgHeatIndex'),
        maxHeatIndex: document.getElementById('maxHeatIndex'),
        minHeatIndex: document.getElementById('minHeatIndex'),
        totalReadings: document.getElementById('totalReadings')
    };

    // Update each card with proper formatting
    if (cards.avgHeatIndex) {
        cards.avgHeatIndex.textContent = `${parseFloat(data.avg_heat_index || 0).toFixed(1)}°C`;
    }
    if (cards.maxHeatIndex) {
        cards.maxHeatIndex.textContent = `${parseFloat(data.max_heat_index || 0).toFixed(1)}°C`;
    }
    if (cards.minHeatIndex) {
        cards.minHeatIndex.textContent = `${parseFloat(data.min_heat_index || 0).toFixed(1)}°C`;
    }
    if (cards.totalReadings) {
        cards.totalReadings.textContent = data.total_readings || 0;
    }
}

// Animate value changes
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const animate = () => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end.toFixed(1);
        } else {
            element.textContent = current.toFixed(1);
            requestAnimationFrame(animate);
        }
    };

    requestAnimationFrame(animate);
}

// Create line chart
function createLineChart(data) {
    const ctx = document.getElementById('lineChart').getContext('2d');
    if (lineChart) lineChart.destroy();

    // Format timestamps for display
    const timestamps = data.map(d => {
        const date = new Date(d.timestamp);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    });

    lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timestamps,
            datasets: [
                {
                    label: 'Heat Index (°C)',
                    data: data.map(d => parseFloat(d.heat_index)),
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y'
                },
                {
                    label: 'Temperature (°C)',
                    data: data.map(d => parseFloat(d.temperature)),
                    borderColor: '#f1c40f',
                    backgroundColor: 'rgba(241, 196, 15, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y'
                },
                {
                    label: 'Humidity (%)',
                    data: data.map(d => parseFloat(d.humidity)),
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y.toFixed(1);
                            }
                            return label;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Daily Heat Index Trend',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                x: {
                    type: 'category',
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Temperature / Heat Index (°C)'
                    },
                    min: 0,
                    max: function(context) {
                        const max = Math.max(
                            ...context.chart.data.datasets[0].data,
                            ...context.chart.data.datasets[1].data
                        );
                        return Math.ceil(max + 5);
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Humidity (%)'
                    },
                    min: 0,
                    max: 100,
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
}

// Create pie chart
function createPieChart(data) {
    const ctx = document.getElementById('pieChart').getContext('2d');
    if (pieChart) pieChart.destroy();

    // Define colors for each category
    const categoryColors = {
        'Safe': '#2ecc71',           // Green
        'Caution': '#f1c40f',        // Yellow
        'Extreme Caution': '#e67e22', // Orange
        'Danger': '#e74c3c',         // Red
        'Extreme Danger': '#8e44ad'   // Purple
    };

    // Prepare data for the chart
    const chartData = {
        labels: data.map(d => `${d.category} (${d.count})`),
        datasets: [{
            data: data.map(d => d.count),
            backgroundColor: data.map(d => categoryColors[d.category] || '#95a5a6'),
            borderWidth: 1
        }]
    };

    pieChart = new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const data = context.dataset.data;
                            const total = data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.raw / total) * 100).toFixed(1);
                            const avgHeatIndex = data[context.dataIndex].avg_heat_index;
                            return [
                                `${context.label}`,
                                `Count: ${context.raw}`,
                                `Percentage: ${percentage}%`,
                                `Avg Heat Index: ${avgHeatIndex}°C`
                            ];
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Heat Index Distribution',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
}

// Create bar chart
function createBarChart(data) {
    const ctx = document.getElementById('barChart').getContext('2d');
    if (barChart) barChart.destroy();

    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Average Heat Index',
                data: data.values,
                backgroundColor: CHART_COLORS.primary
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Heat Index (°F)'
                    }
                }
            }
        }
    });
}

// Function to update temperature vs humidity heat map
function updateTemperatureHumidityChart(data) {
    if (!data || !data.length) return;
    
    const ctx = document.getElementById('scatterChart');
    if (!ctx) return;
    
    if (scatterChart) {
        scatterChart.destroy();
    }
    
    // Create temperature and humidity ranges
    const tempRange = { min: 20, max: 40, step: 2 };
    const humidityRange = { min: 0, max: 100, step: 10 };
    
    // Create grid data
    const gridData = [];
    for (let temp = tempRange.min; temp <= tempRange.max; temp += tempRange.step) {
        for (let humidity = humidityRange.min; humidity <= humidityRange.max; humidity += humidityRange.step) {
            // Calculate heat index for this combination
            const heatIndex = calculateHeatIndex(temp, humidity);
            
            // Count how many readings are close to this combination
            const nearbyReadings = data.filter(point => 
                Math.abs(point.avg_temperature - temp) < tempRange.step &&
                Math.abs(point.avg_humidity - humidity) < humidityRange.step
            );
            
            if (nearbyReadings.length > 0) {
                gridData.push({
                    x: temp,
                    y: humidity,
                    r: 15, // Fixed size for grid cells
                    heatIndex: heatIndex,
                    count: nearbyReadings.length,
                    weather: nearbyReadings[0].weather,
                    color: getHeatIndexColor(heatIndex)
                });
            }
        }
    }
    
    scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Temperature vs Humidity',
                data: gridData,
                backgroundColor: gridData.map(d => d.color),
                borderColor: gridData.map(d => d.color),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'nearest',
                intersect: true
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const point = context.raw;
                            return [
                                `Temperature: ${point.x}°C`,
                                `Humidity: ${point.y}%`,
                                `Heat Index: ${point.heatIndex.toFixed(1)}°C`,
                                `Readings: ${point.count}`,
                                `Weather: ${point.weather}`
                            ];
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Temperature vs Humidity Heat Map',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    },
                    min: tempRange.min - tempRange.step,
                    max: tempRange.max + tempRange.step,
                    ticks: {
                        stepSize: tempRange.step
                    }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Humidity (%)'
                    },
                    min: humidityRange.min - humidityRange.step,
                    max: humidityRange.max + humidityRange.step,
                    ticks: {
                        stepSize: humidityRange.step
                    }
                }
            }
        }
    });
}

// Helper function to get color based on heat index
function getHeatIndexColor(heatIndex) {
    if (heatIndex < 27) {
        return 'rgba(46, 204, 113, 0.7)';  // Green - Safe
    } else if (heatIndex < 32) {
        return 'rgba(241, 196, 15, 0.7)';  // Yellow - Caution
    } else if (heatIndex < 41) {
        return 'rgba(230, 126, 34, 0.7)';  // Orange - Extreme Caution
    } else if (heatIndex < 54) {
        return 'rgba(231, 76, 60, 0.7)';   // Red - Danger
    } else {
        return 'rgba(142, 68, 173, 0.7)';  // Purple - Extreme Danger
    }
}

// Helper function to calculate heat index
function calculateHeatIndex(temperature, humidity) {
    // Using the simplified heat index formula
    const T = temperature;
    const R = humidity;
    
    const heatIndex = 0.5 * (T + 61.0 + ((T - 68.0) * 1.2) + (R * 0.094));
    
    return parseFloat(heatIndex.toFixed(2));
}

// Update recent readings table
function updateRecentReadingsTable(data) {
    const tbody = document.getElementById('recentReadingsTable');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    data.forEach(reading => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Lipa City</td>
            <td>${new Date(reading.date).toLocaleString()}</td>
            <td>${parseFloat(reading.temperature || 0).toFixed(1)}°C</td>
            <td>${parseFloat(reading.humidity || 0).toFixed(1)}%</td>
            <td>${parseFloat(reading.heat_index || 0).toFixed(1)}°C</td>
        `;
        tbody.appendChild(row);
    });
}

// Initialize date range picker
function initializeDateRangePicker() {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');

    // Set default date range (last 1 day)
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 1); // last 1 day

    startDateInput.value = start.toISOString().split('T')[0];
    endDateInput.value = end.toISOString().split('T')[0];

    dateRange.start = start;
    dateRange.end = end;

    // Add event listeners
    startDateInput.addEventListener('change', updateDateRange);
    endDateInput.addEventListener('change', updateDateRange);
}

// Update date range and refresh data
function updateDateRange() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (startDate && endDate) {
        dateRange.start = new Date(startDate);
        dateRange.end = new Date(endDate);
        initializeDashboard();
    }
}

// Function to initialize dashboard
async function initializeDashboard() {
    try {
        console.log('Initializing dashboard...');
        
        // Set date range to last 12 hours
        const end = new Date();
        const start = new Date(end);
        start.setHours(end.getHours() - 12);
        
        const dateRange = {
            startDate: start.toISOString().split('T')[0],
            endDate: end.toISOString().split('T')[0]
        };
        console.log('Date range:', dateRange);
        
        // Fetch all data in parallel
        const [currentWeather, statistics, dailyData, distributionData, weatherTimeline] = await Promise.all([
            fetchData('/heat-index/current'),
            fetchData('/heat-index/statistics'),
            fetchData('/heat-index/daily', dateRange),
            fetchData('/heat-index/distribution', dateRange),
            fetchData('/heat-index/weather-timeline')
        ]);
        
        console.log('Dashboard data received:', {
            currentWeather,
            statistics,
            dailyData,
            distributionData,
            weatherTimeline
        });
        
        // Update current weather
        updateCurrentWeather(currentWeather);
        
        // Update statistics with animation
        console.log('Updating overview cards with statistics:', statistics);
        updateOverviewCards(statistics);
        
        // Update charts
        updateDailyTrendChart(dailyData);
        updateDistributionChart(distributionData);
        updateWeatherTimelineChart(weatherTimeline);
        updateTemperatureHumidityChart(weatherTimeline);
        
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        showError('Failed to initialize dashboard. Please try refreshing the page.');
    }
}

// Add loading indicator
function addLoadingIndicator(element) {
    element.classList.add('loading');
}

function removeLoadingIndicator(element) {
    element.classList.remove('loading');
}

// Function to update current weather display
function updateCurrentWeather(data) {
    if (!data) return;
    
    const elements = {
        weather: document.getElementById('currentWeather'),
        temperature: document.getElementById('currentTemp'),
        humidity: document.getElementById('currentHumidity'),
        heatIndex: document.getElementById('currentHeatIndex')
    };
    
    if (elements.weather) {
        elements.weather.textContent = `${data.weather || 'N/A'} (${data.description || 'N/A'})`;
    }
    if (elements.temperature) {
        elements.temperature.textContent = `${parseFloat(data.temperature || 0).toFixed(1)}°C`;
    }
    if (elements.humidity) {
        elements.humidity.textContent = `${parseFloat(data.humidity || 0).toFixed(1)}%`;
    }
    if (elements.heatIndex) {
        elements.heatIndex.textContent = `${parseFloat(data.heatIndex || 0).toFixed(1)}°C`;
    }
}

// Function to update statistics
function updateStatistics(data) {
    if (!data) return;
    
    const elements = {
        totalReadings: document.getElementById('totalReadings'),
        avgHeatIndex: document.getElementById('avgHeatIndex'),
        maxHeatIndex: document.getElementById('maxHeatIndex'),
        minHeatIndex: document.getElementById('minHeatIndex'),
        avgTemperature: document.getElementById('avgTemperature'),
        avgHumidity: document.getElementById('avgHumidity')
    };
    
    // Update each element with proper formatting
    if (elements.totalReadings) {
        elements.totalReadings.textContent = data.total_readings || 0;
    }
    if (elements.avgHeatIndex) {
        elements.avgHeatIndex.textContent = `${parseFloat(data.avg_heat_index || 0).toFixed(1)}°C`;
    }
    if (elements.maxHeatIndex) {
        elements.maxHeatIndex.textContent = `${parseFloat(data.max_heat_index || 0).toFixed(1)}°C`;
    }
    if (elements.minHeatIndex) {
        elements.minHeatIndex.textContent = `${parseFloat(data.min_heat_index || 0).toFixed(1)}°C`;
    }
    if (elements.avgTemperature) {
        elements.avgTemperature.textContent = `${parseFloat(data.avg_temperature || 0).toFixed(1)}°C`;
    }
    if (elements.avgHumidity) {
        elements.avgHumidity.textContent = `${parseFloat(data.avg_humidity || 0).toFixed(1)}%`;
    }
}

// Function to update daily trend chart
function updateDailyTrendChart(data) {
    if (!data || !data.length) return;
    
    const ctx = document.getElementById('lineChart');
    if (!ctx) return;
    
    if (lineChart) {
        lineChart.destroy();
    }
    
    // Format timestamps for display
    const timestamps = data.map(d => {
        const date = new Date(d.timestamp);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    });
    
    // Parse numeric values
    const temperatures = data.map(d => parseFloat(d.temperature));
    const humidities = data.map(d => parseFloat(d.humidity));
    const heatIndices = data.map(d => parseFloat(d.heat_index));
    
    lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timestamps,
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: temperatures,
                    borderColor: CHART_COLORS.warning,
                    backgroundColor: 'rgba(241, 196, 15, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y'
                },
                {
                    label: 'Humidity (%)',
                    data: humidities,
                    borderColor: CHART_COLORS.primary,
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y1'
                },
                {
                    label: 'Heat Index (°C)',
                    data: heatIndices,
                    borderColor: CHART_COLORS.danger,
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y.toFixed(1);
                            }
                            return label;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Daily Heat Index Trend (Last 12 Hours)',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                x: {
                    type: 'category',
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Temperature / Heat Index (°C)'
                    },
                    min: function(context) {
                        const min = Math.min(
                            ...context.chart.data.datasets[0].data,
                            ...context.chart.data.datasets[2].data
                        );
                        return Math.floor(min - 5);
                    },
                    max: function(context) {
                        const max = Math.max(
                            ...context.chart.data.datasets[0].data,
                            ...context.chart.data.datasets[2].data
                        );
                        return Math.ceil(max + 5);
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Humidity (%)'
                    },
                    min: 0,
                    max: 100,
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
}

// Function to update distribution chart
function updateDistributionChart(data) {
    if (!data || !data.length) return;
    
    const ctx = document.getElementById('pieChart');
    if (!ctx) return;
    
    if (pieChart) {
        pieChart.destroy();
    }
    
    // Define colors for each category
    const categoryColors = {
        'Caution': '#f1c40f',        // Yellow
        'Extreme Caution': '#e67e22', // Orange
        'Danger': '#e74c3c',         // Red
        'Extreme Danger': '#8e44ad'   // Purple
    };
    
    // Calculate total count for percentage
    const totalCount = data.reduce((sum, item) => sum + item.count, 0);
    
    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data.map(d => `${d.category} (${d.count})`),
            datasets: [{
                data: data.map(d => d.count),
                backgroundColor: data.map(d => categoryColors[d.category] || '#95a5a6'),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: {
                            size: 12
                        },
                        generateLabels: function(chart) {
                            const data = chart.data;
                            return data.labels.map((label, i) => ({
                                text: label,
                                fillStyle: data.datasets[0].backgroundColor[i],
                                strokeStyle: data.datasets[0].backgroundColor[i],
                                lineWidth: 1,
                                hidden: false,
                                index: i
                            }));
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const data = context.dataset.data;
                            const total = data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.raw / total) * 100).toFixed(1);
                            const avgHeatIndex = data[context.dataIndex].average_heat_index;
                            return [
                                `${context.label}`,
                                `Count: ${context.raw}`,
                                `Percentage: ${percentage}%`,
                                avgHeatIndex ? `Avg Heat Index: ${avgHeatIndex}°C` : 'No readings'
                            ];
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Heat Index Distribution (Last 12 Hours)',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
}

// Function to update weather conditions timeline chart
function updateWeatherTimelineChart(data) {
    if (!data || !data.length) return;
    
    const ctx = document.getElementById('barChart');
    if (!ctx) return;
    
    if (barChart) {
        barChart.destroy();
    }
    
    // Create datasets for each metric
    const datasets = [
        {
            label: 'Temperature (°C)',
            data: data.map(d => d.avg_temperature),
            borderColor: CHART_COLORS.warning,
            backgroundColor: 'rgba(241, 196, 15, 0.1)',
            yAxisID: 'y',
            type: 'line',
            tension: 0.4
        },
        {
            label: 'Humidity (%)',
            data: data.map(d => d.avg_humidity),
            borderColor: CHART_COLORS.primary,
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            yAxisID: 'y1',
            type: 'line',
            tension: 0.4
        },
        {
            label: 'Heat Index (°C)',
            data: data.map(d => d.avg_heat_index),
            borderColor: CHART_COLORS.danger,
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            yAxisID: 'y',
            type: 'line',
            tension: 0.4
        }
    ];
    
    // Add weather condition bars
    const weatherBars = {
        label: 'Weather Condition',
        data: data.map(d => 100), // Full height bars
        backgroundColor: data.map(d => d.color),
        borderColor: data.map(d => d.color),
        borderWidth: 1,
        yAxisID: 'y2',
        type: 'bar',
        order: 1
    };
    datasets.push(weatherBars);
    
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.hour),
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            if (context.dataset.label === 'Weather Condition') {
                                const dataPoint = data[context.dataIndex];
                                return [
                                    `Weather: ${dataPoint.weather}`,
                                    `Description: ${dataPoint.description}`,
                                    `Readings: ${dataPoint.reading_count}`
                                ];
                            }
                            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}`;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Weather Conditions Timeline (Last 12 Hours)',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Hour'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Temperature / Heat Index (°C)'
                    },
                    min: function(context) {
                        const min = Math.min(
                            ...context.chart.data.datasets[0].data,
                            ...context.chart.data.datasets[2].data
                        );
                        return Math.floor(min - 5);
                    },
                    max: function(context) {
                        const max = Math.max(
                            ...context.chart.data.datasets[0].data,
                            ...context.chart.data.datasets[2].data
                        );
                        return Math.ceil(max + 5);
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Humidity (%)'
                    },
                    min: 0,
                    max: 100,
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y2: {
                    type: 'linear',
                    display: false,
                    min: 0,
                    max: 100
                }
            }
        }
    });
}

// School safety suggestion logic
function getSchoolSuggestion(heatIndex) {
    if (heatIndex < 27) {
        return 'Normal activities can proceed. Ensure students stay hydrated.';
    } else if (heatIndex < 32) {
        return 'Caution: Encourage drinking water and provide shaded rest areas.';
    } else if (heatIndex < 41) {
        return 'Extreme Caution: Limit outdoor activities, schedule breaks, and monitor for heat stress.';
    } else if (heatIndex < 54) {
        return 'Danger: Strongly consider moving activities indoors. Watch for signs of heat illness.';
    } else {
        return 'Extreme Danger: Suspend outdoor activities. Move all students and staff to cool, shaded, or air-conditioned areas.';
    }
}

async function updateSchoolSuggestion() {
    try {
        const data = await fetchData('/heat-index/current');
        const heatIndex = parseFloat(data.heatIndex || data.heat_index || 0);
        const suggestion = getSchoolSuggestion(heatIndex);
        const suggestionDiv = document.getElementById('schoolSuggestion');
        if (suggestionDiv) {
            suggestionDiv.textContent = `Current Heat Index: ${heatIndex.toFixed(1)}°C — ${suggestion}`;
        }
    } catch (err) {
        const suggestionDiv = document.getElementById('schoolSuggestion');
        if (suggestionDiv) {
            suggestionDiv.textContent = 'Unable to fetch real-time heat index. Please try again later.';
        }
    }
}

// Function to fetch and update only the current weather section
async function autoUpdateCurrentWeather() {
    try {
        const currentWeather = await fetchData('/heat-index/current');
        updateCurrentWeather(currentWeather);
    } catch (err) {
        // Optionally handle error
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize date range picker
    initializeDateRangePicker();

    // Initialize dashboard
    initializeDashboard();

    // Set up auto-refresh every hour
    setInterval(initializeDashboard, 60 * 60 * 1000);

    // Sidebar toggle
    document.getElementById('sidebarCollapse').addEventListener('click', () => {
        document.querySelector('.wrapper').classList.toggle('sidebar-minimized');
        document.getElementById('sidebar').classList.toggle('active');
        document.getElementById('content').classList.toggle('active');
        document.getElementById('schoolMapSection').classList.toggle('active');
    });

    setupSidebarNav();

    requireLogin();

    // Attach sidebar logout event
    const sidebarLogoutBtn = document.getElementById('sidebarLogoutBtn');
    if (sidebarLogoutBtn) sidebarLogoutBtn.addEventListener('click', handleLogout);
    // Hide navbar logout if present
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.style.display = 'none';

    // Auto-update current weather every minute
    setInterval(autoUpdateCurrentWeather, 60 * 1000);
});

function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
} 