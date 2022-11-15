const ParcelForm = ({ onSubmit, onChange, formDetails }) => {
    const {
        firstname,
        lastname,
        phone,
        citizen,
        addressNo,
        province,
        district,
        subdistrict,
        postcode,
    } = formDetails;
    return (
        <form className="space-y-8 text-xl" onSubmit={onSubmit}>
            <div className="flex-col space-y-8 md:space-y-0 md:space-x-10 md:flex-row md:flex">
                <div className="space-y-8 md:w-1/2">
                    {/* Citizen */}
                    <div className="space-x-2 flex">
                        <label htmlFor="citizen" className="basis-1/4">
                            Citizen
                        </label>
                        <input
                            type="number"
                            id="citizen"
                            name="citizen"
                            value={citizen}
                            className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                            placeholder="Enter employee citizen number"
                            onChange={onChange}
                        />
                    </div>
                    {/* Firstname */}
                    <div className="space-x-2 flex">
                        <label htmlFor="firstname" className="basis-1/4">
                            Firstname
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={firstname}
                            className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                            placeholder="Enter employee firstname"
                            onChange={onChange}
                        />
                    </div>
                    {/* Lastname */}
                    <div className="space-x-2 flex">
                        <label htmlFor="lastname" className="basis-1/4">
                            Lastname
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={lastname}
                            className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                            placeholder="Enter employee lastname"
                            onChange={onChange}
                        />
                    </div>
                    {/* Phone */}
                    <div className="space-x-2 flex">
                        <label htmlFor="phone" className="basis-1/4">
                            Phone
                        </label>
                        <input
                            type="number"
                            id="phone"
                            name="phone"
                            value={phone}
                            className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                            placeholder="Enter employee phone number"
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
                        />
                    </div>
                </div>

                <div className="space-y-8 md:w-1/2">
                    {/* addressNo */}
                    <div className="space-x-2 flex">
                        <label htmlFor="addressNo" className="basis-1/4">
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
                        <label htmlFor="subdistrict" className="basis-1/4">
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
            </div>

            {/* <div>
                <button
                    type="submit"
                    className="border-brightRed border-2  rounded-full p-2 px-6 text-brightRed hover:bg-brightRed hover:text-white duration-75"
                >
                    Create
                </button>
            </div> */}
        </form>
    );
};
export default ParcelForm;
