import React, { useState } from 'react'
import CardData from './CardData.json';
import Card from './Card';

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
        <>
            <div className='flex flex-col gap-5 mb-4'>
                <Card data={currentCards} />

                <div className='flex gap-5 justify-center items-center' >
                    <button
                        className='border-none rounded-lg bg-blue-500 text-2xl p-3 disabled:opacity-50 '
                        onClick={gotToPrevPage}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>

                    <span>
                        page {currentPage} of {totalPages}
                    </span>

                    <button
                        className='border-none rounded-lg bg-blue-500 text-2xl p-3 disabled:opacity-50 '
                        onClick={gotToNextPage}
                        disabled={currentPage === totalPages}
                    >
                        next
                    </button>
                </div>

            </div>
        </>
    );
};

export default Pagination;