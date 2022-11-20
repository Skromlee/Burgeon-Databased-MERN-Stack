import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Spinner from "../../../components/common/Spinner";
import Table from "../../../components/admin/groups/TableParcel";
import Table2 from "../../../components/admin/groups/TableParcelInGroup";
import EditDialog from "./EditDialog";
import { toast } from "react-toastify";

import {
    parcelRegister,
    reset,
    getParcels,
    parcelUpdate,
} from "../../../features/parcel/parcelSlice";
import CreateDialog from "./CreateDialog";
import {
    SenderGetInformationFromPostcode,
    ReceiverGetInformationFromPostcode,
    reset as informationReset,
} from "../../../features/thailand/thailandSlice";
const CreateGroup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { admin } = useSelector((state) => state.admin);
    const { parcels, isLoading, isError, message } = useSelector(
        (state) => state.parcels
    );

    const [senderSuggestion, setsenderSuggestion] = useState(false);
    const [receiverSuggestion, setreceiverSuggestion] = useState(false);
    const [testParcel] = useState([]);

    const [, updateState] = useState();

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
        totalWeight: "",
        totalParcels: "",
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
            sender: senderFormDetails,
            receiver: receiverFormDetails,
            parcel: parcelFormDetails,
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

    const findParcelById = (targetId) => {
        const targetParcel = parcels.filter((Each) => {
            return Each._id === targetId;
        });
        return targetParcel;
    };

    const [parcelInGroup, setParcelInGroup] = useState([]);
    const onChangeHandler = (e) => {
        if (e.target.checked) {
            // true => checked
            let targetParcel = parcels.filter((each) => {
                return each._id === e.target.name ? each : null;
            });
            targetParcel = targetParcel[0];
            setParcelInGroup((prev) => [...prev, targetParcel]);
        } else {
            let removedParcelGroup = [];
            removedParcelGroup.push(
                parcelInGroup.filter((each) => {
                    return each._id !== e.target.name;
                })
            );
            removedParcelGroup = removedParcelGroup[0];
            setParcelInGroup(removedParcelGroup);
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div className=" p-6 space-y-6 flex flex-col">
                <div className=" flex justify-between">
                    <h1 className=" text-3xl md:text-4xl">
                        Manual Group Creator
                    </h1>
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
                        Create New Group
                    </button>
                </div>
                {parcels.length > 0 ? (
                    <div className="flex space-x-6">
                        <div className=" container mx-auto ">
                            <div className="py-2">
                                <h1 className="text-2xl">
                                    Total parcels that not groupping yet ...
                                </h1>
                            </div>
                            <Table
                                data={parcels}
                                test={testParcel}
                                rowsPerPage={15}
                                onEditClick={onEditHandler}
                                onDetailClick={onDetailHandler}
                                onDeleteClick={onDeleteHandler}
                                visibility={visibility}
                                EditVisibility={EditVisibility}
                                parcelInGroup={parcelInGroup}
                                onChangeHandler={onChangeHandler}
                            />
                        </div>
                        <div className=" container mx-auto ">
                            <div className="py-2">
                                <h1 className="text-2xl">
                                    This group will include ...
                                </h1>
                            </div>
                            <Table2
                                data={parcelInGroup}
                                test={testParcel}
                                rowsPerPage={15}
                                onEditClick={onEditHandler}
                                onDetailClick={onDetailHandler}
                                onDeleteClick={onDeleteHandler}
                                visibility={visibility}
                                EditVisibility={EditVisibility}
                                parcelInGroup={parcelInGroup}
                                onChangeHandler={onChangeHandler}
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
                    onSubmit={onSubmit}
                    onParcelChange={onParcelChange}
                    parcelFormDetails={parcelFormDetails}
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
export default CreateGroup;
