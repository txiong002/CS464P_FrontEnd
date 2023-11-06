import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import chartData from './ChartData';
import 'chart.js/auto';

const Houses = () => {
    return (
        <div className='bg-white'>
            <h1 className='text-dark'>Houses of Game Of Thrones</h1>
            <div className='container w-50'>
                <Doughnut data={chartData} />;
            </div>
        </div>
    );
};

export default Houses;
