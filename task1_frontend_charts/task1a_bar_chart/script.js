document.addEventListener('DOMContentLoaded', () => {
    const dataFilePath = 'Assignment Data 2025.xlsx - Task 1 (a).csv';

    const minTotalValueColor = { r: 255, g: 248, b: 231 };
    const maxTotalValueColor = { r: 101, g: 38, b: 5 };

    function interpolateColor(color1, color2, factor) {
        const r = Math.round(color1.r + factor * (color2.r - color1.r));
        const g = Math.round(color1.g + factor * (color2.g - color1.g));
        const b = Math.round(color1.b + factor * (color2.b - color1.b));
        return `rgb(${r}, ${g}, ${b})`;
    }

    function getColorForValue(value, minValue, maxValue) {
        if (value <= minValue) return `rgb(${minTotalValueColor.r}, ${minTotalValueColor.g}, ${minTotalValueColor.b})`;
        if (value >= maxValue) return `rgb(${maxTotalValueColor.r}, ${maxTotalValueColor.g}, ${maxTotalValueColor.b})`;
        
        const factor = (value - minValue) / (maxValue - minValue);
        return interpolateColor(minTotalValueColor, maxTotalValueColor, factor);
    }

    function renderColorLegend(minValue, maxValue) {
        const legendGradientEl = document.getElementById('colorLegend');
        legendGradientEl.style.background = `linear-gradient(to top, 
            rgb(${minTotalValueColor.r},${minTotalValueColor.g},${minTotalValueColor.b}), 
            rgb(${maxTotalValueColor.r},${maxTotalValueColor.g},${maxTotalValueColor.b})
        )`;

        const legendLabelsEl = document.getElementById('legendLabels');
        legendLabelsEl.innerHTML = '';

        const legendValues = [40, 35, 30, 25, 20, 15, 10];
        const legendMinY = 10;
        const legendMaxY = 40;

        legendValues.forEach(val => {
            const span = document.createElement('span');
            span.textContent = val;
            const percentage = ((val - legendMinY) / (legendMaxY - legendMinY)) * 100;
            span.style.bottom = `${percentage}%`;
            legendLabelsEl.appendChild(span);
        });
    }


    Papa.parse(dataFilePath, {
        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function(results) {
            const rawData = results.data;
            if (!rawData || rawData.length === 0) {
                console.error('No data parsed from CSV or CSV is empty.');
                displayError('Error: No data loaded from CSV for Bar Chart.');
                return;
            }

            const desiredOrder = ["ghh", "dww", "aaa", "ooo", "hgt", "ytt", "qyy", "prp", "eee", "rtt"];
            const data = rawData.sort((a, b) => {
                return desiredOrder.indexOf(a.Product) - desiredOrder.indexOf(b.Product);
            });


            const allTotalValues = data.map(item => item.TotalValue);
            const minTotalValue = Math.min(...allTotalValues, 10);
            const maxTotalValue = Math.max(...allTotalValues, 40);

            renderColorLegend(minTotalValue, maxTotalValue);

            const labels = data.map(item => item.Product);
            const totalSalesData = data.map(item => item.TotalSales);
            
            const backgroundColors = data.map(item => getColorForValue(item.TotalValue, minTotalValue, maxTotalValue));
            const borderColors = backgroundColors;

            const ctx = document.getElementById('myBarChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Total Sales',
                        data: totalSalesData,
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 1,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const index = context.dataIndex;
                                    const currentProductData = data[index];
                                    return [
                                        `Product: ${currentProductData.Product}`,
                                        `TotalSales: ${currentProductData.TotalSales}`,
                                        `TotalValue: ${currentProductData.TotalValue}`
                                    ];
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Product',
                                font: { size: 12 }
                            },
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'TotalSales',
                                font: { size: 12 }
                            },
                            beginAtZero: true,
                            max: 15,
                            ticks: {
                                stepSize: 2
                            },
                            grid: {
                                display: true,
                                color: 'rgba(0, 0, 0, 0.05)',
                                drawBorder: false
                            }
                        }
                    }
                }
            });
        },
        error: function(error) {
            console.error('Failed to load or parse bar chart CSV data:', error);
            displayError('Error loading Bar Chart data. Please check console and file path.');
        }
    });

    function displayError(message) {
        const container = document.querySelector('.chart-wrapper');
        if (container) {
            container.innerHTML = `<p style="color: red; text-align: center;">${message}</p>`;
        }
    }
});