import { numberreddetails } from "../../constants/numberredList";

const NumberredList = () => {
    return (
        // Numbered List
        <div className="flex flex-col space-y-8 md:w-1/2">
            {/* List Item 1 */}
            {numberreddetails.map((item) => {
                return (
                    <div key={item.number}>
                        <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-6">
                            <div className="rounded-l-full bg-brightRedSupLight md:bg-transparent">
                                <div className="flex items-center space-x-2">
                                    <div className="rounded-full bg-brightRed px-4 py-2 text-white md:py-1">
                                        {item.number}
                                    </div>
                                    <h3 className="text-base font-bold md:mb-4 md:hidden">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                            <div>
                                <h3 className="mb-4 hidden text-lg font-bold md:block">
                                    {item.title}
                                </h3>
                                <p className="text-darkGrayishBlue">
                                    {item.detail}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default NumberredList;
