
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
const useFetchFinishedRecipes = (upcoming_recipe_steps, to_do_steps_instance_FBID) => {
        const [finished_recipes, set_finished_recipes] = useState([])
        console.log("useFetchFinishedRecipes render ran again...")
        console.log("upcoming recipe steps", upcoming_recipe_steps)
        console.log("to do steps", to_do_steps_instance_FBID)
          
        useEffect(()=>{
            if(upcoming_recipe_steps !== undefined && to_do_steps_instance_FBID){
                if(upcoming_recipe_steps.length > 0){
                    const unsub =  db.collection("upcoming-recipes")
                    .onSnapshot(async (querySnapshot)=>{
                        console.log("got to snapshot")
                        // let upcoming_recipes_copy = {};
                        // return new Promise ((resolve, reject)=>{
                            querySnapshot.forEach((doc)=>{
                                if(upcoming_recipe_steps.includes(doc.id) ){
                                    let hob_number = doc.data()["hob-number"]
                                    // upcoming_recipes_copy[doc.data()["hob_number"]] = doc.data() 
                                    if("info" in doc.data()){
                                        if(doc.data()["info"].length === 0){
                                            console.log("hob number to be added to finished array")
                                            db.collection('to-do-steps').doc(to_do_steps_instance_FBID)
                                            .update({"finished" :firebase.firestore.FieldValue.arrayUnion(hob_number)})
                                            .then(()=>{
                                                set_finished_recipes(finished_recipes => [...finished_recipes, hob_number])
                                            })
                                            
                                        }
                                    }
                                    
                                    
                                    }
                                
                            })
                            
                            console.log("finished recipes: ", finished_recipes)
                        
                        
                    }, (error)=>{
                        console.log("error: ", error)
                    })
                            
                    return () => unsub();
                }
            }
            
            
            
            
        }, [upcoming_recipe_steps, to_do_steps_instance_FBID])
    
    
    
    
      return {finished_recipes}
    }

export default useFetchFinishedRecipes;