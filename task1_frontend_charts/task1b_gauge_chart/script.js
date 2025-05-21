document.addEventListener('DOMContentLoaded', () => {
    let eGaugeChart;
    let monthlyData = {};
    const statusValueEl = document.getElementById('statusValue');
    const monthsSidebar = document.querySelector('.months-sidebar');
    const gaugeChartDiv = document.getElementById('gaugeChart');

    const dataFilePath = 'Assignment Data 2025.xlsx - Task 1 (b).csv';
    const GAUGE_MIN = 1;
    const GAUGE_MAX = 10000000;
    const LOW_THRESHOLD = 3000000;
    const MEDIUM_THRESHOLD = 7000000;

    const COLOR_LOW = '#FF4500';
    const COLOR_MEDIUM = '#FFD700';
    const COLOR_HIGH = '#1E90FF';

    function formatGaugeDisplayValue(value) {
        if (value >= 1000000) {
            return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
        } else if (value >= 1000) {
            return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
        }
        return value.toString();
    }

    const lowStop = (LOW_THRESHOLD - GAUGE_MIN) / (GAUGE_MAX - GAUGE_MIN);
    const mediumStop = (MEDIUM_THRESHOLD - GAUGE_MIN) / (GAUGE_MAX - GAUGE_MIN);

    const chartOption = {
        series: [
            {
                name: 'SalesGauge',
                type: 'gauge',
                min: GAUGE_MIN,
                max: GAUGE_MAX,
                startAngle: 200,
                endAngle: -20,
                splitNumber: 10,
                pointer: {
                    show: true,
                    length: '70%',
                    width: 8,
                    itemStyle: {
                        color: '#464646'
                    }
                },
                axisLine: {
                    lineStyle: {
                        width: 25,
                        color: [
                            [lowStop, COLOR_LOW],
                            [mediumStop, COLOR_MEDIUM],
                            [1, COLOR_HIGH]
                        ]
                    }
                },
                axisTick: {
                    show: true,
                    distance: -25,
                    length: 8,
                    lineStyle: {
                        color: '#FFF',
                        width: 1
                    }
                },
                splitLine: {
                    show: true,
                    distance: -25,
                    length: 25,
                    lineStyle: {
                        color: '#FFF',
                        width: 2
                    }
                },
                axisLabel: {
                    show: true,
                    distance: 5,
                    formatter: function (value) {
                        return formatGaugeDisplayValue(value);
                    },
                    color: '#333',
                    fontSize: 10
                },
                detail: {
                    formatter: function (value) {
                        return formatGaugeDisplayValue(value);
                    },
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: '#333',
                    offsetCenter: [0, '60%']
                },
                data: [{ value: 0 }]
            }
        ]
    };

    eGaugeChart = echarts.init(gaugeChartDiv);
    eGaugeChart.setOption(chartOption);

    function updateGauge(value) {
        let statusText = '';
        const activeMonthButton = monthsSidebar.querySelector('.month-btn.active');

        if (!activeMonthButton) {
            statusText = 'Select a month to view the status';
        } else if (value <= LOW_THRESHOLD) {
            statusText = 'Low';
        } else if (value < MEDIUM_THRESHOLD) {
            statusText = 'Medium';
        } else {
            statusText = 'High';
        }
        statusValueEl.textContent = statusText;

        eGaugeChart.setOption({
            series: [{
                data: [{ value: value === 0 && !activeMonthButton ? GAUGE_MIN -1 : value }]
            }]
        });
    }
    

    Papa.parse(dataFilePath, {
        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function(results) {
            const csvData = results.data;
            if (!csvData || csvData.length === 0) {
                console.error('No data parsed from CSV or CSV is empty.');
                displayError('Error: No data loaded from CSV for Gauge Chart.');
                return;
            }

            csvData.forEach(row => {
                if (row.month && typeof row.sales !== 'undefined') {
                    monthlyData[row.month] = row.sales;
                }
            });

            monthsSidebar.innerHTML = '';
            Object.keys(monthlyData).forEach(month => {
                const button = document.createElement('button');
                button.classList.add('month-btn');
                button.dataset.month = month;
                button.textContent = month;
                button.addEventListener('click', () => {
                    document.querySelectorAll('.month-btn').forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    const value = monthlyData[month] || 0;
                    updateGauge(value);
                });
                monthsSidebar.appendChild(button);
            });
            updateGauge(0);
        },
        error: function(error) {
            console.error('Failed to load or parse gauge chart CSV data:', error);
            displayError('Error loading Gauge Chart data. Please check console and file path.');
        }
    });

    function displayError(message) {
        const container = document.querySelector('.container');
        if (container) {
            container.innerHTML = `<p style="color: red; text-align: center;">${message}</p>`;
        }
    }

    window.addEventListener('resize', () => {
        if (eGaugeChart) {
            eGaugeChart.resize();
        }
    });
});