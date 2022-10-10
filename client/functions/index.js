const firebase = require('firebase/compat/app');
const admin = require("firebase-admin");
require('firebase/compat/auth');
require('firebase/compat/database');
require('firebase/compat/firestore');
// const config = require('../src/config');

const functions = require("firebase-functions");

admin.initializeApp()
const db = admin.firestore()



//================================================================================
//any steps that have 0 dependency (i.e. not waiting for other steps to complete
//remove them from the upcoming recipe steps array and place in to_do steps array
//================================================================================
// exports.dependencyNtoDo = functions.firestore
// .document('upcoming-recipes/{recipe}')
// .onWrite((change, context) => {
//     functions.logger.log("change detected for cloud function, about to run")
//     const recipeChanged = context.params.recipe
//     db.collection("upcoming-recipes").doc(recipeChanged).get().then((snapshot)=>{
//         if(!( snapshot.data() ) ){
//             return( Promise('No info in step object yet') )
//         }else{
//             let i = 0;
//             functions.logger.log("snapshot.data: ", JSON.stringify(snapshot.data()))
//             let recipeStepsArray = snapshot.data()["info"]
//             let to_do_steps_instance_FBID = snapshot.data()["to_do_steps_instance_FBID"]
//             for(i; i < recipeStepsArray.length; i++){
//                 if(recipeStepsArray[i]["step-info"]["step-dependency"].length === 0){
//                     let toDoAddition = recipeStepsArray[i]
//                     console.log("recipe step: ", JSON.stringify(toDoAddition))
//                     db.collection("to-do-steps").doc(to_do_steps_instance_FBID)
//                     .update({"steps": admin.firestore.FieldValue.arrayUnion(toDoAddition)})
//                     .then(()=>{
//                         db.collection("upcoming-recipes").doc(recipeChanged)
//                     .update({"info": admin.firestore.FieldValue.arrayRemove(toDoAddition)})
//                     })
//                 }
//             }
//             // return (Promise("Dependency update complete"))
//         }
        
//     })
// });
