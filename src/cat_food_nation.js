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


// ------------------------------------------------------------- //
// ------------------------------------------------------------- //
// ------------------------------------------------------------- //
// ------------------------------------------------------------- //


// ---- must be one of : 256, 512, 1024, 2048, 4096, 8192, or 16384
// SIZE_BUFFER_RENDER = 1024; // web audio node buffer size which does actual rendering




// ---

// iterate_mutate_judge.evolveit(environment_mode);
// synth_write_read.evolveit(environment_mode);
// test_write_wav.evolveit(environment_mode);


// c16_32 0 254 9 65033 0.984649658203125

var source_byte_one_of_two = 254;
var source_byte_two_of_two = 9;

// now convert into floating point ... but first into a pair of one byte chunks

// read_audio_obj.buffer = shared_utils.convert_16_bit_signed_int_to_32_bit_float(...);

// var value_16_bit_signed_int = (input_8_bit_int_buffer[index] << 8) | input_8_bit_int_buffer[index + 1];
// var value_16_bit_signed_int = (source_byte_one_of_two << 8) | source_byte_two_of_two;
var value_16_bit_signed_int = source_byte_one_of_two | (source_byte_two_of_two << 8);


console.log("value_16_bit_signed_int ", value_16_bit_signed_int);

// --- now convert 16 bit signed int into 32 bit float

// var new_32_bit_value = ((0 < value_16_bit_signed_int) ?  value_16_bit_signed_int / 0x8000 : 
// 		    											 value_16_bit_signed_int / 0x7FFF) - 1;

var new_32_bit_value = ((0 < value_16_bit_signed_int) ?  value_16_bit_signed_int / 0x8000 : 
		    											 value_16_bit_signed_int / 0x7FFF) - 1;

console.log("new_32_bit_value ", new_32_bit_value);

// --------- THIS is CUT over POINT - convert 32 bit float into 16 bit signed integer ------

// var convert_32_bit_float_into_signed_16_bit_int_lossy = function(input_32_bit_buffer) {

/*
// prelim_value = ~~((input_32_bit_buffer[index] + 1.0) * 32768);
value_16_bit_signed_int = ~~((input_32_bit_buffer[index] < 0) ? input_32_bit_buffer[index] * 0x8000 : 
													 input_32_bit_buffer[index] * 0x7FFF);
// new_16_bit_signed_int[index] = prelim_value;

buffer_byte_array[index_byte] = value_16_bit_signed_int & 0xFF;
buffer_byte_array[index_byte + 1] = (value_16_bit_signed_int >> 8) & 0xFF;
*/

// var back_again_value_16_bit_signed_int = ~~((new_32_bit_value < 0) ? new_32_bit_value * 0x8000 : 
// 													 new_32_bit_value * 0x7FFF);


// var back_again_value_16_bit_signed_int = new_32_bit_value * 65536;
// var back_again_value_16_bit_signed_int = new_32_bit_value * 0x8000;
var back_again_value_16_bit_signed_int = new_32_bit_value * 0x7FFF;

console.log("back_again_value_16_bit_signed_int ", back_again_value_16_bit_signed_int);

// var int_back_again_value_16_bit_signed_int = ~~(new_32_bit_value << 16);
var early_back_again_value_16_bit_signed_int = new_32_bit_value * 0x8000;

console.log("early_back_again_value_16_bit_signed_int ", early_back_again_value_16_bit_signed_int);

var int_back_again_value_16_bit_signed_int = ~~(new_32_bit_value * 0x8000);


console.log("int_back_again_value_16_bit_signed_int ", int_back_again_value_16_bit_signed_int);

// -----------

var back_again_byte_one_of_two = int_back_again_value_16_bit_signed_int & 0xFF;
var back_again_byte_two_of_two = (int_back_again_value_16_bit_signed_int >> 8) & 0xFF;

console.log("back_again_byte_one_of_two ", back_again_byte_one_of_two);
console.log("back_again_byte_two_of_two ", back_again_byte_two_of_two);



// ---
/*
// Convert a number to a hexadecimal string with:

// hexString = yourNumber.toString(16);

var hex_1_of_2 = source_byte_one_of_two.toString(16);
var hex_2_of_2 = source_byte_two_of_two.toString(16);

console.log("source_byte_one_of_two ", hex_1_of_2);
console.log("source_byte_two_of_two ", hex_2_of_2);


// and reverse the process with:

var int_1_of_2 = parseInt(hex_1_of_2, 16);
var int_2_of_2 = parseInt(hex_2_of_2, 16);

console.log("int_1_of_2 ", int_1_of_2);
console.log("int_2_of_2 ", int_2_of_2);
*/



console.log("<><><>  <><><>  <><><>   end of processing   <><><>  <><><>  <><><>");


/*
var given_num_nodes = 5, total_timeslices = 2, max_timeslices_per_chronos = 3;

genome.pop_entire_genome(given_num_nodes, total_timeslices, max_timeslices_per_chronos);
*/

