import ParcelForm from "../../../components/admin/groups/ParcelForm";

const EditDialog = ({
    onExitHandler,
    onSubmit,
    receiverFormDetails,
    onReceiverChange,
    onParcelChange,
    parcelFormDetails,
    isEditing,
    editingHandler,
}) => {
    return (
        <div className="">
            <div className="bg-slate-200 rounded-xl h-4/5 lg:h-3/5 w-3/5 absolute top-0 left-0 right-0 bottom-0 m-auto transition overflow-auto p-10">
                <div className="flex flex-col space-y-10">
                    <div className="text-4xl flex justify-between">
                        <div className="flex items-center space-x-6">
                            <h1>Parcel details</h1>
                        </div>
                        <button onClick={onExitHandler}>X</button>
                    </div>
                    <div>
                        <h1 className="text-2xl">รายละเอียดพัสดุ</h1>
                        <hr className="my-4" />
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
                                    onChange={onParcelChange}
                                />
                            </div>
                            {/* weight */}
                            <div className="space-x-2 flex">
                                <label htmlFor="weight" className="basis-1/4">
                                    Weight
                                </label>
                                <input
                                    type="text"
                                    id="weight"
                                    name="weight"
                                    value={parcelFormDetails.weight}
                                    className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    placeholder="Enter parcel weight"
                                    disabled={isEditing ? false : true}
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
                                    value={parcelFormDetails.typeofshipment}
                                    className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    onChange={onParcelChange}
                                    disabled={isEditing ? false : true}
                                >
                                    <option value="Normal">Normal</option>
                                    <option value="Express">Express</option>
                                    <option value="Same day">Same day</option>
                                </select>
                            </div>
                            {/* typeofstuff */}
                            <div className="space-x-2 flex">
                                <label htmlFor="role" className="basis-1/4">
                                    Type of stuff inside parcel
                                </label>
                                <select
                                    name="typeofstuff"
                                    id="typeofstuff"
                                    value={parcelFormDetails.typeofstuff}
                                    className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    onChange={onParcelChange}
                                    disabled={isEditing ? false : true}
                                >
                                    <option value="Normal">Normal</option>
                                    <option value="Electronics Device">
                                        Electronics Device
                                    </option>
                                    <option value="Fragile">Fragile</option>
                                    <option value="Foods">Foods</option>
                                </select>
                            </div>
                            {/* boxsizing */}
                            <div className="space-x-2 flex">
                                <label
                                    htmlFor="boxsizing"
                                    className="basis-1/4"
                                >
                                    Box Size
                                </label>
                                <select
                                    name="boxsize"
                                    id="boxsize"
                                    value={parcelFormDetails.boxsize}
                                    className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    onChange={onParcelChange}
                                    disabled={isEditing ? false : true}
                                >
                                    <option value="A4">A4</option>
                                    <option value="A5">A5</option>
                                    <option value="A6">A6</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-10">
                        <div>
                            <h1 className="text-2xl">รายละเอียดผู้รับ</h1>
                            <hr className="my-4" />
                            <div>
                                <ParcelForm
                                    formDetails={receiverFormDetails}
                                    onSubmit={onSubmit}
                                    onChange={onReceiverChange}
                                    isEditing={isEditing}
                                />
                            </div>
                        </div>
                    </div>

                    {isEditing && (
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={onSubmit}
                                className="bg-brightRed text-white hover:bg-brightRedLight p-2 px-6"
                            >
                                UPDATE
                            </button>
                            <button
                                onClick={editingHandler}
                                className="bg-slate-500 text-white hover:bg-slate-300 p-2 px-6"
                            >
                                CANCEL
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditDialog;
