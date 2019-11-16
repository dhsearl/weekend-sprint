const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require('moment');

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const CronJob = require('cron').CronJob;
new CronJob('* * * * * *', function() {
    console.log('You will see this message every second');
    moment.duration(2, 'minutes');

    const minuteOneQuery = `UPDATE polls
    SET step_one = true 
    WHERE created_at <= NOW() - interval '1 minute' 
    AND step_one = false`;
    pool.query(minuteOneQuery)
    .then(()=>{
        console.log('Updated a first minute');
    })
    .catch((error)=>{
        console.log('Error with minute one query', error);
    })

    const minuteTwoQuery = `UPDATE polls
    SET step_two = true 
    WHERE created_at <= NOW() - interval '2 minute' 
    AND step_two = false`;
    pool.query(minuteTwoQuery)
    .then(()=>{
        console.log('Updated a second minute');
    })
    .catch((error)=>{
        console.log('Error with minute two query', error);
    })
}, null, true, 'America/Chicago');

router.get('/:url', (req,res) =>{
    const queryText = `SELECT * FROM polls WHERE url=$1`;
    const queryArgs = [req.params.url]
    pool.query(queryText, queryArgs)
    .then((response)=>{
        console.log(response.rows);
        
        res.send(response.rows[0]);
    })
    .catch((error)=>{
        console.log('ERROR in GET ROUTE',error);
        res.sendStatus(500);
    })
});

router.post('/', (req,res) =>{
    const queryText = `INSERT INTO polls("url")VALUES($1)`;
    const queryArgs = [req.body.newRouteInput];
    pool.query(queryText, queryArgs)
    .then((response)=>{
        console.log('response is',response);
        res.sendStatus(200);
    })
    .catch((error)=>{
        console.log('Error in post route',error);
        res.sendStatus(500);
    })
})
/**
 * Get all of the items on the shelf
 */
// router.get('/', (req, res) => {
//     const queryText = `SELECT * FROM "item";`
//     pool.query(queryText)
//         .then((response) => {
//             res.send(response.rows);
//         }).catch((error) => {
//             console.log('Error in item GET route', error);
//             res.sendStatus(500)
//         })
// });


/**
 * Add an item for the logged in user to the shelf
 */
// router.post('/', rejectUnauthenticated, (req, res) => {
//     console.log("post hit in /shelf");

//     const queryText = `INSERT INTO "item"("description","image_url","user_id")VALUES($1,$2,$3)`
//     const queryArgs = [req.body.description, req.body.image_url, req.user.id]
//     pool.query(queryText, queryArgs)
//         .then(() => {
//             console.log('POST SUCCESS', req.body);
//             res.sendStatus(200);
//         })
//         .catch((error) => {
//             console.log("ERROR IN POST", error);
//             res.sendStatus(500);
//         })
// });



// /**
//  * Delete an item if it's something the logged in user added
//  */
// router.delete('/:id', rejectUnauthenticated, (req, res) => {
//     pool.query(`SELECT "user_id" from "item" WHERE "id"=$1`,[req.params.id])
//     .then((response)=>{
//         console.log(response.rows)
//         console.log(req.user)
//         const owner = response.rows[0].user_id

//         if (owner === req.user.id){
//         const queryText = `DELETE FROM "item"
//         WHERE item.id=$1;`
//         pool.query(queryText, [req.params.id])
//             .then(() => {
//                 res.sendStatus(200);
//             }).catch((error) => {
//                 console.log('Error in DELETE shelf', error);
//                 res.sendStatus(500);
//             })}
//         else {
//             console.log('User not authorized to delete');
//         }    
//     })

// });


module.exports = router;