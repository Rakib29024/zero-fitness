import { CChart } from "@coreui/react-chartjs"
import './chart.css'

const StepBarChart = ({data}) => {
    
    const getDayName = (dateString) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateString);
        const dayIndex = date.getDay();
        return days[dayIndex];
    };
      
    const [labels, steps] = data.reduce((acc, { date, step_count }) => {
        acc[0].push(getDayName(date));
        acc[1].push(step_count);
        return acc;
    }, [[], []]);

    return (
        <div className="chart-container">
            <h4 className="text-center">Walking Statistics for 7 Days</h4>
            <CChart
                type="bar"
                data={{
                    labels: labels,
                    datasets: [
                    {
                        label: 'Steps',
                        backgroundColor: '#002760', // Blue color with transparency
                        borderColor: 'rgba(1, 1, 1, 1)', // Solid blue color for borders
                        borderWidth: 1, // Border width
                        data: steps,
                    },
                    ],
                }}
                options={{
                    plugins: {
                    legend: {
                        display: true,
                        labels: {
                        color: '#333', // Label color
                        font: {
                            size: 14, // Label font size
                            family: 'Arial', // Label font family
                        },
                        },
                    },
                    },
                    scales: {
                    x: {
                        grid: {
                        display: true,
                        color: '#ddd', // X-axis grid color
                        },
                        ticks: {
                        color: '#333', // X-axis tick color
                        font: {
                            size: 12, // X-axis tick font size
                            family: 'Arial', // X-axis tick font family
                        },
                        },
                    },
                    y: {
                        grid: {
                        display: true,
                        color: '#ddd', // Y-axis grid color
                        },
                        ticks: {
                        color: '#333', // Y-axis tick color
                        font: {
                            size: 12, // Y-axis tick font size
                            family: 'Arial', // Y-axis tick font family
                        },
                        },
                    },
                    },
                }}
            />
        </div>
    )
}

export default StepBarChart;