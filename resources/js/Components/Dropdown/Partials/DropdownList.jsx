export const DropdownList = (props) => {
    const { children, onClick = null, href = null } = props
    return (
        <a href={href} onClick={onClick} className="flex items-center gap-x-2 text-sm p-2 mt-2 hover:text-blue-500 hover:bg-sky-100/30 duration-100 cursor-pointer">
            {children}
        </a>
    )
}