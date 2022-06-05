import _ from 'lodash'
import { useEffect, useReducer } from 'react'
import { Hotel } from '../types.model'
import { nanoid } from 'nanoid'
import AppContext from './app-context'

const APP_STATE_KEY = 'app-state'

const defaultAppState: any = {
  hotels: [
    {
      id: nanoid(),
      name: 'Voyage Hotel',
      image: 'https://picsum.photos/200',
      price: '$20',
      rating: 8,
      location: 'New York'
    },
    {
      id: nanoid(),
      name: 'Hotel 1',
      image: 'https://picsum.photos/210',
      price: '$20',
      rating: 1,
      location: 'New York'
    },
    {
      id: nanoid(),
      name: 'Hotel 1',
      image: 'https://picsum.photos/220',
      price: '$20',
      rating: 4,
      location: 'New York'
    },
    {
      id: nanoid(),
      name: 'Hotel 1',
      image: 'https://picsum.photos/230',
      price: '$20',
      rating: 9,
      location: 'New York'
    }
  ]
}

const appReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        hotels: [...state.hotels, action.item]
      }
    case 'REMOVE':
      const hotels = [...state.hotels]
      _.remove(hotels, (hotel: Hotel) => hotel.id === action.id)
      return { ...state, hotels }

    case 'UP_RATING':
      const hotelsUp = [...state.hotels]
      const hotelUp = hotelsUp.find((hotel: Hotel) => hotel.id === action.id)

      if (hotelUp.rating < 10) {
        hotelUp.rating = hotelUp.rating + 1
      }

      return { ...state, hotels: hotelsUp }

    case 'DOWN_RATING':
      const hotelsDown = [...state.hotels]
      const hotelDown = hotelsDown.find(
        (hotel: Hotel) => hotel.id === action.id
      )

      if (hotelDown.rating > 0) {
        hotelDown.rating = hotelDown.rating - 1
      }

      return { ...state, hotels: hotelsDown }

    case 'INITIALIZE':
      return { ...state, hotels: action.data.hotels }

    case 'ORDER_BY':
      const hotelsOrder = [...state.hotels]
      const orderBy = action.orderBy
      // ascending order by rating
      if (orderBy === 'asc') {
        hotelsOrder.sort((a: Hotel, b: Hotel) => a.rating - b.rating)
      }
      // descending order by rating
      if (orderBy === 'desc') {
        hotelsOrder.sort((a: Hotel, b: Hotel) => b.rating - a.rating)
      }
      return { ...state, hotels: hotelsOrder }
  }
  return defaultAppState
}

const AppProvider = (props: any) => {
  const [appState, dispatchCartAction] = useReducer(
    appReducer,
    localStorage.getItem(APP_STATE_KEY)
      ? JSON.parse(localStorage.getItem(APP_STATE_KEY) || '{}')
      : defaultAppState
  )

  useEffect(() => {
    localStorage.setItem(APP_STATE_KEY, JSON.stringify(appState))
  }, [appState])

  const addItemToHotelsHandler = (item: Hotel) => {
    dispatchCartAction({ type: 'ADD', item })
  }

  const removeHotelsHandler = (id: string) => {
    dispatchCartAction({ type: 'REMOVE', id })
  }

  const upRatingHandler = (id: string) => {
    dispatchCartAction({ type: 'UP_RATING', id })
  }

  const downRatingHandler = (id: string) => {
    dispatchCartAction({ type: 'DOWN_RATING', id })
  }

  const initializeHandler = (data: { hotels: Hotel[] }) => {
    dispatchCartAction({ type: 'INITIALIZE', data })
  }

  const orderByHotelHandler = (orderBy: string) => {
    dispatchCartAction({ type: 'ORDER_BY', orderBy })
  }

  const appContext: any = {
    hotels: appState.hotels,
    addHotel: addItemToHotelsHandler,
    deleteHotel: removeHotelsHandler,
    upRating: upRatingHandler,
    downRating: downRatingHandler,
    initialize: initializeHandler,
    orderByHotel: orderByHotelHandler
  }

  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppProvider
