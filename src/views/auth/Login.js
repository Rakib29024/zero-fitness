import React, { useState, useEffect, Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {Auth} from '@supabase/auth-ui-react';

import { supabase } from '../../helper/supabaseClient'

const Login = () => {

  useEffect(() => {
  }, [])


  return (
    <>
      <div className="container p-5"  style={{ maxWidth: '400px' }}>
        <div className="row justify-content-center">
        <h3 className="text-center">ZERO FITNESS</h3>
          <div className="App">
            <header className="App-header">
              <Auth 
                  supabaseClient={supabase}
                  appearance={{ theme: ThemeSupa }}
                  theme="dark"
                  providers={['google']}
              />
            </header>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
