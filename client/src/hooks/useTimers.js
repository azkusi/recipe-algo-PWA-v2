
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';



import {useEffect, useState } from 'react';
import { config } from '../config';

let db;
firebase.initializeApp(config);
db = firebase.firestore()


  //get updated to_do steps after every change
const useTimers = (duration) => {
        const [time_left, set_time_left] = useState(duration)

    
        useEffect(()=>{
           
            let myInterval = setInterval(() => {
                if (time_left > 0) {
                    set_time_left(time_left - 1);
                }
                if (time_left === 0) {
                    
                    clearInterval(myInterval)
                } 
            }, 1000)
            return ()=> {
                clearInterval(myInterval);
                };
        //})                    
                        
                //     resolve({"recipe-name": snapshot.data()["recipe-name"], "time_left": time_left});
                // })
        // })
                    
            // return () => unsub();
        }, [time_left])
    
    
    
    
      
    
      return time_left
    }

export default useTimers;