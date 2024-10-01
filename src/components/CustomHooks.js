import useFetch from "../utils/useFetch";

const CustomHooks = () => {
    const {data} = useFetch('https://www.swiggy.com/mapi/homepage/getCards?lat=28.7040592&lng=77.10249019999999');
    
    console.log('This is custom hooks',data);
}

export default CustomHooks;