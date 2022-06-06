import React, { useCallback, useContext, useEffect, useState } from 'react'
import cx from 'classnames'
import AppContext from '../store/app-context'
import { Hotel } from '../types.model'
import CardItem from './card-item'
import Modal from './modal'
import { WarningCircle, CheckCircle } from 'phosphor-react'

const PERR_PAGE = 5

export default function CardList() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [deleteModalShown, setDeleteModalShown] = useState<boolean>(false)
  const [isDone, setIsDone] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [name, setName] = useState<string>('')
  const appCtx = useContext(AppContext)

  const indexOfLastHotel = currentPage * PERR_PAGE
  const indexOfFirstHotel = indexOfLastHotel - PERR_PAGE
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel)
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(hotels.length / PERR_PAGE); i++) {
    pageNumbers.push(i)
  }

  useEffect(() => setHotels(appCtx.hotels), [appCtx.hotels])

  const handleDelete = useCallback(() => {
    appCtx.deleteHotel(id)
    setDeleteModalShown(false)
    setIsDone(true)
  }, [appCtx, id])

  const cardDeleteHandle = (id: string, name: string) => {
    setId(id)
    setName(name)
    setDeleteModalShown(true)
  }

  const closeDeleteModal = useCallback(() => setDeleteModalShown(false), [])
  const closeIsdoneModal = useCallback(() => setIsDone(false), [])

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
            onDelete={cardDeleteHandle}
          />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <div className="flex">
          {pageNumbers.map((pageNum, index) => (
            <button
              key={index}
              className={cx(
                'flex items-center justify-center w-12 h-12 border-2 rounded-full mx-2',
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

      <Modal isVisible={deleteModalShown} onClose={closeDeleteModal}>
        <div className="p-6 text-center">
          <WarningCircle
            className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
            size={32}
            weight="bold"
          />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            <span className="font-bold">{name}</span>'i silmek istediğinize emin
            misiniz?
          </h3>
          <button
            data-modal-toggle="popup-modal"
            type="button"
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            onClick={handleDelete}
          >
            Oteli sil
          </button>
          <button
            onClick={closeDeleteModal}
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Vazgeç
          </button>
        </div>
      </Modal>

      <Modal isVisible={isDone} onClose={closeIsdoneModal}>
        <div className="p-6 text-center">
          <CheckCircle
            className="mx-auto mb-4 w-14 h-14 text-green-400 dark:text-gray-200"
            size={32}
            weight="bold"
          />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            <span className="font-bold">{name}</span>'i başarıyla silindi.
          </h3>
          <button
            onClick={closeIsdoneModal}
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Tamam
          </button>
        </div>
      </Modal>
    </>
  )
}
