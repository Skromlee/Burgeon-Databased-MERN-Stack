import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Spinner from "../../../components/common/Spinner";
import Table from "../../../components/admin/parcels/TableParcel";
import EditDialog from "./EditDialog";
import { toast } from "react-toastify";

import {
    parcelRegister,
    reset,
    getParcels,
    parcelUpdate,
    deleteParcel,
} from "../../../features/parcel/parcelSlice";
import DeleteDialog from "../../../components/admin/users/employees/DeleteDialog";
import CreateDialog from "./CreateDialog";
import {
    SenderGetInformationFromPostcode,
    ReceiverGetInformationFromPostcode,
    reset as informationReset,
} from "../../../features/thailand/thailandSlice";
import StatusDialog from "./StatusDialog";
import { set } from "mongoose";
const Parcels = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { admin } = useSelector((state) => state.admin);
    const {
        parcels,
        isLoading,
        parcelStatuscheck,
        isError,
        message,
        parcelStatus,
    } = useSelector((state) => state.parcels);

    const { senderInformation, receiverInformation } = useSelector(
        (state) => state.thailand
    );

    const [senderSuggestion, setsenderSuggestion] = useState(false);
    const [receiverSuggestion, setreceiverSuggestion] = useState(false);
    const [testParcel] = useState([]);

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (parcelStatuscheck) {
            // prepareFormForDetail()
            console.log(status);
            console.log(parcelStatuscheck);
            setStatus(parcelStatus.status);
            console.log(status);
            // }
        }

        if (!admin) {
            navigate("/admin/signin");
        }

        dispatch(getParcels());

        return () => {
            dispatch(reset());
        };
    }, [admin, navigate, isError, message, dispatch, parcelStatuscheck]);

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
    const [isEditing, setIsEditing] = useState(false);
    const [EditVisibility, setEditVisibility] = useState(false);
    const [onDelete, setOnDelete] = useState(false);
    const [targetId, setTargetId] = useState("");

    const onSenderChange = (e) => {
        if (e.target.name === "postcode") {
            if (e.target.value > 100) {
                setsenderSuggestion(true);
                dispatch(SenderGetInformationFromPostcode(e.target.value));
            } else {
                setsenderSuggestion(false);
            }
        }
        setSenderFormDetails({
            ...senderFormDetails,
            [e.target.name]: e.target.value,
        });
    };
    const onReceiverChange = (e) => {
        if (e.target.name === "postcode") {
            if (e.target.value > 100) {
                setreceiverSuggestion(true);
                dispatch(ReceiverGetInformationFromPostcode(e.target.value));
            } else {
                setreceiverSuggestion(false);
            }
        }
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
        setParcelFormDetails(initialParcelFormDetails);
        setSenderFormDetails(initialFormDetails);
        setReceiverFormDetails(initialFormDetails);
        setVisibility(false);
        dispatch(informationReset());
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const parcelData = {
            sender: {
                firstname: senderFormDetails.firstname,
                lastname: senderFormDetails.lastname,
                phone: senderFormDetails.phone,
                citizen: senderFormDetails.citizen,
                addressNo: senderFormDetails.addressNo,
                province: senderFormDetails.province,
                district: senderFormDetails.district,
                subdistrict: senderFormDetails.subdistrict,
                postcode: senderFormDetails.postcode,
            },

            receiver: {
                firstname: receiverFormDetails.firstname,
                lastname: receiverFormDetails.lastname,
                phone: receiverFormDetails.phone,
                citizen: receiverFormDetails.citizen,
                addressNo: receiverFormDetails.addressNo,
                province: receiverFormDetails.province,
                district: receiverFormDetails.district,
                subdistrict: receiverFormDetails.subdistrict,
                postcode: receiverFormDetails.postcode,
            },
            parcel: {
                weight: parcelFormDetails.weight,
                typeofshipment: parcelFormDetails.typeofshipment,
                typeofstuff: parcelFormDetails.typeofstuff,
                boxsize: parcelFormDetails.boxsize,
            },
        };
        dispatch(parcelRegister(parcelData));
        setVisibility(false);
        setSenderFormDetails(initialFormDetails);
        setReceiverFormDetails(initialFormDetails);
        setParcelFormDetails(initialParcelFormDetails);
        dispatch(informationReset());
    };

    const onUpdateSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        const updatedParcelData = {
            sender: senderFormDetails,
            receiver: receiverFormDetails,
            parcel: parcelFormDetails,
        };
        dispatch(parcelUpdate(updatedParcelData));
    };

    const onEditHandler = (id) => {
        prepareFormForDetail(id);
        setEditVisibility(true);
        setIsEditing(true);
    };

    const editingHandler = () => {
        setIsEditing((prev) => !prev);
    };

    const onDetailHandler = (id) => {
        prepareFormForDetail(id);
        setEditVisibility(true);
        setIsEditing(false);
    };

    const prepareFormForDetail = (id) => {
        const targetParcel = findParcelById(id);
        const {
            sender,
            receiver,
            boxsize,
            typeofshipment,
            weight,
            typeofstuff,
            _id,
        } = targetParcel[0];
        setParcelFormDetails({
            boxsize,
            typeofshipment,
            weight,
            typeofstuff,
            _id,
        });
        setSenderFormDetails({
            ...sender,
        });
        setReceiverFormDetails({
            ...receiver,
        });
    };

    const onEditCloseHandler = () => {
        setEditVisibility(false);
    };

    const onDeleteHandler = (id) => {
        setTargetId(id);
        setOnDelete(true);
    };

    const exitDeleteHandler = () => {
        setOnDelete(false);
        setTargetId("");
    };

    const confirmDeleteHandler = () => {
        dispatch(deleteParcel(targetId));
        setTargetId("");
        setOnDelete(false);
        forceUpdate();
    };

    const findParcelById = (targetId) => {
        const targetParcel = parcels.filter((Each) => {
            return Each._id === targetId;
        });
        return targetParcel;
    };

    const onReceiverBlurHandler = () => {
        setreceiverSuggestion(false);
    };

    const onReceiverFocusHandler = () => {
        setreceiverSuggestion(true);
    };

    const onSenderBlurHandler = () => {
        setsenderSuggestion(false);
    };

    const onSenderFocusHandler = () => {
        setsenderSuggestion(true);
    };

    const onSenderSuggestHandler = (informationData) => {
        const { province, district, subdistrict, postcode } = informationData;
        setSenderFormDetails({
            ...senderFormDetails,
            province,
            district,
            subdistrict,
            postcode,
        });
        setsenderSuggestion(false);
    };
    const onReceiverSuggestHandler = (informationData) => {
        const { province, district, subdistrict, postcode } = informationData;

        setReceiverFormDetails({
            ...receiverFormDetails,
            province,
            district,
            subdistrict,
            postcode,
        });
        setreceiverSuggestion(false);
    };

    const [statusVisibility, setStatusVisibility] = useState(false);
    const [status, setStatus] = useState({});
    const onStatusClickhandler = (id) => {
        const targetParcel = findParcelById(id);
        setStatus(targetParcel[0].status);
        setParcelFormDetails(targetParcel[0]);

        setStatusVisibility((prev) => !prev);
    };

    const onStatusExitHandler = () => {
        setStatusVisibility(false);
    };
    const onStatusSubmitHandler = () => {};

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            {onDelete && (
                <DeleteDialog
                    exitHandler={exitDeleteHandler}
                    confirmHandler={confirmDeleteHandler}
                    id={targetId}
                />
            )}

            {statusVisibility && (
                <StatusDialog
                    onExitHandler={onStatusExitHandler}
                    onSubmit={onStatusSubmitHandler}
                    parcelFormDetails={parcelFormDetails}
                    isEditing={isEditing}
                    editingHandler={editingHandler}
                    status={status}
                />
            )}

            <div className=" p-6 space-y-6 flex flex-col">
                <div className=" flex justify-between">
                    <h1 className=" text-3xl md:text-4xl">Parcels Manager</h1>
                    <button
                        onClick={() => {
                            setVisibility((prev) => !prev);
                            setSenderFormDetails(initialParcelFormDetails);
                            setReceiverFormDetails(initialParcelFormDetails);
                            setParcelFormDetails(initialParcelFormDetails);
                            dispatch(informationReset());
                        }}
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
                                test={testParcel}
                                rowsPerPage={15}
                                onEditClick={onEditHandler}
                                onDetailClick={onDetailHandler}
                                onDeleteClick={onDeleteHandler}
                                visibility={visibility}
                                EditVisibility={EditVisibility}
                                onStatusClickhandler={onStatusClickhandler}
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
                    // informationFromPostcode={informationFromPostcode}
                    senderInformation={senderInformation}
                    receiverInformation={receiverInformation}
                    senderSuggestion={senderSuggestion}
                    receiverSuggestion={receiverSuggestion}
                    onSenderSuggestHandler={onSenderSuggestHandler}
                    onReceiverSuggestHandler={onReceiverSuggestHandler}
                    onReceiverBlurHandler={onReceiverBlurHandler}
                    onReceiverFocusHandler={onReceiverFocusHandler}
                    onSenderBlurHandler={onSenderBlurHandler}
                    onSenderFocusHandler={onSenderFocusHandler}
                />
            )}

            {EditVisibility && (
                <EditDialog
                    isEditing={isEditing}
                    editingHandler={editingHandler}
                    onExitHandler={onEditCloseHandler}
                    senderFormDetails={senderFormDetails}
                    onSubmit={onUpdateSubmit}
                    onSenderChange={onSenderChange}
                    receiverFormDetails={receiverFormDetails}
                    onReceiverChange={onReceiverChange}
                    parcelFormDetails={parcelFormDetails}
                    onParcelChange={onParcelChange}
                    receiverSuggestion={receiverSuggestion}
                />
            )}
        </>
    );
};
export default Parcels;
