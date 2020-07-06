import React, { useState } from 'react';
import s from './Pagination.modules.css'


const Pagination = ({totalItemsCount, pageSize, onPageChanged, currentPage, portionSize = 10}) => {

        let pagesCount = Math.ceil(totalItemsCount / pageSize);
        let pages = [];
        for (let i = 1; i <=pagesCount; i++) {
            pages.push(i);
        }

        let portionCount = Math.ceil(pagesCount/portionSize);
        let [portionNumber, setPortionNumber] = useState(1);
        let leftPotionNumber = (portionNumber - 1) * portionSize + 1;
        let rightPortionNumber = portionNumber * portionSize;

        return ( 

            <div className={s.paginationBlock}>
                <div className={s.pagination}>
                {portionNumber > 1 && 
                <button onClick={ () => {setPortionNumber(portionNumber - 1)}}>PREV</button>}

                    {pages
                    .filter(p => p >= leftPotionNumber && p <= rightPortionNumber)
                    .map((p) => {
                    return   <span className={currentPage === p && s.selectedPage} 
                        key ={p} 
                        onClick={() => {onPageChanged(p)}}>{p}</span>
                    })}

                {portionCount > portionNumber && 
                <button onClick={ () => {setPortionNumber(portionNumber + 1)}}>NEXT</button>}
            </div>
            </div>
    )}
export default Pagination;