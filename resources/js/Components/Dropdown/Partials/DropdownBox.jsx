import { motion, AnimatePresence } from "framer-motion";
import "../style.css"

export const DropdownBox = (props) => {
    const { children, title, description, show, left = 0, right = 0, top = 0, bottom = 0 } = props;
    const rightStyle = `before:mr-${right} after:mr-${right}`;
    const topStyle = `before:mt-${top} after:mt-${top}`;
    const bottomStyle = `before:mb-${bottom} after:mb-${bottom}`
    const leftStyle = `before:ml-${left} after:ml-${left}`

    const dropdownVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
    };

    return (
        <>
            <AnimatePresence>
                {show &&
                    <motion.div
                        className="dropdown absolute z-10 right-0 flex justify-center"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="mt-4 max-w-[20em] min-w-[15em]">
                            <div id="triangle" className={`${rightStyle} ${topStyle} ${bottomStyle} ${leftStyle}`} />
                            <div className="bg-white border shadow-md rounded-md px-4 py-4 mt-[-0.2em]">
                                {title && <div className="text-sm py-1">{title}</div>}
                                {description && <div className="text-sm text-gray-500">{description}</div>}
                                <div className="flex flex-col justify-center border-t mt-2 text-gray-500 font-medium">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    );
};