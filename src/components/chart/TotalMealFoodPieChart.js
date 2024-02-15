import { CChart } from "@coreui/react-chartjs"
import './chart.css'
import { useEffect, useState } from "react"
import { supabase } from "../../helper/supabaseClient"

const TotalMealFoodPieChart = () => {
    const [foodCount, setFoods] = useState(null)
    const [mealCount, setMeals] = useState(null)
    
    const fetchFoods = async () => {
      try {
        const {
          data: {
            user
          },
        } = await supabase.auth.getUser()
        // Fetch logged-in user's goals data
        const {
          data,
          error
        } = await supabase
          .from('foods')
          .select('*')
          .order('created_at', {
            ascending: false
          })

        if (error) {
          throw error
        }

        // Set Foods data in state
        setFoods(data.length || 0)
      } catch (error) {
        console.error('Error fetching Foods:', error.message)
      }
    }

    const fetchMeals = async () => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser()
    
          const { data, error } = await supabase
            .from('meals')
            .select(`'*'`)
            .order('created_at', { ascending: false })
          setMeals(data.length || 0)
          if (error) {
            throw error
          }
        } catch (error) {
          console.error('Error fetching Meals:', error.message)
        }
      }

    useEffect(() => {
      fetchFoods()
      fetchMeals()
    }, [])

    return (
        <div className="chart-container">
            <h4 className="text-center">Meals/Foods Statistics</h4>
            <CChart
                type="doughnut"
                data={{
                    labels: ['Total Meal', 'Total Food'],
                    datasets: [
                    {
                        backgroundColor: ['#800080','#25383C'],
                        data: [mealCount, foodCount],
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

export default TotalMealFoodPieChart;