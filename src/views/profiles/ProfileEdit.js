import React, { useState, useEffect, useRef } from 'react'
import { CCard, CCardBody, CCol, CRow, CButton } from '@coreui/react'
import { supabase } from '../../helper/supabaseClient'
import { useNavigate } from 'react-router-dom'
import no_pic from '../../assets/images/avatars/no_pic.png';

const ProfileEdit = () => {
  const navigate = useNavigate()

  const [profile, setProfile] = useState([])

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()

      if (error) {
        throw error
      }

      if (data) {
        setProfile(data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error.message)
    }
  }

  const handleNumericInput = (e) => {
    const { name, value } = e.target
    // Filter out non-numeric characters and allow decimal points
    const numericValue = value.replace(/[^\d.]/g, '')
    // Update the state with the filtered value
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: numericValue,
    }))
  }

  const inputFullName = useRef()
  const inputGender = useRef()
  const inputHeight = useRef()
  const inputWeight = useRef()
  const inputAge = useRef()

  const handleSubmit = async () => {
    try {
      const fullName = inputFullName.current.value
      const gender = inputGender.current.value
      const height = inputHeight.current.value
      const weight = inputWeight.current.value
      const age = inputAge.current.value
      const { error } = await supabase.from('profiles').upsert({
        id: profile.id,
        full_name: fullName,
        gender,
        weight,
        height,
        age,
      })

      if (error) {
        throw error
      }

      console.log('Profile updated successfully')
      navigate('/profile')
    } catch (error) {
      console.error('Error updating profile:', error.message)
    }
  }

  return (
    <div>
      <CCard>
        <CCardBody>
          {profile && (
            <form>
              <CRow>
                <CCol xs="12" md="3" className="d-flex align-items-center justify-content-center">
                  <img src={profile.avatar_url || no_pic} alt="Avatar" width="150" height="150" />
                </CCol>
                <br />
                <CCol xs="12" md="auto">
                  <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      ref={inputFullName}
                      id="fullName"
                      value={profile.full_name}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gender" className="form-label">
                      Gender
                    </label>
                    <select
                      className="form-select"
                      id="gender"
                      ref={inputGender}
                      value={profile.gender}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="weight" className="form-label">
                      Weight (In kg)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="weight"
                      name="weight"
                      value={profile.weight}
                      onInput={handleNumericInput}
                      ref={inputWeight}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="height" className="form-label">
                      Height (In cm)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="height"
                      name="height"
                      value={profile.height}
                      onInput={handleNumericInput}
                      ref={inputHeight}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="age" className="form-label">
                      Age
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="age"
                      name="age"
                      value={profile.age}
                      onInput={handleNumericInput}
                      ref={inputAge}
                    />
                  </div>
                </CCol>
              </CRow>
              <CButton color="primary" onClick={handleSubmit} className="float-end">
                Save
              </CButton>
            </form>
          )}
          {!profile && <p>Loading...</p>}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ProfileEdit
