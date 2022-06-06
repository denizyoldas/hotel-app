import CardList from '../components/card-list'
import { Plus } from 'phosphor-react'
import { useContext } from 'react'
import AppContext from '../store/app-context'
import { useNavigate } from 'react-router-dom'

function Main() {
  const appCtx = useContext(AppContext)
  const navigate = useNavigate()

  const orderByHandle = (event: any) => {
    appCtx.orderByHotel(event.target.value)
  }

  return (
    <div className="py-10 h-screen overflow-y-auto">
      {/* <Header /> */}
      <div className="flex flex-col items-center justify-center pt-10">
        <button
          // onClick={() => setIsVisible(true)}
          onClick={() => navigate('/hotel/add')}
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
          <option value="name">Seçiniz</option>
          <option value="desc">Puan (Artan)</option>
          <option value="asc">Puan (Azalan)</option>
        </select>
      </div>
      <div className="grid content-center">
        <CardList />
      </div>
    </div>
  )
}

export default Main
