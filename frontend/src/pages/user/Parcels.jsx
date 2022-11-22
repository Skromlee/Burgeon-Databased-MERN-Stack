import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ParcelCard from "../../components/user/ParcelCard";

import { MdDoubleArrow } from "react-icons/md";
import { GoCalendar } from "react-icons/go";

import { reset, getParcelByCitizen } from "../../features/parcel/parcelSlice";
const Parcels = () => {
    const [imgPath, setImgPath] = useState({
        100: "/status/100_F.png",
        200: "/status/200_F.png",
        300: "/status/300_F.png",
        400: "/status/400_F.png",
    });
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

        const {
            isDelivered,
            isOnDelivery,
            isOnTrevelling,
            isRegisterToBranch,
        } = targetParcel.status;

        let configImgPath = {};

        switch (isDelivered) {
            case "finish":
                configImgPath = { ...configImgPath, 400: "/status/400_P.png" };
                break;
            case "process":
                configImgPath = { ...configImgPath, 400: "/status/400_C.png" };
                break;
            case "false":
                configImgPath = { ...configImgPath, 400: "/status/400_F.png" };
                break;
            default:
                break;
        }
        switch (isOnDelivery) {
            case "finish":
                configImgPath = { ...configImgPath, 300: "/status/300_P.png" };
                break;
            case "process":
                configImgPath = { ...configImgPath, 300: "/status/300_C.png" };

                break;
            case "false":
                configImgPath = { ...configImgPath, 300: "/status/300_F.png" };

                break;
            default:
                break;
        }
        switch (isOnTrevelling) {
            case "finish":
                configImgPath = { ...configImgPath, 200: "/status/200_P.png" };

                break;
            case "process":
                configImgPath = { ...configImgPath, 200: "/status/200_C.png" };

                break;
            case "false":
                configImgPath = { ...configImgPath, 200: "/status/200_F.png" };

                break;
            default:
                break;
        }
        switch (isRegisterToBranch) {
            case "finish":
                configImgPath = { ...configImgPath, 100: "/status/100_P.png" };

                break;
            case "process":
                configImgPath = { ...configImgPath, 100: "/status/100_C.png" };

                break;
            case "false":
                configImgPath = { ...configImgPath, 100: "/status/100_F.png" };

                break;
            default:
                break;
        }

        setImgPath(configImgPath);
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
                <div className="bg-slate-100 rounded-xl h-4/5 lg:h-2/5 w-3/5 absolute top-0 left-0 right-0 bottom-0 m-auto transition z-50 p-6 space-y-2">
                    <div className="relative m-4">
                        {" "}
                        <div
                            className="absolute -right-6 -top-12 justify-end flex hover:cursor-pointer my-4 text-2xl"
                            onClick={() => {
                                setVisibility((prev) => !prev);
                            }}
                        >
                            X
                        </div>
                    </div>
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
                            <div className="flex items-center space-x-4">
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
                    </div>

                    <div className="flex flex-col items-center border p-6 space-y-10 bg-white">
                        <div className="flex items-center">
                            <div>
                                <img
                                    src={imgPath[100]}
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
                                    src={imgPath[200]}
                                    alt="box-img"
                                    className="h-28 w-28"
                                />
                                <h1 className="text-black">อยู่ระหว่างขนส่ง</h1>
                            </div>
                            <MdDoubleArrow className="text-brightRed inline-block mr-1" />{" "}
                            <div>
                                <img
                                    src={imgPath[300]}
                                    alt="box-img"
                                    className="h-28 w-28"
                                />
                                <h1 className="text-black">กำลังจัดส่งพัสดุ</h1>
                            </div>
                            <MdDoubleArrow className="text-brightRed inline-block mr-1" />{" "}
                            <div>
                                <img
                                    src={imgPath[400]}
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
                {parcels
                    ? parcels.map((parcel, idx) => {
                          return (
                              <ParcelCard
                                  key={idx}
                                  data={parcel}
                                  idx={idx}
                                  oncardClickHandler={onCardClickHandler}
                              />
                          );
                      })
                    : "There's not parcel yet..."}
            </div>
        </>
    );
};
export default Parcels;
