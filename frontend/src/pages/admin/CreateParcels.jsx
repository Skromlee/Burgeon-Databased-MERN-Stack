import { useState } from "react";
import { RiAddBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Spinner from "../../components/common/Spinner";
import Table from "../../components/admin/parcels/TableParcel";
import CreateDialog from "./parcels/CreateDialog";
import { toast } from "react-toastify";

import {
    parcelRegister,
    reset,
    getParcels,
    getParcelById,
} from "../../features/parcel/parcelSlice";

const Parcels = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { admin } = useSelector((state) => state.admin);
    const { parcels, isLoading, isError, message } = useSelector(
        (state) => state.parcels
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (!admin) {
            navigate("/admin/signin");
        }

        dispatch(getParcels());

        return () => {
            dispatch(reset());
        };
    }, [admin, navigate, isError, message, dispatch]);

    const initialFormDetails = {
        firstname: "",
        lastname: "",
        phone: "",
        citizen: "",
        addressNo: "",
        province: "",
        district: "",
        subdistrict: "",
        postcode: "",
    };

    const initialParcelFormDetails = {
        weight: "",
        typeofshipment: "Normal",
        typeofstuff: "Normal",
        boxsize: "A4",
    };

    const [receiverFormDetails, setReceiverFormDetails] =
        useState(initialFormDetails);
    const [senderFormDetails, setSenderFormDetails] =
        useState(initialFormDetails);
    const [parcelFormDetails, setParcelFormDetails] = useState(
        initialParcelFormDetails
    );

    const [visibility, setVisibility] = useState(false);

    const onSenderChange = (e) => {
        setSenderFormDetails({
            ...senderFormDetails,
            [e.target.name]: e.target.value,
        });
    };
    const onReceiverChange = (e) => {
        setReceiverFormDetails({
            ...receiverFormDetails,
            [e.target.name]: e.target.value,
        });
    };
    const onParcelChange = (e) => {
        setParcelFormDetails({
            ...parcelFormDetails,
            [e.target.name]: e.target.value,
        });
    };

    const onExitHandler = (e) => {
        setVisibility(false);
    };

    const onSubmit = (e) => {
        const parcelData = {
            sender: senderFormDetails,
            receiver: receiverFormDetails,
            parcel: parcelFormDetails,
        };
        dispatch(parcelRegister(parcelData));
        setVisibility(false);
        setSenderFormDetails(initialFormDetails);
        setReceiverFormDetails(initialFormDetails);
        setParcelFormDetails(initialParcelFormDetails);
    };

    const onEditHandler = () => {};

    const onDetailHandler = (id) => {
        console.log(id);
        dispatch();
    };

    const onDeleteHandler = (id) => {
        console.log(id);
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div className=" p-6 space-y-6 flex flex-col">
                <div className=" flex justify-between">
                    <h1 className=" text-3xl md:text-4xl">Parcels Manager</h1>
                    <button
                        // onClick={handleChangePage}
                        className={
                            visibility
                                ? `bg-slate-600 p-2 px-4 rounded-full text-white transition`
                                : `bg-brightRed p-2 px-4 rounded-full hover:bg-brightRedLight text-white transition`
                        }
                        disabled={visibility ? true : false}
                    >
                        Create New Parcels
                    </button>
                </div>
                {parcels.length > 0 ? (
                    <div className=" table">
                        <div className=" container mx-auto ">
                            <Table
                                data={parcels}
                                rowsPerPage={15}
                                onEditClick={onEditHandler}
                                onDetailClick={onDetailHandler}
                                onDeleteClick={onDeleteHandler}
                                visibility={false}
                            />
                        </div>
                    </div>
                ) : (
                    <h3>You have not create any Parcels</h3>
                )}
            </div>

            {visibility && (
                <CreateDialog
                    onExitHandler={onExitHandler}
                    senderFormDetails={senderFormDetails}
                    onSubmit={onSubmit}
                    onSenderChange={onSenderChange}
                    receiverFormDetails={receiverFormDetails}
                    onReceiverChange={onReceiverChange}
                    parcelFormDetails={parcelFormDetails}
                    onParcelChange={onParcelChange}
                />
            )}
            <button
                className="bg-brightRed text-white p-4 rounded-full absolute right-0 bottom-0 mb-6 mr-6"
                onClick={() => setVisibility((prev) => !prev)}
            >
                <RiAddBoxFill size={26} />
            </button>
        </>
    );
};
export default Parcels;
