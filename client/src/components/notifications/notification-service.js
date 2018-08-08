// import { firebase, database } from '../../../../firebase/firebase';



// function getMes() {
//     const userMesRef = database.ref('team-6').child('directMessages').child('users').child('userId');
//     userMesRef.once('value', (snapshot) => {
//         const getMesVal = Object.keys(snapshot.val());
//         let getAllMes = '';
//         const abc = getMesVal.map((mesVal) => {
//             getAllMes += `
//         <div>
//             <div class="buttom-panel text-center mt-1">
//                 <div class="userMes">${mesVal}</div>
//                 <div userId='${mesVal}'>
//                 
//                 </div>
//             </div>
//         </div>
//         `;
//             return getAllMes;
//         });
//         jQuery('#showContactInformation').append(getAllMes);
//     });
// }
// export { getMes };