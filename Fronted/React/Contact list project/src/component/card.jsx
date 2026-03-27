const Card = ({alldata}) => {
    return (
        <div className="bg-white h-80 w-60 p-5 pt-16  shadow-md text-center relative" >

            <div className="flex justify-center mt-16">
                <img className="w-24 h-24 rounded-full object-cover shadow-md" src={alldata.name} alt="" />
            </div>

            <h2 className="mt-12 text-lg font-semibold text-gray-800">
                {user.userName}
            </h2>
            <h2 className="mt-12 text-lg font-semibold text-gray-800">
                {user.contactnumber}
            </h2>
            <h2 className="mt-12 text-lg font-semibold text-gray-800">
                {user.email}
            </h2>
            

            <div className="flex flex-wrap justify-center gap-3 mt-3">
                {user.skills.slice(0,3).map((skill) =>(
                    <span className="border px-2 py-1 rounded-full text-xs text-gray-600 bg-gray-200">
                    {skill}
                    </span>
                ))}
            </div>


        </div>
    )
}

export default Card;
