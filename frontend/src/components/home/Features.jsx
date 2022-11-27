import NumberredList from "./NumberredList";

const Features = () => {
    return (
        <section id="features">
            <div className="container mx-auto mt-10 flex flex-col space-y-12 px-4 md:flex-row md:space-y-0 mb-28">
                {/* What's different */}
                <div className="flex flex-col space-y-12 md:w-1/2">
                    <h2 className="max-w-md text-center text-4xl font-bold md:text-left">
                        Parcel Registration?
                    </h2>
                    <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
                        Take the customer's individual information. including
                        parcel information into the database thoroughly ready to
                        verify the correctness.
                    </p>
                </div>
                <NumberredList />
            </div>
        </section>
    );
};
export default Features;
