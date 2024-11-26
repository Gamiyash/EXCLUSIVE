import React from 'react'

const Skeliton_Loading = () => {
    return (
        <div className="main bg-gray-100 animate-pulse">
            {/* Header */}
            <div className="w-full h-16 bg-gray-300"></div>

            {/* Banner */}
            <div className='flex mt-2'>
                <div className="sidebar-skeleton pl-[8%] hidden xl:flex w-full animate-pulse max-w-[30vw] ">
                    <ul className="flex text-nowrap overflow-x-auto xl:overflow-x-hidden scrollbar-hidden bg-gray-100 shadow-md xl:flex-col xl:shadow-none font-medium xl:mt-3">
                        {/* Skeleton Items */}
                        {[...Array(9)].map((_, index) => (
                            <li
                                key={index}
                                className="xl:px-28 xl:py-3 flex items-center gap-3 bg-gray-300 rounded h-6 w-[10%] mb-2"
                            ></li>
                        ))}
                    </ul>
                </div>

                <div className="w-full h-56 bg-gray-300 mt-4 mx-3"></div>
            </div>

            {/* Categories */}
            <div className="mt-6 px-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-4 h-7 bg-gray-400"></div>
                    <div className="w-24 h-6 bg-gray-400"></div>
                </div>
                <div className="flex gap-4 overflow-x-auto ">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="w-32 h-32 bg-gray-300 rounded"></div>
                    ))}
                </div>
            </div>

            {/* Featured Products */}
            <div className="mt-6 px-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="w-40 h-6 bg-gray-400"></div>
                    <div className="w-16 h-6 bg-gray-400"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <div className="w-full h-40 bg-gray-300 rounded"></div>
                            <div className="w-3/4 h-4 bg-gray-300"></div>
                            <div className="w-1/2 h-4 bg-gray-300"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Flash Sales Section */}
            <div className="mt-8 px-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="w-32 h-6 bg-gray-400"></div>
                    <div className="flex gap-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    </div>
                </div>
                <div className="flex gap-4 overflow-x-auto">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="w-40 h-40 bg-gray-300 rounded"></div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-12 bg-gray-300 h-32"></div>
        </div>


    )
}

export default Skeliton_Loading