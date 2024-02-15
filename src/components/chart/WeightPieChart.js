import { CChart } from "@coreui/react-chartjs"
import './chart.css'

const WeightPieChart = ({data, weight = 0}) => {
    const initialWeight = weight;
    let averageWeight = weight;
    const totalWeight = data.map(item => item.weight).reduce((acc, currentValue) => acc + currentValue, 0);
    if(totalWeight){
        averageWeight = totalWeight/data.length;
    }

    return (
        <div className="chart-container">
            <h4 className="text-center">Weight Statistics</h4>
            <CChart
                type="doughnut"
                data={{
                    labels: ['Average','Initial'],
                    datasets: [
                    {
                        backgroundColor: ['#0000FF','#00D8FF'],
                        data: [averageWeight, initialWeight],
                    },
                    ],
                }}
                options={{
                    plugins: {
                    legend: {
                        labels: {
                        // color: getStyle('--cui-body-color'),
                        }
                    }
                    },
                }}
                />
        </div>
    )
}

export default WeightPieChart;