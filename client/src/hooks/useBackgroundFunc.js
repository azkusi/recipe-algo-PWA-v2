
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
const useBackgroundFunc = (toDoStepsFBInstance) => {
        const [toDos, setToDos] = useState(null)
        console.log("useBackgroundFunc render ran again...")
        console.log("instance is: ", toDoStepsFBInstance)

        const [background_colour_1, set_background_colour_1] = useState('transparent')
        const [background_colour_2, set_background_colour_2] = useState('transparent')
        const [background_colour_3, set_background_colour_3] = useState('transparent')
        const [background_colour_4, set_background_colour_4] = useState('transparent')
      
    
    
        useEffect(()=>{
            if(toDoStepsFBInstance){
                console.log("instance is: ", toDoStepsFBInstance)
                const unsub =  db.collection("to-do-steps").doc(toDoStepsFBInstance)
                // .orderBy('timestamp', 'desc')
                .onSnapshot(async (doc)=>{
                    if(doc.id === toDoStepsFBInstance){
                        let to_do_steps = [];
                        return new Promise ((resolve, reject)=>{
                            //let docID = snapshot.id
                            // setToDos(doc.data())
                            if("steps" in doc.data()){
                                if(doc.data()["steps"].length > 0){

                                    if(doc.data()["steps"][0]["recipe-number"] === 1){
                                        set_background_colour_1("#ff5440")
                                        set_background_colour_2("transparent")
                                        set_background_colour_3("transparent")
                                        set_background_colour_4("transparent")
                                    }
                                    if(doc.data()["steps"][0]["recipe-number"] === 2){
                                        set_background_colour_2("#ff5440")
                                        set_background_colour_1("transparent")
                                        set_background_colour_3("transparent")
                                        set_background_colour_4("transparent")
                                    }
                                    if(doc.data()["steps"][0]["recipe-number"] === 3){
                                        set_background_colour_3("#ff5440")
                                        set_background_colour_1("transparent")
                                        set_background_colour_2("transparent")
                                        set_background_colour_4("transparent")
                                    }
                                    if(doc.data()["steps"][0]["recipe-number"] === 4){
                                        set_background_colour_4("#ff5440")
                                        set_background_colour_1("transparent")
                                        set_background_colour_2("transparent")
                                        set_background_colour_3("transparent")
                                    }
                                }
                                else{
                                    set_background_colour_4("transparent")
                                    set_background_colour_1("transparent")
                                    set_background_colour_2("transparent")
                                    set_background_colour_3("transparent")
                                }
                            }
                                    

                            resolve({
                                "to_do_steps": to_do_steps, 
                                "background_colour_1": background_colour_1, 
                                "background_colour_2": background_colour_2, 
                                "background_colour_3": background_colour_3, 
                                "background_colour_4": background_colour_4, 
                            });
                        }).then((result)=>{
                            setToDos(result["to_do_steps"])
                        })  
                    }
                    
                }, (error)=>{
                    console.log("document id passed, likely not defined")
                    console.log("error", error)
                })
                        
                return () => unsub();
            }
            
            
        }, [])
    
    
    
    
      
    
      return {toDos, background_colour_1, background_colour_2, background_colour_3, background_colour_4}
    }

export default useBackgroundFunc;