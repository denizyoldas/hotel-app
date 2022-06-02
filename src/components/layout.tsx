import React from 'react'

interface Props {
  children: React.ReactNode
}

export default function Layout(props: Props) {
  return <div className="container">{props.children}</div>
}
