import React from 'react'

const page = async ({params}: {params: {id:string}}) => {
  return (
    <div>{params.id}</div>
  )
}

export default page