import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./styles.module.css"
import {Link} from "react-router-dom";

const Pagination = ({postPerPage, totalPosts,paginate}) => {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalPosts/postPerPage);i++){
        pageNumbers.push(i)
    }

    return (
            <ul className={styles.pagination}>
                {
                    pageNumbers.map((number)=>{
                        return(
                            <li className={styles.page_number} key={number}>
                                <button className={styles.page_link} onClick={()=>paginate(number)}>{number}</button>
                            </li>
                        )
                    })
                }
            </ul>
    )
}

export default Pagination