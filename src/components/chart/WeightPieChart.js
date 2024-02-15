import { CChart } from "@coreui/react-chartjs"
import './chart.css'

const WeightPieChart = ({data, weight = 0}) => {
    const initialWeight = weight;
    let averageWeight = weight;

    const { totalWeight, nonZeroWeightsCount, latestWeight } = data.reduce((acc, data) => {
        const weight = data.weight;
        if (weight !== 0) {
            acc.latestWeight=weight;
            acc.totalWeight += weight;
            acc.nonZeroWeightsCount++;
        }
        return acc;
      }, { totalWeight: 0, nonZeroWeightsCount: 0, latestWeight: weight });

    if(totalWeight){
        averageWeight = totalWeight/nonZeroWeightsCount;
    }

    return (
        <div className="chart-container">
            <h4 className="text-center">Weight Statistics</h4>
            <CChart
                type="doughnut"
                data={{
                    labels: ['Average','Initial','Most Recent'],
                    datasets: [
                    {
                        backgroundColor: ['#0000FF','#00D8FF','#157DEC'],
                        data: [averageWeight, initialWeight,latestWeight],
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