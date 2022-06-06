import React, { useContext, useEffect, useState } from 'react'
import cx from 'classnames'
import AppContext from '../store/app-context'
import { Hotel } from '../types.model'
import CardItem from './card-item'

const PERR_PAGE = 5

export default function CardList() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const appCtx = useContext(AppContext)

  const indexOfLastHotel = currentPage * PERR_PAGE
  const indexOfFirstHotel = indexOfLastHotel - PERR_PAGE
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel)
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(hotels.length / PERR_PAGE); i++) {
    pageNumbers.push(i)
  }

  useEffect(() => setHotels(appCtx.hotels), [appCtx.hotels])

  return (
    <>
      <div className="p-10 grid grid-cols-1 gap-5 place-items-center">
        {currentHotels.map(hotel => (
          <CardItem
            key={hotel.id}
            id={hotel.id}
            name={hotel.name}
            image={hotel.image}
            rating={hotel.rating}
          />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <div className="w-1/2 flex justify-around">
          {pageNumbers.map((pageNum, index) => (
            <button
              key={index}
              className={cx(
                'flex items-center justify-center w-12 h-12 border-2 rounded-full',
                { 'bg-sky-500 text-white': currentPage === pageNum }
              )}
              onClick={() => {
                setCurrentPage(pageNum)
              }}
            >
              {pageNum}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
