import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import chartData from './ChartData';
import 'chart.js/auto';

const Houses = () => {
    return (
        <div className='container w-50'>
            <Doughnut data={chartData} />;
        </div>
    );
};

export default Houses;
