const useResturantData = async () => {
    const resturantApi = "https://www.swiggy.com/mapi/homepage/getCards?lat=28.7040592&lng=77.10249019999999";

        try {
            const data = await fetch(resturantApi);
            const jsonData = await data.json();
            const fetchedResturant = jsonData?.data?.success?.cards[3]?.gridWidget?.gridElements?.infoWithStyle?.restaurants || [];
            console.log(fetchedResturant);
            return fetchedResturant;
           
        }catch (error) {
            console.log("Error is fetched", error);
            return error;
        }
}

export default useResturantData;