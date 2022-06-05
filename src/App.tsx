import CardList from './components/card-list'
// import Header from './components/header'
import { Check, Plus } from 'phosphor-react'
import { useCallback, useContext, useState } from 'react'
import Modal from './components/modal'
import AppContext from './store/app-context'
import { nanoid } from 'nanoid'

function App() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [addIsDone, setAddIsDone] = useState<boolean>(false)
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
    // setIsVisible(false)
    setAddIsDone(true)
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
        <div className="p-6 pt-10 text-center">
          <div className="mb-8">
            <label htmlFor="hotelName" className="block">
              Otel Adı
            </label>
            <input
              className="mt-2 p-2 rounded-md border border-gray-300"
              type="text"
              value={hotelName}
              onChange={e => setHotelName(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  modalSubmitHandle()
                }
              }}
            />
          </div>
          {addIsDone ? (
            <button
              onClick={modalSubmitHandle}
              type="button"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded-md"
            >
              <Check size={28} weight="bold" />
              EKLENDI
            </button>
          ) : (
            <button
              onClick={modalSubmitHandle}
              type="button"
              className="bg-gradient-to-r from-purple-700 to-blue-500 text-white font-bold py-2 px-4 rounded-md"
            >
              EKLE
            </button>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default App
