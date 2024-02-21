import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const data = [
    {
        "month": "January",
        "income": 0
    },
    {
        "month": "February",
        "income": 1050000
    },
    {
        "month": "March",
        "income": 0
    },
    {
        "month": "April",
        "income": 0
    },
    {
        "month": "May",
        "income": 0
    },
    {
        "month": "June",
        "income": 0
    },
    {
        "month": "July",
        "income": 0
    },
    {
        "month": "August",
        "income": 0
    },
    {
        "month": "September",
        "income": 0
    },
    {
        "month": "October",
        "income": 0
    },
    {
        "month": "November",
        "income": 0
    },
    {
        "month": "December",
        "income": 0
    }
];

const BarChartComponent = ({data}) => {
    return (
        <VictoryChart
            // domainPadding={{ x: 20 }}
            theme={VictoryTheme.material}
        >
            <VictoryAxis
                tickValues={data.map(item => item.month)}
                tickFormat={data.map(item => item.month)}
                style={{
                    tickLabels: { angle: -45, fontSize: 10 }
                }}
            />
            <VictoryAxis
                dependentAxis
                tickFormat={(x) => (`Rp.${x}k`)}
            />
            <VictoryBar
                data={data}
                x="month"
                y="income"
            />
        </VictoryChart>
    );
}

export default BarChartComponent;
