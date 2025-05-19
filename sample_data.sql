USE heat_index_db;

-- Insert sample data for the last 24 hours
INSERT INTO daily_readings (location_id, date, temperature, humidity, heat_index, weather, description)
SELECT 
    1 as location_id,
    DATE_SUB(NOW(), INTERVAL n HOUR) as date,
    25 + RAND() * 5 as temperature,
    60 + RAND() * 20 as humidity,
    27 + RAND() * 3 as heat_index,
    CASE FLOOR(RAND() * 4)
        WHEN 0 THEN 'Clear'
        WHEN 1 THEN 'Clouds'
        WHEN 2 THEN 'Rain'
        ELSE 'Sunny'
    END as weather,
    CASE FLOOR(RAND() * 4)
        WHEN 0 THEN 'Clear sky'
        WHEN 1 THEN 'Partly cloudy'
        WHEN 2 THEN 'Light rain'
        ELSE 'Sunny with few clouds'
    END as description
FROM (
    SELECT 0 as n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
    UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9
    UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14
    UNION SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19
    UNION SELECT 20 UNION SELECT 21 UNION SELECT 22 UNION SELECT 23
) numbers; 