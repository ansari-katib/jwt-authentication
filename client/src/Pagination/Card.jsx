import React from 'react'

const Card = ({ data }) => {
  return (
  <div className='flex justify-center items-center min-h-full'>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
                {data.map((item) => (
                    <div
                        key={item.id}
                        className='flex flex-col border-2 gap-5 m-5 p-5 bg-blue-200 rounded-lg'
                    >
                        <h1 className='text-xl font-semibold'>Title: {item.title}</h1>

                        <div className='flex items-center justify-center h-[40vh] w-auto border-2 my-2 bg-gray-300 rounded overflow-hidden'>
                            <img
                                className='object-contain max-h-full'
                                src={item.image}
                                alt='image'
                            />
                        </div>

                        <p className='text-2xl'>
                            <strong>Description :</strong> {item.desc}
                        </p>

                        <span>
                            <strong>Product Rating  :</strong>
                            <span className='text-3xl flex items-center'>
                                {`${"⭐".repeat(Math.round(item.rating))} ${item.rating}`}
                            </span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default Card
