import { ArrowLeft } from 'phosphor-react'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppContext from '../store/app-context'
import { Hotel } from '../types.model'

export default function Detail() {
  const [detail, setDetail] = useState<Hotel>()

  const { id } = useParams()
  const navigate = useNavigate()
  const appCtx = useContext(AppContext)

  useEffect(() => {
    if (!id) {
      return
    }
    const hotel = appCtx.getHotel(id)
    setDetail(hotel as any)
  }, [id])

  return (
    // <div className="prose h-screen flex items-center justify-center text-black mx-auto">
    //   <div className="bg-white border rounded-md drop-shadow-md w-2/3 h-2/3 grid grid-cols-1 mx-auto p-10">
    //     <img src={detail?.image} className />
    //     <h1 className="">{detail?.name}</h1>
    //     <div>{detail?.rating}</div>
    //     <div>{detail?.price}</div>
    //     <div>{detail?.description}</div>
    //   </div>
    // </div>
    <div className="prose h-screen flex items-center justify-center text-black mx-auto">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <ArrowLeft
          size={24}
          weight="bold"
          className="m-2 text-blue-400 hover:text-black hover:scale-110 cursor-pointer"
          onClick={() => {
            navigate(-1)
          }}
        />
        <img className="w-full" src={detail?.image} alt="Mountain" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{detail?.name}</div>
          <p className="text-gray-700 text-base">{detail?.description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-[#f8f9fe] text-[#5bc2c9] rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
            {detail?.rating} puan
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {detail?.price}
          </span>
        </div>
      </div>
    </div>
  )
}
