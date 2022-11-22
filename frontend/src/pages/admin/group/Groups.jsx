import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Spinner from "../../../components/common/Spinner";
import Table from "../../../components/admin/groups/TableGroups";
import EditDialog from "./EditDialog";
import { toast } from "react-toastify";
import GroupEditDialog from "./GroupEditDialog";

import {
    parcelRegister,
    reset,
    getParcels,
    parcelUpdate,
    deleteParcel,
} from "../../../features/parcel/parcelSlice";
import DeleteDialog from "../../../components/admin/users/employees/DeleteDialog";
import GroupDetails from "./GroupDetails";
import {
    SenderGetInformationFromPostcode,
    ReceiverGetInformationFromPostcode,
    reset as informationReset,
} from "../../../features/thailand/thailandSlice";

import {
    getGroups,
    groupUpdate,
    deleteGroup,
    reset as GroupReset,
} from "../../../features/group/groupSlice";
import { getBranchs } from "../../../features/branch/branchSlice";

const Groups = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { admin } = useSelector((state) => state.admin);
    const { parcels, isLoading, isError, message } = useSelector(
        (state) => state.parcels
    );

    const { groups } = useSelector((state) => state.group);
    const GroupError = useSelector((state) => state.group.isError);
    const GroupErrorMsg = useSelector((state) => state.group.message);

    const { branch } = useSelector((state) => state.branch);

    const [senderSuggestion, setsenderSuggestion] = useState(false);
    const [receiverSuggestion, setreceiverSuggestion] = useState(false);
    const [testParcel] = useState([]);

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (GroupError) {
            toast.error(GroupErrorMsg);
        }

        if (!admin) {
            navigate("/admin/signin");
        }

        dispatch(getBranchs());
        dispatch(getGroups());

        return () => {
            dispatch(reset());
            dispatch(GroupReset());
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
    const [parcelFormDetails, setGroupFormDetails] = useState(
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
        setGroupFormDetails({
            ...parcelFormDetails,
            [e.target.name]: e.target.value,
        });
    };

    const onExitHandler = (e) => {
        setGroupFormDetails(initialParcelFormDetails);
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
        setGroupFormDetails(initialParcelFormDetails);
        dispatch(informationReset());
    };

    const onUpdateSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        const updatedGroupData = {
            ...parcelFormDetails,
        };
        console.log(updatedGroupData);
        dispatch(groupUpdate(updatedGroupData));
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

    const findGroupById = (targetId) => {
        const targetGroup = groups.filter((Each) => {
            return Each._id === targetId;
        });
        return targetGroup;
    };

    const prepareFormForDetail = (id) => {
        const targetGroup = findGroupById(id);
        console.log(targetGroup[0]);
        const {
            bagsize,
            branch,
            parcelList,
            totalParcels,
            totalWeight,
            typeofshipment,
            typeofstuff,
            _id,
        } = targetGroup[0];

        setGroupFormDetails({
            bagsize,
            branch,
            parcelList,
            totalParcels,
            totalWeight,
            typeofshipment,
            typeofstuff,
            _id,
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
        console.log("Deleted");
        console.log(targetId);
        dispatch(deleteGroup(targetId));
        setTargetId("");
        setOnDelete(false);
    };

    if (isLoading) {
        return <Spinner />;
    }

    console.log(groups);

    return (
        <>
            {onDelete && (
                <DeleteDialog
                    exitHandler={exitDeleteHandler}
                    confirmHandler={confirmDeleteHandler}
                    id={targetId}
                />
            )}

            <div className=" p-6 space-y-6 flex flex-col">
                <div className=" flex justify-between">
                    <h1 className=" text-3xl md:text-4xl">Groups Manager</h1>
                    <button
                        onClick={() => {
                            navigate("/admin/groups/create");
                        }}
                        className={
                            visibility
                                ? `bg-slate-600 p-2 px-4 rounded-full text-white transition`
                                : `bg-brightRed p-2 px-4 rounded-full hover:bg-brightRedLight text-white transition`
                        }
                        disabled={visibility ? true : false}
                    >
                        Create New Groups
                    </button>
                </div>
                {groups.length > 0 ? (
                    <div className=" table">
                        <div className=" container mx-auto ">
                            <Table
                                data={groups}
                                test={testParcel}
                                rowsPerPage={15}
                                onEditClick={onEditHandler}
                                onDetailClick={onDetailHandler}
                                onDeleteClick={onDeleteHandler}
                                visibility={visibility}
                                EditVisibility={EditVisibility}
                                branch={branch}
                            />
                        </div>
                    </div>
                ) : (
                    <h3>You have not create any Parcels</h3>
                )}
            </div>

            {EditVisibility && (
                <GroupEditDialog
                    isEditing={isEditing}
                    editingHandler={editingHandler}
                    onExitHandler={onEditCloseHandler}
                    onSubmit={onUpdateSubmit}
                    parcelFormDetails={parcelFormDetails}
                    onParcelChange={onParcelChange}
                    branch={branch}
                />
            )}
        </>
    );
};
export default Groups;
