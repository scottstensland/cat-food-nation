#!/usr/bin/env   node 

var path = require('path');

// var environment_mode = process.env.NODE_ENV || 'dev';
var environment_mode = process.argv[2] || "dev";

console.log("running code in environment_mode: ", environment_mode);


var iterate_mutate_judge = require("./iterate_mutate_judge");
// var beat_detection = require("./beat_detection");
// var evolve_sin_curve = require("./evolve_sin_curve");
// var synth_write_read = require("./synth_write_read");
// var test_write_wav = require("./test_write_wav");
// var test_16_bit_into_float_and_back_again = require("./test_16_bit_into_float_and_back_again");
// var create_sin_curve_write_N_read = require("./create_sin_curve_write_N_read");



console.log("-----------------");


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



// test_16_bit_into_float_and_back_again.float_to_int_and_back();

// test_write_wav.evolveit(environment_mode);
// synth_write_read.evolveit(environment_mode);
// evolve_sin_curve.evolveit(environment_mode);
// create_sin_curve_write_N_read.evolveit(environment_mode); // does nice synth N write N read wav format file
// beat_detection.evolveit(environment_mode);
iterate_mutate_judge.evolveit(environment_mode);



// ------------------------------------------------------------- //
// ------------------------------------------------------------- //
// ------------------------------------------------------------- //
// ------------------------------------------------------------- //


console.log("<><><>  <><><>  <><><>   end of processing   <><><>  <><><>  <><><>");

