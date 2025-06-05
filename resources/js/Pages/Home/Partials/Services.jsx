export const Services = (props) => {
    const { attributes, href, img, title, desc } = props
    return (
        <>
            <a {...attributes} href={href} className="transform transition duration-300 ease-in-out hover:scale-105">
                <div className="flex flex-col justify-center items-center gap-y-4">
                    <div className="text-center flex flex-col gap-y-4">
                        <div className="rounded-[50%] bg-white shadow-lg p-4">
                            <img width="70px" height="70px" src={img} alt={title + "-bp"} className="" />
                        </div>
                    </div>
                    <div className="text-center flex flex-col gap-y-2">
                        <div className="text-blue-500 text-lg">{title}</div>
                        <div className="text-gray-500 text-sm">{desc}</div>
                    </div>
                </div>
            </a>

        </>
    )
}