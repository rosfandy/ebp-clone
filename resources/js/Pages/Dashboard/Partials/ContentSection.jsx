export const ContentSection = (props) => {
    const { children, title, direction = 'column', className = 'w-full' } = props;
    const flexDirection = direction === 'column' ? 'flex-col gap-y-4' : 'flex-row gap-x-4';
    return (
        <>
            <div className={"bg-white shadow rounded p-4" + ' ' + className}>
                <div className="text-sm text-neutral mb-2 text-gray-500">{title}</div>
                <div className={"flex" + ' ' + flexDirection}>
                    {children}
                </div>
            </div>
        </>
    );
};