import PostcodeInput from "../../../components/common/PostcodeInput";

const ParcelForm = ({
    onSubmit,
    onChange,
    formDetails,
    isEditing,
    suggestion,
    informationFromPostcode,
    onSuggestHandler,
    onBlurHandler,
    onFocusHandler,
}) => {
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
                            disabled={isEditing ? false : true}
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
                            disabled={isEditing ? false : true}
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
                            disabled={isEditing ? false : true}
                        />
                    </div>

                    {/* postcode */}

                    <PostcodeInput
                        postcode={postcode}
                        onChange={onChange}
                        suggestion={suggestion}
                        informationFromPostcode={informationFromPostcode}
                        onSuggestHandler={onSuggestHandler}
                        onBlurHandler={onBlurHandler}
                        onFocusHandler={onFocusHandler}
                        isEditing={isEditing}
                    />
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
                            disabled={isEditing ? false : true}
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
                            disabled={isEditing ? false : true}
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
                            disabled={isEditing ? false : true}
                        />
                    </div>

                    {/* subdistrict */}
                    <div className="space-x-2 flex">
                        <label htmlFor="subdistrict" className="basis-1/4">
                            Sub District{isEditing}
                        </label>
                        <input
                            type="text"
                            id="subdistrict"
                            name="subdistrict"
                            value={subdistrict}
                            className="border-[1px] border-black rounded-md focus:outline-none px-2 basis-2/3"
                            placeholder="Enter employee subdistrict"
                            onChange={onChange}
                            disabled={isEditing ? false : true}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};
export default ParcelForm;
