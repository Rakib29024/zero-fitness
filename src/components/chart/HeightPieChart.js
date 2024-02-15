import { CChart } from "@coreui/react-chartjs"
import './chart.css'

const HeightPieChart = ({data, height = 0}) => {
    const initialHeight = height;
    let averageHeight = height;
    const totalHeight = data.map(item => item.height).reduce((acc, currentValue) => acc + currentValue, 0);
    if(totalHeight){
        averageHeight = totalHeight/data.length;
    }

    return (
        <div className="chart-container">
            <h4 className="text-center">Height Statistics</h4>
            <CChart
                type="doughnut"
                data={{
                    labels: ['Average', 'Initial'],
                    datasets: [
                    {
                        backgroundColor: ['#FF4500','#157DEC'],
                        data: [averageHeight, initialHeight],
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