import Button from '@mui/material/Button';


import mixing_bowl from '../images/mixing_bowl.jpg';
import Black_Circle from '../images/Black_Circle.jpeg'
import chopping_board1 from '../images/chopping_board1.jpeg'
import chopping_board2 from '../images/chopping_board2.jpeg'
import chopping_board3 from '../images/chopping_board3.jpeg'


import NewNotification from '../sounds/NewNotification.mp3';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner';
import Card from '@mui/material/Card';


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';



import { React, useEffect, useState, useRef } from 'react';
import { db } from '../config';
import useBackgroundFunc from '../hooks/useBackgroundFunc';
// import useQueueNextStep from '../hooks/useQueueNextStep';


function ChefAlgo() {

    const audioPlayer = useRef(null);

    
    const [app_starting, set_app_starting] = useState(false)

    // const [stage, setStage] = useState(null);
    const [stage, setStage] = useState(null);
    const [on_screen_instruction, set_on_screen_instruction] = useState(null)
    const [last_instruction_in_stage, set_last_instruction_in_stage] = useState(false)
    const [instruction_stage, set_instruction_stage] = useState(0)
    const [recipe_cycle_number, set_recipe_cycle_number] = useState(0)
    const [recipe_total, set_receipe_total] = useState(4)
    const [current_recipe_name, set_current_recipe_name] = useState(null)

    const [recipe_1_upcoming, set_recipe_1_upcoming] = useState([])
    const [recipe_2_upcoming, set_recipe_2_upcoming] = useState([])
    const [recipe_3_upcoming, set_recipe_3_upcoming] = useState([])
    const [recipe_4_upcoming, set_recipe_4_upcoming] = useState([])

    const [recipe_1_upcoming_FBID, set_recipe_1_upcoming_FBID] = useState(null)
    const [recipe_2_upcoming_FBID, set_recipe_2_upcoming_FBID] = useState(null)
    const [recipe_3_upcoming_FBID, set_recipe_3_upcoming_FBID] = useState(null)
    const [recipe_4_upcoming_FBID, set_recipe_4_upcoming_FBID] = useState(null)

    const [to_do_steps_instance_FBID, set_to_do_steps_instance_FBID] = useState(null)

    const [recipe_1_timer, set_recipe_1_timer] = useState(0)
    const [recipe_2_timer, set_recipe_2_timer] = useState(0)
    const [recipe_3_timer, set_recipe_3_timer] = useState(0)
    const [recipe_4_timer, set_recipe_4_timer] = useState(0)

    const [timer1_running, set_timer1_running] = useState(false)
    const [timer2_running, set_timer2_running] = useState(false)
    const [timer3_running, set_timer3_running] = useState(false)
    const [timer4_running, set_timer4_running] = useState(false)

    const [nextClick, setNextClick] = useState(false)



    const [background_update, set_background_update] = useState(0)

    const background_colour_1 = useBackgroundFunc().background_colour_1
    const background_colour_2 = useBackgroundFunc().background_colour_2
    const background_colour_3 = useBackgroundFunc().background_colour_3
    const background_colour_4 = useBackgroundFunc().background_colour_4
    
    const [upcoming_recipes_array, set_upcoming_recipes_array] = useState([])

    const [current_instruction_object, set_current_instruction_object] = useState(null)

    const on_screen_instruction_stove_sec = useBackgroundFunc().on_screen_instruction
    const current_recipe_name_stove_sec = useBackgroundFunc().current_recipe_name

    const to_do_steps = useBackgroundFunc().toDos
    // const stepQueuer = useQueueNextStep(upcoming_recipes_array)
    
    const [to_do_steps_length, set_to_do_steps_length] = useState(0)
    const [to_do_steps_prior_length, set_to_do_steps_prior_length] = useState(0)

    const [completed_steps, set_completed_steps] = useState([])
    const [consecutive_back_presses, set_consecutive_back_presses] = useState(-1) 
    //const [algo_direction, set_algo_direction] = useState('FORWARDS')


    const [loadAlgo_check, setLoadAlgo_check] = useState(false)

    // const [recipe1, set_recipe_1] = useState(null) 
    // const [recipe2, set_recipe_2] = useState(null)
    // const [recipe3, set_recipe_3] = useState(null)
    // const [recipe4, set_recipe_4] = useState(null)

    const [recipes, set_recipes] = useState(null)

    const recipe_stage_colors = {1: {1: "#FF9F33", 2: "#FEC76D", 3: "#FEC76D", 4: "#FEC76D"},
                                2:  {1: "#FEC76D", 2: "#FF9F33", 3: "#FEC76D", 4: "#FEC76D"},
                                3:  {1: "#FEC76D", 2: "#FEC76D", 3: "#FF9F33", 4: "#FEC76D"},
                                4:  {1: "#FEC76D", 2: "#FEC76D", 3: "#FEC76D", 4: "#FF9F33"}
                            }


    const pre_heat = ["1. Set all stoves to low-medium heat", "2. Set oven to low-medium heat"]


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

    //=====================================================
    //       FUNCTION RETRIEVES RECIPES FOR ORDERS MADE
    //       AND INITIALISES DOCUMENTS IN FIREBASE AND  
    //       RETRIEVES THEIR IDs FOR ALGORITHM TO RUN
    //=====================================================
    function loadAlgo(){
        if(!loadAlgo_check){

            setLoadAlgo_check(true)
            return new Promise(async (resolve, reject)=>{
                let recipe1;
                let recipe2;
                let recipe3;
                let recipe4;

                let to_do_steps_instance_FBID;
                let upcoming_recipe_1_FBID;
                let upcoming_recipe_2_FBID;
                let upcoming_recipe_3_FBID;
                let upcoming_recipe_4_FBID;

                db.collection("to-do-steps").add({"steps": []})
                .then((docRef) => {
                    console.log("To do steps Document written with ID: ", docRef.id);

                    to_do_steps_instance_FBID = docRef.id
                    set_to_do_steps_instance_FBID(docRef.id)
                })
                .then(()=>{
                    db.collection("upcoming-recipes").add({"to_do_steps_instance_FBID": to_do_steps_instance_FBID})
                    .then((docRef) => {
                        console.log("Upcoming recipes1 Document written with ID: ", docRef.id);

                        upcoming_recipe_1_FBID = docRef.id
                        set_recipe_1_upcoming_FBID(docRef.id)
                    }).then(()=>{
                        db.collection("upcoming-recipes").add({"to_do_steps_instance_FBID": to_do_steps_instance_FBID})
                        .then((docRef) => {
                            console.log("Upcoming recipes2 Document written with ID: ", docRef.id);

                            upcoming_recipe_2_FBID = docRef.id
                            set_recipe_2_upcoming_FBID(docRef.id)
                        }).then(()=>{
                            db.collection("upcoming-recipes").add({"to_do_steps_instance_FBID": to_do_steps_instance_FBID})
                            .then((docRef) => {
                                console.log("Upcoming recipes3 Document written with ID: ", docRef.id);

                                upcoming_recipe_3_FBID = docRef.id
                                set_recipe_3_upcoming_FBID(docRef.id)
                            }).then(()=>{
                                db.collection("upcoming-recipes").add({"to_do_steps_instance_FBID": to_do_steps_instance_FBID})
                                .then((docRef) => {
                                    console.log("Upcoming recipes4 Document written with ID: ", docRef.id);

                                    upcoming_recipe_4_FBID = docRef.id
                                    set_recipe_4_upcoming_FBID(docRef.id)
                                }).then(()=>{
                                    db.collection("to-do-steps").doc(to_do_steps_instance_FBID)
                                    .update({"upcoming_recipe_1_FBID": upcoming_recipe_1_FBID,
                                            "upcoming_recipe_2_FBID": upcoming_recipe_2_FBID,
                                            "upcoming_recipe_3_FBID": upcoming_recipe_3_FBID,
                                            "upcoming_recipe_4_FBID": upcoming_recipe_4_FBID,
                                            })
                                })
                            })
                        })
                    })
                }).then(()=>{
                    db.collection("recipes").doc("1").get().then((snapshot)=>{
                        recipe1 = snapshot.data()
                    }).then(()=>{
                        db.collection("recipes").doc("2").get().then((snapshot)=>{
                            recipe2 = snapshot.data()
                        }).then(()=>{
                            db.collection("recipes").doc("3").get().then((snapshot)=>{
                                recipe3 = snapshot.data()
                            }).then(()=>{
                                db.collection("recipes").doc("4").get().then((snapshot)=>{
                                    recipe4 = snapshot.data()
                                }).then(()=>{
                                    if(recipe1 && recipe2 && recipe3 && recipe4){
                                        set_recipes({1: recipe1, 2: recipe2, 3: recipe3, 4: recipe4})
                                        set_upcoming_recipes_array([recipe_1_upcoming_FBID, recipe_2_upcoming_FBID, recipe_3_upcoming_FBID, recipe_4_upcoming_FBID])
                                        set_last_instruction_in_stage(true)
                                        resolve()

                                    }
                                })
                            })
                        })
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

        console.log(recipe_4_upcoming_FBID)
        console.log("starting ingredient retrieval")
        console.log("recipe cycle number: ", recipe_cycle_number.toString())

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
        //loop through base steps of each recipe and place on screen
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
    // RECIPE
    //=====================================================
    function stovePreliminary(){

        set_on_screen_instruction(null)
        
        let i = 1;
        for(i; i <= Object.keys(recipes).length; i++){
            let j = 0 ;
            let holderArray = []
            for(j; j < recipes[i]["stove-steps"].length; j++){
                holderArray.push({"recipe-number": recipes[i]["recipe-number"], "recipe-name": recipes[i]["name"], "step-info": recipes[i]["stove-steps"][j]})
            }
            if(i === 1){
                //send to firebase
                set_recipe_1_upcoming(holderArray)
                db.collection("upcoming-recipes").doc(recipe_1_upcoming_FBID).set({
                    "to_do_steps_instance_FBID": to_do_steps_instance_FBID,
                    "info": holderArray
                }) ;
            }
            else if(i === 2){
                //send to firebase
                set_recipe_2_upcoming(holderArray)
                db.collection("upcoming-recipes").doc(recipe_2_upcoming_FBID).set({
                    "to_do_steps_instance_FBID": to_do_steps_instance_FBID,
                    "info": holderArray
                })
            }
            else if(i === 3){
                //send to firebase
                set_recipe_3_upcoming(holderArray)
                db.collection("upcoming-recipes").doc(recipe_3_upcoming_FBID).set({
                    "to_do_steps_instance_FBID": to_do_steps_instance_FBID,
                    "info": holderArray
                })
            }
            else if(i === 4){
                //send to firebase
                set_recipe_4_upcoming(holderArray)
                db.collection("upcoming-recipes").doc(recipe_4_upcoming_FBID).set({
                    "to_do_steps_instance_FBID": to_do_steps_instance_FBID,
                    "info": holderArray
                })
            }
        }
        if(i === Object.keys(recipes).length + 1){
            set_background_update(background_update + 1)
            // set_current_instruction_object(null)
            setStage("STOVE-SECONDARY")
        }
    }


    function stoveSecondary(){

        QueueNextStep(upcoming_recipes_array)
        
    }


    //=====================================================
    //       EACH TIME A TIMER OF A RECIPE STEP FINISHES
    //  THIS FUNCTION IS RUN TO REMOVE THE COMPLETED STEP 
    // FROM [DEPENDENCY ARRAY] I.E REMOVE THE STEP FROM BEING
    // THAT OTHER STEPS ARE DEPENDENT ON
    //=====================================================
    //any time timer finishes, run this and change dependencies
    function background(step, duration, upcoming_recipe_FBID){
        new Promise(async (resolve, reject)=>{
            if(step ){
                db.collection("upcoming-recipes").doc(upcoming_recipe_FBID).get().then((snapshot)=>{
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
                                db.collection("upcoming-recipes").doc(upcoming_recipe_FBID).update({
                                    "info": recipeSteps
                                }).then(()=>{
                                    resolve()
                                })
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



    //================================================================================
    //any steps that have 0 dependency (i.e. not waiting for other steps to complete
    //remove them from the upcoming recipe steps array and place in to_do steps array
    //================================================================================
    function QueueNextStep(document_array){
        console.log("queue next step ran again...")

        let queue = setInterval(()=>{
            
            let x = 1;
            //console.log("recipes length is: ", recipes.length)
            for(x; x <= 4; x++){
                // console.log(x.toString())
                if(x === 1){
                    db.collection("upcoming-recipes").doc(to_do_steps["upcoming_recipe_1_FBID"]).get()
                    .then((snapshot)=>{
                        if("info" in snapshot.data()){
                            if(snapshot.data()["info"].length === 0){
                                clearInterval(queue)
                            }else{
                                
                                let i = 0;
                                let recipeStepsArray = snapshot.data()["info"]
                                let to_do_steps_instance_FBID = snapshot.data()["to_do_steps_instance_FBID"]
                                for(i; i < recipeStepsArray.length; i++){
                                    if(recipeStepsArray[i]["step-info"]["step-dependency"].length === 0){
                                        let toDoAddition = recipeStepsArray[i]
                                        console.log("recipe step: ", JSON.stringify(toDoAddition))
                                        db.collection("to-do-steps").doc(to_do_steps_instance_FBID)
                                        .update({"steps": firebase.firestore.FieldValue.arrayUnion(toDoAddition)})
                                        .then(()=>{
                                            db.collection("upcoming-recipes").doc(to_do_steps["upcoming_recipe_1_FBID"])
                                        .update({"info": firebase.firestore.FieldValue.arrayRemove(toDoAddition)})
                                        })
                                    }
                                }
                            }
                        }
                        
                        
                    })
                }else if(x === 2){
                    db.collection("upcoming-recipes").doc(to_do_steps["upcoming_recipe_2_FBID"]).get()
                    .then((snapshot)=>{
                        if("info" in snapshot.data()){
                            if(snapshot.data()["info"].length === 0){
                                clearInterval(queue)
                            }else{
                                
                                let i = 0;
                                let recipeStepsArray = snapshot.data()["info"]
                                let to_do_steps_instance_FBID = snapshot.data()["to_do_steps_instance_FBID"]
                                for(i; i < recipeStepsArray.length; i++){
                                    if(recipeStepsArray[i]["step-info"]["step-dependency"].length === 0){
                                        let toDoAddition = recipeStepsArray[i]
                                        console.log("recipe step: ", JSON.stringify(toDoAddition))
                                        db.collection("to-do-steps").doc(to_do_steps_instance_FBID)
                                        .update({"steps": firebase.firestore.FieldValue.arrayUnion(toDoAddition)})
                                        .then(()=>{
                                            db.collection("upcoming-recipes").doc(to_do_steps["upcoming_recipe_2_FBID"])
                                        .update({"info": firebase.firestore.FieldValue.arrayRemove(toDoAddition)})
                                        })
                                    }
                                }
                            }
                        }
                        
                        
                    })
                }else if(x === 3){
                    db.collection("upcoming-recipes").doc(to_do_steps["upcoming_recipe_3_FBID"]).get()
                    .then((snapshot)=>{
                        if("info" in snapshot.data()){
                            if(snapshot.data()["info"].length === 0){
                                clearInterval(queue)
                            }else{
                                
                                let i = 0;
                                let recipeStepsArray = snapshot.data()["info"]
                                let to_do_steps_instance_FBID = snapshot.data()["to_do_steps_instance_FBID"]
                                for(i; i < recipeStepsArray.length; i++){
                                    if(recipeStepsArray[i]["step-info"]["step-dependency"].length === 0){
                                        let toDoAddition = recipeStepsArray[i]
                                        console.log("recipe step: ", JSON.stringify(toDoAddition))
                                        db.collection("to-do-steps").doc(to_do_steps_instance_FBID)
                                        .update({"steps": firebase.firestore.FieldValue.arrayUnion(toDoAddition)})
                                        .then(()=>{
                                            db.collection("upcoming-recipes").doc(to_do_steps["upcoming_recipe_3_FBID"])
                                        .update({"info": firebase.firestore.FieldValue.arrayRemove(toDoAddition)})
                                        })
                                    }
                                }
                            }
                        }
                    })
                            
                            
                }else if(x === 4){
        
                    db.collection("upcoming-recipes").doc(to_do_steps["upcoming_recipe_4_FBID"]).get()
                    .then((snapshot)=>{
                        if("info" in snapshot.data()){
                            if(snapshot.data()["info"].length === 0){
                                clearInterval(queue)
                            }else{
                                
                                let i = 0;
                                let recipeStepsArray = snapshot.data()["info"]
                                let to_do_steps_instance_FBID = snapshot.data()["to_do_steps_instance_FBID"]
                                for(i; i < recipeStepsArray.length; i++){
                                    if(recipeStepsArray[i]["step-info"]["step-dependency"].length === 0){
                                        let toDoAddition = recipeStepsArray[i]
                                        console.log("recipe step: ", JSON.stringify(toDoAddition))
                                        db.collection("to-do-steps").doc(to_do_steps_instance_FBID)
                                        .update({"steps": firebase.firestore.FieldValue.arrayUnion(toDoAddition)})
                                        .then(()=>{
                                            db.collection("upcoming-recipes").doc(to_do_steps["upcoming_recipe_4_FBID"])
                                        .update({"info": firebase.firestore.FieldValue.arrayRemove(toDoAddition)})
                                        })
                                    }
                                }
                            }
                        }
                        
                        
                    })
                }                
            }
            
        }, 5000)
    }
    
    
        



    //=====================================================
    //   EACH TIME STAGE IS COMPLETE, MOVE TO NEXT STAGE
    //=====================================================
    function stageComplete(){
        console.log("running stage complete")

        if(stage === "LOAD"){
            setStage('BASE')
            set_last_instruction_in_stage(false)
            set_instruction_stage(1)
            set_recipe_cycle_number(1)
        }
        else if(stage === 'BASE'){
            setStage('RETRIEVAL')
            set_last_instruction_in_stage(false)
            set_instruction_stage(1)
            set_recipe_cycle_number(1)
        }
        else if(stage === 'RETRIEVAL'){
            setStage('PREP')
            set_last_instruction_in_stage(false)
            set_instruction_stage(1)
            set_recipe_cycle_number(1)
        }
        else if(stage === 'PREP'){
            setStage('OVEN')
            set_last_instruction_in_stage(false)
            set_instruction_stage(1)
            set_recipe_cycle_number(1)
        }
        else if(stage === 'OVEN'){
            setStage('STOVE-PRELIM')
            set_last_instruction_in_stage(false)
            set_instruction_stage(1)
            set_recipe_cycle_number(1)
        }
        else if(stage === 'STOVE-PRELIM'){
            setStage('STOVE-SECONDARY')
            set_last_instruction_in_stage(false)
            set_instruction_stage(1)
            set_recipe_cycle_number(1)

        }
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
                }
                else if (stage === 'RETRIEVAL'){
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
                else if(stage === 'BASE'){
                    console.log("program chosen: base")
                    set_app_starting(false)
                    base()
                }
                else if(stage === 'STOVE-PRELIM'){
                    console.log("program chosen: stove-prelim")
                    stovePreliminary()
                }
                else if(stage === 'STOVE-SECONDARY'){
                    console.log("program chosen: stove-secondary")
                    stoveSecondary()
                }
            }

        }
        
        
    }


    //=====================================================
    //  IF PRE-HEAT STAGE THEN SHOW PRE-HEAT INSTRUCTIONS
    //=====================================================
    if(stage === "PRE-HEAT"){
        return(
            
            <Container>
                <div style={{"padding": "15px"}} >
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
                                    <div>
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
                                setStage("LOAD")
                                set_app_starting(true)
                                set_instruction_stage(instruction_stage + 1)
                                set_recipe_cycle_number(recipe_cycle_number + 1)
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
            
            <Container>
                <h1 style={{"color": "#FF9F33"}}>Actual</h1>
                <audio ref={audioPlayer} src={NewNotification} />
                <Row style={{"border": "solid", "borderColor": "#FF9F33", "padding": "10px", "backgroundColor": "#FF9F33", "color": "white", "margin-bottom": "10px"}}>
                    <Col>
                        <h2>Stage: {stage}</h2> 
                    </Col>

                    <Col>
                    { (to_do_steps !== undefined) && 
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
                                <Button style={{"margin": "10px"}} variant="contained" style={{"margin": "auto 0"}} onClick={()=>{

                                    if(consecutive_back_presses >= 0){
                                        set_consecutive_back_presses(consecutive_back_presses - 1)
                                    }else{
                                        //let temp_completed = completed_steps
                                        console.log("======================================")
                                        console.log("NEXT BUTTON PRESSED")
                                        console.log("======================================")
                                        //temp_completed.unshift(on_screen_instruction)
                                        set_completed_steps(completed_steps => [{"stage": stage, "instruction": to_do_steps["steps"][0]}, ...completed_steps])
                                        if(to_do_steps["steps"].length > 0){

                                            
                                        
                                            console.log("NEXT BUTTON")
                                            console.log("Duration 1: ", recipe_1_timer.toString())
                                            console.log("Duration 2: ", recipe_2_timer.toString())
                                            console.log("Duration 3: ", recipe_3_timer.toString())
                                            console.log("Duration 4: ", recipe_4_timer.toString())
    
                                            if(to_do_steps["steps"][0]["recipe-number"] === 1){
                                                console.log("duration timer set to: ", (to_do_steps["steps"][0]["step-info"]["duration"]).toString())
                                                set_recipe_1_timer(to_do_steps["steps"][0]["step-info"]["duration"] * 60)

                                                createTimer(to_do_steps["steps"][0]["step-info"]["step-number"], to_do_steps["steps"][0]["step-info"]["duration"], to_do_steps["upcoming_recipe_1_FBID"])
                                            }
                                            if(to_do_steps["steps"][0]["recipe-number"] === 2){
                                                console.log("duration timer set to: ", (to_do_steps["steps"][0]["step-info"]["duration"]).toString())
                                                set_recipe_2_timer(to_do_steps["steps"][0]["step-info"]["duration"] * 60)

                                                createTimer(to_do_steps["steps"][0]["step-info"]["step-number"], to_do_steps["steps"][0]["step-info"]["duration"], to_do_steps["upcoming_recipe_2_FBID"])
                                            }
                                            if(to_do_steps["steps"][0]["recipe-number"] === 3){
                                                console.log("duration timer set to: ", (to_do_steps["steps"][0]["step-info"]["duration"]).toString())
                                                set_recipe_3_timer(to_do_steps["steps"][0]["step-info"]["duration"] * 60)

                                                createTimer(to_do_steps["steps"][0]["step-info"]["step-number"], to_do_steps["steps"][0]["step-info"]["duration"], to_do_steps["upcoming_recipe_3_FBID"])
                                            }
                                            if(to_do_steps["steps"][0]["recipe-number"] === 4){
                                                console.log("duration timer set to: ", (to_do_steps["steps"][0]["step-info"]["duration"]).toString())
                                                set_recipe_4_timer(to_do_steps["steps"][0]["step-info"]["duration"] * 60)

                                                createTimer(to_do_steps["steps"][0]["step-info"]["step-number"], to_do_steps["steps"][0]["step-info"]["duration"], to_do_steps["upcoming_recipe_4_FBID"])
                                            }
    
                                            
    
                                            console.log("old to do steps: ", JSON.stringify(to_do_steps))
    
                                            let toRemove = to_do_steps["steps"][0]
    
                                            db.collection("to-do-steps").doc(to_do_steps_instance_FBID).update({
                                                "steps": firebase.firestore.FieldValue.arrayRemove(toRemove)
                                            });
                                            // console.log("current instruction object: ", JSON.stringify(current_instruction_object))
    
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
            
                <Row>
                    <Col >

                        <Container>

                            <Row lg={2} md={2} style={{"border": "solid", "height": 0.4 * window.innerHeight}}>
                                <Col style={{"border": "solid", "backgroundColor": background_colour_1}}>
                                    {recipe_1_upcoming.length > 0 ? <h2>{recipe_1_upcoming[0]["recipe-name"]}</h2> : <h2>Not in Use</h2>}
                                    {/* {(recipe_1_timer > 0) ? <h5>Waiting for cooking to finish in {recipe_1_timer} secs...</h5> : null} */}
                                    {/* {(recipe_1_timer > 0) ? <h5>Waiting for cooking to finish in {(recipe_1_timer / (60*60)) >= 1 ? (Math.floor(recipe_1_timer/60)) : ('00')}:{(59 >= (recipe_1_timer / 60) && (recipe_1_timer / 60)  >= 1) ? (recipe_1_timer / 60) : '00'}:{ 59 >= (recipe_1_timer) ? (recipe_1_timer) : '00'}</h5> : null} */}
                                    {(recipe_1_timer > 0) ? <h5>Waiting for step to finish cooking in {(recipe_1_timer / (60*60)) >= 1 ? (Math.floor(recipe_1_timer/(60*60))) : ('00')}:{(59 >= (recipe_1_timer / 60) && (recipe_1_timer / 60)  >= 1) ? (Math.floor(recipe_1_timer / 60)) : '00'}:{ (59 >= (recipe_1_timer%60)) ? (recipe_1_timer%60) : '00'}</h5> : null}

                                    <img style={{"width": window.innerWidth * 0.25 * (window.innerHeight / window.innerWidth), "height": window.innerHeight * 0.25 }} src={Black_Circle} alt="black stove" />
                                </Col >
                                
                                <Col style={{"border": "solid", "backgroundColor": background_colour_2}}>
                                    <div>
                                        {recipe_2_upcoming.length > 0 ? <h2>{recipe_2_upcoming[0]["recipe-name"]}</h2> : <h2>Not in Use</h2>}
                                        {/* {(recipe_2_timer > 0) ? <h5>Waiting for cooking to finish in {recipe_2_timer} secs...</h5> : null}                                         */}
                                        {/* {(recipe_2_timer > 0) ? <h5>Waiting for cooking to finish in {(recipe_2_timer / (60*60)) >= 1 ? (Math.floor(recipe_2_timer/60)) : ('00')}:{(59 >= (recipe_2_timer / 60) && (recipe_2_timer / 60)  >= 1) ? (recipe_2_timer / 60) : '00'}:{ 59 >= (recipe_2_timer) ? (recipe_2_timer) : '00'}</h5> : null} */}
                                        {(recipe_2_timer > 0) ? <h5>Waiting for step to finish cooking in {(recipe_2_timer / (60*60)) >= 1 ? (Math.floor(recipe_2_timer/(60*60))) : ('00')}:{(59 >= (recipe_2_timer / 60) && (recipe_2_timer / 60)  >= 1) ? (Math.floor(recipe_2_timer / 60)) : '00'}:{ (59 >= (recipe_2_timer%60)) ? (recipe_2_timer%60) : '00'}</h5> : null}

                                    </div>

                                    <div>
                                    <img style={{"width": window.innerWidth * 0.25 * (window.innerHeight / window.innerWidth), "height": window.innerHeight * 0.25 }} src={Black_Circle} alt="black stove" />

                                    </div>
                                    
                                </Col>
                            </Row>

                            <Row lg={2} md={2} style={{"border": "solid", "height": 0.4 * window.innerHeight}}>

                                <Col style={{"border": "solid", "backgroundColor": background_colour_3}}>
                                    {recipe_3_upcoming.length > 0 ? <h2>{recipe_3_upcoming[0]["recipe-name"]}</h2> : <h2>Not in Use</h2>}
                                    {/* {(recipe_3_timer > 0) ? <h5>Waiting for cooking to finish in {recipe_3_timer} secs...</h5> : null}                                     */}
                                    {/* {(recipe_3_timer > 0) ? <h5>Waiting for cooking to finish in {(recipe_3_timer / (60*60)) >= 1 ? (Math.floor(recipe_3_timer/60)) : ('00')}:{(59 >= (recipe_3_timer / 60) && (recipe_3_timer / 60)  >= 1) ? (recipe_3_timer / 60) : '00'}:{ 59 >= (recipe_3_timer) ? (recipe_3_timer) : '00'}</h5> : null} */}
                                    {(recipe_3_timer > 0) ? <h5>Waiting for step to finish cooking in {(recipe_3_timer / (60*60)) >= 1 ? (Math.floor(recipe_3_timer/(60*60))) : ('00')}:{(59 >= (recipe_3_timer / 60) && (recipe_3_timer / 60)  >= 1) ? (Math.floor(recipe_3_timer / 60)) : '00'}:{ (59 >= (recipe_3_timer%60)) ? (recipe_3_timer%60) : '00'}</h5> : null}

                                    <img style={{"width": window.innerWidth * 0.25 * (window.innerHeight / window.innerWidth), "height": window.innerHeight * 0.25 }} src={Black_Circle} alt="black stove" />
                                </Col>

                                <Col style={{"border": "solid", "backgroundColor": background_colour_4}}>
                                    {recipe_4_upcoming.length > 0 ? <h2>{recipe_4_upcoming[0]["recipe-name"]}</h2> : <h2>Not in Use</h2>}
                                    {/* {(recipe_4_timer > 0) ? <h5>Waiting for cooking to finish in {recipe_4_timer} secs...</h5> : null} */}
                                    {/* {(recipe_4_timer > 0) ? <h5>Waiting for cooking to finish in {(recipe_4_timer / (60*60)) >= 1 ? (Math.floor(recipe_4_timer/60)) : ('00')}:{(59 >= (recipe_4_timer / 60) && (recipe_4_timer / 60)  >= 1) ? (recipe_4_timer / 60) : '00'}:{ 59 >= (recipe_4_timer) ? (recipe_4_timer) : '00'}</h5> : null} */}
                                    {(recipe_4_timer > 0) ? <h5>Waiting for step to finish cooking in {(recipe_4_timer / (60*60)) >= 1 ? (Math.floor(recipe_4_timer/(60*60))) : ('00')}:{(59 >= (recipe_4_timer / 60) && (recipe_4_timer / 60)  >= 1) ? (Math.floor(recipe_4_timer / 60)) : '00'}:{ (59 >= (recipe_4_timer%60)) ? (recipe_4_timer%60) : '00'}</h5> : null}

                                    <img style={{"width": window.innerWidth * 0.25 * (window.innerHeight / window.innerWidth), "height": window.innerHeight * 0.25 }} src={Black_Circle} alt="black stove" />
                                </Col>

                            </Row>

                        </Container>                                

                    </Col>


                    <Col lg={5} md={3} sm={3} style={{"border": "solid", "height": 0.8 * window.innerHeight, "margin": "auto"}}>
                        
                        {consecutive_back_presses >= 0 ?
                            (completed_steps.length > 0 && 
                                <div>
                                    {completed_steps[consecutive_back_presses]["stage"] === "STOVE-SECONDARY" ? 
                                    <div>
                                        <h3 style={{"color": "red", "opacity": "50%"}}>Previous Instruction:</h3>
                                        <h4>Stage: {completed_steps[consecutive_back_presses]["stage"]}</h4>
                                        <h4>Recipe: {completed_steps[consecutive_back_presses]["instruction"]["recipe-name"]}</h4>
                                        <h4 style={{"color": "red", "opacity": "50%"}}>{completed_steps[consecutive_back_presses]["instruction"]["step-info"]["instruction"]}</h4>
                                    </div>
                                    :
                                    <div>
                                        <h3 style={{"color": "red", "opacity": "50%"}}>Previous Instruction:</h3>
                                        <h3>Stage: {completed_steps[consecutive_back_presses]["stage"]}</h3>
                                        <h4>Recipe: {completed_steps[consecutive_back_presses]["instruction"]["recipe-name"]}</h4>
                                        <h4 style={{"color": "red", "opacity": "50%"}}>{completed_steps[consecutive_back_presses]["instruction"]["step-info"]["instruction"]}</h4>

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
                                        <h2>Stove: {to_do_steps["steps"][0]["recipe-number"]}</h2>
                                        <h4 style={{"color": "green", "opacity": "50%"}}>Current Instruction:</h4>
                                        <h3>Meal: {to_do_steps["steps"][0]["recipe-name"]}</h3>
                                        
                                        <br/>
                                        <h4 style={{"color": "green", "opacity": "50%"}}>{to_do_steps["steps"][0]["step-info"]["instruction"]}</h4>

                                        
                                        {/* <br/>
                                        <br/>
                                        <br/> */}

                                        {/* {completed_steps.length > 0 && 
                                        <div>
                                            <h3>Previous Step:</h3>
                                            {completed_steps[0]["stage"] === "STOVE-SECONDARY" ? 
                                            <div>
                                                <h4 style={{"color": "red", "opacity": "50%"}}>Stage: {completed_steps[0]["stage"]}</h4>
                                                <h4 style={{"color": "red", "opacity": "50%"}}>Recipe: {completed_steps[0]["instruction"]["recipe-name"]}</h4>
                                                <h4 style={{"color": "red", "opacity": "50%"}}>Instruction: {completed_steps[0]["instruction"]["step-info"]["instruction"]}</h4>
                                            </div>
                                            :
                                            <div>
                                                <h3 style={{"color": "red", "opacity": "50%"}}>Stage: {completed_steps[0]["stage"]}</h3>
                                                <h3 style={{"color": "red", "opacity": "50%"}}>Instruction: {completed_steps[0]["instruction"]}</h3>   
                                            </div>
                                            
                                            }
                                            
                                        </div>
                                        } */}
                                    </div>
                                    :
                                    <div>
                                        <h3>Stir all pots while awaiting next steps...</h3>
                                        <br/>
                                        <br/>
                                        <br/>

                                        {/* {completed_steps.length > 0 && 
                                        <div>
                                            <h3>Previous Step:</h3>
                                                {completed_steps[0]["stage"] === "STOVE-SECONDARY" ? 
                                                <div>
                                                    <h4 style={{"color": "red", "opacity": "50%"}}>Stage: {completed_steps[0]["stage"]}</h4>
                                                    <h4 style={{"color": "red", "opacity": "50%"}}>Recipe: {completed_steps[0]["instruction"]["recipe-name"]}</h4>
                                                    <h4 style={{"color": "red", "opacity": "50%"}}>Instruction: {completed_steps[0]["instruction"]["step-info"]["instruction"]}</h4>
                                                </div>
                                                :
                                                <div>
                                                    <h3 style={{"color": "red", "opacity": "50%"}}>Stage: {completed_steps[0]["stage"]}</h3>
                                                    <h3 style={{"color": "red", "opacity": "50%"}}>Instruction: {completed_steps[0]["instruction"]}</h3>   
                                                </div>
                                                
                                                }
                                        </div>
                                        } */}
                                    </div>
                                    
                                    
                            )
                            
                            
                            :
                            <div>
                              <h3>Loading next steps...</h3>
                              <br/>
                              <br/>
                              <br/>

                            {/* {completed_steps.length > 0 && 
                            <div>
                                <h3>Previous Step:</h3>
                                {completed_steps[0]["stage"] === "STOVE-SECONDARY" ? 
                                    <div>
                                        <h4 style={{"color": "red", "opacity": "50%"}}>Stage: {completed_steps[0]["stage"]}</h4>
                                        <h4 style={{"color": "red", "opacity": "50%"}}>Recipe: {completed_steps[0]["instruction"]["recipe-name"]}</h4>
                                        <h4 style={{"color": "red", "opacity": "50%"}}>Instruction: {completed_steps[0]["instruction"]["step-info"]["instruction"]}</h4>
                                    </div>
                                    :
                                    <div>
                                        <h3 style={{"color": "red", "opacity": "50%"}}>Stage: {completed_steps[0]["stage"]}</h3>
                                        <h3 style={{"color": "red", "opacity": "50%"}}>Instruction: {completed_steps[0]["instruction"]}</h3>   
                                    </div>
                                    
                                }
                            </div>} */}
                            </div>
                            
                                
                            
                        }

                    </Col>
                </Row>
            </Container>
            
        );
    }

    //=====================================================
    //   IF JUST STARTING TELL USER TO CLICK START
    //=====================================================

    else if(stage === null){
        return(
            <div style={{"padding": "15px"}} >
                <h1 style={{"color": "#FF9F33"}}>Actual</h1>                
                <Row style={{"border": "solid", "borderColor": "#FF9F33", "padding": "10px", "backgroundColor": "#FF9F33", "color": "white"}}>
                    <Col>
                        <h1>Press Start button to begin</h1>
                    </Col>
                </Row>
                <br/>
                <br/>
                <br/>
                <br/>
                <Row>
                    <Col>
                        { (instruction_stage === 0 && recipe_cycle_number === 0 ) && <Button style={{"margin": "10px"}} variant="contained" onClick={()=>{
                            setStage('PRE-HEAT')
                            set_app_starting(true)
                            set_instruction_stage(instruction_stage + 1)
                            set_recipe_cycle_number(recipe_cycle_number + 1)
                            // program()
                            
                            setNextClick(true)
                            }}> Start 
                        </Button>
                        }
                    </Col>
                </Row>
            </div>
        )
    }

    //=====================================================
    //   IF BASE/RETRIEVAL/OVEN/PREP STAGE SHOW 4 BOWLS 
    //   AND INSTRUCTIONS FOR EACH BOWL/RECIPE
    //=====================================================
    else{
        return (
            app_starting ? 
            <div style={{"display": "flex",
                "align-items": "center", "justify-content": "center"}}>
               <div>
                    <h1 style={{"color": "#FF9F33"}}>Actual</h1>
                    <Spinner animation="border"/>
                    <h2>Loading Steps...</h2>
                </div> 
            </div>
            
            
            :

            <div style={{"padding": "15px"}} >
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
                                    if(consecutive_back_presses >= 0){
                                        set_consecutive_back_presses(consecutive_back_presses - 1)
                                    }else{
                                        //let temp_completed = completed_steps
                                        console.log("======================================")
                                        console.log("NEXT BUTTON PRESSED")
                                        console.log("======================================")
                                        set_instruction_stage(instruction_stage + 1)
                                        //temp_completed.unshift(on_screen_instruction)
                                        set_completed_steps(completed_steps => [{"stage": stage, "instruction": on_screen_instruction}, ...completed_steps])
                                        setNextClick(true)
                                    }
                                
                                }}>Next
                                </Button> 
                                 
                            </div>
                             
                        }



                        { (instruction_stage === 0 && recipe_cycle_number === 0 ) && <Button style={{"margin": "10px"}} variant="contained" onClick={()=>{
                            setStage('LOAD')
                            set_app_starting(true)
                            set_instruction_stage(instruction_stage + 1)
                            set_recipe_cycle_number(recipe_cycle_number + 1)
                            // program()
                            
                            setNextClick(true)
                            }}> Start 
                        </Button>
                        }
                    </Col>
                </Row>
                <br/>

                <Row>

                    <Container style={{"margin": "0 auto"}}>
                        
                        { ((stage === "RETRIEVAL") || (stage === "PREP") || (stage === "OVEN") || (stage === "BASE")) 
                        && 
                        <Row style={{"height": "100%"}}>

                            <Col style={{"height": "100%", "backgroundColor": recipe_stage_colors[recipe_cycle_number][1], "color": "white"}}>
                            <h3>Meal: {recipes[1]["name"]}</h3>
                                {(recipe_cycle_number === 1) && 
                                <div> 
                                    <br/>
                                    {consecutive_back_presses < 0 && 
                                        <h3>Current Instruction: {on_screen_instruction}</h3> 
                                    }
                                    
                                </div>}

                                <img style={{"width": window.innerWidth * 0.2}} src={chopping_board3} alt="mixing bowl" />

                            </Col>

                            <Col style={{"height": "100%", "backgroundColor": recipe_stage_colors[recipe_cycle_number][2], "color": "white"}}>
                                <h3>Meal: {recipes[2]["name"]}</h3>
                                {(recipe_cycle_number === 2) && 
                                <div> 
                                    <br/>

                                    {consecutive_back_presses < 0 && 
                                        <h3>Current Instruction: {on_screen_instruction}</h3> 
                                    }

                                </div>}
                                <img style={{"width": window.innerWidth * 0.2}} src={chopping_board3} alt="mixing bowl" />
                            </Col>

                            <Col style={{"height": "100%", "backgroundColor": recipe_stage_colors[recipe_cycle_number][3], "color": "white"}}>
                                <h3>Meal: {recipes[3]["name"]}</h3>
                                {(recipe_cycle_number === 3) && 
                                <div> 
                                    <br/>

                                    {consecutive_back_presses < 0 && 
                                    <h3>Current Instruction: {on_screen_instruction}</h3> 
                                    }
                                    

                                </div>}
                                <img style={{"width": window.innerWidth * 0.2}} src={chopping_board3} alt="mixing bowl" />
                            </Col>

                            <Col style={{"height": "100%", "backgroundColor": recipe_stage_colors[recipe_cycle_number][4], "color": "white"}}>
                                <h3>Meal: {recipes[4]["name"]}</h3>
                                {(recipe_cycle_number === 4) && 
                                <div> 
                                    <br/>

                                    {consecutive_back_presses < 0 && 
                                    <h3>Current Instruction: {on_screen_instruction}</h3> 
                                    }

                                </div>}
                                <img style={{"width": window.innerWidth * 0.2}} src={chopping_board3} alt="mixing bowl" />
                            </Col>

                        </Row>
                        }
                    </Container>
                </Row>

                {/* <Row>
                    <h3>Previous Instruction:</h3>
                    {(consecutive_back_presses >= 0 && completed_steps.length > 0) ?    
                        <div>
                            <h3>Stage: {completed_steps[consecutive_back_presses]["stage"]}</h3>
                            <h3>Instruction: {completed_steps[consecutive_back_presses]["instruction"]}</h3>
                        </div>
                         
                        :

                        (completed_steps.length > 0 && 

                            <div>                            
                                <h3 style={{"color": "red", "opacity": "50%"}}>Stage: {completed_steps[0]["stage"]}</h3>
                                <h3 style={{"color": "red", "opacity": "50%"}}>Instruction: {completed_steps[0]["instruction"]}</h3>   
                            </div>
                        )
                        
                    }
                </Row> */}
    
            </div>
                
        );

    }
    
}

export default ChefAlgo;
