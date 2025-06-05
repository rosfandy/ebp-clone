import Chart from 'react-apexcharts'

export const PieChart = (props) => {
    const { datas, labels } = props

    const options = {
        series: datas,
        legend: {
            fontSize: "16px",
            position: "right"
        },
        chart: {
            type: 'pie',
            height: 400,
        },
        colors: ['#ff4560', '#775dd0', '#ABCE69', '#00e396', '#ebcc21', '#26a0fc'],
        labels: labels,
        responsive: [
            {
                breakpoint: 1025,
                options: {
                    chart: {
                        height: 350,
                        width: 320
                    },
                    legend: {
                        fontSize: "12px",
                        position: 'bottom'
                    }
                }
            },
            {
                breakpoint: 769,
                options: {
                    chart: {
                        height: 350,
                        width: 680
                    },
                    legend: {
                        fontSize: "16px",
                        position: 'bottom'
                    }
                }
            },
            {
                breakpoint: 480,
                options: {
                    chart: {
                        height: 300,
                        width: 350
                    },
                    legend: {
                        fontSize: "12px",
                        position: 'bottom'
                    }
                }
            },
            {
                breakpoint: 425,
                options: {
                    chart: {
                        height: 300,
                        width: 230
                    },
                    legend: {
                        fontSize: "12px",
                        position: 'bottom'
                    }
                }
            }
        ],
    };

    return (
        <>
            <Chart options={options} series={options.series} type="pie" height={options.chart.height} />
        </>
    )
}