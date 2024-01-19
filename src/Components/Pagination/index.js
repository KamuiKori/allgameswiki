import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./styles.module.css"
const Pagination = ({currentPage,onChangePage}) => {

    return (
        <>
            <ReactPaginate
                className={styles.pagination}
                breakLabel="..."
                nextLabel=">"
                onPageChange={(event) => onChangePage(event.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                previousLabel="<"
                forcePage={currentPage - 1}
                renderOnZeroPageCount={null}
            />
        </>
    )
}

export default Pagination