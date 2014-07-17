
(function(exports) {

// ---------------------------------------------------------------- //

var path = require('path');

function resolvePath(str) {
  if (str.substr(0, 2) === '~/') {
    str = (process.env.HOME || process.env.HOMEPATH || process.env.HOMEDIR || process.cwd()) + str.substr(1);
  }
  return path.resolve(str);
}

// -------------------------------------------------------- //

var evolveit = function(environment_mode) {

console.log("IN evolveit");

var shared_utils;
var genome_module;

switch (environment_mode) {

    case "nubia": // repository owner tinkering mode - ignore it and use nothing which defaults to dev which is OK
        shared_utils  = require(resolvePath("~/Dropbox/Documents/code/github/shared-utils/src/node_utils"));
        genome_module = require(resolvePath("~/Dropbox/Documents/code/github/node-genome/src/genome"));
        break;

    case "dev":
        shared_utils  = require("shared-utils");
        genome_module = require("node-genome");
        break;

    default :
        shared_utils  = require("shared-utils");
        genome_module = require("node-genome");
        break;
};

// ---


var fs = require('fs');


// ------------------------------------- //

function do_typed_array_calc(given_obj) {

	console.log("%O", given_obj);

	given_obj.buffer = new Float32Array(given_obj.desired_size); // integer division by 2
};

// -------------
/*
function cb_after_reading_input_file_grow_curve(input_obj, property_buffer_raw_input_file, property_buffer_input_file) {

    console.log("TOP TOP TOP cb_after_reading_input_file_grow_curve");

    // sync NOT async ... output into buffer_input_file
    shared_utils.parse_wav(input_obj, property_buffer_raw_input_file, property_buffer_input_file);

    delete input_obj[property_buffer_raw_input_file];    // no longer need raw pre parse buffer

    console.log("buffer size ", input_obj[property_buffer_input_file].length);
    console.log("buffer size ", input_obj[property_buffer_input_file].length);
    console.log("buffer size ", input_obj[property_buffer_input_file].length);

	// var show_object = function (given_obj, given_label, given_mode, limit_size_buffer)

    shared_utils.show_object(input_obj, " POST after reading file ", "total", 10);

    var read_audio_obj = {};

    read_audio_obj.buffer = shared_utils.convert_16_bit_unsigned_int_to_32_bit_float(input_obj[property_buffer_input_file]);



    shared_utils.show_object(read_audio_obj, " read_audio_obj 32 bit floating point ", "total", 10);


    // var buff_size_from_file = input_obj[property_buffer_input_file].length;
    // var size_buffer = 256;
};
*/

// ---

var cb_read_file_done = function(audio_obj) {

    console.log("cb_read_file_done ");
    console.log("cb_read_file_done ");
    console.log("cb_read_file_done ");
    console.log("cb_read_file_done ");

    shared_utils.show_object(audio_obj, 
        "backHome audio_obj 32 bit signed float   read_file_done", "total", 0);
};

// ---

var cb_write_file_done = function(audio_obj, cb_post_write) {

    console.log("cb_write_file_done ");
    console.log("cb_write_file_done ");
    console.log("cb_write_file_done ");


    shared_utils.show_object(audio_obj, 
        "backHome audio_obj 32 bit signed float    write_file_done ", "total", 10);
};


/*
var do_read_logic = function() {

	// ------------ read wav file -------------------- //


	var wav_file_input_obj = {};  // create stub object to which we attach .buffer


	var property_buffer_raw_input_file = "buffer_raw_input_file";
	var property_buffer_input_file     = "buffer_input_file";

	// shared_utils.copy_properties_across_objects(audio_file_obj, wav_file_input_obj);

	// wav_file_input_obj.filename = "Elephant_sounds_rgUFu_hVhlk_roar_mono_tiny.wav";
	// wav_file_input_obj.filename = "../data/Elephant_sounds_rgUFu_hVhlk_roar_mono_tiny.wav";
	wav_file_input_obj.filename = genome_synth_evolved_filename;


	wav_file_input_obj[property_buffer_raw_input_file] = new Buffer(0);


	// shared_utils.read_file_into_buffer(wav_file_input_obj, property_buffer_raw_input_file,
	//                                 property_buffer_input_file,
	//                                 cb_after_reading_input_file_grow_curve);


	// shared_utils.read_16_bit_wav_file_into_32_bit_float_buffer(
	// 								wav_file_input_obj, 
	// 								property_buffer_raw_input_file,
	//                                 property_buffer_input_file,
	//                                 cb_read_file_done);

	console.log("abouttttt to read genome_synth_evolved_filename ", genome_synth_evolved_filename);

	var spec = {};

	shared_utils.read_16_bit_wav_file_into_32_bit_float_buffer(
									genome_synth_evolved_filename, 
	                                spec,
	                                cb_read_file_done);

};		//		do_read_logic
*/


// ---

/*
function cb_parse_buffer_as_wav_format(input_obj, property_buffer_raw_input_file, property_buffer_input_file) {

    console.log("TOP TOP TOP cb_parse_buffer_as_wav_format");

    // sync NOT async ... output into buffer_input_file
    shared_utils.parse_wav(input_obj, property_buffer_raw_input_file, property_buffer_input_file);

    delete input_obj[property_buffer_raw_input_file];    // no longer need raw pre parse buffer

    console.log("buffer size ", input_obj[property_buffer_input_file].length);
    console.log("buffer size ", input_obj[property_buffer_input_file].length);
    console.log("buffer size ", input_obj[property_buffer_input_file].length);

	// var show_object = function (given_obj, given_label, given_mode, limit_size_buffer)

    shared_utils.show_object(input_obj, " POST after reading file ", "total", 10);

    var read_audio_obj = {};

    read_audio_obj.buffer = shared_utils.convert_16_bit_unsigned_int_to_32_bit_float(input_obj[property_buffer_input_file]);



    shared_utils.show_object(read_audio_obj, " read_audio_obj 32 bit floating point ", "total", 10);


    // var buff_size_from_file = input_obj[property_buffer_input_file].length;
    // var size_buffer = 256;
};
*/

	// ------------------------------------- //



	// var shared_utils = require(resolvePath("~/Dropbox/Documents/code/github/shared-utils/src/node_utils.js"));

	console.log("here is shared_utils ", shared_utils);

	// var genome_module = require('node-genome');
	// var genome_module = require('../src/genome');
	// var genome_module = require("~/Dropbox/Documents/code/github/node-genome/src/genome");
	// var genome_module = require(resolvePath("~/Dropbox/Documents/code/github/node-genome/src/genome"));
	var genome = genome_module.init({ name : "Corinde Wiers"});

	genome.set_random_seed(117); // uncomment to see repeated random sequence


	var aphorism_sloppy = "sloppy";
	var aphorism_strict = "strict";

	var desired_aphorism = aphorism_sloppy;
	// var desired_aphorism = aphorism_strict;

	// ---
/*
	var audio_play_obj = {};

	audio_play_obj.desired_size = 100;

	do_typed_array_calc(audio_play_obj);

	console.log("POST buffer size ", audio_play_obj.buffer.length);

console.log("_______ process ending ____________");

process.exit(9);
*/



// ------------  synthesize an audio buffer  ------------  //

/*
2^8 256
2^9 512
2^10 1024
2^11 2048
2^12 4096
2^13 8192
2^14 16384
*/

// SIZE_BUFFER_SOURCE = 5;
// SIZE_BUFFER_SOURCE = 256;
// SIZE_BUFFER_SOURCE = 4096;
// SIZE_BUFFER_SOURCE = 16384;



// var samples_per_cycle = 5;
// var samples_per_cycle = 64;
// var samples_per_cycle = 256;
// var samples_per_cycle = SIZE_BUFFER_SOURCE;


// ---------- generates nice listenable sin tone ------------- //
SIZE_BUFFER_SOURCE = 16384;
var samples_per_cycle = 64;


/*
// ---------- testing ONLY not intended to listen to ------------- //
SIZE_BUFFER_SOURCE = 4;
// SIZE_BUFFER_SOURCE = 8;
// SIZE_BUFFER_SOURCE = 256;
// var samples_per_cycle = 8;
var samples_per_cycle = SIZE_BUFFER_SOURCE;
// var samples_per_cycle = 64;
*/



var output_dir = resolvePath("~/Dropbox/Documents/data/audio/");

var output_format = ".wav";

console.log(" output_dir ", output_dir);


// process.exit(9);



var source_obj = {};

var source_obj = shared_utils.pop_audio_buffer(SIZE_BUFFER_SOURCE, samples_per_cycle);

var max_index = 3;
// var max_index = SIZE_BUFFER_SOURCE;

for (var index = 0; index < max_index; index++) {

    console.log(index, " pop_audio_buffer ", source_obj.buffer[index]);
}

// var output_obj = {};

// output_obj.buffer = new Buffer(source_obj.buffer);

// // ---

// shared_utils.show_object(output_obj.buffer, "total",
//             "xxdxxdxdx output_obj xxdxxdxdx", output_obj.buffer.length);

// process.exit(9);

// --- save into WAV file --- //

// var source_wave_filename = "/tmp/source_wave.wav";
var source_wave = "source_wave";

var source_wave_filename = path.join(output_dir, source_wave + output_format);


console.log("source_wave_filename   ", source_wave_filename);

shared_utils.write_32_bit_float_buffer_to_16_bit_wav_file(source_obj, source_wave_filename);

console.log("source_wave_filename   ", source_wave_filename);

// return;

// ---------- now read back same wav file ------------ //




/*

var read_wav_file_obj = {};  // create stub object to which we attach .buffer


var property_buffer_raw_input_file = "buffer_raw_input_file";
var property_buffer_input_file     = "buffer_input_file";

// shared_utils.copy_properties_across_objects(audio_file_obj, wav_file_input_obj);

// wav_file_input_obj.filename = "Elephant_sounds_rgUFu_hVhlk_roar_mono_tiny.wav";
// wav_file_input_obj.filename = "../data/Elephant_sounds_rgUFu_hVhlk_roar_mono_tiny.wav";
read_wav_file_obj.filename = source_wave_filename;


read_wav_file_obj[property_buffer_raw_input_file] = new Buffer(0);


shared_utils.read_file_into_buffer(read_wav_file_obj, property_buffer_raw_input_file,
                                property_buffer_input_file,
                                cb_parse_buffer_as_wav_format);




console.log("\n");
console.log("<><><>   <><><>   <><><>   Processing is Complete   <><><>   <><><>   <><><>");
console.log("\n");
process.exit(9);
*/


// ------------------------------------------------------------- //
// ------------------------------------------------------------- //
// ------------------------------------------------------------- //
// ------------------------------------------------------------- //




console.log("--------  pop_genome  ---------");

var seed_genome = {

	// flavor :  "direct",

	// total_genes : 1,

	// total_gene_types : 1,

	// ave_gene_size : SIZE_BUFFER_SOURCE,

	// // total_timeslices : 44100,
	// total_timeslices : SIZE_BUFFER_SOURCE,



	flavor :  "pointed",

	total_genes : 1,

	total_gene_types : 1,

	ave_gene_size : SIZE_BUFFER_SOURCE,

	// total_timeslices : 44100,
	total_timeslices : SIZE_BUFFER_SOURCE,

	genes_start_time : {

		0 : "middle",
	}

};


	genome.pop_genome(seed_genome);


	console.log("--------  show_genetic_storehouse  ---------");

	genome.show_genetic_storehouse();


	console.log("--------  parse_genome_synth_sound  ---------");


	// process.exit(9);


	genome.parse_genome_synth_sound();

	// genome.show_genome_buffer();

	// ---

	var audio_genome_synth_raw_obj = {};

	audio_genome_synth_raw_obj.buffer = genome.get_genome_buffer();

	console.log("genome_buffer length ", audio_genome_synth_raw_obj.buffer.length);

	var genome_synth_raw = "genome_synth_raw";
	var genome_synth_raw_filename = path.join(output_dir, genome_synth_raw + output_format);

	// node_utils.write_buffer_to_wav_file(audio_obj, wav_output_filename);
	// shared_utils.write_buffer_to_wav_file(audio_genome_synth_raw_obj, genome_synth_raw_filename);
	shared_utils.write_32_bit_float_buffer_to_16_bit_wav_file(audio_genome_synth_raw_obj, genome_synth_raw_filename);


	console.log("genome_synth_raw_filename   ", genome_synth_raw_filename); // pure static at this point

	// return;

	// --- do buffer diff

	var diff_spec = { 
						extent : "entire",	// diff which portions of buffers
						master : "left",	// determines which buffer determines buffer length
					};

	shared_utils.diff_buffers(source_obj, audio_genome_synth_raw_obj, diff_spec);

	console.log(  "___________ PRE evolve diff_spec   ", diff_spec,
				"\n___________ PRE evolve diff_spec");

	// --- now iterate across cycles of mutation + judge until satisfactory goodness is reached

	// return;


	var max_acceptible_diff_per_point;
	var max_attempts_per_point;

	// var max_acceptible_diff_per_point = 0.00001;
	// var max_attempts_per_point = 30000;
	// var filename_aphorism = "_strict";

	// var max_acceptible_diff_per_point = 0.01;
	// var max_attempts_per_point = 300;
	// var filename_aphorism = "_sloppy";





	if (desired_aphorism === aphorism_sloppy) {

		console.log("doing it sloppy");

		max_acceptible_diff_per_point = 0.01;
		max_attempts_per_point = 300;

	} else if (desired_aphorism === aphorism_strict) {

		console.log("doing it strict");

		max_acceptible_diff_per_point = 0.00001;
		max_attempts_per_point = 30000;

	} else {

		console.log("ERROR - invalid aphorism");
		process.exit(8);
	}





	var curr_gene_to_evolve = 0;

	var size_buffer_this_gene = genome.get_size_buffer_this_gene(curr_gene_to_evolve);
	// var size_buffer_this_gene = 2;

	// var curr_buffer_index_to_mutate = 1;

	for (var curr_buffer_index_to_mutate = 0; 
			 curr_buffer_index_to_mutate < size_buffer_this_gene;
			 curr_buffer_index_to_mutate++) {

		// console.log(curr_buffer_index_to_mutate, " curr_buffer_index_to_mutate _____________");

		var curr_value_buffer_prior = genome.get_value_node_buffer(curr_gene_to_evolve,
																		 curr_buffer_index_to_mutate);

		// console.log("PPRREEEE curr_value_buffer_prior   ", curr_value_buffer_prior);

		var curr_value_buffer_source = source_obj.buffer[curr_buffer_index_to_mutate];

		// console.log("curr_value_buffer_source   ", curr_value_buffer_source);

		// ---

		var curr_attempt = 0;
		var min_diff_witnessed_so_var = 9999.99;
		var putative_new_value_float = curr_value_buffer_prior;
		var curr_best_new_value = curr_value_buffer_prior;
		var curr_diff = Math.abs(putative_new_value_float - curr_value_buffer_source);

		// console.log(curr_buffer_index_to_mutate, " PRE evolve curr_diff ", curr_diff);

		while (curr_diff > max_acceptible_diff_per_point &&
			curr_attempt < max_attempts_per_point) {

			putative_new_value_float = genome.get_random_float(-1.0, +1.0);

			curr_diff = Math.abs(putative_new_value_float - curr_value_buffer_source);

			if (curr_diff < min_diff_witnessed_so_var) {

				min_diff_witnessed_so_var = curr_diff;
				curr_best_new_value = putative_new_value_float;
			};

			// console.log(curr_attempt, min_diff_witnessed_so_var, 
			// 			" putative_new_value_float   ", putative_new_value_float);

			curr_attempt++;
		};

		// console.log(curr_buffer_index_to_mutate, " attempts ", curr_attempt,
		// 			" min_diff ", 
		// 			  min_diff_witnessed_so_var,
		// 			  " best new ", curr_best_new_value);

		// console.log(curr_buffer_index_to_mutate, "KLKLKLKLKLKL PRE get_value_node_buffer ",
		// 				genome.get_value_node_buffer(curr_gene_to_evolve, curr_buffer_index_to_mutate))

		genome.set_value_node_buffer(curr_gene_to_evolve, curr_buffer_index_to_mutate, curr_best_new_value);
	};

	// ---

	genome.parse_genome_synth_sound();

	var audio_genome_synth_evolved_obj = {};

	audio_genome_synth_evolved_obj.buffer = genome.get_genome_buffer();


	diff_spec = { 
						extent : "entire",	// diff which portions of buffers
						master : "left",	// determines which buffer determines buffer length
					};

	shared_utils.diff_buffers(source_obj, audio_genome_synth_evolved_obj, diff_spec);
	console.log(  "___________ POST evolve diff_spec   ", diff_spec,
				"\n___________ POST evolve diff_spec ");


// --- save into WAV file --- //

var genome_synth_evolved = "genome_synth_evolved";
var genome_synth_evolved_filename = path.join(output_dir, genome_synth_evolved + "_" + desired_aphorism + output_format);

shared_utils.show_object(audio_genome_synth_evolved_obj, " POST after reading file ", "total", 10);

// shared_utils.write_buffer_to_wav_file(audio_genome_synth_evolved_obj, genome_synth_evolved_filename);
shared_utils.write_32_bit_float_buffer_to_16_bit_wav_file(audio_genome_synth_evolved_obj, 
															genome_synth_evolved_filename);

console.log("genome_synth_evolved_filename   ", genome_synth_evolved_filename);


// return;

// bbb

// ------------  need to flush above write_wav method  !!!!!!!!!!!!!!!!!

// return;

/*
if (fs.existsSync(genome_synth_evolved_filename)) {

	console.log("genome_synth_evolved_filename does exist ", genome_synth_evolved_filename);

    // Do something
} else {

	console.log("genome_synth_evolved_filename does NOT exist ", genome_synth_evolved_filename);

}
*/
// return;



// ------------ read wav file -------------------- //

console.log("\n\nread wav file\n\n");

var wav_file_input_obj = {};  // create stub object to which we attach .buffer


var property_buffer_raw_input_file = "buffer_raw_input_file";
var property_buffer_input_file     = "buffer_input_file";

// shared_utils.copy_properties_across_objects(audio_file_obj, wav_file_input_obj);

// wav_file_input_obj.filename = "Elephant_sounds_rgUFu_hVhlk_roar_mono_tiny.wav";
// wav_file_input_obj.filename = "../data/Elephant_sounds_rgUFu_hVhlk_roar_mono_tiny.wav";
wav_file_input_obj.filename = genome_synth_evolved_filename;


wav_file_input_obj[property_buffer_raw_input_file] = new Buffer(0);


// shared_utils.read_file_into_buffer(wav_file_input_obj, property_buffer_raw_input_file,
//                                 property_buffer_input_file,
//                                 cb_after_reading_input_file_grow_curve);


// shared_utils.read_16_bit_wav_file_into_32_bit_float_buffer(
// 								wav_file_input_obj, 
// 								property_buffer_raw_input_file,
//                                 property_buffer_input_file,
//                                 cb_read_file_done);

console.log("abouttttt to read genome_synth_evolved_filename ", genome_synth_evolved_filename);

var spec = {};

shared_utils.read_16_bit_wav_file_into_32_bit_float_buffer(
								wav_file_input_obj,
								genome_synth_evolved_filename, 
                                spec,
                                cb_read_file_done);




	// ---
/*
	console.log("\n\n_______________________ fresh ponds _______________\n\n");


	var curr_gene_to_evolve = 0;
	var curr_buffer_index_to_mutate = 1;

	var curr_value_buffer_prior = genome.get_value_node_buffer(curr_gene_to_evolve,
															   curr_buffer_index_to_mutate);

	console.log("PRE curr_value_buffer_prior   ", curr_value_buffer_prior);

	var curr_best_new_value = 0.0;

	genome.set_value_node_buffer(curr_gene_to_evolve, curr_buffer_index_to_mutate, curr_best_new_value);


	curr_value_buffer_prior = genome.get_value_node_buffer(curr_gene_to_evolve,
															   curr_buffer_index_to_mutate);

	console.log("POST curr_value_buffer_prior   ", curr_value_buffer_prior);
*/

};
exports.evolveit = evolveit;


// ---

})(typeof exports === "undefined" ? this["iterate_mutate_judge"]={}: exports);
