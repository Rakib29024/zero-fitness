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
    fetchFoods();
    fetchMeals()
    // fetchMealFoods();

  }, [meals])

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
      setFoods(data || [])
    } catch (error) {
      console.error('Error fetching Foods:', error.message)
    }
  }

  const fetchMealFoods = async (meals) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const { data, error } = await supabase
        .from('meal_foods')
        .select('*')
        .order('created_at', { ascending: false })
        .eq('user_id', user.id)
        const modifiedMeals = [...meals];
      

      for(let i = 0; i < modifiedMeals.length; i++)
      {
        const foodIds = [];

        for(let j = 0; j < data.length; j++){
          if(data[j].meal_id == modifiedMeals[i].id)
          {
            foodIds.push(data[j].food_id);
          }
        }
        
        const foodNames = [];

        for(let j = 0; j < foodIds.length; j++)
        {
          for(let k = 0; k < foods.length; k++){
            if(Number.parseInt(foods[k].id)  == Number.parseInt(foodIds[j])){
              foodNames.push(foods[k].name);
            }
          }
        }
        
        modifiedMeals[i]['foodNames'] = foodNames;
      }

      if (error) {
        throw error
      }
      return modifiedMeals;
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
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
     
      if (error) {
        throw error
      }
      if(data.length > 0)
      {
        let result = await fetchMealFoods(data);
        setMeals(result || [])
      }else{
        setMeals(data || [])

      }
      
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
                  {console.log(meals)}
                  {meals.map((meal) => (
                    <CTableRow key={meal.id}>
                     
                      <CTableDataCell>{meal.title}</CTableDataCell>
                      <CTableDataCell>{meal.foodNames ? meal.foodNames.join(", ") : ""}</CTableDataCell>
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
