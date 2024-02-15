import React, { useState, useEffect } from 'react'
import { CCard, CTableDataCell, CTabContent, CTabPane, CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CNav, CNavItem, CNavLink, CButton, CCardBody, CCardHeader, CCardTitle, CCardText, CRow, CCol } from '@coreui/react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { supabase } from '../../helper/supabaseClient'

import '../../../src/assets/css/quote.css'
import StepBarChart from '../../components/chart/StepBarChart'
import HeightPieChart from '../../components/chart/HeightPieChart'
import TotalMealFoodPieChart from '../../components/chart/TotalMealFoodPieChart'
import WeightPieChart from '../../components/chart/WeightPieChart'
import DailyQuoteNotification from '../../components/notification/DailyQuoteNofication'

const config = {
  quotesApiUrl: 'https://type.fit/api/quotes',
}

const Dashboard = () => {
  const [activeKey, setActiveKey] = useState(1)
  const [profile, setProfile] = useState([])
  const [quote, setQuote] = useState([])
  const [syncing, setSyncing] = useState(false);
  const [fitnessData, setFitnessData] = useState([]);
  const [isRedirectedToHome, setIsRedirectedToHome] = useState(false);

  useEffect(() => {
    let allLocalKeys = Object.keys(localStorage);
    if(allLocalKeys.includes('fitCode'))
    {
      const fitCode = localStorage.getItem('fitCode');
      if (fitCode !== null) {
        handleAuthorizationCode(fitCode);
      }
    }
    
    
    getQuote()
    fetchProfile()
  }, [])

  const getQuote = () => {
    fetch(config.quotesApiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length)
          const randomQuote = data[randomIndex]
          randomQuote.author = randomQuote.author.replace(', type.fit', '')
          setQuote(randomQuote)
        }
      })
      .catch((error) => {
        console.error('Error fetching quote:', error.message)
      })
  }

  const fetchFitApiData = async () => {
    setSyncing(false);
    try {
      let allLocalKeys = Object.keys(localStorage);
      console.log(allLocalKeys)
      if(allLocalKeys.includes('fitCode'))
      {
        const fitCode = localStorage.getItem('fitCode');
        if (fitCode === null || fitCode === '' || fitCode === undefined) {
          const response = await fetch('https://api-fit-app.netlify.app/api/googleFit');
          const data = await response.json();
          window.location.href = data.authUrl;
        }else{
          handleAuthorizationCode(fitCode);
        }
      }
      else{
        const response = await fetch('https://api-fit-app.netlify.app/api/googleFit');
        const data = await response.json();
        window.location.href = data.authUrl;
      }
      
    } catch (error) {
      console.error('Error syncing Fit Data:', error);
    } finally {
      setSyncing(true);
    }
  }

  const handleAuthorizationCode = async (code) => {
    try {
      const response = await fetch(`https://api-fit-app.netlify.app/api/googleFit/callback?code=${code}`);
      const data = await response.json();
      if (data.isRedirectedToHome) {
        setFitnessData(data.data);
        localStorage.removeItem('fitCode');
        const urlWithoutCode = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, urlWithoutCode);
      }
    } catch (error) {
      console.error('Error fetching fitness data:', error);
    }
  };

  const fetchProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (error) {
        throw error
      }
      setProfile(data || [])
    } catch (error) {
      console.error('Error fetching profile:', error.message)
    }
  }

  return (
    <>
      <CCard className="text-center mb-4 quote-card">
        <CCardHeader  className="quote-header">
          Quote Of The Day
        </CCardHeader>
        <CCardBody>
          <CCardTitle className="quote-text">{quote['text']}</CCardTitle>
          <CCardText className="quote-author">{quote['author']}</CCardText>
        </CCardBody>
      </CCard>
      <div class="d-flex justify-content-center align-items-center button-container mb-4">
        {!syncing 
        ? 
          <button class="btn btn-primary btn-lg text-white" onClick={fetchFitApiData}>Sync With Your Fit</button> 
        : 
          <button class="btn btn-success btn-lg text-white">Syncing...</button> }
      </div>

      {/* <WidgetsDropdown /> */}
      {/* {quote ? */}
      <DailyQuoteNotification></DailyQuoteNotification>
      {/* // :null} */}
      <CRow>
        <CCol>
            {fitnessData ?
              <WeightPieChart data={fitnessData} weight={profile.weight}></WeightPieChart>
              :null
            }
        </CCol>
        <CCol>
            {fitnessData ?
              <HeightPieChart data={fitnessData} height={profile.height}></HeightPieChart>
              :null
            }
        </CCol>
        <CCol>
        {fitnessData ?
              <TotalMealFoodPieChart></TotalMealFoodPieChart>
              :null
            }
        </CCol>
      </CRow>
      <CRow>
        <CCol>
        {fitnessData ?
          <StepBarChart data={fitnessData}></StepBarChart>
          :null
        }
        </CCol>
      </CRow>
      <CCard className="mb-4">
        <CCardHeader>Last 7 Days Fit Data</CCardHeader>
        <CCardBody>
          <CTabContent>
            <CTabPane role="tabpanel" aria-labelledby="all-tab-pane" visible={activeKey === 1}>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Step Count</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Weight</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Height</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heart Rate</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {fitnessData ? fitnessData.map((data) => (
                    <CTableRow>
                      <CTableDataCell>{data.date}</CTableDataCell>
                      <CTableDataCell>{data.step_count}</CTableDataCell>
                      <CTableDataCell>{data.weight}</CTableDataCell>
                      <CTableDataCell>{data.height_in_cms}</CTableDataCell>
                      <CTableDataCell>{data.heart_rate}</CTableDataCell>
                    </CTableRow>
                  )) : "No fit data found!"
                  }
                </CTableBody>
              </CTable>
            </CTabPane>
          </CTabContent>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
