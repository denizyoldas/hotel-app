import React from 'react'
import Button from './button'

interface Props {
  name: string
  image: string
  price: number | string
  rating: number | string
}

export default function CardItem({ image, name, price, rating }: Props) {
  return (
    <div className="relative card border drop-shadow-sm h-32 w-4/5 min-w-42 flex items-center rounded-sm bg-white px-2 box-content hover:scale-110 transition ease-in-out delay-150">
      <span className="absolute top-0 right-0 border rounded-full p-2 box-content bg-red-600 text-white">X</span>
      <img src={image} alt={name} className="w-28 h-28 mr-3" />
      <div>
        <h4 className="text-lg font-medium">{name}</h4>
        <div className="bg-[#f8f9fe] text-[#5bc2c9] w-24 p-1 mt-1 mb-4 font-medium text-sm">
          {rating} Puan
        </div>
        <div className="">
          <Button className="mr-2">PUAN ARTTIR</Button>
          <Button>PUAN AZALT</Button>
        </div>
      </div>
    </div>
  )
}
