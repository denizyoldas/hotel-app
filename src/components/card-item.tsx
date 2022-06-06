import React, { useCallback, useContext, useEffect, useState } from 'react'
import Button from './button'
import cx from 'classnames'
import Modal from './modal'
import AppContext from '../store/app-context'
import { CheckCircle, WarningCircle } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'

interface Props {
  id: string
  name: string
  image: string
  rating: number | string
  onDelete?: (id: string, name: string) => void
}

export default function CardItem({ id, image, name, rating, onDelete }: Props) {
  const [isHover, setIsHover] = useState(false)

  let navigate = useNavigate()
  const appCtx = useContext(AppContext)

  const upRating = () => {
    appCtx.upRating(id)
  }

  const downRating = () => {
    appCtx.downRating(id)
  }

  const deleteHandle = useCallback(() => {
    onDelete && onDelete(id, name)
  }, [id, name, onDelete])

  return (
    <div
      className="group relative p-4 w-full sm:w-1/2 md:w-1/2 lg:max-w-full lg:flex border bg-white rounded-md hover:bg-[#f8f9fe] drop-shadow-md"
      onMouseLeave={() => setIsHover(false)}
      onMouseEnter={() => setIsHover(true)}
    >
      {isHover && (
        <button
          onClick={deleteHandle}
          // onClick={handleDelete}
          className={cx(
            'absolute -top-3 -right-3 rounded-full bg-red-500 text-white w-8 h-8 flex items-center justify-center font-bold',
            { absolute: isHover }
          )}
        >
          X
        </button>
      )}
      <div
        onClick={() => navigate(`/hotel/${id}`)}
        className="h-44 lg:h-auto lg:w-44 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden cursor-pointer hover:opacity-60"
        style={{ backgroundImage: 'url(' + image + ')' }}
        title="Mountain"
      ></div>
      <div className=" bg-white p-4 flex flex-col justify-between leading-normal group-hover:bg-[#f8f9fe]">
        <div className="mb-8">
          <div
            className="text-gray-900 font-bold text-xl mb-2 break-all cursor-pointer hover:text-blue-500"
            onClick={() => navigate(`/hotel/${id}`)}
          >
            {name}
          </div>
          <span className="bg-[#f8f9fe] text-[#5bc2c9] w-28 p-1 mt-1 mb-4 font-medium text-sm">
            {rating} Puan
          </span>
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <Button className="mr-2" onClick={upRating}>
              PUAN ARTTIR
            </Button>
            <Button onClick={downRating}>PUAN AZALT</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
