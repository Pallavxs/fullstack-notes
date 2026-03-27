const Card = ({user}) => {
    return (
        <div className="bg-white h-80 w-60 p-5 pt-16  shadow-md text-center relative" >
            <span className="absolute top-4 left-4 bg-green-400 text-white text-xs rounded-full">
                Available
            </span>

            <span className="absolute top-4 right-4 text-gray-600 font-semibold">
                {user.pricePerHour}/hr
            </span>

            <div className="flex justify-center mt-16">
                <img className="w-24 h-24 rounded-full object-cover shadow-md" src={user.profileImg} alt="" />
            </div>

            <h2 className="mt-12 text-lg font-semibold text-gray-800">
                {user.fullName}
            </h2>
            
            <p className="text-gray-500 text-sm">
                {user.jobTitle}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-3">
                {user.skills.slice(0,3).map((skill) =>(
                    <span className="border px-2 py-1 rounded-full text-xs text-gray-600 bg-gray-200">
                    {skill}
                    </span>
                ))}
            </div>

            <p className="text-gray-500 text-sm mt-4">
                {user.description}
            </p>

            <button className="mt-4 text-gray-700 font-semibold border-t pt-3 w-full">
                ViEW PROFILE
            </button>


        </div>
    )
}

export default Card;

