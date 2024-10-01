import React, { useState, useEffect } from "react";
import ResturantCard, {openedResturant, OpenedResturant} from "./ResturantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useFetch from "../utils/useFetch";

const ResturantCardContainer = () => {
    // const [listOfResturant,setListOfResturant] = useState([]);
    // const [filteredResturant,setFilteredResturant] = useState([]);
    const [search,setSearch] = useState("");

    const OpenedResturantCard = OpenedResturant(ResturantCard);

    const resturantApi = "https://www.swiggy.com/mapi/homepage/getCards?lat=28.7040592&lng=77.10249019999999";

    const { listOfResturant, filteredResturant } = useFetch(resturantApi);
    
    // const fetchData = async () => {
    //     try {
    //         const data = await fetch(resturantApi);
    //         const jsonData = await data.json();
    //         const fetchedResturant = jsonData?.data?.success?.cards[3]?.gridWidget?.gridElements?.infoWithStyle?.restaurants || [];
    //         console.log(fetchedResturant);
    //         setListOfResturant(fetchedResturant);
    //         setFilteredResturant(fetchedResturant);
    //     }catch (error) {
    //         console.log("Error is fetched", error);
    //     }
       
    // };

    // useEffect(()=>{
    //     console.log("Resturant card container");
    //     fetchData();
    // },[]);
    

    const handleSearch = (event) => {
        if(event.key === 'Enter'){
            const searchQuery = event.target.value.toLowerCase();
            const filteredList = listOfResturant.filter(res => {
               return res.info.name.toLowerCase().includes(searchQuery);
            });
            setFilteredResturant(filteredList);
        }
    }
    console.log("Before use effect");
    return listOfResturant.length === 0 ? <Shimmer /> : (
       <div>
        <div className="Filter-container">
            <div className="btn-container">
                <button
                    onClick={()=>{
                        const filterResturant = listOfResturant.filter(res => {
                            return (res.info.avgRating > 4.3)
                        });
                        setFilteredResturant(filterResturant);
                        console.log(filterResturant);
                    }}
                >
                    Top rated Resturant
                </button>
            </div>
            <div className="search-container">
                <input className="search-input" 
                   onChange={(event) => {
                    setSearch(event.target.value)
                   }}
                   onKeyDown={handleSearch}
                   value={search}
                />
                <button className="search-btn" onClick={()=>{
                   const resturantFiltered = listOfResturant.filter(res => {
                        return res?.info?.name.toLowerCase().includes(search.toLowerCase());
                   })
                   setFilteredResturant(resturantFiltered);
                }}>Search</button>

            </div>
        </div>
            <div className="resturant-card-container">
            {filteredResturant.map(resturant => (
               <Link to={"/resturants/"+resturant.info.id} key={resturant.info.id} style={{textDecoration: 'none'}}> 
                    {resturant.info.veg ? (<OpenedResturantCard resturantData={resturant} />) : (<ResturantCard  resturantData={resturant} />)}
                        {/* <ResturantCard  resturantData={resturant} />  */}
                </Link>
            ))} 
      
            </div>

           </div>
    )
}

export default ResturantCardContainer;