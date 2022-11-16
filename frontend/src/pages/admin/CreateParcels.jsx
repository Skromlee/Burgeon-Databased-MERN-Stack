import { useState } from "react";
import ParcelForm from "../../components/admin/ParcelForm";
import { RiAddBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Spinner from "../../components/common/Spinner";

import { parcelRegister, reset } from "../../features/parcel/parcelSlice";

const Parcels = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { admin } = useSelector((state) => state.admin);
    const { parcels, isLoading, isError, message } = useSelector(
        (state) => state.parcels
    );

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!admin) {
            navigate("/admin/signin");
        }

        // dispatch(getParcels());

        return () => {
            dispatch(reset());
        };
    }, [admin, navigate, isError, message, dispatch]);

    const [receiverFormDetails, setReceiverFormDetails] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        citizen: "",
        addressNo: "",
        province: "",
        district: "",
        subdistrict: "",
        postcode: "",
    });
    const [senderFormDetails, setSenderFormDetails] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        citizen: "",
        addressNo: "",
        province: "",
        district: "",
        subdistrict: "",
        postcode: "",
    });
    const [parcelFormDetails, setParcelFormDetails] = useState({
        weight: "",
        typeofshipment: "Normal",
        typeofstuff: "Electronics Device",
        boxsize: "A4",
    });

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
    };

    if (isLoading) {
        return <Spinner />;
    }

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
                                            <option value="Normal">
                                                Normal
                                            </option>
                                            <option value="Express">
                                                Express
                                            </option>
                                            <option value="Same day">
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
                                            <option value="Electronics Device">
                                                Electronics Device
                                            </option>
                                            <option value="Fragile">
                                                Fragile
                                            </option>
                                            <option value="Foods">Foods</option>
                                            <option value="Normal">
                                                Normal
                                            </option>
                                        </select>
                                    </div>
                                    {/* boxsizing */}
                                    <div className="space-x-2 flex">
                                        <label
                                            htmlFor="typeofshipment"
                                            className="basis-1/4"
                                        >
                                            Box Size
                                        </label>
                                        <select
                                            name="typeofshipment"
                                            id="typeofshipment"
                                            // value={typeofshipment}
                                            className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                            onChange={onParcelChange}
                                        >
                                            <option value="A4">A4</option>
                                            <option value="A5">A5</option>
                                            <option value="A6">A6</option>
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
