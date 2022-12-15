
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
const useFetchCustomerOrdersSpecific = (orderID) => {
        const [orders, setOrders] = useState(null)
        const [meals_to_prep, set_meals_to_prep] = useState(null)
        console.log("specific cust orders fetch ran again...", orderID)
        
    
        useEffect(()=>{
            const unsub =  db.collection("orders")
                // .orderBy("timestamp")

                .onSnapshot(async (querySnapshot)=>{
                    let orders_copy;
                    let meals_to_prep_copy;
                    querySnapshot.forEach((doc)=>{
                        if(doc.id === orderID){
                            meals_to_prep_copy = doc.data()["meals_to_prep"]
                            orders_copy = doc.data()["customer_orders_data"]
                        }
                    })
                    setOrders(orders_copy)
                    set_meals_to_prep(meals_to_prep_copy)
                })
                        
                return () => unsub();

            
        }, [orderID])
    
    
    
    
      
    
      return { orders, meals_to_prep }
    }

export default useFetchCustomerOrdersSpecific;