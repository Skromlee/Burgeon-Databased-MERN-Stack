import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ParcelCard from "../../components/user/ParcelCard";

import { reset, getParcelByCitizen } from "../../features/parcel/parcelSlice";
const Parcels = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { parcels, parcelbyid, isLoading, isError, message } = useSelector(
        (state) => state.parcels
    );

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

    const onCardClickHandler = (parcelId) => {
        const targetParcel = findParcelByParcelId(parcelId);
    };

    const findParcelByParcelId = (parcelId) => {
        const targetParcel = parcels.filter((parcel) => {
            return parcel._id === parcelId;
        });
        return targetParcel;
    };

    return (
        <div className="grid gap-4 grid-cols-4 grid-rows-4">
            {parcels.map((parcel, idx) => {
                return (
                    <ParcelCard
                        data={parcel}
                        idx={idx}
                        oncardClickHandler={onCardClickHandler}
                    />
                );
            })}
        </div>
    );
};
export default Parcels;
