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
import moment from 'moment'

const Activities = () => {
  const [activeKey, setActiveKey] = useState(1)
  const [activities, setActivities] = useState([])
  const [walkings, setWalkings] = useState([])
  const [runnings, setRunnings] = useState([])
  const [cyclings, setCyclings] = useState([])
  const [swimmings, setSwimmings] = useState([])
  
  useEffect(() => {
    fetchActivities()
    fetchRunnings()
    fetchWalkings()
    fetchSwimmings()
    fetchCyclings()
  }, [])

  const fetchActivities = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      // Fetch logged-in user's goals data
      const { data, error } = await supabase
        .from('activity_records')
        .select('*')
        .order('created_at', { ascending: false })
        .eq('user_id', user.id)

      if (error) {
        throw error
      }

      // Set goals data in state
      setActivities(data || [])
    } catch (error) {
      console.error('Error fetching Activities:', error.message)
    }
  }

  const fetchRunnings = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      // Fetch logged-in user's goals data
      const { data, error } = await supabase
        .from('activity_records')
        .select('*')
        .order('created_at', { ascending: false })
        .eq('user_id', user.id)
        .eq('activity_id', 4)

      if (error) {
        throw error
      }

      // Set goals data in state
      setRunnings(data || [])
    } catch (error) {
      console.error('Error fetching runnings:', error.message)
    }
  }

  const fetchWalkings = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      // Fetch logged-in user's goals data
      const { data, error } = await supabase
        .from('activity_records')
        .select('*')
        .order('created_at', { ascending: false })
        .eq('user_id', user.id)
        .eq('activity_id', 1)

      if (error) {
        throw error
      }

      // Set goals data in state
      setWalkings(data || [])
    } catch (error) {
      console.error('Error fetching walkings:', error.message)
    }
  }

  const fetchSwimmings = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      // Fetch logged-in user's goals data
      const { data, error } = await supabase
        .from('activity_records')
        .select('*')
        .order('created_at', { ascending: false })
        .eq('user_id', user.id)
        .eq('activity_id', 3)

      if (error) {
        throw error
      }

      // Set goals data in state
      setSwimmings(data || [])
    } catch (error) {
      console.error('Error fetching swimmings:', error.message)
    }
  }

  const fetchCyclings = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      // Fetch logged-in user's goals data
      const { data, error } = await supabase
        .from('activity_records')
        .select('*')
        .order('created_at', { ascending: false })
        .eq('user_id', user.id)
        .eq('activity_id', 2)

      if (error) {
        throw error
      }

      // Set goals data in state
      setCyclings(data || [])
    } catch (error) {
      console.error('Error fetching cyclings:', error.message)
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Activities</CCardHeader>
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
            <CNavItem role="presentation">
              <CNavLink
                active={activeKey === 2}
                component="button"
                role="tab"
                aria-controls="walking-tab-pane"
                aria-selected={activeKey === 2}
                onClick={() => setActiveKey(2)}
              >
                Walking
              </CNavLink>
            </CNavItem>

            <CNavItem role="presentation">
              <CNavLink
                active={activeKey === 3}
                component="button"
                role="tab"
                aria-controls="running-tab-pane"
                aria-selected={activeKey === 3}
                onClick={() => setActiveKey(3)}
              >
                Running
              </CNavLink>
            </CNavItem>

            <CNavItem role="presentation">
              <CNavLink
                active={activeKey === 4}
                component="button"
                role="tab"
                aria-controls="cycling-tab-pane"
                aria-selected={activeKey === 4}
                onClick={() => setActiveKey(4)}
              >
                Cycling
              </CNavLink>
            </CNavItem>

            <CNavItem role="presentation">
              <CNavLink
                active={activeKey === 5}
                component="button"
                role="tab"
                aria-controls="swimming-tab-pane"
                aria-selected={activeKey === 5}
                onClick={() => setActiveKey(5)}
              >
                Swimming
              </CNavLink>
            </CNavItem>
           
          </CNav>
          <CTabContent>
            <CTabPane role="tabpanel" aria-labelledby="all-tab-pane" visible={activeKey === 1}>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Elapsed Time</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Activity</CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Distance</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Energy</CTableHeaderCell> */}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {activities.map((activitie) => (
                    <CTableRow key={activitie.id}>
                     
                      <CTableDataCell>
                        {moment(activitie.end_at).diff(moment(activitie.start_at), 'minutes')} {' minutes'}
                      </CTableDataCell>
                      <CTableDataCell>{activitie.title}</CTableDataCell>
                      {/* <CTableDataCell>{activitie.activity_amount}</CTableDataCell>
                      <CTableDataCell>{activitie.distance}</CTableDataCell>
                      <CTableDataCell>{activitie.energy}</CTableDataCell> */}
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="walking-tab-pane" visible={activeKey === 2}>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Elapsed Time</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Activity</CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Distance</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Energy</CTableHeaderCell> */}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {walkings.map((walking) => (
                    <CTableRow key={walking.id}>
                      <CTableDataCell>{moment(walking.end_at).diff(moment(walking.start_at), 'minutes')} {' minutes'}</CTableDataCell>
                      <CTableDataCell>{walking.title}</CTableDataCell>
                      {/* <CTableDataCell>{walking.activity_amount}</CTableDataCell>
                      <CTableDataCell>{walking.distance}</CTableDataCell>
                      <CTableDataCell>{walking.energy}</CTableDataCell> */}
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="running-tab-pane" visible={activeKey === 3}>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                  <CTableHeaderCell scope="col">Elapsed Time</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Activity</CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Distance</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Energy</CTableHeaderCell> */}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {runnings.map((running) => (
                    <CTableRow key={running.id}>
                      <CTableDataCell>{moment(running.end_at).diff(moment(running.start_at), 'minutes')} {' minutes'}</CTableDataCell>
                      <CTableDataCell>{running.title}</CTableDataCell>
                      {/* <CTableDataCell>{running.activity_amount}</CTableDataCell>
                      <CTableDataCell>{running.distance}</CTableDataCell>
                  <CTableDataCell>{running.energy}</CTableDataCell> */}
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="cycling-tab-pane" visible={activeKey === 4}>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                  <CTableHeaderCell scope="col">Elapsed Time</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Activity</CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Distance</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Energy</CTableHeaderCell> */}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                {cyclings.map((cycling) => (
                    <CTableRow key={cycling.id}>
                      <CTableDataCell>{moment(cycling.end_at).diff(moment(cycling.start_at), 'minutes')} {' minutes'}</CTableDataCell>
                      <CTableDataCell>{cycling.title}</CTableDataCell>
                      {/* <CTableDataCell>{cycling.activity_amount}</CTableDataCell>
                      <CTableDataCell>{cycling.distance}</CTableDataCell>
                      <CTableDataCell>{cycling.energy}</CTableDataCell> */}
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CTabPane>

            <CTabPane role="tabpanel" aria-labelledby="swimming-tab-pane" visible={activeKey === 5}>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                  <CTableHeaderCell scope="col">Elapsed Time</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Activity</CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Distance</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Energy</CTableHeaderCell> */}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                {swimmings.map((swimming) => (
                    <CTableRow key={swimming.id}>
                      <CTableDataCell>{moment(swimming.end_at).diff(moment(swimming.start_at), 'minutes')} {' minutes'}</CTableDataCell>
                      <CTableDataCell>{swimming.title}</CTableDataCell>
                      {/* <CTableDataCell>{swimming.activity_amount}</CTableDataCell>
                      <CTableDataCell>{swimming.distance}</CTableDataCell>
                      <CTableDataCell>{swimming.energy}</CTableDataCell> */}
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

export default Activities
