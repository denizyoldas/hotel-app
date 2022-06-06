import { nanoid } from 'nanoid'
import { ArrowLeft, CheckCircle } from 'phosphor-react'
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/modal'
import AppContext from '../store/app-context'

export default function AddOtel() {
  const [isDone, setIsDone] = useState(false)
  const [img, setImg] = useState('https://via.placeholder.com/200')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const imageInptRef = useRef<any>(null)

  const navigate = useNavigate()

  const appCtx = useContext(AppContext)

  const fileUploadHandle = (e: any) => {
    console.log(e)
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setImg(reader.result as any)
    }
  }

  const closeIsdoneModal = useCallback(() => {
    setIsDone(false)
    navigate(-1)
  }, [navigate])

  const modalSubmitHandle = () => {
    appCtx.addHotel({
      id: nanoid(),
      image: img,
      price: '$ 20',
      rating: 5,
      lastUpdated: new Date(),
      name,
      description
    })
    setIsDone(true)
  }

  return (
    <>
      <div className="mx-auto py-10 h-screen">
        <h1 className="text-2xl font-bold text-center">
          <ArrowLeft
            size={24}
            weight="bold"
            className="m-2 text-blue-400 hover:text-black hover:scale-110 cursor-pointer inline-block"
            onClick={() => {
              navigate(-1)
            }}
          />
          Add Hotel
        </h1>
        <div className="prose flex items-center justify-center text-black mx-auto pt-10">
          <div className="max-w-lg rounded overflow-hidden shadow-xl">
            <div className="px-6 py-4">
              <>
                image
                <img
                  src={img}
                  alt="example"
                  className="hover:opacity-60 cursor-pointer w-full h-full"
                  onClick={() => {
                    imageInptRef?.current?.click()
                  }}
                />
                <input
                  type="file"
                  name="image"
                  className="hidden"
                  ref={imageInptRef}
                  onChange={fileUploadHandle}
                />
              </>
              <div className="text-lg mb-2">Hotel Name</div>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Hotel Name"
                onChange={e => setName(e.target.value)}
              />
              <div className="text-lg my-2">Hotel Description</div>
              <input
                className="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Hotel Description"
                onChange={e => setDescription(e.target.value)}
              />
              <button
                onClick={modalSubmitHandle}
                type="button"
                className="bg-gradient-to-r from-purple-700 to-blue-500 text-white font-bold py-2 px-4 mt-3 rounded-md"
              >
                EKLE
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal isVisible={isDone} onClose={closeIsdoneModal}>
        <div className="p-6 text-center">
          <CheckCircle
            className="mx-auto mb-4 w-14 h-14 text-green-400 dark:text-gray-200"
            size={32}
            weight="bold"
          />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            <span className="font-bold">{name}</span>'i başarıyla eklendi.
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
