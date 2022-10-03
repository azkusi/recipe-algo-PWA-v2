import { React, useEffect, useState } from 'react';



function Timer(props){

    const [countdown, setCountdown] = useState(props.time)

    useEffect(()=>{
        console.log("time at timer is: ", props.time)
        console.log("countdown now: ", countdown.toString())

        let myInterval = setInterval(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1);
            }
            if (countdown === 0) {
                
                clearInterval(myInterval)
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };

        
        
    },[countdown, props])






    if(countdown > 0){
        return(
            <h5>Awaiting step to finish cooking in {countdown} seconds...</h5>
        )
    }else{
        return <h5>No timer yet</h5>;
    }


}


export default Timer



