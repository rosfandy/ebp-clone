import { useLaravelReactI18n } from 'laravel-react-i18n';
import Chart from 'react-apexcharts';

export const BarChart = (props) => {
    const { datas, labels, text } = props;
    const { t } = useLaravelReactI18n();

    const options = {
        title: {
            text: t('Number of Students with, :name', { name: t(`${text}`) }),
            align: 'center',
            marginTop: 0,
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
            }
        },
        series: [{
            name: 'Total Mahasiswa',
            data: datas
        }],
        chart: {
            type: 'bar',
            height: 350,
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        colors: ['#3B82F6'],
        xaxis: {
            categories: labels
        },
        legend: {
            show: false
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'center',
                    maxItems: 100,
                    hideOverflowingLabels: true,
                }
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    fontSize: "4px"
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                    }
                },
            }
        }]
    };

    return (
        <Chart options={options} series={options.series} type="bar" height={options.chart.height} />
    );
}