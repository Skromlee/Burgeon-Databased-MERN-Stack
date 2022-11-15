import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../../../components/common/Spinner";
import {
    getCustomers,
    updateCustomer,
    deleteCustomer,
    reset,
} from "../../../../features/customer/customerSlice";

// simple table
import Table from "../../../../components/common/TableCustomers";
import { useState } from "react";
import DeleteDialog from "../../../../components/admin/users/employees/DeleteDialog";
import EditDialog from "../../../../components/admin/users/employees/EditDialog";

const Customers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { admin } = useSelector((state) => state.admin);
    const { customer, isError, isLoading, message } = useSelector(
        (state) => state.customer
    );

    const [id, setId] = useState("");
    const [cus, setCustomer] = useState({});
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

        dispatch(getCustomers());
        // Check for account
        return () => {
            dispatch(reset());
        };
    }, [admin, navigate, isError, message, dispatch]);

    const handleChangePage = () => {
        dispatch(reset());
        navigate("/admin/users/customers/create"); //<= chagne
    };
    console.log(customer);
    const editingHandler = () => {
        setEditing((prev) => !prev);
    };

    // update details
    const findById = (id) => {
        let targetEmp = {};
        customer.map((eachEmp) => {
            if (eachEmp._id === id) {
                targetEmp = eachEmp;
            }
            return null;
        });
        return targetEmp;
    };

    const editHandler = (targetId) => {
        const targetEmp = findById(targetId);
        setCustomer({
            ...targetEmp,
            dob: new Date(targetEmp.dob).toISOString().slice(0, 10),
        });
        setEditing(true);
        setVisibility(true);
    };

    const detailHandler = (targetId) => {
        const targetEmp = findById(targetId);
        setCustomer({
            ...targetEmp,
            dob: new Date(targetEmp.dob).toISOString().slice(0, 10),
        });
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
        dispatch(deleteCustomer(id));
    };

    const exitHandler = () => {
        setVisibility(false);
        setEditing(false);
        setId("");
        setCustomer({});
    };

    // use to handle input field
    const onChange = (e) => {
        setCustomer((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateCustomer(cus));
        setEditing(false);
    };

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            {onDelete && (
                <DeleteDialog
                    exitHandler={exitDeleteHandler}
                    confirmHandler={confirmDeleteHandler}
                    id={id}
                />
            )}

            {visibility && (
                <EditDialog
                    isEditing={isEditing}
                    editingHandler={editingHandler}
                    exitHandler={exitHandler}
                    submitHandler={submitHandler}
                    emp={cus}
                    onChange={onChange}
                />
            )}

            <div className=" p-6 space-y-6 flex flex-col">
                <div className=" flex justify-between">
                    <h1 className=" text-3xl md:text-4xl">Customers Manager</h1>
                    <button
                        onClick={handleChangePage}
                        className={
                            visibility
                                ? `bg-slate-600 p-2 px-4 rounded-full text-white transition`
                                : `bg-brightRed p-2 px-4 rounded-full hover:bg-brightRedLight text-white transition`
                        }
                        disabled={visibility ? true : false}
                    >
                        Create New Customers
                    </button>
                </div>
                <div></div>
                {customer.length > 0 ? (
                    <div className=" table">
                        <div className=" container mx-auto ">
                            <Table
                                data={customer}
                                rowsPerPage={20}
                                onEditClick={editHandler}
                                onDetailClick={detailHandler}
                                onDeleteClick={deleteHandler}
                                visibility={visibility}
                            />
                        </div>
                    </div>
                ) : (
                    <h3>You have not create any Customers</h3>
                )}
            </div>
        </>
    );
};
export default Customers;
