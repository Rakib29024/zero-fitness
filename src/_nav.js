import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilPuzzle,
  cilSpeedometer,
  cilFastfood
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Activities',
    to: '/activities',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Goals',
    to: '/goals',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Foods',
    to: '/foods',
    icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Meals',
    to: '/meals',
    icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
  },
]

export default _nav
