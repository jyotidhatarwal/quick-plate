const ResturantCard = (props) => {
    const {resturantData} = props;
    const {name, avgRating, cuisines, cloudinaryImageId} = resturantData?.info;
    return (
        <table className="resturant-card-table">
            <tbody>
                <tr className="resturant-image">
                    <td>
                        <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${cloudinaryImageId}`} alt="resturant-image" />
                    </td>
                </tr>
                <tr className="resturant-name">
                    <td>
                    {name}
                    </td>
                </tr>
                <tr className="resturant-rating">
                    <td>
                        {avgRating}
                    </td>
                </tr>
                <tr className="resturant-cusines">
                    <td>
                        {cuisines.join(", ")}
                    </td>
                </tr>
            </tbody>
        </table>
    )
};

// Higher order component

export const OpenedResturant = (ResturantCard) => {
    return (props) => {
        return (
            <div>
                <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Opened</label>
                <ResturantCard {...props} />
            </div>
        )
    }
}

export default ResturantCard;