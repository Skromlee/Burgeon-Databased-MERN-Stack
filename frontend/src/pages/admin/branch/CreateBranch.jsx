import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoIosArrowBack } from "react-icons/io";
import Spinner from "../../../components/common/Spinner";
import { createBranch, reset } from "../../../features/branch/branchSlice";
import {
    getInformationFromPostcode,
    reset as informationReset,
} from "../../../features/thailand/thailandSlice";
import { useCallback } from "react";

const initailFormValue = {
    branchName: "",
    addressNo: "",
    province: "",
    district: "",
    subdistrict: "",
    postcode: "",
};

const CreateBranch = () => {
    const [formData, setFormData] = useState(initailFormValue);

    const { branchName, addressNo, province, district, subdistrict, postcode } =
        formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { admin } = useSelector((state) => state.admin);
    const { branch, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.branch // Change this line
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (!admin) {
            navigate("/admin/signin");
        }

        if (isSuccess) {
            dispatch(reset());
            navigate("/admin/branch/");
        }

        // Check for account
        return () => {
            dispatch(reset());
        };
    }, [admin, isError, isSuccess, navigate, message, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (
            !branchName ||
            !addressNo ||
            !province ||
            !district ||
            !subdistrict ||
            !postcode
        ) {
            toast.error("Make sure your input all fields");
        } else {
            const branchData = {
                branchName,
                addressNo,
                province,
                district,
                subdistrict,
                postcode,
            };
            console.log(branchData);
            dispatch(createBranch(branchData));
            // dispatch(createEmployee(employeeData));
        }
    };

    const onBlurHandler = useCallback(() => {
        console.log("Blur");
        dispatch(getInformationFromPostcode(formData.postcode));
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div className="space-y-6 flex flex-col container h-[calc(100vh-104px)] mx-auto">
                <div className="space-y-6 flex flex-col mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Create an branch
                    </h1>
                </div>

                <div className="">
                    <form className="space-y-8 text-xl" onSubmit={onSubmit}>
                        <div className="flex-col space-y-8 md:space-y-6">
                            {/* description */}
                            <div className="space-x-2 flex">
                                <label
                                    htmlFor="branchName"
                                    className="basis-1/4"
                                >
                                    Branch name
                                </label>
                                <input
                                    type="text"
                                    id="branchName"
                                    name="branchName"
                                    value={branchName}
                                    className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    placeholder="Enter employee address number"
                                    onChange={onChange}
                                />
                            </div>
                            {/* addressNo */}
                            <div className="space-x-2 flex">
                                <label
                                    htmlFor="addressNo"
                                    className="basis-1/4"
                                >
                                    Add No.
                                </label>
                                <input
                                    type="text"
                                    id="addressNo"
                                    name="addressNo"
                                    value={addressNo}
                                    className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    placeholder="Enter employee address number"
                                    onChange={onChange}
                                />
                            </div>
                            {/* province */}
                            <div className="space-x-2 flex">
                                <label htmlFor="province" className="basis-1/4">
                                    Province
                                </label>
                                <input
                                    type="text"
                                    id="province"
                                    name="province"
                                    value={province}
                                    className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    placeholder="Enter employee province"
                                    onChange={onChange}
                                />
                            </div>

                            {/* district */}
                            <div className="space-x-2 flex">
                                <label htmlFor="district" className="basis-1/4">
                                    District
                                </label>
                                <input
                                    type="text"
                                    id="district"
                                    name="district"
                                    value={district}
                                    className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    placeholder="Enter employee district"
                                    onChange={onChange}
                                />
                            </div>

                            {/* subdistrict */}
                            <div className="space-x-2 flex">
                                <label
                                    htmlFor="subdistrict"
                                    className="basis-1/4"
                                >
                                    Sub District
                                </label>
                                <input
                                    type="text"
                                    id="subdistrict"
                                    name="subdistrict"
                                    value={subdistrict}
                                    className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    placeholder="Enter employee subdistrict"
                                    onChange={onChange}
                                />
                            </div>
                            {/* postcode */}
                            <div className="space-x-2 flex">
                                <label htmlFor="postcode" className="basis-1/4">
                                    Postcode
                                </label>
                                <input
                                    type="number"
                                    id="postcode"
                                    name="postcode"
                                    value={postcode}
                                    className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    placeholder="Enter employee postcode"
                                    onChange={onChange}
                                    onBlur={onBlurHandler}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="border-brightRed border-2  rounded-full p-2 px-6 text-brightRed hover:bg-brightRed hover:text-white duration-75"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
                <Link to="/admin/branch">
                    <div className="flex flex-col w-fit items-center">
                        <IoIosArrowBack />
                        Back
                    </div>
                </Link>
            </div>
        </>
    );
};
export default CreateBranch;
