import React from 'react'
import CardItem from './card-item'

const DUMMYHOTEL = [
  {
    id: '1',
    name: 'Voyage Hotel',
    image:
      'https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
    price: '$20',
    rating: '4.5',
    location: 'New York'
  },
  {
    id: '1',
    name: 'Hotel 1',
    image:
      'https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
    price: '$20',
    rating: '4.5',
    location: 'New York'
  },
  {
    id: '1',
    name: 'Hotel 1',
    image:
      'https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
    price: '$20',
    rating: '4.5',
    location: 'New York'
  },
  {
    id: '1',
    name: 'Hotel 1',
    image:
      'https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80',
    price: '$20',
    rating: '4.5',
    location: 'New York'
  }
]

export default function CardList() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {DUMMYHOTEL.map(hotel => (
        <CardItem
          key={hotel.id}
          name={hotel.name}
          image={hotel.image}
          price={hotel.price}
          rating={hotel.rating}
        />
      ))}
    </div>
  )
}
