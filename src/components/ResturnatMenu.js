import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import ResturantCategory from "./ResturantCategory";
import { LINKEDIN, STAR } from "../utils/constants";
import bicycle from "../utils/bicycle.svg";
import location from "../utils/location.svg";
import linkedin from "../utils/linkedin.svg";

const ResturantMenu = () => {

    
    const [resturantInfo,setResturantInfo] = useState(null);
    const {resturantId} = useParams();
    const [showIndex, setShowIndex] = useState(null);
  
    useEffect(()=>{
        fetchData();
    },[]);
    const api = "https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7040592&lng=77.10249019999999&restaurantId="+resturantId;
    const fetchData = async () => {
        const data = await fetch(api);
        const jsonData = await data.json();
        console.log("Json Data", jsonData);
       setResturantInfo(jsonData);
    };
  
    if(resturantInfo === null) {
        return <Shimmer />
    }

    const {name, costForTwoMessage, cuisines, avgRatingString, totalRatingsString, avgRating, areaName, city} = resturantInfo?.data?.cards[2]?.card?.card?.info;
   
    const categories = resturantInfo.data.cards[5].groupedCard.cardGroupMap.REGULAR.cards.filter((c) => {return (c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")}) || [];
    console.log('Categories',categories);

    const restaurantAddresses = resturantInfo.data.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
        (c) => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.RestaurantAddress"
    ) || [];
    console.log('resturant address',restaurantAddresses);

    return (
        <>
        <div className="justify-evenly mx-64 my-4 shadow-2xl px-20 py-2">
        <h1 className="font-extrabold text-xl text-neutral-700 py-4 ml-1">{name || 'Restaurant Name'}</h1>
        <div className="border-4 border-gray-100 shadow-lg rounded-xl p-4 mb-12 ">
            <div className="flex py-2">
                <img className="w-4 h-4 " src={STAR} />
                <div className="text-sm font-serif px-2">
                    {avgRating || 'N/A'} { "• " + (totalRatingsString || 'No Ratings')}
                </div>
                <h4 className="text-sm font-medium px-1 ">{ "• " + (costForTwoMessage || 'Cost not available')}</h4>
            </div>
            <div className="text-sm font-bold text-teal-800">{cuisines?.join(', ') || 'Cuisines not available'}</div>
            <div className="text-xs ">{areaName || 'Area Name'}, {city || 'City'}</div>
            <hr className="w-full my-4 "></hr>
            <div className="flex">
                <div className="w-6">
                    <img src={bicycle} alt="ride"></img>
                </div> 
            </div>
        </div>
        
        {/* Category accordion */}
        <div>
            {categories.map((category, index) => (
                <ResturantCategory 
                    key={category?.card?.card?.title || index} 
                    data={category?.card?.card}
                    showItems={index === showIndex}
                    setShowIndex={() => setShowIndex(index)} 
                />
            ))}
        </div>
        <div className="bg-gradient-to-l from-teal-50 to-yellow-50 rounded border-transparent shadow-sm w-full h-48 my-8 ">
            <div className="mx-4 my-6">
                {restaurantAddresses.map((address, index) => (
                    <div key={index} className="py-4 overflow-hidden">
                        <div className="text-xs font-bold leading-normal text-gray-500"> {address.card.card.name}</div>
                        <div className="text-[0.6rem] text-gray-500 leading-loose"> Outlet: {address.card.card.area}</div>
                        <div className="flex justify-items-start">
                            <img src={location} alt="location" className="w-3 h-4 flex-shrink-0"/>
                            <div className="text-[0.6rem] ml-1 text-gray-500"> {address.card.card.completeAddress}</div>
                        </div>
                        <hr className="my-4 shadow-lg border-gray-400"></hr>
                        <div className="m-2">
                            <p className="font-cursive text-[0.6rem] text-gray-500">Quick Plate is a food delivery web application developed for learning purposes. If you have any questions or feedback, feel free to connect with me on LinkedIn.</p>
                            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                                <img src={linkedin} alt="LinkedIn" className="my-4 mx-auto w-4"/>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>









        {/* <div>
            <h1 className="resturant-name">{name}</h1>
            <table className="resturant-info">
                <tbody>
                    <tr>
                        <td>
                           {avgRatingString +"( " + totalRatingsString + " )"} 
                        </td>
                        <td>
                            {costForTwoMessage}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {cuisines.join(", ")}
                        </td>
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        <td>
                             {categories.map((category) => {
                               return (<ResturantCategory key={category?.card?.card?.title} data={category?.card?.card} />)
                            })}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> */}
        </>
    )
}

export default ResturantMenu;