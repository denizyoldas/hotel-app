import React from 'react'
import cx from 'classnames'
import { X } from 'phosphor-react'

interface Props {
  className?: string
  children: React.ReactNode
  isVisible?: boolean
  onClick?: (event: any) => void
  onClose?: (event: any) => void
}

const Modal: React.FC<Props> = ({ children, isVisible, onClose }) => {
  return (
    <>
      <div
        className={cx(
          'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10',
          isVisible ? 'block' : 'hidden'
        )}
      ></div>
      <div
        tabIndex={-1}
        aria-hidden="true"
        className={cx(
          'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal h-screen flex items-center justify-center',
          isVisible ? 'block' : 'hidden'
        )}
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="p-6 space-y-6">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="popup-modal"
                onClick={onClose}
              >
                <X size={28} />
              </button>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
