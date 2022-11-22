import ParcelForm from "../../../components/admin/ParcelForm";
import { FaMotorcycle, FaShuttleVan } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoIosClipboard } from "react-icons/io";
import { useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { updateStatus } from "../../../features/parcel/parcelSlice";
import { useDispatch } from "react-redux";

const StatusDialog = ({
    onExitHandler,
    onSubmit,
    parcelFormDetails,
    isEditing,
    editingHandler,
    status,
}) => {
    const dispatch = useDispatch();
    const { isRegisterToBranch, isOnTrevelling, isOnDelivery, isDelivered } =
        status;

    const [optionVisibility, setOptionVisibility] = useState(false);
    let btnBgClassListInitialState = {
        isRegisterToBranch: "bg-brightRed hover:bg-brightRedLight",
        isOnTrevelling: "bg-brightRed hover:bg-brightRedLight",
        isOnDelivery: "bg-brightRed hover:bg-brightRedLight",
        isDelivered: "bg-brightRed hover:bg-brightRedLight",
    };
    const [btnBgClassList, setBtnBgClassList] = useState(
        btnBgClassListInitialState
    );
    const [prevBtn, setPrevBtn] = useState("");
    const [key, setKey] = useState("");
    const onClickHandler = (name) => {
        const key = name;
        setOptionVisibility(true);
        if (prevBtn !== key) {
            //Different Key
            setPrevBtn(key);
            if (!optionVisibility) {
                setBtnBgClassList({
                    ...btnBgClassListInitialState,
                    [key]: "bg-green-600 hover:bg-green-400",
                });
                setKey(key);
            } else {
                setBtnBgClassList({
                    ...btnBgClassListInitialState,
                    [key]: "bg-green-600 hover:bg-green-400",
                });
                setKey(key);
            }
        } else {
            // SameKey
            if (!optionVisibility) {
                setBtnBgClassList({
                    ...btnBgClassListInitialState,
                    [key]: "bg-green-600 hover:bg-green-400",
                });
                setKey(key);
            } else {
                setBtnBgClassList({
                    ...btnBgClassListInitialState,
                });
                setPrevBtn("");
                setOptionVisibility(false);
            }
        }
    };

    const setStatusHandler = (status) => {
        switch (key) {
            case "isRegisterToBranch":
                switch (status) {
                    case "false":
                        dispatch(
                            updateStatus({
                                _id: parcelFormDetails._id,
                                status: {
                                    isRegisterToBranch: "false",
                                    isOnTrevelling: "false",
                                    isOnDelivery: "false",
                                    isDelivered: "false",
                                },
                            })
                        );
                        break;
                    case "process":
                        dispatch(
                            updateStatus({
                                _id: parcelFormDetails._id,
                                status: {
                                    isRegisterToBranch: "process",
                                    isOnTrevelling: "false",
                                    isOnDelivery: "false",
                                    isDelivered: "false",
                                },
                            })
                        );
                        break;
                    case "finish":
                        dispatch(
                            updateStatus({
                                _id: parcelFormDetails._id,
                                status: {
                                    isRegisterToBranch: "finish",
                                    isOnTrevelling: "false",
                                    isOnDelivery: "false",
                                    isDelivered: "false",
                                },
                            })
                        );
                        break;

                    default:
                        break;
                }
                break;
            case "isOnTrevelling":
                switch (status) {
                    case "false":
                        dispatch(
                            updateStatus({
                                _id: parcelFormDetails._id,
                                status: {
                                    isRegisterToBranch: "finish",
                                    isOnTrevelling: "false",
                                    isOnDelivery: "false",
                                    isDelivered: "false",
                                },
                            })
                        );
                        break;
                    case "process":
                        dispatch(
                            updateStatus({
                                _id: parcelFormDetails._id,
                                status: {
                                    isRegisterToBranch: "finish",
                                    isOnTrevelling: "process",
                                    isOnDelivery: "false",
                                    isDelivered: "false",
                                },
                            })
                        );
                        break;
                    case "finish":
                        dispatch(
                            updateStatus({
                                _id: parcelFormDetails._id,
                                status: {
                                    isRegisterToBranch: "finish",
                                    isOnTrevelling: "finish",
                                    isOnDelivery: "false",
                                    isDelivered: "false",
                                },
                            })
                        );
                        break;

                    default:
                        break;
                }
                break;
            case "isOnDelivery":
                switch (status) {
                    case "false":
                        dispatch(
                            updateStatus({
                                _id: parcelFormDetails._id,
                                status: {
                                    isRegisterToBranch: "finish",
                                    isOnTrevelling: "finish",
                                    isOnDelivery: "false",
                                    isDelivered: "false",
                                },
                            })
                        );
                        break;
                    case "process":
                        dispatch(
                            updateStatus({
                                _id: parcelFormDetails._id,
                                status: {
                                    isRegisterToBranch: "finish",
                                    isOnTrevelling: "finish",
                                    isOnDelivery: "process",
                                    isDelivered: "false",
                                },
                            })
                        );
                        break;
                    case "finish":
                        dispatch(
                            updateStatus({
                                _id: parcelFormDetails._id,
                                status: {
                                    isRegisterToBranch: "finish",
                                    isOnTrevelling: "finish",
                                    isOnDelivery: "finish",
                                    isDelivered: "false",
                                },
                            })
                        );
                        break;

                    default:
                        break;
                }
                break;
            case "isDelivered":
                switch (status) {
                    case "false":
                        dispatch(
                            updateStatus({
                                _id: parcelFormDetails._id,
                                status: {
                                    isRegisterToBranch: "finish",
                                    isOnTrevelling: "finish",
                                    isOnDelivery: "finish",
                                    isDelivered: "false",
                                },
                            })
                        );
                        break;
                    case "process":
                        dispatch(
                            updateStatus({
                                _id: parcelFormDetails._id,
                                status: {
                                    isRegisterToBranch: "finish",
                                    isOnTrevelling: "finish",
                                    isOnDelivery: "finish",
                                    isDelivered: "process",
                                },
                            })
                        );
                        break;
                    case "finish":
                        dispatch(
                            updateStatus({
                                _id: parcelFormDetails._id,
                                status: {
                                    isRegisterToBranch: "finish",
                                    isOnTrevelling: "finish",
                                    isOnDelivery: "finish",
                                    isDelivered: "finish",
                                },
                            })
                        );
                        break;

                    default:
                        break;
                }
                break;
            default:
                break;
        }
        setOptionVisibility(false);
        setKey("");
        setPrevBtn("");
        setBtnBgClassList(btnBgClassListInitialState);
    };
    const Option = () => {
        return (
            <>
                <h1 className="text-center">Set to</h1>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={() => setStatusHandler("false")}
                        name="isRegisterToBranch"
                        className=" flex w-44 text-center items-center space-x-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-400 "
                    >
                        <AiOutlineClose />
                        <p>False</p>
                    </button>
                    <button
                        onClick={() => setStatusHandler("process")}
                        name="isOnTrevelling"
                        className=" flex w-44 text-center items-center space-x-2 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-400"
                    >
                        <BiLoaderCircle />
                        <p>Process</p>
                    </button>
                    <button
                        onClick={() => setStatusHandler("finish")}
                        name="isOnDelivery"
                        className="flex w-44 text-center items-center space-x-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-400"
                    >
                        <AiOutlineCheck />
                        <p>Finish</p>
                    </button>
                </div>
            </>
        );
    };

    return (
        <div className="">
            <div className="bg-slate-200 rounded-xl h-4/5 lg:h-2/5 w-2/4 absolute top-0 left-0 right-0 bottom-0 m-auto transition overflow-auto p-10">
                <div className="flex flex-col space-y-10">
                    <div className="text-4xl flex justify-between">
                        <h1>Status Manage</h1>
                        <button onClick={onExitHandler}>X</button>
                    </div>
                    <div>
                        <div className="flex flex-col space-y-6 max-w-4xl">
                            {/* _id */}
                            <div className="space-x-2 flex">
                                <label htmlFor="weight" className="basis-1/4">
                                    Parcel ID
                                </label>
                                <input
                                    type="text"
                                    id="weight"
                                    name="weight"
                                    value={parcelFormDetails._id}
                                    className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    disabled={true}
                                />
                            </div>
                            <div className="flex space-x-4">
                                <p>STATUS: </p>
                                <div>
                                    Register :{" "}
                                    <span
                                        className={
                                            isRegisterToBranch === "finish"
                                                ? "text-green-600"
                                                : isRegisterToBranch === "false"
                                                ? "text-red-600"
                                                : "text-yellow-600"
                                        }
                                    >
                                        {isRegisterToBranch}
                                    </span>{" "}
                                    Transmitting :{" "}
                                    <span
                                        className={
                                            isOnTrevelling === "finish"
                                                ? "text-green-600"
                                                : isOnTrevelling === "false"
                                                ? "text-red-600"
                                                : "text-yellow-600"
                                        }
                                    >
                                        {isOnTrevelling}
                                    </span>{" "}
                                    Delivering :{" "}
                                    <span
                                        className={
                                            isOnDelivery === "finish"
                                                ? "text-green-600"
                                                : isOnDelivery === "false"
                                                ? "text-red-600"
                                                : "text-yellow-600"
                                        }
                                    >
                                        {isOnDelivery}
                                    </span>{" "}
                                    Deliverred :{" "}
                                    <span
                                        className={
                                            isDelivered === "finish"
                                                ? "text-green-600"
                                                : isDelivered === "false"
                                                ? "text-red-600"
                                                : "text-yellow-600"
                                        }
                                    >
                                        {isDelivered}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h1 className="">Set Status : </h1>
                            <div className="flex justify-between">
                                <div>
                                    <button
                                        onClick={() =>
                                            onClickHandler("isRegisterToBranch")
                                        }
                                        name="isRegisterToBranch"
                                        className={`${btnBgClassList.isRegisterToBranch} flex w-44 text-center items-center space-x-2 text-white py-2 px-4 rounded-lg`}
                                    >
                                        <IoIosClipboard />
                                        <p>Register ...</p>
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={() =>
                                            onClickHandler("isOnTrevelling")
                                        }
                                        name="isOnTrevelling"
                                        className={`${btnBgClassList.isOnTrevelling} flex w-44 text-center items-center space-x-2 text-white py-2 px-4 rounded-lg`}
                                    >
                                        <FaShuttleVan />
                                        <p>Transmitting ...</p>
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={() =>
                                            onClickHandler("isOnDelivery")
                                        }
                                        name="isOnDelivery"
                                        className={`${btnBgClassList.isOnDelivery} flex w-44 text-center items-center space-x-2 text-white py-2 px-4 rounded-lg`}
                                    >
                                        <FaMotorcycle />
                                        <p>Delivering ...</p>
                                    </button>
                                </div>
                                <button
                                    onClick={() =>
                                        onClickHandler("isDelivered")
                                    }
                                    name="isDelivered"
                                    className={`${btnBgClassList.isDelivered} flex w-44 text-center items-center space-x-2 text-white py-2 px-4 rounded-lg`}
                                >
                                    <IoMdCheckmarkCircle />
                                    <p>Deliverred ...</p>
                                </button>
                            </div>
                            {optionVisibility && <Option />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusDialog;
