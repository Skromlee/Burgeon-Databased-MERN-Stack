import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoIosArrowBack } from "react-icons/io";
import Spinner from "../../../components/common/Spinner";
import { createBranch, reset } from "../../../features/branch/branchSlice";
import { getInformationFromPostcode } from "../../../features/thailand/thailandSlice";

import PostcodeInput from "../../../components/common/PostcodeInput";

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
    const { informationFromPostcode } = useSelector((state) => state.thailand);
    const { branchName, addressNo, province, district, subdistrict, postcode } =
        formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { admin } = useSelector((state) => state.admin);
    const { isLoading, isError, isSuccess, message } = useSelector(
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
    }, [
        admin,
        isError,
        isSuccess,
        navigate,
        message,
        dispatch,
        informationFromPostcode,
    ]);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(
            branchName,
            addressNo,
            province,
            district,
            subdistrict,
            postcode
        );
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

            dispatch(createBranch(branchData));
            // dispatch(createEmployee(employeeData));
        }
    };

    // USE

    const onChange = (e) => {
        // !TODO => make this method fire get request with LIKE e.target.value then return
        if (e.target.name === "postcode") {
            if (e.target.value > 100) {
                setSuggestion(true);
                dispatch(getInformationFromPostcode(e.target.value));

                //
            }
        }
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const [suggestion, setSuggestion] = useState(false);

    const onSuggestHandler = (informationData) => {
        const { province, district, subdistrict, postcode } = informationData;

        setFormData({
            ...formData,
            province,
            district,
            subdistrict,
            postcode,
        });
        setSuggestion(false);
    };

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
                            {/* postcode */}
                            <PostcodeInput
                                postcode={postcode}
                                onChange={onChange}
                                suggestion={suggestion}
                                informationFromPostcode={
                                    informationFromPostcode
                                }
                                onSuggestHandler={onSuggestHandler}
                                isEditing={true}
                            />

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
                        </div>
                        <div className="">
                            <div className="flex justify-between">
                                <Link
                                    to="/admin/branch/"
                                    className="w-fit"
                                    // onClick={() => {
                                    //     dispatch(informationReset());
                                    // }}
                                >
                                    <div className="flex flex-col items-center">
                                        <IoIosArrowBack />
                                        Back
                                    </div>
                                </Link>
                                <button
                                    type="submit"
                                    className="border-brightRed border-2  rounded-full p-2 px-6 text-brightRed hover:bg-brightRed hover:text-white duration-75"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default CreateBranch;
