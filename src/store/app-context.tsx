import React from 'react'
import { Hotel } from '../types.model'

const AppContext = React.createContext({
  hotels: [],
  orderBy: 'asc',
  addHotel: (item: Hotel) => {},
  deleteHotel: (id: string) => {},
  upRating: (id: string) => {},
  downRating: (id: string) => {},
  initialize: (data: { hotels: Hotel[] }) => {},
  orderByHotel: (orderBy: string) => {},
  getHotel: (id: string) => {}
})

export default AppContext
