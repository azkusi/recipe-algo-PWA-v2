
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
const useFetchCustomerOrders = () => {
        const [orders, setOrders] = useState(null)
        // console.log("useBackgroundFunc render ran again...")
        
    
        useEffect(()=>{
            
                const unsub =  db.collection("orders")
                // .orderBy("timestamp")

                .onSnapshot(async (querySnapshot)=>{
                    let temp_orders = []
                    querySnapshot.forEach((doc)=>{
                        temp_orders.push({
                          "id": doc.id,
                          "data": doc.data()})
                    })
                    setOrders(temp_orders)
                })
                        
                return () => unsub();
            
            
        }, [])
    
    
    
    
      
    
      return { orders }
    }

export default useFetchCustomerOrders;