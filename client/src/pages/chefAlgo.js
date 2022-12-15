/* eslint-disable jsx-a11y/anchor-is-valid */
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Switch from '@mui/material/Switch';
import Card from '@mui/material/Card';

import CardRB from 'react-bootstrap/Card';

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';



import mixing_bowl from '../images/mixing_bowl.jpg';
import Black_Circle from '../images/Black_Circle.jpeg'
import induction_hob from '../images/induction_hob.jpeg';
import plate from '../images/plate.jpeg';
import small_item_organiser from '../images/small_item_organiser.jpeg';
import wok_pan from '../images/wok_pan.jpeg';


// import NotificationSound from '../sounds/NotificationSound.mp3';
import NewNotification from '../sounds/NewNotification.mp3';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
// import Toast from 'react-bootstrap/Toast';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';

import Papa from 'papaparse'




// import {db} from "../config";
// import { set, ref } from 'firebase/database';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';



import { React, useEffect, useState, useRef } from 'react';
import { db } from '../config';
import useBackgroundFunc from '../hooks/useBackgroundFunc';
import useFetchRecipes from '../hooks/useFetchRecipes';
import useTimers from '../hooks/useTimers';
import useFetchFinishedRecipes from '../hooks/useFetchFinishedRecipes';
import useFetchCustomerOrders from '../hooks/useFetchCustomerOrders';
import useFetchCustomerOrdersSpecific from '../hooks/useFetchCustomerOrdersSpecific';
import { Alert } from '@mui/material';


function ChefAlgo() {
    let timer_variables = {}

    const audioPlayer = useRef(null);

    
    const [app_starting, set_app_starting] = useState(false)
    const [recipes_selected, set_recipes_selected] = useState(false)
    const [recipe_selection_modal, set_recipe_selection_modal] = useState(false)
    const [selected_recipes, set_selected_recipes] = useState([])

    const database_recipes = useFetchRecipes().recipes

    const [stage, setStage] = useState(null);
    const [on_screen_instruction, set_on_screen_instruction] = useState(null)
    const [last_instruction_in_stage, set_last_instruction_in_stage] = useState(false)
    const [instruction_stage, set_instruction_stage] = useState(0)
    const [recipe_cycle_number, set_recipe_cycle_number] = useState(0)
    const [recipe_total, set_receipe_total] = useState(4)
    const [current_recipe_name, set_current_recipe_name] = useState(null)

    
    const [cooking_sess_instance, set_cooking_sess_instance] = useState(null)
    const timers = useTimers(cooking_sess_instance).timers

    const [to_do_steps_instance_FBID, set_to_do_steps_instance_FBID] = useState(null)

    const [recipe_1_timer, set_recipe_1_timer] = useState(0)
    const [recipe_2_timer, set_recipe_2_timer] = useState(0)
    const [recipe_3_timer, set_recipe_3_timer] = useState(0)
    const [recipe_4_timer, set_recipe_4_timer] = useState(0)
    const [recipe_5_timer, set_recipe_5_timer] = useState(0)
    const [recipe_6_timer, set_recipe_6_timer] = useState(0)
    const [recipe_7_timer, set_recipe_7_timer] = useState(0)
    const [recipe_8_timer, set_recipe_8_timer] = useState(0)
    const [recipe_9_timer, set_recipe_9_timer] = useState(0)
    const [recipe_10_timer, set_recipe_10_timer] = useState(0)
    const [recipe_11_timer, set_recipe_11_timer] = useState(0)
    const [recipe_12_timer, set_recipe_12_timer] = useState(0)

    const [timer1_running, set_timer1_running] = useState(false)
    const [timer2_running, set_timer2_running] = useState(false)
    const [timer3_running, set_timer3_running] = useState(false)
    const [timer4_running, set_timer4_running] = useState(false)
    const [timer5_running, set_timer5_running] = useState(false)
    const [timer6_running, set_timer6_running] = useState(false)
    const [timer7_running, set_timer7_running] = useState(false)
    const [timer8_running, set_timer8_running] = useState(false)
    const [timer9_running, set_timer9_running] = useState(false)
    const [timer10_running, set_timer10_running] = useState(false)
    const [timer11_running, set_timer11_running] = useState(false)
    const [timer12_running, set_timer12_running] = useState(false)

    const [nextClick, setNextClick] = useState(false)



    const [background_update, set_background_update] = useState(0)

    
    
    const [upcoming_recipes_FBIDs_dictionary, set_upcoming_recipes_FBIDs_dictionary] = useState({})
    const [upcoming_recipes_FBIDs_array, set_upcoming_recipes_FBIDs_array] = useState([])
    const finished_recipe_hobs = useFetchFinishedRecipes(upcoming_recipes_FBIDs_array, to_do_steps_instance_FBID).finished_recipes


    const [current_instruction_object, set_current_instruction_object] = useState(null)

    // const on_screen_instruction_stove_sec = useBackgroundFunc().on_screen_instruction
    // const current_recipe_name_stove_sec = useBackgroundFunc().current_recipe_name

    const to_do_steps = useBackgroundFunc(to_do_steps_instance_FBID, recipe_total).toDos

    // const stepQueuer = useQueueNextStep(upcoming_recipes_array)
    
    const [to_do_steps_length, set_to_do_steps_length] = useState(0)
    const [to_do_steps_prior_length, set_to_do_steps_prior_length] = useState(0)

    const [completed_steps, set_completed_steps] = useState([])
    const [consecutive_back_presses, set_consecutive_back_presses] = useState(-1) 
    //const [algo_direction, set_algo_direction] = useState('FORWARDS')


    const [loadAlgo_check, setLoadAlgo_check] = useState(false)

    

    const recipe_stage_colors = {1: {1: "#FF9F33", 2: "#FEC76D", 3: "#FEC76D", 4: "#FEC76D"},
                                2:  {1: "#FEC76D", 2: "#FF9F33", 3: "#FEC76D", 4: "#FEC76D"},
                                3:  {1: "#FEC76D", 2: "#FEC76D", 3: "#FF9F33", 4: "#FEC76D"},
                                4:  {1: "#FEC76D", 2: "#FEC76D", 3: "#FEC76D", 4: "#FF9F33"}
                            }

    const [recipes, set_recipes] = useState({})

    const hob_quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    const pre_heat = ["1. Set all stoves to low-medium heat", "2. Set oven to low-medium heat"]

    const [square_layout, set_square_layout] = useState(true)
    const [pop_over, set_pop_over] = useState(false)

    const [show_customer_orders_modal, set_show_customer_orders_modal] = useState(false)

    const customer_orders = useFetchCustomerOrders().orders
    const [customer_order_data, set_customer_order_data] = useState(null)

    const[csv_data, set_csv_data] = useState(null)

    const [chosen_order_data, set_chosen_order_data] = useState(null)
    const [chosen_order_id, set_chosen_order_id] = useState(null)
    const [chosen_activity, set_chosen_activity] = useState(null)
    const [num_hobs_chosen, set_num_hobs_chosen] = useState(null)
    const [meals_on_hob, set_meals_on_hob] = useState(null)
    const [cooking_complete_alert, set_cooking_complete_alert] = useState(false)
    const [finished_cooking_modal, set_finished_cooking_modal] = useState(true)

    const [meals_to_prep, set_meals_to_prep] = useState(null)
    const [prep_modal, set_prep_modal] = useState(false)
    const [retrieval_steps, set_retrieval_steps] = useState(null)
    const [prep_steps, set_prep_steps] = useState(null)

    const [step_counter, set_step_counter] = useState(0)
    const [prep_stage, set_prep_stage] = useState(null)
    const [retrieval_stage, set_retrieval_stage] = useState(null)
    const [packing_object, set_packing_object] = useState(null)
    const [chosen_order_view, set_chosen_order_view] = useState("BY_NAME")
    const [cust_all_orders_obj_by_name, set_cust_all_orders_obj_by_name] = useState(null)
    const [cust_all_orders_obj_by_meal, set_cust_all_orders_obj_by_meal] = useState(null)
    const [deleted_cust_orders, set_deleted_cust_orders] = useState(false)


    useEffect(()=>{
        if(window.innerWidth < 700){
            window.alert("Please use this app on a tablet to avoid design breakages")
        }
    },[])


    //=====================================================
    //       USE EFFECT HOOK FOR PLAYING AUDIO WHEN NEW 
    //      STEP IS SHOWN ON SCREEN 
    //=====================================================
    
    useEffect(()=>{
        if(to_do_steps && ("steps" in to_do_steps)){
           if(to_do_steps["steps"].length === 0){
                set_to_do_steps_prior_length(0)
                set_to_do_steps_length(0)
            }
            if(to_do_steps["steps"].length > 0 && to_do_steps_prior_length === 0 && stage === "STOVE-SECONDARY"){
                playAudio()
                set_to_do_steps_prior_length(to_do_steps_prior_length + 1)
                
            } 
        }
        
    }, [to_do_steps])



    //=====================================================
    //       MAIN EFFECT HOOK FOR RUNNING ALGORITHM 
    //      THROUGH PROGRAM FUNCTION 
    //=====================================================
    useEffect(()=>{
        if(nextClick){
            setNextClick(false)
        }
        console.log("I re-rendered")
        console.log("to do steps: ", to_do_steps)

        program()
    },[nextClick, last_instruction_in_stage, stage, instruction_stage, recipe_cycle_number, to_do_steps, consecutive_back_presses])



    //=====================================================
    //       HOOKS FOR ON SCREEN TIMERS 
    //=====================================================


    useEffect(()=>{
        
        if((recipe_1_timer > 0) && (!timer1_running) ){
            timer1() 
         }
        
    },[recipe_1_timer])

    useEffect(()=>{
        
        if((recipe_2_timer > 0) && (!timer2_running) ){
            timer2() 
         }
        
    },[recipe_2_timer])


    useEffect(()=>{
        
         if((recipe_3_timer > 0) && (!timer3_running) ){
            timer3() 
         }

    },[recipe_3_timer])


    useEffect(()=>{
        
         if((recipe_4_timer > 0) && (!timer4_running) ){
            timer4() 
         }
        
    },[recipe_4_timer])

    useEffect(()=>{
        
        if((recipe_5_timer > 0) && (!timer5_running) ){
           timer5() 
        }
       
   },[recipe_5_timer])


   useEffect(()=>{
        
    if((recipe_6_timer > 0) && (!timer6_running) ){
       timer6() 
    }
   
},[recipe_6_timer])


useEffect(()=>{
        
    if((recipe_7_timer > 0) && (!timer7_running) ){
       timer7() 
    }
   
},[recipe_7_timer])


useEffect(()=>{
        
    if((recipe_8_timer > 0) && (!timer8_running) ){
       timer8() 
    }
   
},[recipe_8_timer])


useEffect(()=>{
        
    if((recipe_9_timer > 0) && (!timer9_running) ){
       timer9() 
    }
   
},[recipe_9_timer])


useEffect(()=>{
        
    if((recipe_10_timer > 0) && (!timer10_running) ){
       timer10() 
    }
   
},[recipe_10_timer])


useEffect(()=>{
        
    if((recipe_11_timer > 0) && (!timer11_running) ){
       timer11() 
    }
   
},[recipe_11_timer])


useEffect(()=>{
        
    if((recipe_12_timer > 0) && (!timer12_running) ){
       timer12() 
    }
   
},[recipe_12_timer])



    //=====================================================
    //       FUNCTION TO PLAY SOUND FOR NEW INSTRUCTION 
    //=====================================================
    function playAudio() {
        audioPlayer.current.play();
    }


    //=====================================================
    //       ON SCREEN COUNTDOWN TIMER FOR STOVE 1
    //=====================================================
    function timer1(){
        let timesRun = recipe_1_timer;
        console.log("timer func running")
        let myInterval1 = setInterval(() => {
            console.log("set interval running")
            
            console.log("timer 1: ", recipe_1_timer.toString())
            console.log("setting to now be ", (recipe_1_timer - 1).toString())
            set_timer1_running(true)
            set_recipe_1_timer(recipe_1_timer => (recipe_1_timer - 1));
            timesRun -= 1
            
            if (timesRun <= 0) {
                set_recipe_1_timer(0)
                set_timer1_running(false)
                return clearInterval(myInterval1)
            }
        }, 1000)      
    }


    //=====================================================
    //       ON SCREEN COUNTDOWN TIMER FOR STOVE 2
    //=====================================================
    function timer2(){
        let timesRun = recipe_2_timer;
        console.log("timer2 func running")
        let myInterval2 = setInterval(() => {
            console.log("set interval running")
            
            console.log("timer 2: ", recipe_2_timer.toString())
            console.log("setting to now be ", (recipe_2_timer - 1).toString())
            set_timer2_running(true)
            set_recipe_2_timer(recipe_2_timer => (recipe_2_timer - 1));
            timesRun -= 1
            
            if (timesRun <= 0) {
                set_recipe_2_timer(0)
                set_timer2_running(false)
                return clearInterval(myInterval2)
            }

        }, 1000)      

   
    }



    //=====================================================
    //       ON SCREEN COUNTDOWN TIMER FOR STOVE 3
    //=====================================================
    function timer3(){
        let timesRun = recipe_3_timer;
        console.log("timer3 func running")
        let myInterval3 = setInterval(() => {
            console.log("set interval running")
            
            console.log("timer 3: ", recipe_3_timer.toString())
            console.log("setting to now be ", (recipe_3_timer - 1).toString())
            set_timer3_running(true)
            set_recipe_3_timer(recipe_3_timer => (recipe_3_timer - 1));
            timesRun -= 1
            
            if (timesRun <= 0) {
                set_recipe_3_timer(0)
                set_timer3_running(false)
                return clearInterval(myInterval3)
            }

        }, 1000)      

   
    }


    //=====================================================
    //       ON SCREEN COUNTDOWN TIMER FOR STOVE 4
    //=====================================================
    function timer4(){
        let timesRun = recipe_4_timer;
        console.log("timer4 func running")
        let myInterval4 = setInterval(() => {
            console.log("set interval running")
            
            console.log("timer 4: ", recipe_4_timer.toString())
            console.log("setting to now be ", (recipe_4_timer - 1).toString())
            set_timer4_running(true)
            set_recipe_4_timer(recipe_4_timer => (recipe_4_timer - 1));
            timesRun -= 1
            
            if (timesRun <= 0) {
                set_recipe_4_timer(0)
                set_timer4_running(false)
                return clearInterval(myInterval4)
            }
        }, 1000)      

    }


    function timer5(){
        let timesRun = recipe_5_timer;
        console.log("timer func running")
        let myInterval1 = setInterval(() => {
            console.log("set interval running")
            
            console.log("timer 5: ", recipe_5_timer.toString())
            console.log("setting to now be ", (recipe_5_timer - 1).toString())
            set_timer5_running(true)
            set_recipe_5_timer(recipe_5_timer => (recipe_5_timer - 1));
            timesRun -= 1
            
            if (timesRun <= 0) {
                set_recipe_5_timer(0)
                set_timer5_running(false)
                return clearInterval(myInterval1)
            }
        }, 1000)      
    }


    function timer6(){
        let timesRun = recipe_6_timer;
        console.log("timer func running")
        let myInterval1 = setInterval(() => {
            console.log("set interval running")
            
            console.log("timer 6: ", recipe_6_timer.toString())
            console.log("setting to now be ", (recipe_6_timer - 1).toString())
            set_timer6_running(true)
            set_recipe_6_timer(recipe_6_timer => (recipe_6_timer - 1));
            timesRun -= 1
            
            if (timesRun <= 0) {
                set_recipe_6_timer(0)
                set_timer6_running(false)
                return clearInterval(myInterval1)
            }
        }, 1000)      
    }


    function timer7(){
        let timesRun = recipe_7_timer;
        console.log("timer func running")
        let myInterval1 = setInterval(() => {
            console.log("set interval running")
            
            console.log("timer 7: ", recipe_7_timer.toString())
            console.log("setting to now be ", (recipe_7_timer - 1).toString())
            set_timer7_running(true)
            set_recipe_7_timer(recipe_7_timer => (recipe_7_timer - 1));
            timesRun -= 1
            
            if (timesRun <= 0) {
                set_recipe_7_timer(0)
                set_timer7_running(false)
                return clearInterval(myInterval1)
            }
        }, 1000)      
    }


    function timer8(){
        let timesRun = recipe_8_timer;
        console.log("timer func running")
        let myInterval1 = setInterval(() => {
            console.log("set interval running")
            
            console.log("timer 8: ", recipe_8_timer.toString())
            console.log("setting to now be ", (recipe_8_timer - 1).toString())
            set_timer8_running(true)
            set_recipe_8_timer(recipe_8_timer => (recipe_8_timer - 1));
            timesRun -= 1
            
            if (timesRun <= 0) {
                set_recipe_8_timer(0)
                set_timer8_running(false)
                return clearInterval(myInterval1)
            }
        }, 1000)      
    }


    function timer9(){
        let timesRun = recipe_9_timer;
        console.log("timer func running")
        let myInterval1 = setInterval(() => {
            console.log("set interval running")
            
            console.log("timer 9: ", recipe_9_timer.toString())
            console.log("setting to now be ", (recipe_9_timer - 1).toString())
            set_timer9_running(true)
            set_recipe_9_timer(recipe_9_timer => (recipe_9_timer - 1));
            timesRun -= 1
            
            if (timesRun <= 0) {
                set_recipe_9_timer(0)
                set_timer9_running(false)
                return clearInterval(myInterval1)
            }
        }, 1000)      
    }


    function timer10(){
        let timesRun = recipe_10_timer;
        console.log("timer func running")
        let myInterval1 = setInterval(() => {
            console.log("set interval running")
            
            console.log("timer 10: ", recipe_10_timer.toString())
            console.log("setting to now be ", (recipe_10_timer - 1).toString())
            set_timer10_running(true)
            set_recipe_10_timer(recipe_10_timer => (recipe_10_timer - 1));
            timesRun -= 1
            
            if (timesRun <= 0) {
                set_recipe_10_timer(0)
                set_timer10_running(false)
                return clearInterval(myInterval1)
            }
        }, 1000)      
    }


    function timer11(){
        let timesRun = recipe_11_timer;
        console.log("timer func running")
        let myInterval1 = setInterval(() => {
            console.log("set interval running")
            
            console.log("timer 11: ", recipe_11_timer.toString())
            console.log("setting to now be ", (recipe_11_timer - 1).toString())
            set_timer11_running(true)
            set_recipe_11_timer(recipe_11_timer => (recipe_11_timer - 1));
            timesRun -= 1
            
            if (timesRun <= 0) {
                set_recipe_11_timer(0)
                set_timer11_running(false)
                return clearInterval(myInterval1)
            }
        }, 1000)      
    }



    function timer12(){
        let timesRun = recipe_12_timer;
        console.log("timer func running")
        let myInterval1 = setInterval(() => {
            console.log("set interval running")
            
            console.log("timer 12: ", recipe_12_timer.toString())
            console.log("setting to now be ", (recipe_12_timer - 1).toString())
            set_timer12_running(true)
            set_recipe_12_timer(recipe_12_timer => (recipe_12_timer - 1));
            timesRun -= 1
            
            if (timesRun <= 0) {
                set_recipe_12_timer(0)
                set_timer12_running(false)
                return clearInterval(myInterval1)
            }
        }, 1000)      
    }


    //=====================================================
    //       FUNCTION RETRIEVES RECIPES FOR ORDERS MADE
    //       AND INITIALISES DOCUMENTS IN FIREBASE AND  
    //       RETRIEVES THEIR IDs FOR ALGORITHM TO RUN
    //=====================================================
    function loadAlgo(){
        console.log("Chosen customer orders: ", chosen_order_data)
        let to_do_steps_instance_FBID;
        if(!loadAlgo_check){

            setLoadAlgo_check(true)
            return new Promise(async (resolve, reject)=>{
                //set recipes
                let k = 0
                let i = 1
                const cust_emails =  Object.keys(chosen_order_data["customer_order_data"]).sort()
                let recipes_copy = {}
                let meals_on_hob_copy = []
                console.log("cust orders: ", cust_emails)

                db.collection("to-do-steps").add({"steps": [], "finished": []})
                .then(async (docRef) => {
                    console.log("Document written with ID: ", docRef.id);

                    to_do_steps_instance_FBID = docRef.id
                    set_to_do_steps_instance_FBID(docRef.id)
                }).then(()=>{
                    db.collection("recipes").get()
                    .then((querySnapshot)=>{
                        for(k; k < cust_emails.length; k++){
                            let j = 0;
                            if(chosen_activity === "COOKING"){
                                if(Object.keys(recipes_copy).length === num_hobs_chosen){
                                    break
                                }
                            }
                            console.log("k is :, ", k)
                            console.log("cust emails is: ", cust_emails)
                            console.log(chosen_order_data["customer_order_data"][cust_emails[k]])
                            for(j; j < chosen_order_data["customer_order_data"][cust_emails[k]]["Selected_Meals"].length; j++){
                                if(chosen_activity === "COOKING"){
                                    if(Object.keys(recipes_copy).length === num_hobs_chosen){
                                        break
                                    }
                                }
                                
                                // eslint-disable-next-line no-loop-func
                                querySnapshot.forEach((doc)=>{
                                    if(doc.data()["name"] === chosen_order_data["customer_order_data"][cust_emails[k]]["Selected_Meals"][j]["Name"]){
                                        recipes_copy[i] = doc.data()
                                        meals_on_hob_copy.push({
                                            "Email": cust_emails[k],
                                            "Meal_Name": chosen_order_data["customer_order_data"][cust_emails[k]]["Selected_Meals"][j]["Name"],
                                            
                                        })
                                        i++;
                                    }
                                })
                                    
                                
                                
                            }
                            // temp_orders[results.data[i]["Email"]] = {
                            //     "Selected_Meals": [],
                            //     "Shipping_Name": results.data[i]["Shipping Name"] ,
                            //     "Shipping_Street": results.data[i]["Shipping Street"],	
                            //     "Shipping_Address1": results.data[i]["Shipping Address1"],	
                            //     "Shipping_Address2": results.data[i]["Shipping Address2"],	
                            //     "Shipping_City": results.data[i]["Shipping City"],	
                            //     "Shipping_Zip": results.data[i]["Shipping Zip"]
                            // }
                        }                       
                        
                    }).then(()=>{
                        console.log("recipes_copy to set recipes: ", recipes_copy)
                        set_recipes(recipes_copy)
                        set_meals_on_hob(meals_on_hob_copy)
                        
                    }).then(()=>{
                        if(chosen_activity === "COOKING"){
                            db.collection("to-do-steps").add({"steps": [], "finished": []})
                            .then(async ()=>{
                                let i = 0;
                                let upcoming_recipes_copy = upcoming_recipes_FBIDs_dictionary
                                for(i; i < Object.keys(recipes_copy).length; i++){
                                    //add a new document to FB where each recipe's upcoming(remaining) steps will be saved and changed and retrieved
                                    await db.collection("upcoming-recipes").add({"to_do_steps_instance_FBID": to_do_steps_instance_FBID})
                                        // eslint-disable-next-line no-loop-func
                                        .then((docRef) => {
                                            console.log("Document written with ID: ", docRef.id);
                                            
                                            upcoming_recipes_copy[i+1] = docRef.id;
                                            set_upcoming_recipes_FBIDs_dictionary(upcoming_recipes_copy);
                                            set_upcoming_recipes_FBIDs_array(upcoming_recipes_FBIDs =>[...upcoming_recipes_FBIDs, docRef.id])

                                        // eslint-disable-next-line no-loop-func
                                        }).then(()=>{
                                            db.collection("to-do-steps").doc(to_do_steps_instance_FBID)
                                            .update(upcoming_recipes_copy)
                                        })
                                }
                            }).then(()=>{
                                stovePreliminary(to_do_steps_instance_FBID, recipes_copy).then(()=>{
                                    set_last_instruction_in_stage(true)
                                    setLoadAlgo_check(false)
                                    resolve()
                                })
                            })
                        }else if (chosen_activity === "PREPPING"){
                            let i = 0
                            let meals_to_prep_copy = {}
                            for(i; i < cust_emails.length; i++){
                                let j = 0;
                                for(j; j < chosen_order_data["customer_order_data"][cust_emails[i]]["Selected_Meals"].length; j++){
                                    if(chosen_order_data["customer_order_data"][cust_emails[i]]["Selected_Meals"][j]["Name"] in meals_to_prep_copy){
                                        let meal_name = chosen_order_data["customer_order_data"][cust_emails[i]]["Selected_Meals"][j]["Name"]
                                        meals_to_prep_copy[meal_name]["num_meals"] = meals_to_prep_copy[meal_name]["num_meals"] + 1
                                        
                                    }else{
                                        let meal_name = chosen_order_data["customer_order_data"][cust_emails[i]]["Selected_Meals"][j]["Name"]
                                        meals_to_prep_copy[meal_name] = {"num_meals": 1, "status": "AWAITING_PREP"}
                                    }

                                }
                            }
                            // db.collection("orders").doc(chosen_order_id).update({
                            //     "meals_to_prep": meals_to_prep_copy
                            // }).then(()=>{
                                set_meals_to_prep(meals_to_prep_copy)
                                console.log("done setting prep")
                                set_last_instruction_in_stage(true)
                            // })
                            
                            setLoadAlgo_check(false)
                            resolve()
                        }else if(chosen_activity === "PACKING"){
                            let packing_object_copy = {}
                            console.log("About to set to packing")
                            const cust_emails =  Object.keys(chosen_order_data["customer_order_data"]).sort()
                            let i = 0;
                            for(i; i < cust_emails.length; i++){
                                let j = 0;
                                for(j; j < chosen_order_data["customer_order_data"][cust_emails[i]]["Selected_Meals"].length; j++){
                                    
                                    if(chosen_order_data["customer_order_data"][cust_emails[i]]["Selected_Meals"][j]["Status"] === "AWAITING_PACKING"){
                                        if((chosen_order_data["customer_order_data"][cust_emails[i]]["Shipping_Name"].toString() + ', ' + cust_emails[i].toString()) in packing_object_copy){
                                            console.log("packing obj after addition: ", JSON.stringify(packing_object_copy))
                                            // let newArray = packing_object_copy[cust_emails[i]]
                                            // newArray.push(chosen_order_data["customer_order_data"][cust_emails[i]]["Selected_Meals"][j])
                                            packing_object_copy[chosen_order_data["customer_order_data"][cust_emails[i]]["Shipping_Name"].toString() + ', ' + cust_emails[i].toString()].push(chosen_order_data["customer_order_data"][cust_emails[i]]["Selected_Meals"][j])
                                        }else{
                                            
                                            packing_object_copy[chosen_order_data["customer_order_data"][cust_emails[i]]["Shipping_Name"].toString() + ', ' + cust_emails[i].toString()] = [chosen_order_data["customer_order_data"][cust_emails[i]]["Selected_Meals"][j]]
                                        }
                                    }
                                }
                            }
                            set_packing_object(packing_object_copy)
                            set_last_instruction_in_stage(true)
                            setLoadAlgo_check(false)
                            resolve()
                        }else if(chosen_activity === "VIEW_ORDERS"){
                            let packing_object_copy = {}
                            let meals_to_prep_copy = {}
                            console.log("About to set to packing")
                            const cust_emails =  Object.keys(chosen_order_data["customer_order_data"]).sort()
                            let i = 0;
                            for(i; i < cust_emails.length; i++){
                                let j = 0;
                                for(j; j < chosen_order_data["customer_order_data"][cust_emails[i]]["Selected_Meals"].length; j++){
                                    
                                    if( ( chosen_order_data["customer_order_data"][cust_emails[i]]["Shipping_Name"].toString() + ', ' + cust_emails[i].toString() ) in packing_object_copy){
                                        console.log("packing obj after addition: ", JSON.stringify(packing_object_copy))
                                        // let newArray = packing_object_copy[cust_emails[i]]
                                        // newArray.push(chosen_order_data["customer_order_data"][cust_emails[i]]["Selected_Meals"][j])
                                        packing_object_copy[chosen_order_data["customer_order_data"][cust_emails[i]]["Shipping_Name"].toString() + ', ' + cust_emails[i].toString()].push(chosen_order_data["customer_order_data"][cust_emails[i]]["Selected_Meals"][j])
                                    }else{
                                        
                                        packing_object_copy[chosen_order_data["customer_order_data"][cust_emails[i]]["Shipping_Name"].toString() + ', ' + cust_emails[i].toString()] = [chosen_order_data["customer_order_data"][cust_emails[i]]["Selected_Meals"][j]]
                                    }
                                }
                            }
                            if(i === cust_emails.length){
                                let m = 0
                                
                                for(m; m < cust_emails.length; m++){
                                    let n = 0;
                                    for(n; n < chosen_order_data["customer_order_data"][cust_emails[m]]["Selected_Meals"].length; n++){
                                        if(chosen_order_data["customer_order_data"][cust_emails[m]]["Selected_Meals"][n]["Name"] in meals_to_prep_copy){
                                            let meal_name = chosen_order_data["customer_order_data"][cust_emails[m]]["Selected_Meals"][n]["Name"]
                                            meals_to_prep_copy[meal_name]["num_meals"] = meals_to_prep_copy[meal_name]["num_meals"] + 1
                                            meals_to_prep_copy[meal_name]["customers_who_ordered"].push(chosen_order_data["customer_order_data"][cust_emails[m]]["Shipping_Name"])
                                        }else{
                                            let meal_name = chosen_order_data["customer_order_data"][cust_emails[m]]["Selected_Meals"][n]["Name"]
                                            meals_to_prep_copy[meal_name] = {"num_meals": 1, "status": "AWAITING_PREP", "customers_who_ordered": [chosen_order_data["customer_order_data"][cust_emails[m]]["Shipping_Name"]]}
                                        }

                                    }
                                }
                            }
                            set_cust_all_orders_obj_by_name(packing_object_copy)
                            set_cust_all_orders_obj_by_meal(meals_to_prep_copy)
                            set_last_instruction_in_stage(true)
                            setLoadAlgo_check(false)
                            resolve()
                        }   
                    })         

                })
                            
            })
        }
        
        

    }


    //=====================================================
    //       CYCLES THROUGH INGREDIENT RETRIEVAL STEPS OF 
    //      THE RECIPE FOR EACH STOVE-ASSIGNED RECIPE
    //=====================================================
    function ingredientRetrieval(){


        console.log("starting ingredient retrieval")
        console.log("recipe cycle number: ", recipe_cycle_number.toString())
        console.log("recipes: ", JSON.stringify(recipes))

        //let i = 0
        //loop through retrieval steps of each recipe and place on screen
        if(instruction_stage <= recipes[recipe_cycle_number]["retrieval-steps"].length){
            console.log("recipe: ", recipes[recipe_cycle_number]["name"])
            console.log("instruction stage: ", instruction_stage.toString())
            console.log("instruction: ", recipes[recipe_cycle_number]["retrieval-steps"][instruction_stage - 1]["instruction"])

            set_current_recipe_name(recipes[recipe_cycle_number]["name"])
            set_on_screen_instruction(recipes[recipe_cycle_number]["retrieval-steps"][instruction_stage - 1]["instruction"])
            set_current_instruction_object(recipes[recipe_cycle_number]["retrieval-steps"][instruction_stage - 1])

        }else{
            if(recipe_cycle_number < recipe_total){
                
                set_recipe_cycle_number(recipe_cycle_number + 1)
                set_instruction_stage(1)
            }else{
                set_last_instruction_in_stage(true)
            }
        }
    }


    //=====================================================
    //       CYCLES THROUGH INGREDIENT PREP STEPS OF 
    //      THE RECIPE FOR EACH STOVE-ASSIGNED RECIPE
    //=====================================================
    function prep(){
        console.log("starting prep")

        //let i = 0
        //loop through prep steps of each recipe and place on screen
        if(instruction_stage <= recipes[recipe_cycle_number]["prep-steps"].length){
            console.log("recipe: ", recipes[recipe_cycle_number]["name"])
            
            set_current_recipe_name(recipes[recipe_cycle_number]["name"])
            set_on_screen_instruction(recipes[recipe_cycle_number]["prep-steps"][instruction_stage - 1]["instruction"])
            set_current_instruction_object(recipes[recipe_cycle_number]["prep-steps"][instruction_stage - 1])

        }else{
            if(recipe_cycle_number < recipe_total){
                set_recipe_cycle_number(recipe_cycle_number + 1)
                set_instruction_stage(1)
            }else{
                set_last_instruction_in_stage(true)
            }
            
        }
    }



    //=====================================================
    //       CYCLES THROUGH OVEN STEPS OF 
    //      THE RECIPE FOR EACH STOVE-ASSIGNED RECIPE
    //=====================================================
    function oven(){
        console.log("starting oven")
        //let i = 0
            
        //loop through oven steps of each recipe and place on screen
        if(instruction_stage <= recipes[recipe_cycle_number]["oven-steps"].length){
            console.log("recipe: ", recipes[recipe_cycle_number]["name"])
            
            set_current_recipe_name(recipes[recipe_cycle_number]["name"])
            set_on_screen_instruction(recipes[recipe_cycle_number]["oven-steps"][instruction_stage - 1]["instruction"])
            set_current_instruction_object(recipes[recipe_cycle_number]["oven-steps"][instruction_stage - 1])
        }else{
            if(recipe_cycle_number < recipe_total){
                set_recipe_cycle_number(recipe_cycle_number + 1)
                set_instruction_stage(1)
            }else{
                set_last_instruction_in_stage(true)
            }
        }
    }


    //=====================================================
    //       CYCLES THROUGH INGREDIENT BASE STEPS OF 
    //      THE RECIPE FOR EACH STOVE-ASSIGNED RECIPE
    //=====================================================
    function base(){
        console.log("starting base")
        
        //let i = 0
        //wait till Next button pressed, then start timer if necessary
        
        
        //loop through oven steps of each recipe and place on screen
        if(instruction_stage <= recipes[recipe_cycle_number]["base-steps"].length){
            console.log("recipe: ", recipes[recipe_cycle_number]["name"])
            
            set_current_recipe_name(recipes[recipe_cycle_number]["name"])
            set_on_screen_instruction(recipes[recipe_cycle_number]["base-steps"][instruction_stage - 1]["instruction"])
            set_current_instruction_object(recipes[recipe_cycle_number]["base-steps"][instruction_stage - 1])
            
        }else{
            
            if(recipe_cycle_number < recipe_total){
                set_recipe_cycle_number(recipe_cycle_number + 1)
                set_instruction_stage(1)
            }else{
                set_last_instruction_in_stage(true)
            } 
        }
    }



    //=====================================================
    //       FUNCTION TAKES THE REMAINING STEPS AND 
    //  THEIR DEPENDENCIES ETC AND PLACES THEM INTO FIREBASE
    // THEY ARE CALLED THE UPCOMING RECIPES BECAUSE THEY
    // CONTAIN THE UPCOMING RECIPE STEPS FOR EACH STOVE ASSIGNED
    // RECIPE. HOB NUMBER IS ALSO SET FOR EACH RECIPE HERE
    //=====================================================
    function stovePreliminary(FBID, recipes_to_cook){
        return new Promise(async (resolve, reject)=>{
            // set_on_screen_instruction(null)
            // set_current_instruction_object(null)

            // let recipes = {1: recipe1, 2: recipe2, 3: recipe3, 4: recipe4}
            console.log("recipes at stove-prelim: ", recipes_to_cook)
            
            let i = 1;
            for(i; i <= Object.keys(recipes_to_cook).length; i++){
                let j = 0 ;
                let holderArray = []
                for(j; j < recipes_to_cook[i]["stove-steps"].length; j++){
                    holderArray.push({"upcoming_recipe_FBID": upcoming_recipes_FBIDs_dictionary[i], "hob-number": i, "recipe-number": recipes_to_cook[i]["recipe-number"], "recipe-name": recipes_to_cook[i]["name"], "step-info": recipes_to_cook[i]["stove-steps"][j]})
                }
            
                await db.collection("upcoming-recipes").doc(upcoming_recipes_FBIDs_dictionary[i]).set({
                    "to_do_steps_instance_FBID": FBID,
                    "info": holderArray,
                    "hob-number": i
                })
                
            }
            if(i === Object.keys(recipes_to_cook).length + 1){
                set_background_update(background_update + 1)
                // set_current_instruction_object(null)
                // setStage("BASE")
                resolve()
            }
        })

        
    }


    function stoveSecondary(){
        console.log("recipes at stove-sec: ", recipes)
        console.log("running stove func ")
        
        
    }

    //=====================================================
    //       EACH TIME A TIMER OF A RECIPE STEP FINISHES
    //  THIS FUNCTION IS RUN TO REMOVE THE COMPLETED STEP 
    // FROM ALL [DEPENDENCY ARRAYS] I.E REMOVE THE STEP FROM BEING
    // ONE THAT OTHER STEPS ARE DEPENDENT ON
    //=====================================================
    //any time timer finishes, run this and change dependencies
    function background(step, duration, upcoming_recipe_FBID){
        console.log("upcoming fbid:", upcoming_recipe_FBID)
        console.log("step: ", step, " fbid is: ", upcoming_recipe_FBID)
        new Promise(async (resolve, reject)=>{
            if(step && upcoming_recipe_FBID){
                console.log("got past background check")
                db.collection("upcoming-recipes").doc(upcoming_recipe_FBID).get().then((snapshot)=>{
                    if("info" in snapshot.data()){
                        let recipeSteps = snapshot.data()["info"]
                        // let recipeSteps = recipeStepsInfo["info"]
                        let j = 0;
                        console.log("recipe number at background type: ", typeof(recipe_number))
                        console.log("recipe ID is: ", upcoming_recipe_FBID)
                        console.log("chosen recipe is: ", upcoming_recipe_FBID)
                        console.log("recipe steps info at background: ", JSON.stringify(recipeSteps))
                        console.log("step is, ", step.toString())
                        if(snapshot.data() !== undefined){
                            if(recipeSteps !== undefined){
                                for(j; j < recipeSteps.length; j++){
                                    if(recipeSteps[j]["step-info"]["step-dependency"].includes(step)){
                                        console.log("step is: ", step)
                                        const index = recipeSteps[j]["step-info"]["step-dependency"].indexOf(step);
                                        console.log("index is: ", index.toString())
                                        if (index > -1) { // only splice array when item is found
                                            console.log("removed dependency")
                                            recipeSteps[j]["step-info"]["step-dependency"].splice(index, 1)
                                            
                                        }
            
                                        
                                    }
                                
                                }
                                if(j === recipeSteps.length){
                                    console.log(`recipe ${upcoming_recipe_FBID} deletion of step: ${step}`)
                                    db.collection("upcoming-recipes").doc(upcoming_recipe_FBID).update({
                                        "info": recipeSteps
                                    }).then(()=>{
                                        resolve()
                                    })
                                }
                            } 
                        }
                    }
                    
                })
                //do timer function before running update of upcoming recipes
                                     
            }else{
                resolve()
            }
        })
        
    }




    //=====================================================
    //       FOR STOVE-SECONDARY STEPS, EACH TIME THE 
    // 'NEXT' BUTTON IS PRESSED SIGNIFYING A COMPLETED STEP
    // INSTRUCTION, A TIMER IS CREATED FOR THAT STEP
    // E.G. TO ALLOW STEW TO COOK AFTER BEING PUT ON STOVE
    //=====================================================
    function createTimer(step, duration, upcoming_recipe_FBID){

        let interval_ID_1;
        let interval_ID_2;
        let interval_ID_3;
        let interval_ID_4;

        console.log("=======================================")
        console.log("TIMER FUNCTION RUNNING")
        console.log("=======================================")

        
        //create a timer of length 'duration', once the timer has finished, check each
        //upcoming steps array for their dependency arrays to see if they contain this 'step'
        //if so remove this step from their dependency array i.e. update the upcoming steps array
        console.log(typeof(step), typeof(duration), typeof(recipe_number))
                
        setTimeout(()=>{
            
            //find which recipe this timer is for and remove the step 
            //dependency from the array
            
            console.log("===========================================")
            console.log("TIMER DONE, ABOUT TO RERUN BACKGROUND FUNC")
            console.log("===========================================")
            
            background(step, duration, upcoming_recipe_FBID)
                
        }, duration*1000*60)
        console.log("timer created for recipe", upcoming_recipe_FBID, "of" , (duration*60).toString(), ' seconds')
       
    }



    //=====================================================
    //   EACH TIME STAGE IS COMPLETE, MOVE TO NEXT STAGE
    //=====================================================
    function stageComplete(){
        console.log("running stage complete")

        if(stage === null){
            setStage("REQUIREMENTS")
            set_last_instruction_in_stage(false)
            return null
        }else if(stage === "REQUIREMENTS"){
            console.log("setting stage to load")
            set_app_starting(true)
            setStage('LOAD')
            set_last_instruction_in_stage(false)
            set_instruction_stage(1)
            set_recipe_cycle_number(1)
        }else if(stage === "LOAD"){
            set_app_starting(false)
            if(chosen_activity === "PREPPING"){
                console.log("setting stage to prepping")
                setStage('PREPPING')
                set_last_instruction_in_stage(false)
                set_instruction_stage(1)
                set_recipe_cycle_number(1)
            }else if(chosen_activity === "COOKING"){
                console.log("setting stage to base")
                setStage('BASE')
                set_last_instruction_in_stage(false)
                set_instruction_stage(1)
                set_recipe_cycle_number(1)
            }else if(chosen_activity === "PACKING"){
                setStage("PACKING")
                set_last_instruction_in_stage(false)
                set_instruction_stage(1)
                set_recipe_cycle_number(1)
            }else if(chosen_activity === "VIEW_ORDERS"){
                setStage("VIEW_ORDERS")
                set_last_instruction_in_stage(false)
                set_instruction_stage(1)
                set_recipe_cycle_number(1)
            }
        }else if(stage === 'BASE'){
            console.log("setting stage to pre-heat")
            setStage('PRE-HEAT')
            set_last_instruction_in_stage(false)
            set_instruction_stage(1)
            set_recipe_cycle_number(1)
        }
        else if(stage === 'PRE-HEAT'){
            console.log("setting stage to retrieval")
            if(chosen_activity === "COOKING"){
                setStage("OVEN")
                set_last_instruction_in_stage(false)
                set_instruction_stage(1)
                set_recipe_cycle_number(1)
            }
            
        }else if(stage === 'RETRIEVAL'){
            console.log("setting stage to prep")
            setStage('PREP')
            set_last_instruction_in_stage(false)
            set_instruction_stage(1)
            set_recipe_cycle_number(1)
        }else if(stage === 'PREP'){
            // setStage('QUEUE_NEXT_STEP')
            console.log("setting stage to oven")
            setStage('PREP_DONE')
            set_last_instruction_in_stage(false)
            set_instruction_stage(1)
            set_recipe_cycle_number(1)
        }
        // else if(stage === 'QUEUE_NEXT_STEP'){
        //     setStage('OVEN')
        //     set_last_instruction_in_stage(false)
        //     set_instruction_stage(1)
        //     set_recipe_cycle_number(1)
        // }
        else if(stage === 'OVEN'){
            console.log("setting stage to prelim")
            setStage('STOVE-SECONDARY')
            set_last_instruction_in_stage(false)
            set_instruction_stage(1)
            set_recipe_cycle_number(1)
        }
        // else if(stage === 'STOVE-PRELIM'){
        //     console.log("setting stage to secondary")
        //     setStage('STOVE-SECONDARY')
        //     set_last_instruction_in_stage(false)
        //     set_instruction_stage(1)
        //     set_recipe_cycle_number(1)

        // }
        else if(stage === 'STOVE-SECONDARY'){
            setStage('PACKAGE')
            set_last_instruction_in_stage(false)
            set_instruction_stage(1)
            set_recipe_cycle_number(1)
        }
    }




    //=====================================================
    //       MAIN FUNCTION THAT IS RUN EACH TIME BY MAIN 
    // USE EFFECT HOOK. EACH TIME, DEPENDING ON THE STAGE
    // OF THE COOKING SESSION (PREP/BASE/OVEN ETC), THIS
    // FUNCTION WILL PICK THE CORRECT FUNCTION TO RUN
    //=====================================================
    function program(){
        // set_instruction_stage(instruction_stage + 1)
        if(last_instruction_in_stage){
            stageComplete()
        }else{

            console.log("program running")
            console.log("stage is: " + stage)
            console.log("instruction stage is: " + instruction_stage)
            if(true){
                if(stage === "LOAD"){
                    console.log("running load func")
                    loadAlgo()
                }else if(stage === 'BASE'){
                    console.log("program chosen: base")
                    set_app_starting(false)
                    base()
                }
                else if (stage === 'RETRIEVAL'){
                    set_app_starting(false)
                    console.log("program chosen: ingredientRetrieval")
                    
                    ingredientRetrieval()
                }
                else if(stage === 'PREP'){
                    console.log("program chosen: prep")

                    prep()
                }

                else if(stage === 'OVEN'){
                    console.log("program chosen: oven")
                    oven()
                }
                
                // else if(stage === 'STOVE-PRELIM'){
                //     console.log("program chosen: stove-prelim")
                //     stovePreliminary()
                // }
                else if(stage === 'STOVE-SECONDARY'){
                    console.log("program chosen: stove-secondary")
                    stoveSecondary()
                }
            }

        }
        
        
    }


    
    //=================================================================================================================
    //                          RETURN STATEMENTS
    //=================================================================================================================


    //=====================================================
    //   IF JUST STARTING TELL USER TO CLICK START
    //=====================================================

    if(stage === null){
        return(
            <div style={{"padding": "15px"}} >

                <h1 style={{"color": "#FF9F33"}}>Actual</h1> 

                <Row style={{"border": "solid", "borderColor": "#FF9F33", "padding": "10px", "backgroundColor": "#FF9F33", "color": "white"}}>
                    <Col>
                        <h1>Which activity will you be completing?</h1>
                    </Col>
                </Row>

                <Modal show={show_customer_orders_modal}>
                    <Modal.Header>
                        <Modal.Title>Select Existing Orders or Input New via CSV</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {deleted_cust_orders && <Alert severity="success">Successfully Deleted!</Alert>}

                    <input id="image-file" type="file" accept=".csv" onChange={(e)=>{set_csv_data(e)}} />
                    <br/>
                    <br/>
                    {csv_data && <Button onClick={()=>{
                        // db.collection('orders').add({"ID": 1}).then(()=>{
                        //     set_upload_button(false)
                        if(csv_data){
                            const cust_data_label = window.prompt("Provide a name for this data")
                            if(cust_data_label && cust_data_label !== ""){
                                console.log("labelled as: ", cust_data_label)
                                Papa.parse(csv_data.target.files[0], {
                                    header: true,
                                    skipEmptyLines: true,
                                    complete: function (results) {
                                        console.log(results.data)
                                        let temp_orders = {}
                                        let i=0
                                        for(i; i < results.data.length; i++ ){
                                            if(results.data[i]["Email"].includes('.com')){
                                                if(!(results.data[i]["Email"] in temp_orders)){
                                                
                                                    temp_orders[results.data[i]["Email"]] = {
                                                        "Selected_Meals": [],
                                                        "Shipping_Name": results.data[i]["Shipping Name"] ,
                                                        "Shipping_Street": results.data[i]["Shipping Street"],	
                                                        "Shipping_Address1": results.data[i]["Shipping Address1"],	
                                                        "Shipping_Address2": results.data[i]["Shipping Address2"],	
                                                        "Shipping_City": results.data[i]["Shipping City"],	
                                                        "Shipping_Zip": results.data[i]["Shipping Zip"]
                                                    }
                                                        
                                                    
                                                }else{
                                                    if(results.data[i]["Email"]){
                                                        temp_orders[results.data[i]["Email"]]["Selected_Meals"].push({"Name": results.data[i]["Lineitem name"], "Status": "AWAITING_PREP"})
                                                    }
                                                    
                                                }
                                            }
                                            
                                        }
                                        if(i === results.data.length){
                                            set_customer_order_data(temp_orders)
                                            console.log("modified customer order data: ", customer_order_data)
                                            console.log("temp customer order data: ", temp_orders)
                                            console.log({
                                                "customer_order_data": temp_orders,
                                                "labelled_as": cust_data_label,
                                                "last_edited": Date.now(),
                                                "meals_to_prep": "N/A"
                                            })
                                            db.collection('orders').add({
                                                "customer_order_data": temp_orders,
                                                "labelled_as": cust_data_label,
                                                "last_edited": Date.now(),
                                                "meals_to_prep": "N/A"
                                            }).then(()=>{
                                                // set_upload_button(false)
        
                                            }).catch((error)=>{
                                                console.log("error...")
                                                window.alert("Error uploading document, please try again:", error)
                                            })
                                    
                                      
                                        }
                                    }
                                })
                            }else{
                                window.alert("Please label the data")
                            }
                        }
                       
                        // })
                    }}>
                        Upload
                    </Button>}
                    <br/>

                        {customer_orders && customer_orders.map((item, index)=>{
                            return(
                                <div style={{"margin":"4px"}}>
                                <a style={{"display":"inline-block"}}  href='#' onClick={()=>{
                                    set_chosen_order_data(item.data)
                                    set_chosen_order_id(item.id)
                                    console.log("order data set: ", chosen_order_data)

                                    // if(chosen_order_data === null){
                                    //     window.alert("Please select one of the orders listed or upload a new batch via CSV file")
                                    // }else 
                                    
                                    if(chosen_activity === "COOKING"){
                                        let selected_hob_number = parseInt(window.prompt("Please input the number of hobs you would like to use, the number must be between 1 and 12"))
                                        console.log("type of selected hob number:" , typeof(selected_hob_number))
                                        if( !(isNaN(selected_hob_number)) ){
                                            if( (selected_hob_number > 12) || (selected_hob_number < 1) ){
                                                window.alert("Please type a number between 1 and 12")
                                            }else{
                                                console.log("selected hob number: ", selected_hob_number)
                                                set_num_hobs_chosen(selected_hob_number)
                                                set_receipe_total(selected_hob_number)
                                                set_show_customer_orders_modal(false)
                                                set_last_instruction_in_stage(true)
                                            }
                                        }
                                        else{
                                            window.alert("Please type a number between 1 and 12")
                                        }
                                        
                                    }else{
                                        set_show_customer_orders_modal(false)
                                        set_last_instruction_in_stage(true)
                                    }
                                    
                                }} key={index}>
                                    <h4> <span> {item.data["labelled_as"]} </span></h4>
                                </a> <Button style={{"display":"inline-block"}} variant='outlined' color='error' onClick={(()=>{
                                    let delete_check = window.confirm("Are you sure you want to delete this?")
                                    if(delete_check){
                                        db.collection("orders").doc(item.id).delete().then(() => {
                                            set_deleted_cust_orders(true)
                                            setTimeout(()=>{
                                                set_deleted_cust_orders(false)
                                            }, 4000)
                                        
                                        console.log("Document successfully deleted!");
                                        }).catch((error) => {
                                            console.error("Error removing document: ", error);
                                        });
                                    }
                                    
                                })}>Delete</Button>
                                <br/>
                                </div>
                                
                                )
                        })}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={()=>{set_show_customer_orders_modal(false)}}>
                            Close
                        </Button>

                        {/* <Button onClick={()=>{
                            
                        }}>
                            Begin
                        </Button> */}
                        
                    </Modal.Footer>
                </Modal>

                <br/>
                <br/>
                <br/>
                <br/>

                <Row>
                    <Col>
                        <Button onClick={()=>{
                           set_show_customer_orders_modal(true)
                           set_chosen_activity("PREPPING")
                        }}
                        variant='contained'
                        color='primary'
                        >
                            Prepping
                        </Button>
                        <br/>

                        <Button style={{"margin": "10px"}} variant="contained" color='error' onClick={()=>{
                            set_show_customer_orders_modal(true)
                            set_chosen_activity("COOKING")
                            }}> Cooking 
                        </Button>
                        <br/>

                        <Button variant='contained' color='success'
                            onClick={()=>{
                                set_show_customer_orders_modal(true)
                                set_chosen_activity("PACKING")
                            }}
                        >
                            Packing
                        </Button>
                        <br/>
                        <br/>
                        <Button variant='contained' color='success'
                            onClick={()=>{
                                set_show_customer_orders_modal(true)
                                set_chosen_activity("VIEW_ORDERS")
                            }}
                        >
                            View All Customer Orders
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }



    else if(stage === "REQUIREMENTS"){
        return(
            
            <div style={{"padding": "15px"}} >
                <Button onClick={()=>{
                        let home_check = window.confirm("Going back to the homepage will end your current activity and all progress will be lost. Do you still want to go back to the home page?")
                        if(home_check){
                            set_chosen_activity(null)
                            setStage(null)
                        }
                    }}
                    >
                        Back to Home
                    </Button>
                
                <h1 style={{"color": "#FF9F33"}}>Actual</h1>

                <Row style={{"border": "solid", "borderColor": "#FF9F33", "padding": "10px", "backgroundColor": "#FF9F33", "color": "white"}}>
                    <Col>
                        <h1> Requirements: </h1>
                    </Col>
                </Row>

                <br/>

                <h5>You will need: </h5>
                <Carousel variant="dark" style={{"height": window.innerHeight * 0.6, "width": window.innerWidth * 0.7, "margin": "0 auto"}}>
                    <Carousel.Item>
                        <img style={{"opacity": "0.5"}}
                            src={induction_hob}
                            alt="induction_hob"
                        />
                        <Carousel.Caption>
                        <h3>12 induction hobs</h3>
                        <p>(stove hobs/portable hobs)</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img style={{"opacity": "0.5"}}
                            src={wok_pan}
                            alt="wok_pan"
                        />
                        <Carousel.Caption>
                        <h3>12 woks / frying pans</h3>
                        
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img style={{"opacity": "0.5"}}
                            src={small_item_organiser}
                            alt="small_item_organiser"
                        />
                        <Carousel.Caption>
                        <h3>Small item organiser</h3>
                        <p>(To store and separate ingredients for easy retrieval)</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img style={{"opacity": "0.5"}}
                            src={plate}
                            alt="plate"
                        />
                        <Carousel.Caption>
                        <h3>4 plates</h3>
                        <p>(Only needed if you don't have a small item oraniser)</p>
                        <p>(Each plate will be used to store one recipe's ingredients)</p>
                        <p>(Each ingredient will need to be kept on a separate section of the plate for easy retrieval)</p>
                        </Carousel.Caption>
                    </Carousel.Item>
  
                </Carousel>
                <br/>
                
                <Button style={{"margin": "10px"}} variant="contained" onClick={()=>{
                    // // setStage("LOAD")
                    // set_app_starting(true)
                    // set_instruction_stage(instruction_stage + 1)
                    // set_recipe_cycle_number(recipe_cycle_number + 1)
                    // program()
                    set_last_instruction_in_stage(true)
                    setNextClick(true)
                }}>Next</Button>
            </div>
        )
    }

    else if(stage === "PREPPING"){
        console.log("meals to prep at prepping: ", meals_to_prep)
        return(
            <div>
                <Button onClick={()=>{
                        let home_check = window.confirm("Going back to the homepage will end your current activity and all progress will be lost. Do you still want to go back to the home page?")
                        if(home_check){
                            set_chosen_activity(null)
                            setStage(null)
                        }
                    }}
                    >
                        Back to Home
                    </Button>
                    <br/>
                {   
                    Object.keys(meals_to_prep).sort().map((item, index)=>{
                        let text_colour = 'black'
                        return(
                            <div style={{"border": "solid", "margin": "60px"}}>
                                <a href="#" onClick={()=>{set_prep_modal(true)
                                    console.log("recipes: ", recipes)
                                        let i = 1;
                                        for(i; i < Object.keys(recipes).sort().length; i++){
                                            if(recipes[i]["name"] === item){
                                                set_retrieval_steps(recipes[i]["retrieval-steps"])
                                                set_prep_steps(recipes[i]["prep-steps"])
                                                set_retrieval_stage(true)
                                            }
                                        }
                                    }
                                } 
                                key={index}
                                style={{"color": (meals_to_prep[item]["status"] === "AWAITING_PREP") ? 'black' : 'green'}} 
                                >
                                    <span> <u>{item}: {meals_to_prep[item]["num_meals"]}</u></span>
                                </a>
                                <Button onClick={(()=>{
                                    // console.log(meals_to_prep)
                                    let meals_to_prep_copy = meals_to_prep
                                    meals_to_prep_copy[item]["status"] = "AWAITING_COOKING"
                                    set_meals_to_prep(meals_to_prep_copy)
                                    set_last_instruction_in_stage(!last_instruction_in_stage)

                                    // console.log(meals_to_prep)
                                    // db.collection("orders").doc(chosen_order_id)
                                    // .update({item: {"status": "AWAITING_COOKING", "num_meals": meals_to_prep_copy[item]["num_meals"]}})
                                    // .then(()=>{
                                    //     // text_colour = 'green'
                                    //     set_last_instruction_in_stage(!last_instruction_in_stage)
                                    // })
                                    
                                    })}>
                                    Done
                                </Button>
                            </div>
                        )
                    })
                }

                <Modal show={prep_modal} onHide={(()=>{set_prep_modal(false)})}>
                    <Modal.Header>
                        {prep_stage && <h2> <u>Prep Steps</u> </h2>}
                        {retrieval_stage && <h2> <u>Retrieval Steps</u> </h2>}
                    </Modal.Header>

                    <Modal.Body>
                        {prep_stage && 
                            (prep_steps.length > 0 ? <h3>{prep_steps[step_counter]["instruction"]}</h3> : <h3>No prep steps</h3>)
                        }
                        {retrieval_stage && 
                            (retrieval_steps.length > 0 ? <h3>{retrieval_steps[step_counter]["instruction"]}</h3> : <h3>No retrieval steps</h3>)
                        }
                    </Modal.Body>

                    

                    <Modal.Footer>
                        <Button onClick={()=>{set_prep_modal(false)}}>
                            Close
                        </Button>
                        <Button onClick={(()=>{
                            if(prep_stage && (step_counter === 0)){
                                set_prep_stage(false)
                                set_step_counter(retrieval_steps.length - 1)
                                set_retrieval_stage(true)
                            }else{
                                if(step_counter === 0){
                                    return null
                                }else{
                                    set_step_counter(step_counter - 1)
                                }
                            }
                        })}>
                            Previous
                        </Button>
                        <Button onClick={(()=>{
                            if(retrieval_stage && (step_counter === retrieval_steps.length - 1) ){
                                set_retrieval_stage(false)
                                set_step_counter(0)
                                set_prep_stage(true)
                            }else{
                                if(retrieval_stage){
                                    set_step_counter(step_counter + 1)
                                }else{
                                    if(step_counter === prep_steps.length - 1){
                                        return null
                                    }else{
                                        set_step_counter(step_counter + 1)
                                    }
                                }
                            }
                        })}>
                            Next
                        </Button>
                        
                    </Modal.Footer>
                </Modal>
            </div>
            
        )
    }


    //=====================================================
    //   IF BASE/RETRIEVAL/OVEN/PREP/LOAD STAGE SHOW 4 BOWLS 
    //   AND INSTRUCTIONS FOR EACH BOWL/RECIPE
    //=====================================================
    else if((stage === "LOAD") || (stage === "RETRIEVAL") || (stage === "PREP") || (stage === "OVEN") || (stage === "BASE") ){
        return (
            app_starting ? 
            <div style={{"display": "flex",
                "alignItems": "center", "justifyContent": "center"}}>
               <div>
                    <h1 style={{"color": "#FF9F33"}}>Actual</h1>
                    <Spinner animation="border"/>
                    <h2>Loading, please wait...</h2>
                </div> 
            </div>
            
            
            :

            <div style={{"padding": "15px"}} >
                <Button onClick={()=>{
                        let home_check = window.confirm("Going back to the homepage will end your current activity and all progress will be lost. Do you still want to go back to the home page?")
                        if(home_check){
                            set_chosen_activity(null)
                            setStage(null)
                        }
                    }}
                    >
                        Back to Home
                    </Button>
                {console.log("stage is: ", stage)}
                <h1 style={{"color": "#FF9F33"}}>Actual</h1>                
                <Row style={{"border": "solid", "borderColor": "#FF9F33", "padding": "10px", "backgroundColor": "#FF9F33", "color": "white"}}>
                    <Col>
                        <h1>Stage: {stage}</h1>
                    </Col>

                    <Col>
                        {instruction_stage > 0 && 
                            <div>

                                <Button style={{"margin": "10px"}} variant="contained" onClick={()=>{
                                    console.log("======================================")
                                    console.log("BACK BUTTON PRESSED")
                                    console.log("======================================")
                                    set_consecutive_back_presses(consecutive_back_presses + 1)
                                    }}>
                                    Back
                                </Button>
                                <Button style={{"margin": "10px"}} variant="contained" onClick={()=>{
                                    const instruction_stage_copy = instruction_stage
                                    const recipe_cycle_number_copy = recipe_cycle_number
                                    if(consecutive_back_presses >= 0){
                                        set_consecutive_back_presses(consecutive_back_presses - 1)
                                    }else{
                                        //let temp_completed = completed_steps
                                        console.log("======================================")
                                        console.log("NEXT BUTTON PRESSED")
                                        console.log("======================================")
                                        if(stage === "BASE"){
                                            // minus 1 because instruction_stage counter starts on 1 for purposes of numbering 
                                            //hobs, while arrays start on 0.
                                            if( ((instruction_stage_copy - 1) >= 0) && (recipes[recipe_cycle_number]["base-steps"].length >= (instruction_stage_copy - 1)) && (recipes[recipe_cycle_number_copy]["base-steps"].length !== 0) ){
                                                if("duration" in recipes[recipe_cycle_number_copy]["base-steps"][instruction_stage_copy - 1]){
                                                    createTimer(recipes[recipe_cycle_number_copy]["base-steps"][instruction_stage_copy - 1]["step-number"], recipes[recipe_cycle_number_copy]["base-steps"][instruction_stage_copy - 1]["duration"], to_do_steps[recipe_cycle_number_copy])
                                                }
                                            }
                                        }
                                        if(stage === "OVEN"){
                                            // minus 1 because instruction_stage counter starts on 1 for purposes of numbering 
                                            //hobs, while arrays start on 0.
                                            if( ((instruction_stage_copy - 1) >= 0) && (recipes[recipe_cycle_number]["oven-steps"].length >= (instruction_stage_copy - 1)) && (recipes[recipe_cycle_number_copy]["oven-steps"].length !== 0) ){
                                                if("duration" in recipes[recipe_cycle_number_copy]["oven-steps"][instruction_stage_copy - 1]){
                                                    createTimer(recipes[recipe_cycle_number_copy]["oven-steps"][instruction_stage_copy - 1]["step-number"], recipes[recipe_cycle_number_copy]["oven-steps"][instruction_stage_copy - 1]["duration"], to_do_steps[recipe_cycle_number_copy])
                                                }
                                            }
                                        }
                                        
                                        set_instruction_stage(instruction_stage + 1)
                                        //temp_completed.unshift(on_screen_instruction)
                                        set_completed_steps(completed_steps => [{"stage": stage, "instruction": on_screen_instruction, "recipe-name": recipes[recipe_cycle_number_copy]["name"]}, ...completed_steps])
                                        setNextClick(true)
                                    }
                                
                                }}>Next
                                </Button> 
                                 
                            </div>
                             
                        }


                    </Col>
                </Row>
                <br/>

                <Row>

                    <Container style={{"margin": "0 auto"}}>
                        
                        { ((stage === "RETRIEVAL") || (stage === "PREP") || (stage === "OVEN") || (stage === "BASE")) 
                        && 
                        <div>
                            <Row>
                    
                                {(consecutive_back_presses >= 0 && completed_steps.length > 0) &&    
                                    <div>
                                        <h3 style={{"color": "red"}}>Previous Instruction:</h3>
                                        <h3 style={{"color": "red"}}>Recipe: {completed_steps[consecutive_back_presses]["recipe-name"]}</h3>
                                        <h3 style={{"color": "red"}}>Stage: {completed_steps[consecutive_back_presses]["stage"]}</h3>
                                        <h3 style={{"color": "red"}}>Instruction: {completed_steps[consecutive_back_presses]["instruction"]}</h3>
                                    </div>

                                    
                                }
                            </Row>

                            <Row style={{"height": "100%"}}>

                                <Col style={{"height": "100%", "backgroundColor": recipe_stage_colors[( (recipe_cycle_number % 2) === 0) ? 2 : 1][1], "color": "white"}}>
                                    {console.log("Recipe cycle number: ", recipe_cycle_number.toString())}
                                    {console.log("Recipes: ", (recipes))}
                                    <h3>Meal: {recipes[recipe_cycle_number]["name"]}</h3>
                                    
                                    <div> 
                                        <br/>
                                        {consecutive_back_presses < 0 && 
                                            <h3>Current Instruction: {on_screen_instruction}</h3> 
                                        }
                                        
                                    </div>

                                    <img style={{"width": window.innerWidth * 0.2}} src={mixing_bowl} alt="mixing bowl" />

                                </Col>

                            </Row>
                        </div>
                        
                        
                        }
                    </Container>
                </Row>

                {/* <Row>
                    
                    {(consecutive_back_presses >= 0 && completed_steps.length > 0) &&    
                        <div>
                            <h3>Previous Instruction:</h3>
                            <h3>Recipe: {completed_steps[consecutive_back_presses]["recipe-name"]}</h3>
                            <h3>Stage: {completed_steps[consecutive_back_presses]["stage"]}</h3>
                            <h3>Instruction: {completed_steps[consecutive_back_presses]["instruction"]}</h3>
                        </div>
                         
                        // :

                        // (completed_steps.length > 0 && 

                        //     <div>                            
                        //         <h3 style={{"color": "red", "opacity": "50%"}}>Stage: {completed_steps[0]["stage"]}</h3>
                        //         <h3 style={{"color": "red", "opacity": "50%"}}>Instruction: {completed_steps[0]["instruction"]}</h3>   
                        //     </div>
                        // )
                        
                    }
                </Row> */}
    
            </div>
                
        );

    }


    else if(stage === "PRE-HEAT"){
        return(
            
            <Container>
                <div style={{"padding": "15px"}} >
                <Button onClick={()=>{
                        let home_check = window.confirm("Going back to the homepage will end your current activity and all progress will be lost. Do you still want to go back to the home page?")
                        if(home_check){
                            set_chosen_activity(null)
                            setStage(null)
                        }
                    }}
                    >
                        Back to Home
                    </Button>
                    <h1 style={{"color": "#FF9F33"}}>Actual</h1>                
                    <Row style={{"border": "solid", "borderColor": "#FF9F33", "padding": "10px", "backgroundColor": "#FF9F33", "color": "white"}}>
                        <Col>
                            <h1> Pre-Heating </h1>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <Row>
                        <Col>
                            {pre_heat.map((item, index)=>{
                                return(
                                    <div key={index}>
                                        <Card>
                                           <h3> {item} </h3> 
                                        </Card>
                                        <br/>
                                        
                                    </div>
                                )
                            })}
                        </Col>

                        <Col>
                            <Button style={{"margin": "10px"}} variant="contained" onClick={()=>{
                                // setStage("RETRIEVAL")
                                
                                set_last_instruction_in_stage(true)
                                // set_instruction_stage(instruction_stage + 1)
                                // set_recipe_cycle_number(1)
                                // program()
                                
                                setNextClick(true)
                                }}>Next</Button>
                        </Col>
                    </Row>
                </div>
                
            </Container>
            
        )
    }



    //===========================================================
    // IF STOVE-SECONDARY STAGE, SHOW 4 STOVES AND INSTRUCTIONS
    //===========================================================
    else if( (stage === "STOVE-SECONDARY") || (stage === "STOVE-PRELIM") ){
        return (

            (
                
                <Container>
                    <Button onClick={()=>{
                        let home_check = window.confirm("Going back to the homepage will end your current activity and all progress will be lost. Do you still want to go back to the home page?")
                        if(home_check){
                            set_chosen_activity(null)
                            setStage(null)
                        }
                    }}
                    >
                        Back to Home
                    </Button>
                    <h1 style={{"color": "#FF9F33"}}>Actual</h1>
                    {/* <Button variant='outlined' onClick={()=>{set_pop_over(!pop_over)}} aria-label="info">
                        Click for Orientation Info
                    </Button>
                    <Toast show={pop_over} onClose={()=>{set_pop_over(false)}}>
                        <Toast.Header>Orientation Help</Toast.Header>
                        <Toast.Body>
                            <h5>Set orientation of device to horizontal for <strong>horizontal</strong> stove layout </h5>
                            <h5>Set orientation of device to vertical for <strong>square</strong> stove layout </h5>
                        </Toast.Body>
                    </Toast> */}
                    <audio ref={audioPlayer} src={NewNotification} autoPlay/>
                    
                    {/* HEADER */}
                    <Row style={{"border": "solid", "borderColor": "#FF9F33", "padding": "10px", "backgroundColor": "#FF9F33", "color": "white", "marginBottom": "10px"}}>
                        <Col>
                            <h2>Stage: {stage}</h2> 
                        </Col>

                        <Col>
                        { (to_do_steps) && 
                            (
                                (to_do_steps["steps"].length > 0) && 
                                <div>

                                    <Button style={{"margin": "10px"}} variant="contained" onClick={()=>{
                                        console.log("======================================")
                                        console.log("BACK BUTTON PRESSED")
                                        console.log("======================================")
                                        set_consecutive_back_presses(consecutive_back_presses + 1)
                                        }}>
                                        Back
                                    </Button>
                                    <Button style={{"margin": "10px"}} variant="contained" onClick={()=>{

                                        if(consecutive_back_presses >= 0){
                                            set_consecutive_back_presses(consecutive_back_presses - 1)
                                        }else{
                                            //let temp_completed = completed_steps
                                            console.log("======================================")
                                            console.log("NEXT BUTTON PRESSED")
                                            console.log("======================================")
                                            //temp_completed.unshift(on_screen_instruction)
                                            set_completed_steps(completed_steps => [{"stage": stage, "instruction": to_do_steps["steps"][0], "recipe-name": to_do_steps["steps"][0]["recipe-name"]}, ...completed_steps])
                                            if(to_do_steps["steps"].length > 0){

                                                
                                            
                                                console.log("NEXT BUTTON")
                                                
                                                console.log("Duration 1: ", recipe_1_timer.toString())
                                                console.log("Duration 2: ", recipe_2_timer.toString())
                                                console.log("Duration 3: ", recipe_3_timer.toString())
                                                console.log("Duration 4: ", recipe_4_timer.toString())
                                                console.log("Duration 5: ", recipe_5_timer.toString())
                                                console.log("Duration 6: ", recipe_6_timer.toString())
                                                console.log("Duration 7: ", recipe_7_timer.toString())
                                                console.log("Duration 8: ", recipe_8_timer.toString())
                                                console.log("Duration 9: ", recipe_9_timer.toString())
                                                console.log("Duration 10: ", recipe_10_timer.toString())
                                                console.log("Duration 11: ", recipe_11_timer.toString())
                                                console.log("Duration 12: ", recipe_12_timer.toString())
        
                                                if(to_do_steps["steps"][0]["hob-number"] === 1){
                                                    console.log("duration timer set to: ", (to_do_steps["steps"][0]["step-info"]["duration"]).toString())
                                                    if((to_do_steps["steps"][0]["step-info"]["duration"] * 60) > recipe_1_timer){
                                                        set_recipe_1_timer(to_do_steps["steps"][0]["step-info"]["duration"] * 60)
                                                    }
                                                    

                                                    createTimer(to_do_steps["steps"][0]["step-info"]["step-number"], to_do_steps["steps"][0]["step-info"]["duration"], to_do_steps["steps"][0]["upcoming_recipe_FBID"])
                                                }
                                                if(to_do_steps["steps"][0]["hob-number"] === 2){
                                                    console.log("duration timer set to: ", (to_do_steps["steps"][0]["step-info"]["duration"]).toString())
                                                    if((to_do_steps["steps"][0]["step-info"]["duration"] * 60) > recipe_2_timer){
                                                        set_recipe_2_timer(to_do_steps["steps"][0]["step-info"]["duration"] * 60)
                                                    }
                                                    createTimer(to_do_steps["steps"][0]["step-info"]["step-number"], to_do_steps["steps"][0]["step-info"]["duration"], to_do_steps["steps"][0]["upcoming_recipe_FBID"])
                                                }
                                                if(to_do_steps["steps"][0]["hob-number"] === 3){
                                                    console.log("duration timer set to: ", (to_do_steps["steps"][0]["step-info"]["duration"]).toString())
                                                    if((to_do_steps["steps"][0]["step-info"]["duration"] * 60) > recipe_3_timer){
                                                        set_recipe_3_timer(to_do_steps["steps"][0]["step-info"]["duration"] * 60)
                                                    }
                                                    createTimer(to_do_steps["steps"][0]["step-info"]["step-number"], to_do_steps["steps"][0]["step-info"]["duration"], to_do_steps["steps"][0]["upcoming_recipe_FBID"])
                                                }
                                                if(to_do_steps["steps"][0]["hob-number"] === 4){
                                                    console.log("duration timer set to: ", (to_do_steps["steps"][0]["step-info"]["duration"]).toString())
                                                    if((to_do_steps["steps"][0]["step-info"]["duration"] * 60) > recipe_4_timer){
                                                        set_recipe_4_timer(to_do_steps["steps"][0]["step-info"]["duration"] * 60)
                                                    }
                                                    createTimer(to_do_steps["steps"][0]["step-info"]["step-number"], to_do_steps["steps"][0]["step-info"]["duration"], to_do_steps["steps"][0]["upcoming_recipe_FBID"])
                                                }
                                                if(to_do_steps["steps"][0]["hob-number"] === 5){
                                                    console.log("duration timer set to: ", (to_do_steps["steps"][0]["step-info"]["duration"]).toString())
                                                    if((to_do_steps["steps"][0]["step-info"]["duration"] * 60) > recipe_5_timer){
                                                        set_recipe_5_timer(to_do_steps["steps"][0]["step-info"]["duration"] * 60)
                                                    }
                                                    createTimer(to_do_steps["steps"][0]["step-info"]["step-number"], to_do_steps["steps"][0]["step-info"]["duration"], to_do_steps["steps"][0]["upcoming_recipe_FBID"])
                                                }
                                                if(to_do_steps["steps"][0]["hob-number"] === 6){
                                                    console.log("duration timer set to: ", (to_do_steps["steps"][0]["step-info"]["duration"]).toString())
                                                    if((to_do_steps["steps"][0]["step-info"]["duration"] * 60) > recipe_6_timer){
                                                        set_recipe_6_timer(to_do_steps["steps"][0]["step-info"]["duration"] * 60)
                                                    }
                                                    createTimer(to_do_steps["steps"][0]["step-info"]["step-number"], to_do_steps["steps"][0]["step-info"]["duration"], to_do_steps["steps"][0]["upcoming_recipe_FBID"])
                                                }
                                                if(to_do_steps["steps"][0]["hob-number"] === 7){
                                                    console.log("duration timer set to: ", (to_do_steps["steps"][0]["step-info"]["duration"]).toString())
                                                    if((to_do_steps["steps"][0]["step-info"]["duration"] * 60) > recipe_7_timer){
                                                        set_recipe_7_timer(to_do_steps["steps"][0]["step-info"]["duration"] * 60)
                                                    }
                                                    createTimer(to_do_steps["steps"][0]["step-info"]["step-number"], to_do_steps["steps"][0]["step-info"]["duration"], to_do_steps["steps"][0]["upcoming_recipe_FBID"])
                                                }
                                                if(to_do_steps["steps"][0]["hob-number"] === 8){
                                                    console.log("duration timer set to: ", (to_do_steps["steps"][0]["step-info"]["duration"]).toString())
                                                    if((to_do_steps["steps"][0]["step-info"]["duration"] * 60) > recipe_8_timer){
                                                        set_recipe_8_timer(to_do_steps["steps"][0]["step-info"]["duration"] * 60)
                                                    }
                                                    createTimer(to_do_steps["steps"][0]["step-info"]["step-number"], to_do_steps["steps"][0]["step-info"]["duration"], to_do_steps["steps"][0]["upcoming_recipe_FBID"])
                                                }
                                                if(to_do_steps["steps"][0]["hob-number"] === 9){
                                                    console.log("duration timer set to: ", (to_do_steps["steps"][0]["step-info"]["duration"]).toString())
                                                    if((to_do_steps["steps"][0]["step-info"]["duration"] * 60) > recipe_9_timer){
                                                        set_recipe_9_timer(to_do_steps["steps"][0]["step-info"]["duration"] * 60)
                                                    }
                                                    createTimer(to_do_steps["steps"][0]["step-info"]["step-number"], to_do_steps["steps"][0]["step-info"]["duration"], to_do_steps["steps"][0]["upcoming_recipe_FBID"])
                                                }
                                                if(to_do_steps["steps"][0]["hob-number"] === 10){
                                                    console.log("duration timer set to: ", (to_do_steps["steps"][0]["step-info"]["duration"]).toString())
                                                    if((to_do_steps["steps"][0]["step-info"]["duration"] * 60) > recipe_10_timer){
                                                        set_recipe_10_timer(to_do_steps["steps"][0]["step-info"]["duration"] * 60)
                                                    }
                                                    createTimer(to_do_steps["steps"][0]["step-info"]["step-number"], to_do_steps["steps"][0]["step-info"]["duration"], to_do_steps["steps"][0]["upcoming_recipe_FBID"])
                                                }
                                                if(to_do_steps["steps"][0]["hob-number"] === 11){
                                                    console.log("duration timer set to: ", (to_do_steps["steps"][0]["step-info"]["duration"]).toString())
                                                    if((to_do_steps["steps"][0]["step-info"]["duration"] * 60) > recipe_11_timer){
                                                        set_recipe_11_timer(to_do_steps["steps"][0]["step-info"]["duration"] * 60)
                                                    }
                                                    createTimer(to_do_steps["steps"][0]["step-info"]["step-number"], to_do_steps["steps"][0]["step-info"]["duration"], to_do_steps["steps"][0]["upcoming_recipe_FBID"])
                                                }
                                                if(to_do_steps["steps"][0]["hob-number"] === 12){
                                                    console.log("duration timer set to: ", (to_do_steps["steps"][0]["step-info"]["duration"]).toString())
                                                    if((to_do_steps["steps"][0]["step-info"]["duration"] * 60) > recipe_12_timer){
                                                        set_recipe_12_timer(to_do_steps["steps"][0]["step-info"]["duration"] * 60)
                                                    }
                                                    createTimer(to_do_steps["steps"][0]["step-info"]["step-number"], to_do_steps["steps"][0]["step-info"]["duration"], to_do_steps["steps"][0]["upcoming_recipe_FBID"])
                                                }
        
                                                
        
                                                console.log("old to do steps: ", JSON.stringify(to_do_steps))
        
                                                let toRemove = to_do_steps["steps"][0]
        
                                                //remove just completed step from to-do-steps
                                                db.collection("to-do-steps").doc(to_do_steps_instance_FBID).update({
                                                    "steps": firebase.firestore.FieldValue.arrayRemove(toRemove)
                                                });
                                                console.log("current instruction object: ", JSON.stringify(current_instruction_object))
        
                                            }
                                            setNextClick(true)
                                        }



                                        


                                        }}>Next
                                        </Button> 
                                        
                                </div>
                                
                            )
                        }
                        </Col>
                        
                    </Row>
                    {/* HEADER (CONTAINING BUTTONS ETC) ENDS HERE */}



                    {/* ACTUAL SCREEN LAYOUT STARTS HERE */}
                    <Row>

                    {cooking_complete_alert && <Alert severity="success">Meals ready for packing</Alert>}

                        <Col lg={10} md={10} sm={10} style={{"border": "solid", "height": 0.15 * window.innerHeight, "margin": "auto"}}>
                            {consecutive_back_presses >= 0 ?
                                (completed_steps.length > 0 && 
                                    <div style={{"overflowY": "scroll"}}>
                                        {completed_steps[consecutive_back_presses]["stage"] === "STOVE-SECONDARY" ? 
                                        <div>
                                            <h4 style={{"color": "#ff5440"}}>Stage: {completed_steps[consecutive_back_presses]["stage"]}</h4>
                                            <h4 style={{"color": "#ff5440"}}>Recipe: {completed_steps[consecutive_back_presses]["instruction"]["recipe-name"]}</h4>
                                            <h4 style={{"color": "#ff5440"}}>Prevoious Instruction: {completed_steps[consecutive_back_presses]["instruction"]["step-info"]["instruction"]}</h4>
                                            <h4 style={{"color": "#ff5440"}}>Hob Number: {completed_steps[consecutive_back_presses]["instruction"]["hob-number"]}</h4>
                                        </div>
                                        :
                                        <div>
                                            <h3 style={{"color": "#ff5440"}}>Stage: {completed_steps[consecutive_back_presses]["stage"]}</h3>
                                            <h3 style={{"color": "#ff5440"}}>Instruction: {completed_steps[consecutive_back_presses]["instruction"]}</h3>  
                                            <h4 style={{"color": "#ff5440"}}>Hob Number: {completed_steps[consecutive_back_presses]["instruction"]["hob-number"]}</h4> 
                                        </div>
                                        
                                        }                                
                                    </div>
                                ) 
                            :
                            
                            (to_do_steps) ?

                                (
                                    (to_do_steps["steps"].length > 0) ?
                                                            
                                        <div>
                                            {/* {console.log("current instruction object: ", current_instruction_object)} */}
                                            
                                            <h2>Instruction:</h2>
                                            <h5 style={{"overflowY": "scroll"}}>{to_do_steps["steps"][0]["step-info"]["instruction"]}</h5>
                                            
                                            <br/>
                                            <br/>
                                            <br/>

                                    
                                        </div>
                                        :
                                        <div>
                                            {to_do_steps["finished"].length === Object.keys(recipes).length ?
                                                <div>
                                                    <h4>All recipes completed</h4> 
                                                    <Modal show={finished_cooking_modal}>
                                                        <Modal.Body>
                                                            <h2>Cooking finished, press complete button below to change meal status to packing!</h2>
                                                        </Modal.Body>

                                                        <Modal.Footer>
                                                            <Button  onClick={()=>{set_finished_cooking_modal(false)}}>
                                                                Close
                                                            </Button>
                                                            <Button onClick={(async ()=>{
                                                                console.log("meals on hob: ", meals_on_hob)
                                                                //ONCE CHEF CLICKS THIS BUTTON, SET COOKED MEALS' STATUS TO BE AWAITING_PACKING
                                                                let chosen_order_data_copy = chosen_order_data
                                                                let i = 0;
                                                                for(i; i < meals_on_hob.length; i++){
                                                                    let k = 0;
                                                                    for(k; k < chosen_order_data["customer_order_data"][meals_on_hob[i]["Email"]]["Selected_Meals"].length; k++){
                                                                        if(meals_on_hob[i]["Meal_Name"] === chosen_order_data["customer_order_data"][meals_on_hob[i]["Email"]]["Selected_Meals"][k]["Name"]){
                                                                            chosen_order_data_copy["customer_order_data"][meals_on_hob[i]["Email"]]["Selected_Meals"][k]["Status"] = "AWAITING_PACKING"
                                                                            chosen_order_data_copy["last_edited"] = Date.now()
                                                                        }
                                                                    }
                                                                }
                                                                db.collection("orders").doc(chosen_order_id).update(
                                                                    chosen_order_data_copy
                                                                ).then(()=>{
                                                                    console.log("data sent to fb, id, copy: ", chosen_order_id, chosen_order_data_copy)
                                                                    set_finished_cooking_modal(false)
                                                                    set_cooking_complete_alert(true)
                                                                    setTimeout(()=>{
                                                                        set_cooking_complete_alert(false)
                                                                    }, 10000)
                                                                })
                                                            })}
                                                            
                                                            >Complete</Button>
                                                        </Modal.Footer>
                                                        </Modal>
                                                </div>
                                                
                                                
                                                : 
                                            
                                            <h4>Mix all meals whilst waiting for next step</h4>}
                                            <br/>
                                            <br/>
                                            <br/>

                                        
                                        </div>
                                        
                                        
                                )
                                
                                
                                :
                                <div>
                                <h3>Loading next steps...</h3>
                                <br/>
                                <br/>
                                <br/>

                                </div>
                                
                                    
                                
                            }
                        </Col>
                    </Row>



                    <Row>
                       

                        <Col lg={6} md={8} sm={10} style={{"border": "solid", "borderColor" : "green", "height": 0.35 * window.innerHeight, "margin": "auto"}}>
                            {(to_do_steps) ?
                                (to_do_steps["steps"].length > 0) ?
                                    (<div>
                                        <h3>Meal: {to_do_steps["steps"][0]["recipe-name"]}</h3>
                                        {console.log("hob number: ", to_do_steps["steps"][0]["hob-number"])}
                                        {console.log("step: ", to_do_steps["steps"][0])}
                                        <h1>Stove Number:</h1>
                                        <h1>{to_do_steps["steps"][0]["hob-number"]}</h1>
                                    </div>
                                    )
                                    
                                    :
                                    to_do_steps["finished"].length === Object.keys(recipes).length ?<h4>All recipes completed</h4> : <h4>Mix all meals whilst waiting for next step</h4>
                                    
                            
                            :
                            <h4>Waiting for steps to load...</h4>
                        
                            }
                        </Col>
                            
                    </Row>


                    <Row>
                        
                        
                           {hob_quantity.map((item, index)=>{
                                return(
                                    // ( to_do_steps ?  (to_do_steps.length > 0 ?  (to_do_steps["steps"][0]["hob-number"] === item ? '#ff5440' : (Object.keys(recipes).includes(item) ? 'transparent' : '#CBCBCB') )  : 'transparent') : 'transparent' )
                                    <Col key={index} lg={2} md={2} sm={2} style={{"border": "solid", "height": 0.15 * window.innerHeight, "margin": "auto", "backgroundColor": ( ( Object.keys(recipes).includes(item.toString()) ) ? ( to_do_steps ? (to_do_steps["steps"].length > 0 ? ( (to_do_steps["steps"][0]["hob-number"] === item) ? '#ff5440' : (to_do_steps["finished"].includes(item) ? 'gray' : 'transparent')) : (to_do_steps["finished"].includes(item) ? 'gray' : 'transparent')) : 'transparent' ) : 'gray')}}>
                                        {/* {console.log(`item is: ${item}`, `current instruction hob number is: ${to_do_steps && to_do_steps["steps"][0]["hob-number"].toString()}` )} */}
                                        {item === 1 &&
                                            (recipe_1_timer > 0) ? <h5>{(recipe_1_timer / (60*60)) >= 1 ? (Math.floor(recipe_1_timer/(60*60))) : ('00')}:{(59 >= (recipe_1_timer / 60) && (recipe_1_timer / 60)  >= 1) ? (Math.floor(recipe_1_timer / 60)) : '00'}:{ (59 >= (recipe_1_timer%60)) ? (recipe_1_timer%60) : '00'}</h5> : null
                                        }
                                        {item === 2 &&
                                            (recipe_2_timer > 0) ? <h5>{(recipe_2_timer / (60*60)) >= 1 ? (Math.floor(recipe_2_timer/(60*60))) : ('00')}:{(59 >= (recipe_2_timer / 60) && (recipe_2_timer / 60)  >= 1) ? (Math.floor(recipe_2_timer / 60)) : '00'}:{ (59 >= (recipe_2_timer%60)) ? (recipe_2_timer%60) : '00'}</h5> : null
                                        }
                                        {item === 3 &&
                                            (recipe_3_timer > 0) ? <h5>{(recipe_3_timer / (60*60)) >= 1 ? (Math.floor(recipe_3_timer/(60*60))) : ('00')}:{(59 >= (recipe_3_timer / 60) && (recipe_3_timer / 60)  >= 1) ? (Math.floor(recipe_3_timer / 60)) : '00'}:{ (59 >= (recipe_3_timer%60)) ? (recipe_3_timer%60) : '00'}</h5> : null
                                        }
                                        {item === 4 &&
                                            (recipe_4_timer > 0) ? <h5>{(recipe_4_timer / (60*60)) >= 1 ? (Math.floor(recipe_4_timer/(60*60))) : ('00')}:{(59 >= (recipe_4_timer / 60) && (recipe_4_timer / 60)  >= 1) ? (Math.floor(recipe_4_timer / 60)) : '00'}:{ (59 >= (recipe_4_timer%60)) ? (recipe_4_timer%60) : '00'}</h5> : null
                                        }
                                        {item === 5 &&
                                            (recipe_5_timer > 0) ? <h5>{(recipe_5_timer / (60*60)) >= 1 ? (Math.floor(recipe_5_timer/(60*60))) : ('00')}:{(59 >= (recipe_5_timer / 60) && (recipe_5_timer / 60)  >= 1) ? (Math.floor(recipe_5_timer / 60)) : '00'}:{ (59 >= (recipe_5_timer%60)) ? (recipe_5_timer%60) : '00'}</h5> : null
                                        }
                                        {item === 6 &&
                                            (recipe_6_timer > 0) ? <h5>{(recipe_6_timer / (60*60)) >= 1 ? (Math.floor(recipe_6_timer/(60*60))) : ('00')}:{(59 >= (recipe_6_timer / 60) && (recipe_6_timer / 60)  >= 1) ? (Math.floor(recipe_6_timer / 60)) : '00'}:{ (59 >= (recipe_6_timer%60)) ? (recipe_6_timer%60) : '00'}</h5> : null
                                        }
                                        {item === 7 &&
                                            (recipe_7_timer > 0) ? <h5>{(recipe_7_timer / (60*60)) >= 1 ? (Math.floor(recipe_7_timer/(60*60))) : ('00')}:{(59 >= (recipe_7_timer / 60) && (recipe_7_timer / 60)  >= 1) ? (Math.floor(recipe_7_timer / 60)) : '00'}:{ (59 >= (recipe_7_timer%60)) ? (recipe_7_timer%60) : '00'}</h5> : null
                                        }
                                        {item === 8 &&
                                            (recipe_8_timer > 0) ? <h5>{(recipe_8_timer / (60*60)) >= 1 ? (Math.floor(recipe_8_timer/(60*60))) : ('00')}:{(59 >= (recipe_8_timer / 60) && (recipe_8_timer / 60)  >= 1) ? (Math.floor(recipe_8_timer / 60)) : '00'}:{ (59 >= (recipe_8_timer%60)) ? (recipe_8_timer%60) : '00'}</h5> : null
                                        }
                                        {item === 9 &&
                                            (recipe_9_timer > 0) ? <h5>{(recipe_9_timer / (60*60)) >= 1 ? (Math.floor(recipe_9_timer/(60*60))) : ('00')}:{(59 >= (recipe_9_timer / 60) && (recipe_9_timer / 60)  >= 1) ? (Math.floor(recipe_9_timer / 60)) : '00'}:{ (59 >= (recipe_9_timer%60)) ? (recipe_9_timer%60) : '00'}</h5> : null
                                        }
                                        {item === 10 &&
                                            (recipe_10_timer > 0) ? <h5>{(recipe_10_timer / (60*60)) >= 1 ? (Math.floor(recipe_10_timer/(60*60))) : ('00')}:{(59 >= (recipe_10_timer / 60) && (recipe_10_timer / 60)  >= 1) ? (Math.floor(recipe_10_timer / 60)) : '00'}:{ (59 >= (recipe_10_timer%60)) ? (recipe_10_timer%60) : '00'}</h5> : null
                                        }
                                        {item === 11 &&
                                            (recipe_11_timer > 0) ? <h5>{(recipe_11_timer / (60*60)) >= 1 ? (Math.floor(recipe_11_timer/(60*60))) : ('00')}:{(59 >= (recipe_11_timer / 60) && (recipe_11_timer / 60)  >= 1) ? (Math.floor(recipe_11_timer / 60)) : '00'}:{ (59 >= (recipe_11_timer%60)) ? (recipe_11_timer%60) : '00'}</h5> : null
                                        }
                                        {item === 12 &&
                                            (recipe_12_timer > 0) ? <h5>{(recipe_12_timer / (60*60)) >= 1 ? (Math.floor(recipe_12_timer/(60*60))) : ('00')}:{(59 >= (recipe_12_timer / 60) && (recipe_12_timer / 60)  >= 1) ? (Math.floor(recipe_12_timer / 60)) : '00'}:{ (59 >= (recipe_12_timer%60)) ? (recipe_12_timer%60) : '00'}</h5> : null
                                        }

                                        <h1>{item}</h1>
                                    </Col>
                                )
                           })} 
                           
                           


                        
                    </Row>

                </Container>
            )
              
        );
        
    }else if(stage === "PREP_DONE"){
        return(
            <div>
                <Button onClick={()=>{
                        let home_check = window.confirm("Going back to the homepage will end your current activity and all progress will be lost. Do you still want to go back to the home page?")
                        if(home_check){
                            set_chosen_activity(null)
                            setStage(null)
                        }
                    }}
                    >
                        Back to Home
                    </Button>
                    <br/>
                <h1>PREP DONE</h1>
            </div>
        )
    }else if(stage === "PACKING"){
        console.log("packing object: ", JSON.stringify(packing_object))
        if(Object.keys(packing_object).length > 0){
            return(
                <div>
                    <Button onClick={()=>{
                        let home_check = window.confirm("Going back to the homepage will end your current activity and all progress will be lost. Do you still want to go back to the home page?")
                        if(home_check){
                            set_chosen_activity(null)
                            setStage(null)
                        }
                    }}
                    >
                        Back to Home
                    </Button>
                    <br/>
                    <h1>Packing Stage</h1>
                    <br/>
                    <br/>
                    {Object.keys(packing_object).sort().map((name_and_email, index)=>{
                        return(
                            <div style={{"border": "solid", "margin": "10px"}}>
                                <h2 key={index}> <u> <strong>{name_and_email}: </strong> </u> </h2>
                                {packing_object[name_and_email].map((meal_object, meal_object_index)=>{
                                    return(
                                        <div>
                                            <h4 style={{color: (meal_object["Status"] === "AWAITING_PACKING" ? 'black' : 'green')}} key={meal_object_index}>{meal_object["Name"]}</h4>
                                            <Button onClick={(()=>{
                                                let email = name_and_email.split(',')[1].replace(" ", "")
                                                let chosen_order_data_copy = chosen_order_data
                                                let i = 0;
                                                for(i; i < chosen_order_data["customer_order_data"][email]["Selected_Meals"].length; i++){
                                                    if(chosen_order_data["customer_order_data"][email]["Selected_Meals"][i]["Name"] === meal_object["Name"]){
                                                        chosen_order_data_copy["customer_order_data"][email]["Selected_Meals"][i]["Status"] = "READY_TO_DELIVER"
                                                    }
                                                }
                                                db.collection("orders").doc(chosen_order_id)
                                                .update(chosen_order_data_copy)
                                                .then(()=>{
                                                    let i = 0;
                                                    let packing_object_copy = packing_object
                                                    for(i; i < packing_object[name_and_email].length; i++){
                                                        if(packing_object[name_and_email][i]["Status"] === "AWAITING_PACKING"){
                                                            packing_object_copy[name_and_email][i]["Status"] = "READY_TO_DELIVER"
                                                            break
                                                        }
                                                    }
                                                    set_packing_object(packing_object_copy)
                                                })
                                            })}>
                                                Done
                                            </Button>
                                            <br/>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            )
        }else{
            return(
                <div>
                    <Button onClick={()=>{setStage(null)
                        set_chosen_activity(null)}}>
                        Back
                    </Button>
                    <br/>
                    <h1>Packing Stage</h1>
                    <br/>
                    <br/>
                    <br/>
                    <h2>
                        Nothing to pack
                    </h2>
                </div>
            )
        }
    }else if(stage === "VIEW_ORDERS"){
        
        if((chosen_order_view === "BY_NAME") || (chosen_order_view === null)){
            return(
                <div>
                    <h1>Customer Orders</h1>
                    <br/>
                    <br/>
                    <Button onClick={()=>{
                        let home_check = window.confirm("Going back to the homepage will end your current activity and all progress will be lost. Do you still want to go back to the home page?")
                        if(home_check){
                            set_chosen_activity(null)
                            setStage(null)
                        }
                    }}
                    >
                        Back to Home
                    </Button>
                    <br/>
                    <br/>
                    <Button onClick={()=>{
                        set_chosen_order_view("BY_ORDER")
                        
                    }}>
                        "View by Meal"
                    </Button>
                    <br/>
                    <br/>

                    {Object.keys(cust_all_orders_obj_by_name).sort().map((name_and_email, index)=>{
                        console.log(cust_all_orders_obj_by_name)
                            return(
                                <div style={{"border": "solid", "margin": "10px"}} key={index}>
                                    <h2 > <u> <strong>{name_and_email}: </strong> </u> </h2>
                                    {cust_all_orders_obj_by_name[name_and_email].map((meal_object, meal_object_index)=>{
                                        return(
                                            <div key={meal_object_index}>
                                                <h4 >{meal_object["Name"]}</h4>
                                                <br/>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                </div>
            )
            

        }else{
            return(
                <div>
                    <h1>Customer Orders</h1>
                    <br/>
                    <Button onClick={()=>{setStage(null)
                        set_chosen_activity(null)}}>
                        Back
                    </Button>
                    <br/>
                    <Button onClick={()=>{
                        set_chosen_order_view("BY_NAME")
                    }}>
                        "View by Name"
                    </Button>
                    <br/>

                    {   
                        Object.keys(cust_all_orders_obj_by_meal).sort().map((item, index)=>{
                            console.log(cust_all_orders_obj_by_meal)
                            return(
                                <div style={{"border": "solid", "margin": "50px"}}>
                                    <h2>
                                        <u> <stong> {item}: {cust_all_orders_obj_by_meal[item]["num_meals"]} </stong> </u>
                                    </h2>
                                    {cust_all_orders_obj_by_meal[item]["customers_who_ordered"].map((person, person_index)=>{
                                        return(
                                            <h4 >
                                                {person}
                                            </h4>
                                        )
                                    })}
                                </div>
                            )
                        })
                    }
                </div>
            )
            
        }
        
    }

    
    
    
}

export default ChefAlgo;
