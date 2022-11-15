import { useState } from "react";
import ParcelForm from "../../components/admin/ParcelForm";
import { RiAddBoxFill } from "react-icons/ri";
//auoverflow y auto
const Parcels = () => {
    const [receiverFormDetails, setReceiverFormDetails] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        phone: "",
        citizen: "",
        addressNo: "",
        province: "",
        district: "",
        subdistrict: "",
        postcode: "",
        dob: "",
    });
    const [senderFormDetails, setSenderFormDetails] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        phone: "",
        citizen: "",
        addressNo: "",
        province: "",
        district: "",
        subdistrict: "",
        postcode: "",
        dob: "",
    });
    const [parcelFormDetails, setParcelFormDetails] = useState({});

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
        console.log({
            sender: senderFormDetails,
            receiver: receiverFormDetails,
            parcel: parcelFormDetails,
        });
    };

    return (
        <>
            {visibility && (
                // bg-slate-200 rounded-xl h-4/5 lg:h-3/5 w-3/5 absolute top-0 left-0 right-0 bottom-0 m-auto transition
                <div className="">
                    <div className="bg-slate-200 rounded-xl h-4/5 lg:h-3/5 w-3/5 absolute top-0 left-0 right-0 bottom-0 m-auto transition overflow-auto p-10">
                        <div className="flex flex-col space-y-10">
                            <div className="text-4xl flex justify-between">
                                <h1>Create new parcels</h1>
                                <button onClick={onExitHandler}>X</button>
                            </div>
                            <div className="space-y-10">
                                <div>
                                    <div className="">
                                        <h1 className="text-2xl">
                                            รายละเอียดผู้ส่ง
                                        </h1>
                                        <hr className="my-4" />
                                        <div>
                                            <ParcelForm
                                                formDetails={senderFormDetails}
                                                onSubmit={onSubmit}
                                                onChange={onSenderChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-2xl">
                                        รายละเอียดผู้รับ
                                    </h1>
                                    <hr className="my-4" />
                                    <div>
                                        <ParcelForm
                                            formDetails={receiverFormDetails}
                                            onSubmit={onSubmit}
                                            onChange={onReceiverChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl">รายละเอียดพัสดุ</h1>
                                <hr className="my-4" />
                                <div className="flex flex-col space-y-6 max-w-4xl">
                                    {/* weight */}
                                    <div className="space-x-2 flex">
                                        <label
                                            htmlFor="weight"
                                            className="basis-1/4"
                                        >
                                            Weight
                                        </label>
                                        <input
                                            type="text"
                                            id="weight"
                                            name="weight"
                                            // value={firstname}
                                            className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                            placeholder="Enter parcel weight"
                                            onChange={onParcelChange}
                                        />
                                    </div>
                                    {/* typeofshipment */}
                                    <div className="space-x-2 flex">
                                        <label
                                            htmlFor="typeofshipment"
                                            className="basis-1/4"
                                        >
                                            Type of shipment
                                        </label>
                                        <select
                                            name="typeofshipment"
                                            id="typeofshipment"
                                            // value={typeofshipment}
                                            className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                            onChange={onParcelChange}
                                        >
                                            <option value="Import">
                                                Normal
                                            </option>
                                            <option value="Export">
                                                Express
                                            </option>
                                            <option value="Import Screen">
                                                Same day
                                            </option>
                                        </select>
                                    </div>
                                    {/* typeofstuff */}
                                    <div className="space-x-2 flex">
                                        <label
                                            htmlFor="role"
                                            className="basis-1/4"
                                        >
                                            Type of stuff inside parcel
                                        </label>
                                        <select
                                            name="typeofstuff"
                                            id="typeofstuff"
                                            // value={typeofstuff}
                                            className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                            onChange={onParcelChange}
                                        >
                                            <option value="Import">
                                                Electronics Device
                                            </option>
                                            <option value="Export">
                                                Fragile
                                            </option>
                                            <option value="Import Screen">
                                                Foods
                                            </option>
                                            <option value="Import Screen">
                                                Normal
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={onSubmit}
                                    className="bg-brightRed text-white hover:bg-brightRedLight p-2 px-6"
                                >
                                    ADD
                                </button>
                                <button
                                    onClick={onExitHandler}
                                    className="bg-slate-500 text-white hover:bg-slate-300 p-2 px-6"
                                >
                                    CANCEL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
