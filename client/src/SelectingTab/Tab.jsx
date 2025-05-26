import React, { useState } from 'react'
import './tab.css';

const Tab = () => {

    const [activeIndex, setActiveIndex] = useState(0);

    const TabData = [
        {
            title: 'Tab 1',
            content: 'this is the tab 1 content '
        },
        {
            title: 'Tab 2',
            content: 'this is the tab 2 content '
        },
        {
            title: 'Tab 3',
            content: 'this is the tab 3 content '
        },
        {
            title: 'Tab 4',
            content: 'this is the tab 4 content '
        }
    ]

    return (
        <div className='flex items-center flex-col justify-center gap-5 min-h-screen' >
            <div className='flex items-center justify-center' >
                {
                    TabData.map((item, index) => (
                        <div
                            className='flex items-center justify-center '
                            key={index}
                        >
                            <button
                                onClick={() => setActiveIndex(index)}
                                className={`
                                ${activeIndex === index
                                        ? ' rounded-lg bg-blue-500 text-white p-2 m-2'
                                        : ' rounded-lg disabled:opacity-50 bg-blue-300 text-white p-2 m-2'}
                              `}
                            >
                                {item.title}
                            </button>

                        </div>

                    ))
                }
            </div>
            <div 
            key={activeIndex}
            className='text-2xl p-4 m-2 bg-gray-200 opacity-0 animate-fade-in' >
                {TabData[activeIndex].content}
            </div>
        </div >
    )
}

export default Tab;
