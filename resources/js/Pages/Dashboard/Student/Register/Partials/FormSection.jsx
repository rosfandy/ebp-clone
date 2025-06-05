export const FormSection = (props) => {
    const { children, title } = props
    return (
        <div className="flex flex-col gap-y-2">
            {title &&
                <h1 className="text-neutral text-sm">{title}</h1>
            }
            <div className="flex md:flex-row flex-col gap-y-2 gap-x-2 ">
                {children}
            </div>
        </div>
    )
}