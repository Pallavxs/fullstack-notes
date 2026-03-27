import React, { createContext, useContext } from 'react'

export const UserContextData = createContext() // createContext creates a empty object where they store Provider,Consumer,value that stored in variable 

const UserContext = ({children}) => {
    
    console.log(children)
    let user = [
  {
    id: 1,
    name: { firstname: "John", lastname: "Doe" },
    email: "john@gmail.com",
    phone: "9876543210",
    address: {
      city: "New York",
      street: "5th Avenue",
      zipcode: "10001"
    }
  },
  {
    id: 2,
    name: { firstname: "Emma", lastname: "Watson" },
    email: "emma@gmail.com",
    phone: "9123456780",
    address: {
      city: "London",
      street: "Baker Street",
      zipcode: "NW1"
    }
  },
  {
    id: 3,
    name: { firstname: "Aarav", lastname: "Sharma" },
    email: "aarav@gmail.com",
    phone: "9988776655",
    address: {
      city: "Delhi",
      street: "Connaught Place",
      zipcode: "110001"
    }
  },
  {
    id: 4,
    name: { firstname: "Sophia", lastname: "Lee" },
    email: "sophia@gmail.com",
    phone: "9012345678",
    address: {
      city: "Seoul",
      street: "Gangnam",
      zipcode: "06000"
    }
  },
  {
    id: 5,
    name: { firstname: "Liam", lastname: "Smith" },
    email: "liam@gmail.com",
    phone: "8899776655",
    address: {
      city: "Sydney",
      street: "George Street",
      zipcode: "2000"
    }
}
]


  return (
    <div>
        <UserContextData.Provider value={user}> // wrap the children inside that empty object and provide globally and pass value 
            {children}
        </UserContextData.Provider>
    </div>
  )
}

export default UserContext