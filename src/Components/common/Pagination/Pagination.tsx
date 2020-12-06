import React, { useState } from 'react';
import s from "./Pagination.module.css";
import cn from 'classnames'

type PropsType = {
    totalItemsCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    portionSize?: number
}

const Pagination: React.FC<PropsType> = ({totalItemsCount, pageSize, onPageChanged, currentPage, portionSize = 10}) => {

        let pagesCount = Math.ceil(totalItemsCount / pageSize);
        let pages: Array<number> = [];
        for (let i = 1; i <=pagesCount; i++) {
            pages.push(i);
        }

        let portionCount = Math.ceil(pagesCount/portionSize);
        let [portionNumber, setPortionNumber] = useState(1);
        let leftPotionNumber = (portionNumber - 1) * portionSize + 1;
        let rightPortionNumber = portionNumber * portionSize;

        return ( 
                <div className={s.paginationBlock}>
                    {portionNumber > 1 && 
                    <button onClick={ () => {setPortionNumber(portionNumber - 1)}}>PREV</button>}

                        {pages
                        .filter(p => p >= leftPotionNumber && p <= rightPortionNumber)
                        .map((p) => {
                        return <span className={cn ({
                            [s.selectedPage] : currentPage === p}, s.pageNumber)} 
                            key ={p} 
                            onClick={() => {onPageChanged(p)}}>{p}</span>
                        })}

                    {portionCount > portionNumber && 
                    <button onClick={ () => {setPortionNumber(portionNumber + 1)}}>NEXT</button>}
                </div>
    )}
export default Pagination;