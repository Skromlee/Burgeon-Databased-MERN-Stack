import NumberredList from "./NumberredList"

const Features = () => {
    return (
        <section id="features">
            <div className="container mx-auto mt-10 flex flex-col space-y-12 px-4 md:flex-row md:space-y-0">
                {/* What's different */}
                <div className="flex flex-col space-y-12 md:w-1/2">
                <h2 className="max-w-md text-center text-4xl font-bold md:text-left">
                    What's different about Burgeon?
                </h2>
                <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
                        Burgeon provides all the functionality your team needs,
                        without the complexity. Our software is tailor-made for
                        modern digital product teams.
                </p>
                </div>
                <NumberredList />
            </div>
        </section>
    )
}
export default Features