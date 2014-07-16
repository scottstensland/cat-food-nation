#!/usr/bin/env   node 

var path = require('path');

// var environment_mode = process.env.NODE_ENV || 'dev';
var environment_mode = process.argv[2] || "dev";

console.warn("running code in environment_mode: ", environment_mode);

/*
switch (environment_mode) {
    case "dev":
        // Setup development config
        break;
    case "prod":
        // Setup production config
        break;

    default :
    	environment_mode = "dev"; // default to dev
};
*/



/*
function resolvePath (string) {
  if (string.substr(0,1) === '~')
    string = process.env.HOME + string.substr(1)
  return path.resolve(string)
}
*/

/*
function resolvePath (string) {
  if (string.substr(0,1) === '~') {
    homedir = (process.platform.substr(0, 3) === 'win') ? process.env.HOMEPATH : process.env.HOME;
    string = homedir + string.substr(1)
  }
  return path.resolve(string)
}
// */

// function resolvePath(str) {
//   if (str.substr(0, 2) === '~/') {
//     str = (process.env.HOME || process.env.HOMEPATH || process.env.HOMEDIR || process.cwd()) + str.substr(1);
//   }
//   return path.resolve(str);
// }


var iterate_mutate_judge = require("./iterate_mutate_judge");
var synth_write_read = require("./synth_write_read");
var test_write_wav = require("./test_write_wav");
var test_16_bit_into_float_and_back_again = require("./test_16_bit_into_float_and_back_again");





// var shared_utils = require("shared-utils");
// var shared_utils = require("/home/stens/Dropbox/Documents/code/github/shared-utils/src/node_utils.js");
// var shared_utils = require("~/Dropbox/Documents/code/github/shared-utils/src/node_utils.js");
// var shared_utils = require(resolvePath("~/Dropbox/Documents/code/github/shared-utils/src/node_utils.js"));

// var shared_utils = require("/home/scott/Dropbox/Documents/code/github/shared-utils/src/node_utils.js");
// var shared_utils = shared_utils_obj.shared_utils();
// var shared_utils = shared_utils_obj.node_utils();


// console.log("here is shared_utils ", shared_utils);


// var node_utils = require('./node_utils');
// var node_utils = require("shared-utils");


// var genome = require('./genome').init({ name : "Corinde Stensland"});


console.log("-----------------");
// console.log(genome);
// console.log(genome.says());

var add_these = {

	nodes : {
		// "nodeid": nodedata, 

		// for now assure node buffer curve size is ODD it ease centering when folding into output curve
        0: { size: 3 }, 
        1: { size: 1 }, 
        2: { size: 5 },
        3: { size: 5 },
        4: { size: 3}, 
        5: { size: 1},
    },

    /*
	edges : [
	        {source: 1, target: 2, weight: 10},
	        {source: 1, target: 3, weight: 10},
	        {source: 2, target: 3, weight: 10},
	        {source: 3, target: 1, weight: 10},
	        {source: 4, target: 1, weight: 10},
	        {source: 4, target: 3, weight: 10},
	        {source: 0, target: 3, weight: 16},

	        // {"source": "sourceid", "target": "targetid"},
	],
	*/

	timeslices : [


		[  ],
		[  ],
		[  ],
		[  ],
		[  ],
		[  ],
		[  ],

		[ {nodeid: 1, weight: 10}, {nodeid: 3, weight: 10}, {nodeid: 0, weight: 10}  ],
		[  ], // empty ... no genes here at this timeslice ... will get populated by neighbors
		[  ],
		[  ],
		[ {nodeid: 4, weight: 10} ],		
		[  ],
		[  ],
		[  ],
		[  ],

		[ {nodeid: 2, weight: 10}, {nodeid: 0, weight: 10},  {nodeid: 3, weight: 10} ],
		[  ],
		[  ],
		[  ],

	]
};

/*
console.log("-----------------  add_these ", add_these);


console.log("----------------- about to call add_node");

genome.add_node(add_these);

 


console.log("----------------- TOP add_timeslices");

genome.add_timeslices(add_these);

console.log("----------------- END add_timeslices");



console.log("-----------------");

// genome.show();

// genome.says();

genome.show();
*/


/*
// var buffer_byte_array = new Buffer(4); // NO fails to store negative numbers
// var buffer_byte_array = new Int8Array(4); // NO fails to store negative numbers
var buffer_byte_array = new Int16Array(4); // NO fails to store negative numbers

buffer_byte_array[0] =  -34;
buffer_byte_array[1] =    0;
buffer_byte_array[2] =  300;
buffer_byte_array[3] = -248;

for (var index = 0; index < buffer_byte_array.length; index++) {

	console.log(index, buffer_byte_array[index]);
}

return;
*/



// test_16_bit_into_float_and_back_again.float_to_int_and_back();

test_write_wav.evolveit(environment_mode);


// iterate_mutate_judge



// ------------------------------------------------------------- //
// ------------------------------------------------------------- //
// ------------------------------------------------------------- //
// ------------------------------------------------------------- //



// ---- must be one of : 256, 512, 1024, 2048, 4096, 8192, or 16384
// SIZE_BUFFER_RENDER = 1024; // web audio node buffer size which does actual rendering




console.log("<><><>  <><><>  <><><>   end of processing   <><><>  <><><>  <><><>");

