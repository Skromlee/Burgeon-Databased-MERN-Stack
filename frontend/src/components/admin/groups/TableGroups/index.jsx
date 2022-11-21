import React, { useState } from "react";

import useTable from "../../../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({
    data,
    rowsPerPage,
    onEditClick,
    onDetailClick,
    onDeleteClick,
    visibility,
    EditVisibility,
}) => {
    console.log(data);
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    const editHandlerOnClick = (id) => {
        onEditClick(id);
    };

    const detailHandlerOnClick = (id) => {
        onDetailClick(id);
    };

    const deleteHandlerOnClick = (id) => {
        onDeleteClick(id);
    };

    return (
        <>
            <table className={styles.table}>
                <thead className={styles.tableRowHeader}>
                    <tr>
                        <th className={styles.tableHeader}>Group ID</th>
                        <th className={styles.tableHeader}>Total parcels</th>
                        <th className={styles.tableHeader}>Total weights</th>
                        <th className={styles.tableHeader}>Type of Shipment</th>
                        <th className={styles.tableHeader}>Create Date</th>
                        <th className={styles.tableHeader}>Stay At</th>
                        <th className={styles.tableHeader}>Target</th>
                        <th className={`${styles.tableHeader} text-center `}>
                            Function
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((el) => (
                        <tr className={styles.tableRowItems} key={el._id}>
                            <td className={styles.tableCell}>{el._id}</td>
                            <td className={styles.tableCell}>
                                <p className="text-center">{el.totalParcels}</p>
                            </td>
                            <td className={styles.tableCell}>{el.to}</td>
                            <td className={styles.tableCell}>
                                {el.typeofshipment}
                            </td>
                            {new Date(el.createdAt).toISOString().split("T")[0]}
                            <td className={styles.tableCell}>{el.weight}</td>
                            <td className={styles.tableCell}>{el.boxsize}</td>
                            <td className={styles.tableCell}>
                                <div className="flex flex-col lg:flex-row lg:space-y-0 lg:space-x-4 justify-center items-center space-y-4">
                                    <div>
                                        <button
                                            className={
                                                visibility || EditVisibility
                                                    ? `text-slate-600 pointer-events-none transition`
                                                    : `text-green-600 hover:text-slate-300 transition`
                                            }
                                            onClick={() =>
                                                editHandlerOnClick(el._id)
                                            }
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            className={
                                                visibility || EditVisibility
                                                    ? `text-slate-600 pointer-events-none transition`
                                                    : `text-blue-600 hover:text-slate-300 transition`
                                            }
                                            onClick={() =>
                                                detailHandlerOnClick(el._id)
                                            }
                                        >
                                            Detail
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            className={
                                                visibility || EditVisibility
                                                    ? `text-slate-600 pointer-events-none transition`
                                                    : `text-red-600 hover:text-slate-300 transition`
                                            }
                                            onClick={() =>
                                                deleteHandlerOnClick(el._id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TableFooter
                range={range}
                slice={slice}
                setPage={setPage}
                page={page}
            />
        </>
    );
};

export default Table;
