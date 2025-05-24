import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CardData from '../components/CardData.json';

const Pagination = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 6;

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = CardData.slice(indexOfFirstCard, indexOfLastCard);

    const totalPages = Math.ceil(CardData.length / cardsPerPage);

    const gotToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    }

    const gotToPrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    }



    return (
        <div className='flex flex-col gap-5'>
            <CardComponent data={currentCards} />

            <div className='flex gap-5 justify-center items-center' >
                <button
                    className='border-none bg-blue-400 text-2xl p-3 disabled:opacity-50 '
                    onClick={gotToPrevPage}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>

                <span>
                  page { currentPage} of {totalPages}
                </span>

                <button
                    className='border-none bg-blue-400 text-2xl p-3 disabled:opacity-50 '
                    onClick={gotToNextPage}
                    disabled={currentPage === totalPages}
                >
                    next
                </button>
            </div>

        </div>
    );
};

export default Pagination;




// card component :
export const CardComponent = ({ data }) => {
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
    );
};
