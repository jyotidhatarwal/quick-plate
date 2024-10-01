import { useEffect, useState } from "react";

function useFetch(url){

    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [listOfResturant,setListOfResturant] = useState([]);
    const [filteredResturant,setFilteredResturant] = useState([]);
    

        const fetchData = async () => {
            const result = await fetch(url);
            const jsonData = await result.json();
            const fetchedRestaurants = jsonData?.data?.success?.cards[3]?.gridWidget?.gridElements?.infoWithStyle?.restaurants || [];
            setListOfResturant(fetchedRestaurants);
            setFilteredResturant(fetchedRestaurants);
            setLoading(true);
            console.log('Use fetch was called from custom');
        }

        useEffect(()=>{
            fetchData();
        },[url])
        
   

    return {data, loading, listOfResturant, filteredResturant };

}

export default useFetch;