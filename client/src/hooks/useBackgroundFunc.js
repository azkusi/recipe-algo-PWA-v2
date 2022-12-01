
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

import { db } from '../config';

import {useEffect, useState } from 'react';




  //get updated to_do steps after every change
//==============================================================================
// ANY TIME THERE IS A CHANGE/ADDITION/REMOVAL FROM THE TO-DO-STEPS COLLECTION
// SEND THAT DATA (I.E THE NEW REMAINING TO DO STEPS) TO THE ALGO
//==============================================================================
const useBackgroundFunc = (toDoStepsFBInstance, num_recipes) => {
        const [toDos, setToDos] = useState(null)
        // console.log("useBackgroundFunc render ran again...")
        const [background_colours, set_background_colours] = useState([])

        const [background_colour_1, set_background_colour_1] = useState('#CBCBCB')
        const [background_colour_2, set_background_colour_2] = useState('#CBCBCB')
        const [background_colour_3, set_background_colour_3] = useState('#CBCBCB')
        const [background_colour_4, set_background_colour_4] = useState('#CBCBCB')
        const [background_colour_5, set_background_colour_5] = useState('#CBCBCB')
        const [background_colour_6, set_background_colour_6] = useState('#CBCBCB')
        const [background_colour_7, set_background_colour_7] = useState('#CBCBCB')
        const [background_colour_8, set_background_colour_8] = useState('#CBCBCB')
        const [background_colour_9, set_background_colour_9] = useState('#CBCBCB')
        const [background_colour_10, set_background_colour_10] = useState('#CBCBCB')
        const [background_colour_11, set_background_colour_11] = useState('#CBCBCB')
        const [background_colour_12, set_background_colour_12] = useState('#CBCBCB')
      
    
    
        useEffect(()=>{
            if(toDoStepsFBInstance && num_recipes){
                // console.log("instance is: ", toDoStepsFBInstance)
                const unsub =  db.collection("to-do-steps").doc(toDoStepsFBInstance)
                // .orderBy('timestamp', 'desc')
                .onSnapshot(async (doc)=>{
                    if(doc.id === toDoStepsFBInstance){
                        let prioritised_steps = [];
                        let to_do_steps = doc.data()
                        return new Promise ((resolve, reject)=>{
                            //let docID = snapshot.id
                            //setToDos(doc.data())
                            
                            console.log("got to usebckgrnd set")
                            if("steps" in doc.data() && num_recipes){

                                if(doc.data()["steps"].length > 0){
                                    //order the to_do_steps by placing IMPERATIVES at second position of the array array[1]
                                    //if the second position is an imperative, traverse the array till you find a
                                    //position not occupied by an imperative and place there
                                    //imperatives not put into first position in array (array[0]), because
                                    //that would constantly change the on screen instruction even when the user is yet
                                    //to complete the step
                                    let i = 0;
                                    for(i; i < doc.data()["steps"].length; i++){
                                        if(doc.data()["steps"][i]["step-info"]["imperative-classification"] === "IMPERATIVE"){
                                            if(prioritised_steps.length > 1){
                                                let j = 1;
                                                for(j; j < prioritised_steps.length ;j++){
                                                    if(prioritised_steps[j]["step-info"]["imperative-classification"] !== "IMPERATIVE"){
                                                        prioritised_steps.splice(j, 0, doc.data()["steps"][i])
                                                        break
                                                    }else{
                                                        continue
                                                    }
                                                    
                                                }
                                            }else{
                                                prioritised_steps.push(doc.data()["steps"][i])
                                            }
                                            
                                        }else{
                                            console.log("prioritisation occurred")
                                            prioritised_steps.push(doc.data()["steps"][i])
                                        }
                                        if(i === doc.data()["steps"].length - 1){
                                            console.log("prioritisation 2 occurred")
                                            to_do_steps["steps"] = prioritised_steps
                                        }
                                    }
                                    
                                    // if(i === doc.data()["steps"].length){
                                    //     setToDos(to_do_steps)
                                    // }

                                    if(doc.data()["steps"][0]["hob-number"] === 1){
                                        set_background_colour_1("#ff5440")
                                        
                                    }else{
                                        if(num_recipes <= 1){
                                            set_background_colour_1("transparent")
                                        }
                                    } 
                                    if(doc.data()["steps"][0]["hob-number"] === 2){
                                        set_background_colour_2("#ff5440")
                                        
                                    }else{
                                        if(num_recipes <= 2){
                                            set_background_colour_2("transparent")
                                        }
                                    }
                                    if(doc.data()["steps"][0]["hob-number"] === 3){
                                        set_background_colour_3("#ff5440")
                                        
                                    }else{
                                        if(num_recipes <= 3){
                                            set_background_colour_3("transparent")
                                        }
                                    } 
                                    if(doc.data()["steps"][0]["hob-number"] === 4){
                                        set_background_colour_4("#ff5440")
                                        
                                    }else{
                                        if(num_recipes <= 4){
                                            set_background_colour_4("transparent")
                                        }
                                    } 
                                    if(doc.data()["steps"][0]["hob-number"] === 5){
                                        set_background_colour_5("#ff5440")
                                        
                                    }else{
                                        if(num_recipes <= 5){
                                            set_background_colour_5("transparent")
                                        }
                                    } 
                                    if(doc.data()["steps"][0]["hob-number"] === 6){
                                        set_background_colour_6("#ff5440")
                                        
                                    }else{
                                        if(num_recipes <= 6){
                                            set_background_colour_6("transparent")
                                        }
                                    } 
                                    if(doc.data()["steps"][0]["hob-number"] === 7){
                                        set_background_colour_7("#ff5440")
                                        
                                    }else{
                                        if(num_recipes <= 7){
                                            set_background_colour_7("transparent")
                                        }
                                    } 
                                    if(doc.data()["steps"][0]["hob-number"] === 8){
                                        set_background_colour_8("#ff5440")
                                        
                                    }else{
                                        if(num_recipes <= 8){
                                            set_background_colour_8("transparent")
                                        }
                                    } 
                                    if(doc.data()["steps"][0]["hob-number"] === 9){
                                        set_background_colour_9("#ff5440")
                                        
                                    }else{
                                        if(num_recipes <= 9){
                                            set_background_colour_9("transparent")
                                        }
                                    } 
                                    if(doc.data()["steps"][0]["hob-number"] === 10){
                                        set_background_colour_10("#ff5440")
                                        
                                    }else{
                                        if(num_recipes <= 10){
                                            set_background_colour_10("transparent")
                                        }
                                    } 
                                    if(doc.data()["steps"][0]["hob-number"] === 11){
                                        set_background_colour_11("#ff5440")
                                        
                                    }else{
                                        if(num_recipes <= 11){
                                            set_background_colour_11("transparent")
                                        }
                                    } 
                                    if(doc.data()["steps"][0]["hob-number"] === 12){
                                        set_background_colour_12("#ff5440")
                                        
                                    }else{
                                        if(num_recipes <= 12){
                                            set_background_colour_12("transparent")
                                        }
                                    } 
                                    setToDos(to_do_steps)
                                }
                                
                                
                            }
                            setToDos(to_do_steps)
                                    
                            resolve({
                                "to_do_steps": to_do_steps, 
                                
                            });
                        })
                    }
                    
                }, (error)=>{
                    console.log("document id passed, likely not defined")
                    console.log("error", error)
                })
                        
                return () => unsub();
            }
            
            
        }, [toDoStepsFBInstance, num_recipes])
    
    
    
    
      
    
      return {  toDos, 
                background_colour_1, 
                background_colour_2, 
                background_colour_3, 
                background_colour_4,
                background_colour_5,
                background_colour_6,
                background_colour_7,
                background_colour_8,
                background_colour_9,
                background_colour_10,
                background_colour_11,
                background_colour_12,
            }
    }

export default useBackgroundFunc;