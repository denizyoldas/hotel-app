import React, { useCallback, useContext, useState } from 'react'
import Button from './button'
import cx from 'classnames'
import Modal from './modal'
import AppContext from '../store/app-context'
import { CheckCircle, WarningCircle } from 'phosphor-react'

interface Props {
  id: string
  name: string
  image: string
  price: number | string
  rating: number | string
}

export default function CardItem({ id, image, name, price, rating }: Props) {
  const [isHover, setIsHover] = useState(false)
  const [deleteModalShown, setDeleteModalShown] = useState<boolean>(false)
  const [isDone, setIsDone] = useState<boolean>(false)
  const appCtx = useContext(AppContext)

  const handleDelete = useCallback(() => {
    appCtx.deleteHotel(id)
    setDeleteModalShown(false)
    setIsDone(true)
  }, [appCtx, id])

  const closeDeleteModal = useCallback(() => setDeleteModalShown(false), [])
  const closeIsdoneModal = useCallback(() => setIsDone(false), [])

  const upRating = () => {
    appCtx.upRating(id)
  }

  const downRating = () => {
    appCtx.downRating(id)
  }

  return (
    <>
      <div
        className="group relative p-4 w-1/2 lg:max-w-full lg:flex border bg-white rounded-md hover:bg-[#f8f9fe] drop-shadow-md"
        // hover:scale-105 transition ease-in-out duration-300
        onMouseLeave={() => setIsHover(false)}
        onMouseEnter={() => setIsHover(true)}
      >
        {isHover && (
          <button
            onClick={() => setDeleteModalShown(true)}
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
          className="h-44 lg:h-auto lg:w-44 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: 'url(' + image + ')' }}
          title="Mountain"
        ></div>
        <div className=" bg-white p-4 flex flex-col justify-between leading-normal group-hover:bg-[#f8f9fe]">
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-xl mb-2">{name}</div>
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
