
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
const useFetchRecipes = () => {
        const [recipes, set_recipes] = useState([])
        // console.log("useFetchRecipes render ran again...")
          
        useEffect(()=>{
            
            const unsub =  db.collection("recipes_test")
            .onSnapshot(async (querySnapshot)=>{
                console.log("got to snapshot")
                let database_recipes = [];
                // return new Promise ((resolve, reject)=>{
                    querySnapshot.forEach((doc)=>{
                        database_recipes.push({"name": doc.data()["name"], "number": doc.data()["recipe-number"] , "recipe-data": doc.data()})
                        // console.log("Recipe x: ", doc.data())
                    })
                    set_recipes(database_recipes)
                    // console.log("final recipes array: ", JSON.stringify(recipes))
                            
                //     resolve({
                //         "recipes": recipes, 
                //     });
                // }).then((result)=>{
                //     console.log("recipes passed on: ", JSON.stringify(result) )
                //     set_recipes(result)
                // })  
                
                
            }, (error)=>{
                console.log("error: ", error)
            })
                    
            return () => unsub();
            
            
        }, [])
    
    
    
    
      return {recipes}
    }

export default useFetchRecipes;