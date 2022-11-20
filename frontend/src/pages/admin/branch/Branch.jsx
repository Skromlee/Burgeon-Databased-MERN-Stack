import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../../components/common/Spinner";

import {
    getBranchs,
    deleteBranch,
    updateBranch,
    reset,
} from "../../../features/branch/branchSlice";

// simple table
// import Table from "../../../components/common/TableCustomers";
import Table from "../../../components/admin/branch/Table";
import { useState } from "react";
import DeleteDialog from "../../../components/admin/branch/DeleteDialog";
import EditDialog from "../../../components/admin/branch/EditDialog";

const Branch = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { admin } = useSelector((state) => state.admin);
    const { branch, isError, isLoading, message } = useSelector(
        (state) => state.branch
    );

    const [id, setId] = useState("");
    const [branchData, setBranchData] = useState({});
    const [isEditing, setEditing] = useState(false);
    const [onDelete, setOnDelete] = useState(false);
    // use to show edit banner
    const [visibility, setVisibility] = useState(false);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (!admin) {
            navigate("/admin/signin");
        }

        dispatch(getBranchs());

        // Check for account
        return () => {
            dispatch(reset());
        };
    }, [admin, navigate, isError, message, dispatch]);

    const handleChangePage = () => {
        dispatch(reset());
        navigate("/admin/branch/create"); //<= chagne
    };
    const editingHandler = () => {
        setEditing((prev) => !prev);
    };

    // update details
    const findById = (id) => {
        let targetBranch = {};
        branch.map((eachBranch) => {
            if (eachBranch._id === id) {
                targetBranch = eachBranch;
            }
            return null;
        });
        return targetBranch;
    };

    const editHandler = (targetId) => {
        const targetBranch = findById(targetId);
        setBranchData(targetBranch);
        setEditing(true);
        setVisibility(true);
    };

    const detailHandler = (targetId) => {
        const targetBranch = findById(targetId);
        setBranchData(targetBranch);
        setVisibility(true);
    };

    const deleteHandler = (targetId) => {
        setId(targetId);
        setOnDelete(true);
    };

    const exitDeleteHandler = () => {
        setOnDelete(false);
        setId("");
    };

    const confirmDeleteHandler = () => {
        setOnDelete(false);
        dispatch(deleteBranch(id));
    };

    const exitHandler = () => {
        setVisibility(false);
        setEditing(false);
        setId("");
        setBranchData({});
    };

    // use to handle input field
    const onChange = (e) => {
        setBranchData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(updateBranch(branchData));
        setVisibility(false);
        //will use soon
    };

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            {onDelete ? (
                <DeleteDialog
                    exitHandler={exitDeleteHandler}
                    confirmHandler={confirmDeleteHandler}
                    id={id}
                />
            ) : null}

            {visibility ? (
                <EditDialog
                    isEditing={isEditing}
                    editingHandler={editingHandler}
                    exitHandler={exitHandler}
                    submitHandler={submitHandler}
                    branch={branchData}
                    onChange={onChange}
                />
            ) : null}

            <div className=" p-6 space-y-6 flex flex-col">
                <div className=" flex justify-between">
                    <h1 className=" text-3xl md:text-4xl">Branch Manager</h1>
                    <button
                        onClick={handleChangePage}
                        className={
                            visibility
                                ? `bg-slate-600 p-2 px-4 rounded-full text-white transition`
                                : `bg-brightRed p-2 px-4 rounded-full hover:bg-brightRedLight text-white transition`
                        }
                        disabled={visibility ? true : false}
                    >
                        Create New Branch
                    </button>
                </div>
                <div></div>
                {branch.length > 0 ? (
                    <div className=" table">
                        <div className=" container mx-auto ">
                            <Table
                                data={branch}
                                rowsPerPage={12}
                                onEditClick={editHandler}
                                onDetailClick={detailHandler}
                                onDeleteClick={deleteHandler}
                                visibility={visibility}
                            />
                        </div>
                    </div>
                ) : (
                    <h3>You have not create any Branch</h3>
                )}
            </div>
        </>
    );
};
export default Branch;
