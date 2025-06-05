export const TitleSection = (props) => {
    const { title, description } = props

    return (
        <>
            <div className="pt-2 pb-4">
                <div className="flex items-center gap-x-2">
                    <div className="bg-blue-500 h-[0.7vh] w-[2em] rounded"></div>
                    <span className="text-md">{title}</span>
                </div>
                <div className="flex items-center gap-x-2 mt-2">
                    <div className="w-[2em]"></div>
                    <p className="md:text-sm text-xs text-neutral text-gray-500">
                        {description}
                    </p>
                </div>
            </div>
        </>
    )
}