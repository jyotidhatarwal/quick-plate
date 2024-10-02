import React, { useState, useEffect } from "react";
import ResturantCard, {openedResturant, OpenedResturant} from "./ResturantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useFetch from "../utils/useFetch";

const ResturantCardContainer = () => {
    const [listOfResturant,setListOfResturant] = useState([]);
    const [filteredResturant,setFilteredResturant] = useState([]);
    const [search,setSearch] = useState("");

    // const OpenedResturantCard = OpenedResturant(ResturantCard);

    const resturantApi = "https://www.swiggy.com/mapi/homepage/getCards?lat=28.7040592&lng=77.10249019999999";

    // const { listOfResturant, filteredResturant } = useFetch(resturantApi);
    
    const fetchData = async () => {
        try {
            const data = await fetch(resturantApi);
            const jsonData = await data.json();
            console.log('Json data', jsonData);
            const fetchedResturant = jsonData?.data?.success?.cards[3]?.gridWidget?.gridElements?.infoWithStyle?.restaurants || [];
            console.log('Fetched resturants',fetchedResturant);
            setListOfResturant(fetchedResturant);
            setFilteredResturant(fetchedResturant);
        }catch (error) {
            console.log("Error is fetched", error);
        }
       
    };

    useEffect(()=>{
        console.log("Resturant card container");
        fetchData();
    },[]);
    

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
        <div className="flex justify-between p-4 items-center">
            <div className="flex justify-start p-4 ml-4">
                <button className="bg-gradient-to-l from-teal-700 to-teal-400 w-[16rem] hover:text-black text-white font-bold p-2 rounded"
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
            <div className="flex justify-between items-center mx-auto shadow-md border-2 px-6 py-1 rounded-full w-[32rem] ml-[3.4rem]">
                <input className="focus:outline-none focus:border-transparent flex-grow text-left" 
                   onChange={(event) => {
                    setSearch(event.target.value)
                   }}
                   onKeyDown={handleSearch}
                   value={search}
                />
                <button className="focus:outline-none focus:border-transparent ml-4" onClick={()=>{
                   const resturantFiltered = listOfResturant.filter(res => {
                        return res?.info?.name.toLowerCase().includes(search.toLowerCase());
                   })
                   setFilteredResturant(resturantFiltered);
                }}>Search</button>

            </div>
        </div>
            <div className="flex flex-wrap mx-12 shadow-lg justify-evenly">
            {filteredResturant.map(resturant => (
               <Link to={"/resturants/"+resturant.info.id} key={resturant.info.id} style={{textDecoration: 'none'}}> 
                    {/* {resturant.info.veg ? (<OpenedResturantCard resturantData={resturant} />) : (<ResturantCard  resturantData={resturant} />)} */}
                        <ResturantCard  resturantData={resturant} /> 
                </Link>
            ))} 
      
            </div>

           </div>
    )
}

export default ResturantCardContainer;