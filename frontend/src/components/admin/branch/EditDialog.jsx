const EditDialog = ({
    isEditing,
    editingHandler,
    exitHandler,
    submitHandler,
    branch,
    onChange,
}) => {
    return (
        <div>
            <div className=" bg-slate-200 rounded-xl h-4/5 lg:h-4/6 w-3/5 absolute top-0 left-0 right-0 bottom-0 m-auto transition">
                <div className=" p-10 flex flex-col space-y-12 transition">
                    <div className=" flex justify-between transition">
                        <div className=" flex items-center space-x-6 align-middle transition">
                            <h1 className=" text-2xl md:text-3xl transition">
                                Branch in details
                            </h1>
                            {!isEditing && (
                                <button
                                    onClick={editingHandler}
                                    className=" bg-brightRed p-1 px-4 rounded-full text-white hover:bg-slate-300 transition"
                                >
                                    Edit
                                </button>
                            )}
                        </div>

                        <div>
                            <button
                                onClick={exitHandler}
                                className=" font-bold text-lg transition"
                            >
                                X
                            </button>
                        </div>
                    </div>

                    <form onSubmit={submitHandler}>
                        <div className=" flex flex-col space-y-6">
                            {/* <div className="space-y-4 lg:w-1/2"> */}
                            {/* Repeated */}
                            {/* Branch ID */}
                            <div className=" space-x-2 flex">
                                <label htmlFor="id" className=" basis-1/4">
                                    Branch ID :
                                </label>
                                <input
                                    type="text"
                                    id="id"
                                    name="id"
                                    value={branch._id}
                                    className=" border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    disabled
                                />
                            </div>

                            {/* Branch Name */}
                            <div className=" space-x-2 flex">
                                <label
                                    htmlFor="branchName"
                                    className=" basis-1/4"
                                >
                                    Branch Name
                                </label>
                                <input
                                    type="text"
                                    id="branchName"
                                    name="branchName"
                                    value={branch.branchName}
                                    className="transition border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    placeholder="Enter Branch name"
                                    disabled={isEditing ? false : true}
                                    onChange={onChange}
                                />
                            </div>

                            {/* Address Number */}
                            <div className="transition space-x-2 flex">
                                <label
                                    htmlFor="addressNo"
                                    className="transition basis-1/4"
                                >
                                    Add NO.
                                </label>
                                <input
                                    type="text"
                                    id="addressNo"
                                    name="addressNo"
                                    value={branch.addressNo}
                                    className="transition border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    placeholder="Enter Branch address number"
                                    disabled={isEditing ? false : true}
                                    onChange={onChange}
                                />
                            </div>

                            {/* Province */}
                            <div className="transition space-x-2 flex">
                                <label
                                    htmlFor="province"
                                    className="transition basis-1/4"
                                >
                                    Province
                                </label>
                                <input
                                    type="text"
                                    id="province"
                                    name="province"
                                    value={branch.province}
                                    className="transition border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    placeholder="Enter Branch province"
                                    disabled={isEditing ? false : true}
                                    onChange={onChange}
                                />
                            </div>

                            {/* District */}
                            <div className="transition space-x-2 flex">
                                <label
                                    htmlFor="district"
                                    className="transition basis-1/4"
                                >
                                    District
                                </label>
                                <input
                                    type="text"
                                    id="district"
                                    name="district"
                                    value={branch.district}
                                    className="transition border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    placeholder="Enter Branch district"
                                    disabled={isEditing ? false : true}
                                    onChange={onChange}
                                />
                            </div>

                            {/* Sub District */}
                            <div className="transition space-x-2 flex">
                                <label
                                    htmlFor="subdistrict"
                                    className="transition basis-1/4"
                                >
                                    SubDistrict
                                </label>
                                <input
                                    type="text"
                                    id="subdistrict"
                                    name="subdistrict"
                                    value={branch.subdistrict}
                                    className="transition border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    placeholder="Enter Branch subdistrict"
                                    disabled={isEditing ? false : true}
                                    onChange={onChange}
                                />
                            </div>

                            {/* Postcode */}
                            <div className="transition space-x-2 flex">
                                <label
                                    htmlFor="postcode"
                                    className="transition basis-1/4"
                                >
                                    Postcode
                                </label>
                                <input
                                    type="text"
                                    id="postcode"
                                    name="postcode"
                                    value={branch.postcode}
                                    className="transition border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    placeholder="Enter Branch postcode"
                                    disabled={isEditing ? false : true}
                                    onChange={onChange}
                                />
                            </div>
                            {/* </div> */}
                        </div>
                        {isEditing && (
                            <div className=" flex space-x-6 mt-10 justify-end p-10 transition">
                                <button
                                    type="submit"
                                    className=" bg-green-600 p-1 px-4 rounded-full hover:bg-green-500 text-white transition"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={editingHandler}
                                    className=" bg-slate-600 p-1 px-4 rounded-full hover:bg-slate-500 text-white transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};
export default EditDialog;
