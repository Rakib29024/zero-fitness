import { CChart } from "@coreui/react-chartjs"
import './chart.css'

const HeightPieChart = ({data, height = 0}) => {
    const initialHeight = height;
    let averageHeight = height;

    const { totalHeight, nonZeroHeightsCount, latestHeight } = data.reduce((acc, data) => {
        const height = data.height;
        if (height !== 0) {
            acc.latestHeight=height;
            acc.totalHeight += height;
            acc.nonZeroHeightsCount++;
        }
        return acc;
      }, { totalHeight: 0, nonZeroHeightsCount: 0, latestHeight: height });

    if(totalHeight){
        averageHeight = totalHeight/nonZeroHeightsCount;
    }

    return (
        <div className="chart-container">
            <h4 className="text-center">Height Statistics</h4>
            <CChart
                type="doughnut"
                data={{
                    labels: ['Average', 'Initial', 'Most Recent'],
                    datasets: [
                    {
                        backgroundColor: ['#FF4500','#157DEC','#0000FF'],
                        data: [averageHeight, initialHeight, latestHeight],
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

export default HeightPieChart;