import React from 'react'
import { Hotel } from '../types.model'

const AppContext = React.createContext({
  hotels: [],
  addHotel: (item: Hotel) => {},
  deleteHotel: (id: string) => {},
  upRating: (id: string) => {},
  downRating: (id: string) => {},
  initialize: (data: { hotels: Hotel[] }) => {},
  orderByHotel: (orderBy: string) => {}
})

export default AppContext
