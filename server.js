
// Import Express

const express = require('express');

const app = express();


var arraySort = require('array-sort');


// Get JSON Out Put From File

const ocroutput = require('./ocroutput/output');


var ocr = ocroutput.output;


// New array Sorted JSON

var sortedJSON = [];



app.get('/',async (request,response) => {


    response.json({State:"Up"})


    // Push Details to Array


    for(var i = 0 ; i < ocr.length ; i++){


       // Finding Center X

        var centerx = ocr[i].boundaries[0].x + ocr[i].boundaries[1].x + ocr[i].boundaries[2].x
                     + ocr[i].boundaries[3].x / 4


        // Finding Center Y

        var centery = ocr[i].boundaries[0].y + ocr[i].boundaries[1].y + ocr[i].boundaries[2].y
            + ocr[i].boundaries[3].y / 4


        // Create Object to Push New Array

        var object = {
            description: ocr[i].description ,
            x:centerx,
            y:centery,

            }

        sortedJSON.push(object);

    }


    // Sorting Array

    await sortedJSON.sort(function(value_one, value_two) {

        return parseFloat(value_one.y) - parseFloat(value_two.y) || parseFloat(value_one.x) - parseFloat(value_two.x) ;
    });


    for (var i = 0; i < sortedJSON.length; i++) {

        var previous = i - 1;

        if (i != 0) {

            var basey = sortedJSON[previous].y;

        } else {

            var basey = sortedJSON[i].y;
        }


        if (basey == sortedJSON[i].y) {

            process.stdout.write(' ');
            process.stdout.write(sortedJSON[i].description);

        } else {

            process.stdout.write('\n');
            process.stdout.write(sortedJSON[i].description);

        }

    }


    console.log(sortedJSON);

});


app.listen(8000, ()=> console.log('Start Application'));

