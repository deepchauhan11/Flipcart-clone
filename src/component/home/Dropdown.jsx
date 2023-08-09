import { useState } from "react"



const Dropdown = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    return(
        <div className="container">
            <button className="dropdown-toggle" onClick={handleToggle}>
                Login
            </button>
            {
                isOpen && (
                    <ul>
                        <li>hello</li>
                    </ul>
                )
            }
        </div>
    )
}

export default Dropdown;