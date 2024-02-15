import React, { useEffect, useState, createRef } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CNavItem,
  CNavLink,
  CTabContent,
  CNav,
  CTabPane,
} from '@coreui/react'

import { supabase } from '../../helper/supabaseClient'


const Meals = () => {

  const [activeKey, setActiveKey] = useState(1)
  const [meals, setMeals] = useState([])
  const [foods, setFoods] = useState([])


  useEffect(() => {
    fetchMeals()
  }, [])

  const fetchFoods = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      // Fetch logged-in user's goals data
      const { data, error } = await supabase
        .from('foods')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }
      return data;
      // setFoods(data || [])
    } catch (error) {
      console.error('Error fetching Foods:', error.message)
    }
  }

  const fetchFoodsForMeal = async (mealId) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const { data, error } = await supabase
        .from('meal_foods')
        .select('*')
        .order('created_at', { ascending: false })
        .eq('user_id', user.id)
        .eq('meal_id', mealId)

      if (error) {
        throw error
      }
      return data
    } catch (error) {
      console.error('Error fetching all foods for meal:', error.message)
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
     
      
      console.log(data);
      if (error) {
        throw error
      }

      const mealFoods = {};

      for (let i = 0; i < data.length; i++) {
        const response = await fetchFoodsForMeal(data[i].id);
        
        for (let j = 0; j < response.length; j++) {
          let meal_id = response[j].meal_id;

          if (mealFoods[meal_id] != undefined) {
            mealFoods[meal_id].push(response[j].food_id);
          } else {
            mealFoods[meal_id] = [];
            mealFoods[meal_id].push(response[j].food_id);
          }
        }
      }
      const foods = await fetchFoods();
      
     
      let finalData = [];
      data.forEach(element => {
        const selectedFoodList = [];

        let foodIds = mealFoods[element.id];
        if(foodIds == undefined) {
          foodIds = [];
        }
       
        for(let i = 0; i < foodIds.length; i++)
        {
          foods.forEach(food => {
            if(food.id == foodIds[i])
            {
              selectedFoodList.push(food.name);
            }
          });
        }

        element.foodList = selectedFoodList;
        
      })
     
      // Set Meals data in state
      setMeals(data || [])
    } catch (error) {
      console.error('Error fetching Meals:', error.message)
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Meals</CCardHeader>
        <CCardBody>
          <CNav variant="pills" role="tablist">
            <CNavItem role="presentation">
              <CNavLink
                active={activeKey === 1}
                component="button"
                role="tab"
                aria-controls="all-tab-pane"
                aria-selected={activeKey === 1}
                onClick={() => setActiveKey(1)}
              >
                All
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane role="tabpanel" aria-labelledby="all-tab-pane" visible={activeKey === 1}>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Meal Items</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Total Calories</CTableHeaderCell>


                    <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {meals.map((meal) => (
                    <CTableRow key={meal.id}>
                      <CTableDataCell>{meal.title}</CTableDataCell>
                      <CTableDataCell>{meal.foodList.join(', ')}</CTableDataCell>
                      <CTableDataCell>{meal.total_calories}</CTableDataCell>

                      <CTableDataCell>{meal.created_at}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CTabPane>
          </CTabContent>
        </CCardBody>
      </CCard>
    </>
  )
}
export default Meals
