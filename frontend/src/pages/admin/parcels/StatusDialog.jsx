import ParcelForm from "../../../components/admin/ParcelForm";
import { FaMotorcycle, FaShuttleVan } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoIosClipboard } from "react-icons/io";
import { useState } from "react";

const StatusDialog = ({
    onExitHandler,
    onSubmit,
    parcelFormDetails,
    isEditing,
    editingHandler,
}) => {
    console.log(parcelFormDetails.status);
    const { isRegisterToBranch, isOnTrevelling, isOnDelivery, isDelivered } =
        parcelFormDetails.status;

    const [optionVisibility, setOptionVisibility] = useState(false);
    let btnBgClassList = "bg-brightRed hover:bg-brightRedLight";
    const onClickHandler = (name) => {
        const key = name;
        setOptionVisibility(true);
        console.log(name);
    };

    const Option = () => {
        return (
            <>
                <div className="flex justify-between">
                    <button
                        onClick={() => onClickHandler("isRegisterToBranch")}
                        name="isRegisterToBranch"
                        className=" flex w-44 text-center items-center space-x-2 bg-brightRed text-white py-2 px-4 rounded-lg hover:bg-yellow-300 "
                    >
                        <IoIosClipboard />
                        <p>Register ...</p>
                    </button>
                    <button
                        onClick={() => onClickHandler("isOnTrevelling")}
                        name="isOnTrevelling"
                        className=" flex w-44 text-center items-center space-x-2 bg-brightRed text-white py-2 px-4 rounded-lg hover:bg-yellow-300"
                    >
                        <FaShuttleVan />
                        <p>Transmitting ...</p>
                    </button>
                    <button
                        onClick={() => onClickHandler("isOnDelivery")}
                        name="isOnDelivery"
                        className="flex w-44 text-center items-center space-x-2 bg-brightRed text-white py-2 px-4 rounded-lg hover:bg-yellow-300"
                    >
                        <FaMotorcycle />
                        <p>Delivering ...</p>
                    </button>
                    <button
                        onClick={() => onClickHandler("isDelivered")}
                        name="isDelivered"
                        className="flex w-44 text-center items-center space-x-2 bg-brightRed text-white py-2 px-4 rounded-lg hover:bg-yellow-300"
                    >
                        <IoMdCheckmarkCircle />
                        <p>Deliverred ...</p>
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
                                <p>{`Register : ${isRegisterToBranch}    Transmitting :    ${isOnTrevelling}    Delivering :    ${isOnDelivery}  Deliverred : ${isDelivered}`}</p>
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
                                        className={`${btnBgClassList} flex w-44 text-center items-center space-x-2 text-white py-2 px-4 rounded-lg`}
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
                                        className=" flex w-44 text-center items-center space-x-2 bg-brightRed text-white py-2 px-4 rounded-lg hover:bg-yellow-300"
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
                                        className="flex w-44 text-center items-center space-x-2 bg-brightRed text-white py-2 px-4 rounded-lg hover:bg-yellow-300"
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
                                    className="flex w-44 text-center items-center space-x-2 bg-brightRed text-white py-2 px-4 rounded-lg hover:bg-yellow-300"
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
