import { useState, useEffect } from "react"
import { axiosClient, axiosClientRequestAuthConfig } from "../config/axiosClient"

const colors = ["#FF5733","#FFE633","#3982E7","#69E739","#E239E7"]
.sort( () => Math.random() - 0.5)

let choosed = -1
let rnd = 1

const validCaptcha = () => {
  return choosed === rnd
}

const MyCaptcha = () => {
    
  const [imgData, setImgData] = useState("")

    useEffect(()=>{
      const getCatptchaNumber = async () => {
        rnd = Math.floor(Math.random() * 5) + 1;
        const { data } = await axiosClient.post(`/users/captcha/${rnd}`,{})
        setImgData(data.img)
      }
      getCatptchaNumber()
    },[])

    const [response, setResponse] = useState("")
    
    const handleClick = (evt) => {
      setResponse(evt.target.id)
      choosed = colors.indexOf(evt.target.id) + 1
    }

  return (
    <div>
      <div className="mx-auto w-64 flex justify-between">
        <h3><span className="font-bold mr-2">Captcha:</span>Select color number</h3>
        <img src={imgData} alt="captcha" />
        
      </div>
      <div className="mx-auto flex items-center w-64">
        {colors.map( color => (
            <div 
                  key={color} 
                  className={`w-screen ${response === color ? "border-4 border-gray-600" : ""} hover:cursor-pointer`}
                  style={ {backgroundColor: `${color}`}}
                  id={color}
                  onClick={handleClick}
              >&nbsp;</div>            
        ))}       
      </div>
    </div>
  )
}
export {
    MyCaptcha,
    validCaptcha
}
