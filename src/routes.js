import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Activities = React.lazy(() => import('./views/activities/Activities'))
const Goals = React.lazy(() => import('./views/goals/Goals'))
const Profile = React.lazy(() => import('./views/profiles/Profiles'))
const ProfileEdit = React.lazy(() => import('./views/profiles/ProfileEdit'))
const Foods = React.lazy(() => import('./views/food/Foods'))
const Meals = React.lazy(() => import('./views/meals/Meals'))
const Login = React.lazy(() => import('./views/auth/Login'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/login', name: 'Login', element: Login },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/activities', name: 'Activities', element: Activities },
  { path: '/goals', name: 'Goals', element: Goals },
  { path: '/foods', name: 'Foods', element: Foods },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/profile/edit', name: 'ProfileEdit', element: ProfileEdit },
  { path: '/meals', name: 'Meals', element: Meals}
]

export default routes
