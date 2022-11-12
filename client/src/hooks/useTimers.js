
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
const useTimers = (cooking_sess_instance) => {

        const[timers, set_timers] = useState(null)
      
        useEffect(()=>{
            console.log("cooking_sess_instance: ", cooking_sess_instance)
            if(cooking_sess_instance){
                // console.log("instance is: ", toDoStepsFBInstance)
                const unsub =  db.collection("timers").doc(cooking_sess_instance)
                // .orderBy('timestamp', 'desc')
                .onSnapshot(async (doc)=>{
                    console.log("timer info at fb: ", doc.data())
                    set_timers(doc.data())
                    
                }, (error)=>{
                    console.log("document id passed, likely not defined")
                    console.log("error", error)
                })
                        
                return () => unsub();
            }
            
            
        }, [cooking_sess_instance])
    
    
    
    
      
    
      return {timers}
    }

export default useTimers;




