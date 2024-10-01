import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import ResturantCategory from "./ResturantCategory";

const ResturantMenu = () => {

    
    const [resturantInfo,setResturantInfo] = useState(null);
    const {resturantId} = useParams();
  
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

    const {name, costForTwoMessage, cuisines, avgRatingString, totalRatingsString} = resturantInfo?.data?.cards[2]?.card?.card?.info;
   
    const categories = resturantInfo.data.cards[5].groupedCard.cardGroupMap.REGULAR.cards.filter((c) => {return (c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")} );
    console.log(categories);

    return (
        <div>
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
                            {/* {resturantInfo.data.cards[5].groupedCard.cardGroupMap.REGULAR.cards.map((resturant,index) => {
                                return (
                                    <div>
                                        {resturant.card.card.itemCards && 
                                        (
                                            <h3 className="Menu-title" key={index}>
                                            {
                                                resturant.card.card.title
                                            }
                                           
                                            </h3>       
                                        )}
                                        <table>
                                            <tbody>
                                                {resturant.card.card.itemCards && resturant.card.card.itemCards.map((menuItems,index)=>{
                                                  return  (<div><tr className="menu-items-row" key={index}>
                                                        <td className="menu-items">
                                                            {menuItems.card.info.name}
                                                        </td>
                                                        <td className="menu-itmes-price">
                                                            {'₹ ' + (menuItems.card.info.price/100 || menuItems.card.info.defaultPrice/100)}
                                                        </td>
                                                       
                                                    </tr>
                                                     <tr>
                                                     <td className="menu-items-description">
                                                         {menuItems.card.info.description}
                                                     </td>
                                                     </tr></div>)
                                               
                                                })}

                                            </tbody>
                                        </table>
                                    </div>
                                )
                            })} */}
                             {categories.map((category) => {
                               return (<ResturantCategory key={category?.card?.card?.title} data={category?.card?.card} />)
                            })}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ResturantMenu;