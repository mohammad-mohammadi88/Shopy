import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import type { Dispatch, FC, SetStateAction } from "react";

interface Props{
    totalPages:number;
    page:number;
    setPage: Dispatch<SetStateAction<number>>
}
const UsersPagination:FC<Props> = ({totalPages=0,setPage,page}) => {
    if(totalPages < 1) return
    let arr:number[] = []
    for(let i = 1;i<=totalPages;i++){
        arr.push(i)
    }
    return (
        <div className='p-4 mt-2 text-center border-t border-gray-200'>
            <nav
                className='isolate inline-flex -space-x-px rounded-md shadow-sm'
                aria-label='Pagination'
            >
                
                <button
                    type='button'
                    onClick={()=>setPage(Math.max(totalPages - 1, 1))}
                    className='relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20'
                >
                    <ChevronLeftIcon
                        className='h-5 w-5'
                        aria-hidden='true'
                    />
                </button>

                {arr.length > 0 && arr.map((item:number)=>(
                    <button
                        key={item}
                        type="button"
                        onClick={()=>setPage(item)}
                        className={`relative  inline-flex items-center border px-4 py-2 text-sm font-medium duration-150 ${item === page ? "z-50 border-indigo-500 bg-indigo-50 text-indigo-600 hover:bg-indigo-100" : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"}`}
                    >
                        {item}
                    </button>
                ))}

                <button
                    type='button'
                    onClick={()=>setPage(Math.min(totalPages + 1, totalPages))}
                    className='relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20'
                >
                    <ChevronRightIcon
                        className='h-5 w-5'
                        aria-hidden='true'
                    />
                </button>
            </nav>
        </div>
    )
}

export default UsersPagination