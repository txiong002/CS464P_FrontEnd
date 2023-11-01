import React, { useEffect, useRef } from 'react';
import { getHouseMembers } from './Api';
import { Chart, ArcElement, DoughnutController } from 'chart.js';

const backgroundColors = [
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(255, 99, 132, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(199, 199, 199, 0.8)',
    'rgba(83, 102, 255, 0.8)',
    'rgba(40, 159, 64, 0.8)',
    'rgba(210, 199, 199, 0.8)',
    'rgba(78, 52, 199, 0.8)',
];

const borderColors = [
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(159, 159, 159, 1)',
    'rgba(83, 102, 255, 1)',
    'rgba(40, 159, 64, 1)',
    'rgba(210, 199, 199, 1)',
    'rgba(78, 52, 199, 1)',
];

const Houses = () => {
    const chartRef = useRef(null);
    Chart.register(ArcElement, DoughnutController);

    useEffect(() => {
        const renderChart = async () => {
            try {
                const donutChart = chartRef.current;
                const existingChart = Chart.getChart(donutChart);
                if (existingChart) {
                    existingChart.destroy();
                }

                const houseName = await getHouseMembers();

                new Chart(donutChart, {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys(houseName),
                        datasets: [
                            {
                                data: Object.values(houseName),
                                backgroundColor: backgroundColors,
                                borderColor: borderColors,
                                borderWidth: 2,
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: true,
                                position: 'bottom',
                                labels: {
                                    color: 'rgb(255, 99, 132)',
                                },
                            },
                        },
                    },
                });
            } catch (error) {
                console.error('Unable to render chart', error);
            }
        };
        renderChart();
    }, []);
    return (
        <div className='container flex flex-col mt-5 p-2'>
            <canvas
                id='myDonutChart'
                className='donut-chart w-75 h-75 mx-auto'
                aria-label='donut chart'
                role='img'
                style={{ borderRadius: '0.8rem', backgroundColor: 'white' }}
                ref={chartRef}
            ></canvas>
        </div>
    );
};

export default Houses;
