import React from 'react';

const Categories = ({ category }) => {

    return (
        //w-[200px] h-[150px]
        <div className="card cursor-pointer w-[16vw] h-[20vh] hover:text-white bg-white border rounded-md border-gray-300 relative flex justify-center items-center hover:bg-[#DB4444]">
            <div className="img absolute flex flex-col justify-center items-center gap-1">
                <div className="img">
                    {category.pic}</div>
                {/* <GiSmartphone size={90} /> */}
                <div className="title">{category.title}</div>
            </div>
        </div>

    );
};


export default Categories;
