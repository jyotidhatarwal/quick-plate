import { useState } from "react";
import MenuItems from "./MenuItems";

const ResturantCategory = ({data}) => {

    const [showItems,setShowItems] = useState(null);

    const handleClick = () => {
        setShowItems(!showItems);
    }

    return (
        <div>
            <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4" >
                <div className="flex justify-between cursor-pointer" onClick={handleClick}>
                    <span className="font-bold text-lg">{data.title} ({data.itemCards.length})</span>
                    <span>^</span>
                </div>
            </div>
         
          {showItems && <MenuItems items={data.itemCards} />}
        </div>
    )
}

export default ResturantCategory;