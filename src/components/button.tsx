import React from 'react'
import cx from 'classnames'

interface Props {
  onClick?: (event: any) => void
  className?: string
  children: React.ReactNode
}

export default function Button(props: Props) {
  return (
    <button
      className={cx(
        'border rounded-md border-sky-500 text-sky-500 font-medium text-xs px-2 py-2 hover:bg-sky-500 hover:text-white',
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
