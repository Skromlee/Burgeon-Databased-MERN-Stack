import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ParcelCard from "../../components/user/ParcelCard";

import { MdDoubleArrow } from "react-icons/md";
import { GoCalendar } from "react-icons/go";

import { reset, getParcelByCitizen } from "../../features/parcel/parcelSlice";
const Parcels = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { parcels, isError, message } = useSelector((state) => state.parcels);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (!user) {
            navigate("/signin");
        }

        // dispatch(getParcels());
        dispatch(getParcelByCitizen());

        return () => {
            dispatch(reset());
        };
    }, [user, navigate, isError, message, dispatch]);

    const [targetParcelId, setTargetParcelId] = useState("");
    const [visibility, setVisibility] = useState(false);

    const onCardClickHandler = (parcelId, idx) => {
        const targetParcel = findParcelByParcelId(parcelId)[0];

        let arrivedDate = new Date(targetParcel.createdAt);
        switch (targetParcel.typeofshipment) {
            case "Normal":
                arrivedDate.setDate(arrivedDate.getDate() + 4);
                break;
            case "Express":
                arrivedDate.setDate(arrivedDate.getDate() + 2);
                break;
            case "Same day":
                arrivedDate.setDate(arrivedDate.getDate());
                break;
            default:
                arrivedDate.setDate(arrivedDate.getDate() + 4);
        }
        setTargetParcelId({
            ...targetParcel,
            arrivedDate: arrivedDate.toISOString().split("T")[0],
            idx: idx,
        });

        setVisibility(true);
    };

    const findParcelByParcelId = (parcelId) => {
        const targetParcel = parcels.filter((parcel) => {
            return parcel._id === parcelId;
        });
        return targetParcel;
    };

    return (
        <>
            {visibility && (
                <div className="bg-slate-100 rounded-xl h-4/5 lg:h-3/5 w-3/5 absolute top-0 left-0 right-0 bottom-0 m-auto transition z-50 p-6 space-y-2">
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <div>
                                <div className="text-black font-semibold">
                                    <span className="mr-2 px-[0.457rem] text-white bg-brightRed rounded-full">
                                        {targetParcelId.idx + 1}
                                    </span>
                                    {targetParcelId._id}
                                </div>
                                <div>
                                    <span className="text-black font-semibold">
                                        <span className="text-slate-500">
                                            จาก:
                                        </span>{" "}
                                        {`${targetParcelId.sender.firstname} ${targetParcelId.sender.lastname} (${targetParcelId.sender.province})`}{" "}
                                    </span>
                                    <MdDoubleArrow className="text-brightRed inline-block mr-1" />{" "}
                                    <span className="text-black font-semibold">
                                        <span className="text-slate-500">
                                            ถึง:
                                        </span>{" "}
                                        {`${targetParcelId.receiver.firstname} ${targetParcelId.receiver.lastname} (${targetParcelId.receiver.province})`}{" "}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="flex items-center space-x-1">
                                    <GoCalendar />
                                    <h1>กำหนดส่ง</h1>
                                </div>
                                <div className="text-brightRed">
                                    {targetParcelId.arrivedDate}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center border p-6 space-y-10 bg-white">
                        <div className="flex items-center">
                            <div>
                                <img
                                    src="/images/Box.svg"
                                    alt="box-img"
                                    className="h-28 w-28"
                                />
                                <h1 className="text-black">
                                    ผู้ส่งนำส่งที่สาขา
                                </h1>
                            </div>
                            <MdDoubleArrow className="text-brightRed inline-block mr-1" />{" "}
                            <div>
                                <img
                                    src="/images/Box.svg"
                                    alt="box-img"
                                    className="h-28 w-28"
                                />
                                <h1 className="text-black">อยู่ระหว่างขนส่ง</h1>
                            </div>
                            <MdDoubleArrow className="text-brightRed inline-block mr-1" />{" "}
                            <div>
                                <img
                                    src="/images/Box.svg"
                                    alt="box-img"
                                    className="h-28 w-28"
                                />
                                <h1 className="text-black">กำลังจัดส่งพัสดุ</h1>
                            </div>
                            <MdDoubleArrow className="text-brightRed inline-block mr-1" />{" "}
                            <div>
                                <img
                                    src="/images/Box.svg"
                                    alt="box-img"
                                    className="h-28 w-28"
                                />
                                <h1 className="text-black">
                                    พัสดุจัดส่งสำเร็จ
                                </h1>
                            </div>
                        </div>
                        <div className="border-b-2 w-full border-slate-300" />
                    </div>
                </div>
            )}
            <div className="grid gap-4 grid-cols-4 grid-rows-4">
                {parcels.map((parcel, idx) => {
                    return (
                        <ParcelCard
                            key={idx}
                            data={parcel}
                            idx={idx}
                            oncardClickHandler={onCardClickHandler}
                        />
                    );
                })}
            </div>
        </>
    );
};
export default Parcels;
