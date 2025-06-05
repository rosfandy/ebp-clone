export const Section = ({ id, children, className, title, description }) => {
    return (
        <section id={id} className={className}>
            <div className="">
                <div className="flex flex-col justify-center items-center">
                    <span className="font-bold xl:text-[28px] text-xl">{title}</span>
                    <div className="w-[6em] h-[0.5vh] rounded-md mt-6 bg-blue-500"></div>
                    <div className="bg-primary h-[3px] rounded-md w-[6em] my-6"></div>
                    <p className="pb-4 text-neutral text-center">{description}</p>
                </div>
                {children}
            </div>
        </section>
    );
};
