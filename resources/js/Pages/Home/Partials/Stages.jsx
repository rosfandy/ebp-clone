export const Stages = (props) => {
    const { number, title, description } = props;
    return (
        <>
            <div className="flex flex-col">
                <div className="flex justify-center">
                    <div id="circle"
                        className="bg-blue-500 text-white p-8 border-8 border-white md:text-4xl text-3xl rounded-full relative z-[2]">
                        <div className="absolute inset-0 flex items-center justify-center">
                            {number}
                        </div>
                    </div>
                </div>
                <div className="bg-[#ecf3fe] rounded-xl md:px-0 px-4 py-8 flex flex-col gap-y-4 items-center mt-[-3vh] z-[1]">
                    <div className="font-bold text-xl">{title}</div>
                    <div className="text-gray-500 md:text-[16px] text-sm text-center max-w-[33em]">
                        {description}
                    </div>
                </div>
            </div>
        </>
    );
}