const PostcodeInput = ({
    postcode,
    onChange,
    suggestion,
    informationFromPostcode,
    onSuggestHandler,
    onBlurHandler,
    onFocusHandler,
    isEditing,
}) => {
    return (
        <div className="flex-col flex">
            <div className="space-x-2 flex">
                <label htmlFor="postcode" className="basis-1/4">
                    Postcode
                </label>
                <div className="flex-col basis-2/3">
                    <div className="relative">
                        <input
                            type="number"
                            id="postcode"
                            name="postcode"
                            value={postcode}
                            className="border-[1px] border-black rounded-md focus:outline-none w-full px-2"
                            placeholder="Enter employee postcode"
                            onChange={onChange}
                            onBlur={onBlurHandler}
                            onFocus={onFocusHandler}
                            disabled={isEditing ? false : true}
                        />
                    </div>

                    <div className="flex-col absolute rounded-lg bg-slate-200 max-h-80 overflow-auto">
                        {suggestion &&
                            informationFromPostcode &&
                            informationFromPostcode.map(
                                (informationFromPostcode, i) => (
                                    <h1
                                        key={i}
                                        className="hover:cursor-pointer hover:border-l-2 hover:border-brightRed  px-2"
                                        onMouseDown={() =>
                                            onSuggestHandler(
                                                informationFromPostcode
                                            )
                                        }
                                    >
                                        {informationFromPostcode.postcode} -
                                        {">"} {informationFromPostcode.province}{" "}
                                        -{">"}{" "}
                                        {informationFromPostcode.district} -
                                        {">"}{" "}
                                        {informationFromPostcode.subdistrict}
                                    </h1>
                                )
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostcodeInput;
