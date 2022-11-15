import { Link } from "react-router-dom";
import { testimonials } from "../../constants/testimonail";

const Testimonails = () => {
    return (
        // Testimonails
        <section id="testimonails">
            {/* Container to heading and testm blocks */}
            <div className="mx-auto mt-32 max-w-6xl px-5 text-center">
                {/* Heading */}
                <h2 className="text-center text-4xl font-bold">
                    What's Different About Manage?
                </h2>
                {/* Testimonials Container */}
                <div className="mt-24 flex flex-col md:flex-row md:space-x-6">
                    {/* Testimonails 1 */}

                    {testimonials.map((testimonail, idx) => {
                        let classed =
                            "flex flex-col items-center space-y-6 rounded-lg bg-veryLightGray p-6 md:w-1/3 ";
                        if (idx !== 0) {
                            classed = classed + "hidden md:flex";
                        }
                        return (
                            <div className={classed} key={idx}>
                                <img
                                    src={`/images/peple/${testimonail.path}`}
                                    alt="Anisha Li Avatar"
                                    className="-mt-14 w-16"
                                />
                                <h5 className="text-lg font-bold">
                                    {testimonail.name}
                                </h5>
                                <p className="text-sm text-darkGrayishBlue">
                                    {testimonail.comment}
                                </p>
                            </div>
                        );
                    })}
                </div>
                {/* Button */}
                <div className="my-16">
                    <Link
                        to="/signup"
                        className="baseline rounded-full bg-brightRed p-3 px-6 pt-2 text-white hover:bg-brightRedLight"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </section>
    );
};
export default Testimonails;
