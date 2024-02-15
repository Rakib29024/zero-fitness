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

const Foods = () => {
  const [activeKey, setActiveKey] = useState(1)
  const [foods, setFoods] = useState([])
  const [searchInput, setSearchInput] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);

  useEffect(() => {
    fetchFoods()
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

      // Set Foods data in state
      setFoods(data || [])
      setFilteredFoods(data || [])
    } catch (error) {
      console.error('Error fetching Foods:', error.message)
    }
  }


  const handleInput = (e)=>{
    setSearchInput(e.target.value);

    const result = [];
    for(let i = 0; i < foods.length; i++)
    {
      let main = foods[i].name.toLowerCase();
      let sub = e.target.value.toLowerCase();
      if(main.includes(sub)){
        result.push(foods[i]);
      }
    }
    setFilteredFoods(result);
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Foods</CCardHeader>
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
                
                <input type="text" value={searchInput} onChange={handleInput} className='mx-2 px-2 form-control-sm' placeholder='search food here' style={{outline: 'none', borderRadius: '5px'}}/>
              </CNavLink>
             
              
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane role="tabpanel" aria-labelledby="all-tab-pane" visible={activeKey === 1}>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Calories</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Unit</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredFoods.map((food) => (
                    <CTableRow key={food.id}>
                      <CTableDataCell>{food.name}</CTableDataCell>
                      <CTableDataCell>{food.category}</CTableDataCell>
                      <CTableDataCell>{food.calories}</CTableDataCell>
                      <CTableDataCell>{food.unit}</CTableDataCell>
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

export default Foods

