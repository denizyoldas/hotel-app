import CardList from './components/card-list'
// import Header from './components/header'
import { Plus } from 'phosphor-react'
import { useCallback, useContext, useState } from 'react'
import Modal from './components/modal'
import AppContext from './store/app-context'
import { nanoid } from 'nanoid'

function App() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [hotelName, setHotelName] = useState<string>('')
  const closeHanlde = useCallback(() => setIsVisible(false), [])
  const appCtx = useContext(AppContext)

  const modalSubmitHandle = () => {
    appCtx.addHotel({
      id: nanoid(),
      name: hotelName,
      image: 'https://picsum.photos/200',
      price: '',
      rating: 5
    })
    setIsVisible(false)
    setHotelName('')
  }

  const orderByHandle = (event: any) => {
    appCtx.orderByHotel(event.target.value)
  }

  return (
    <div className="py-10">
      {/* <Header /> */}
      <div className="flex flex-col items-center justify-center pt-10">
        <button
          onClick={() => setIsVisible(true)}
          className="inline-flex text-xl font-bold items-center hover:text-gray-600"
        >
          <Plus
            className="border border-sky-300 p-2 rounded-sm box-content mr-4"
            color="#0ea5e9"
          />
          Otel Ekle
        </button>

        <select
          className="mt-5 drop-shadow-md rounded-md"
          name="orderBy"
          onChange={orderByHandle}
        >
          <option value="desc">Puan (Artan)</option>
          <option value="asc">Puan (Azalan)</option>
        </select>
      </div>
      <div className="grid content-center">
        <CardList />
      </div>

      <Modal isVisible={isVisible} onClose={closeHanlde}>
        <div className="p-6 text-center">
          <div className="grid grid-cols-1 gap-5 py-8 max-w-sm place-items-center">
            <input type="text" onChange={t => setHotelName(t.target.value)} />
          </div>
          <button
            onClick={modalSubmitHandle}
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Ekle
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default App
