import React, { useState, useEffect, Component, Suspense } from 'react'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ThemeSupa } from "@supabase/auth-ui-shared";
import './scss/style.scss'

import { supabase } from './helper/supabaseClient';
import {Auth} from '@supabase/auth-ui-react';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// class App extends Component {
export default function App() {
  // render() {
    const [user, setUser] = useState(null);

    useEffect(()=> {
      const session = supabase.auth.getSession();
      setUser(session?.user);

      const {data: authListener} = supabase.auth.onAuthStateChange(
        (event, session) => {
          switch(event){
            case "SIGNED_IN":
              setUser(session?.user);
              localStorage.setItem('supabaseSession', JSON.stringify(session));
              break;
            
            case "SIGNED_OUT":
              setUser(null);
              localStorage.removeItem('supabaseSession');
              localStorage.removeItem('fitCode');
              break;
            
            default:
          }
        }
      );

      const storedSession = localStorage.getItem('supabaseSession');
      if (storedSession) {
        setUser(JSON.parse(storedSession)?.user);
      }

      return () => {
        authListener.subscription.unsubscribe();
      }
      
    }, [])

    return (
      <HashRouter>
      {
        user ? (
          <Suspense fallback={loading}>
          <Routes>
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
        ) : (
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
        
      </HashRouter>
    );
}

// export default App
