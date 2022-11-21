import ParcelForm from "../../../components/admin/groups/ParcelForm";

const GroupEditDialog = ({
    isEditing,
    onExitHandler,
    onSubmit,
    onParcelChange,
    parcelFormDetails,
    weight,
    parcelCount,
    branch: branchsList,
    editingHandler,
}) => {
    console.log(parcelFormDetails);
    return (
        <div className="">
            <div className="bg-slate-200 rounded-xl h-4/5 lg:h-3/5 w-3/5 absolute top-0 left-0 right-0 bottom-0 m-auto transition overflow-auto p-10">
                <div className="flex flex-col space-y-10">
                    <div className="text-4xl flex justify-between">
                        <div className="flex items-center space-x-6 align-middle">
                            <h1>Group details</h1>
                            {!isEditing && (
                                <button
                                    className="text-xl bg-brightRed py-1 px-4 rounded-full hover:bg-brightRedLight text-white"
                                    onClick={editingHandler}
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                        <button onClick={onExitHandler}>X</button>
                    </div>
                    <div>
                        <h1 className="text-2xl">รายละเอียดของกลุ่มพัสดุ</h1>
                        <hr className="my-4" />
                        <div className="flex flex-col space-y-6 max-w-4xl">
                            {/* Group ID */}
                            <div className="space-x-2 flex">
                                <label htmlFor="_id" className="basis-1/4">
                                    Group ID
                                </label>
                                <input
                                    type="text"
                                    id="_id"
                                    name="_id"
                                    value={parcelFormDetails._id}
                                    className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    onChange={onParcelChange}
                                    disabled={true}
                                />
                            </div>
                            {/* weight */}
                            <div className="space-x-2 flex">
                                <label htmlFor="weight" className="basis-1/4">
                                    Total Weight
                                </label>
                                <input
                                    type="text"
                                    id="weight"
                                    name="weight"
                                    value={parcelFormDetails.totalWeight}
                                    className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    placeholder="Enter group weight"
                                    onChange={onParcelChange}
                                    disabled={true}
                                />
                            </div>
                            {/* parcels */}
                            <div className="space-x-2 flex">
                                <label
                                    htmlFor="totalParcels"
                                    className="basis-1/4"
                                >
                                    Total Parcels
                                </label>
                                <input
                                    type="text"
                                    id="totalParcels"
                                    name="totalParcels"
                                    value={parcelFormDetails.totalParcels}
                                    className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    placeholder="Enter parcel weight"
                                    onChange={onParcelChange}
                                    disabled={true}
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
                            {/* Bag size */}
                            <div className="space-x-2 flex">
                                <label htmlFor="bagsize" className="basis-1/4">
                                    Bag Size
                                </label>
                                <select
                                    name="bagsize"
                                    id="bagsize"
                                    value={parcelFormDetails.boxsize}
                                    className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    onChange={onParcelChange}
                                    disabled={isEditing ? false : true}
                                >
                                    <option value="BAG 01">BAG 01</option>
                                    <option value="BAG 02">BAG 02</option>
                                    <option value="BAG 03">BAG 03</option>
                                </select>
                            </div>
                            {/* Target Branch */}
                            <div className="space-x-2 flex">
                                <label htmlFor="role" className="basis-1/4">
                                    Target Branch
                                </label>
                                <select
                                    name="branch"
                                    id="branch"
                                    value={parcelFormDetails.branch}
                                    className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                                    onChange={onParcelChange}
                                    disabled={isEditing ? false : true}
                                >
                                    <option value="NULL">
                                        --- Must Select ---
                                    </option>
                                    {/* // This will be dynamic */}
                                    {branchsList.map((each) => {
                                        return (
                                            <option
                                                value={each._id}
                                                key={each._id}
                                            >
                                                {`${each.branchName} (${each._id})`}
                                            </option>
                                        );
                                    })}
                                </select>
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

export default GroupEditDialog;
