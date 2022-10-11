import { React, useEffect, useState } from 'react';



function HowItWorks(props){
    const [screenW, setScreenW] = useState(window.innerWidth)
    // const {width, height} = useWindowSize()

//   useEffect(()=>{
//     setScreenW(width)
//   }, [width, height])

    return (
        <div id='intro' style={{"color": "#04272f", "width": "100%"}}>
            <h5>
                This model is built on the premise that ALL the ingredients
                required for ALL of the meals that will be cooked, will already be chopped/grated/sliced/prepared
                and stored in labelled small storage cases, stored in large walk-in fridges
                in an industrial kitchen. 
            </h5>
            <br/>

            <h5>
                This is done so that the chef can monitor all hobs at the same
                time, without having to divert their attention to chop and prepare ingredients.
                With this model the chef will only have to pick up the prepared ingredients and place them into
                the pot/pan in which the meal is being cooked on the hob - a quick step where the chef's
                attention is not diverted so that he/she can continue monitoring and cooking the 
                other meals.
            </h5>

            <br/>

            <h5>
                Since you will be using this model at home, and won't have pre-cut and
                pre-prepared ingredients sitting in labelled and easily accessible storage, 
                you will have to prepare these ingredients yourself and keep them separate
                (whilst keeping track of which ingredients they are and which meals they are for!).
            </h5>
        </div>
        

    )


}


export default HowItWorks



