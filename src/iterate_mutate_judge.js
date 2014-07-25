
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

var audio_util_obj;
var audio_utils;

switch (environment_mode) {

    case "nubia": // repository owner tinkering mode - ignore it and use nothing which defaults to dev which is OK

        var local_github_parent = process.env.GITHUB_REPO_PARENT;

        if ( ! local_github_parent ) {

            console.error("ERROR - do not use environment_mode value of :", environment_mode, 
                            " instead use dev or leave blank");
            process.exit(8);
        }

        console.log("environment_mode is ", environment_mode, " so pulling in sibling dir source code");
        shared_utils   = require(resolvePath(local_github_parent + "shared-utils/src/node_utils"));
        genome_module  = require(resolvePath(local_github_parent + "node-genome/src/genome"));
        audio_util_obj = require(resolvePath(local_github_parent + "audio-utils/src/audio_utils"));
        break;

    case "dev":
        shared_utils  = require("shared-utils");
        genome_module = require("node-genome");
        audio_util_obj = require("audio-utils");    // get these modules from global install
		break;

    default :
        shared_utils  = require("shared-utils");
        genome_module = require("node-genome");
        audio_util_obj = require("audio-utils");    // get these modules from global install
        break;
};

// ---

audio_utils = audio_util_obj.audio_utils(environment_mode);
console.log("audio_utils ", audio_utils);

var fs = require('fs');


// ------------------------------------- //

function do_typed_array_calc(given_obj) {

	console.log("%O", given_obj);

	given_obj.buffer = new Float32Array(given_obj.desired_size); // integer division by 2
};

// ---

var cb_read_file_done = function(audio_obj) {

    console.log("cb_read_file_done ");
    console.log("cb_read_file_done ");
    console.log("cb_read_file_done ");
    console.log("cb_read_file_done ");

    // shared_utils.show_object(audio_obj, 
    //     "backHome iterate_mutate_judge 32 read_file_done", "total", 0);
};

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


// ------------  synthesize an audio buffer  ------------  //


// SIZE_BUFFER_SOURCE = 5;
// SIZE_BUFFER_SOURCE = 256;
// SIZE_BUFFER_SOURCE = 4096;
// SIZE_BUFFER_SOURCE = 16384;



// var samples_per_cycle = 5;
// var samples_per_cycle = 64;
// var samples_per_cycle = 256;
// var samples_per_cycle = SIZE_BUFFER_SOURCE;


// ---------- generates nice listenable sin tone ------------- //

var SIZE_BUFFER_SOURCE = 16384;

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



var source_obj = {};

var source_obj = audio_utils.pop_audio_buffer(SIZE_BUFFER_SOURCE, samples_per_cycle);

var max_index = 3;
// var max_index = SIZE_BUFFER_SOURCE;

for (var index = 0; index < max_index; index++) {

    console.log(index, " pop_audio_buffer ", source_obj.buffer[index]);
}


// shared_utils.show_object(output_obj.buffer, "total",
//             "xxdxxdxdx output_obj xxdxxdxdx", output_obj.buffer.length);


// --- save into WAV file --- //

// var source_wave_filename = "/tmp/source_wave.wav";
var source_wave = "source_wave";

// var source_wave_filename = path.join(output_dir, source_wave + output_format);
var source_wave_filename = path.join(output_dir, source_wave + "_" +
									SIZE_BUFFER_SOURCE + "_" +
									samples_per_cycle + "_" +
									output_format);


console.log("source_wave_filename   ", source_wave_filename);

shared_utils.write_32_bit_float_buffer_to_16_bit_wav_file(source_obj, source_wave_filename);

console.log("source_wave_filename   ", source_wave_filename);

// return;

// ---------- now read back same wav file ------------ //


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

		// max_acceptible_diff_per_point = 0.01;
		// max_acceptible_diff_per_point = 0.1;
		max_acceptible_diff_per_point = 0.3;

		max_attempts_per_point = 10;
		// max_attempts_per_point = 30;
		// max_attempts_per_point = 300;

	} else if (desired_aphorism === aphorism_strict) {

		console.log("doing it strict");

		max_acceptible_diff_per_point = 0.00001;
		max_attempts_per_point = 30000;

	} else {

		console.log("ERROR - invalid aphorism");
		process.exit(8);
	}

	// ---

	var curr_gene_to_evolve = 0;

	var curr_attempt;
	var min_diff_witnessed_so_var;

	var putative_new_value_float;
	var curr_best_new_value;
	var curr_diff;

	var size_buffer_this_gene = genome.get_size_buffer_this_gene(curr_gene_to_evolve);

	for (var curr_buffer_index_to_mutate = 0; 
			 curr_buffer_index_to_mutate < size_buffer_this_gene;
			 curr_buffer_index_to_mutate++) {

		var curr_value_buffer_prior = genome.get_value_node_buffer(curr_gene_to_evolve,
																		 curr_buffer_index_to_mutate);

		var curr_value_buffer_source = source_obj.buffer[curr_buffer_index_to_mutate];

		// ---

		curr_attempt = 0;
		min_diff_witnessed_so_var = 9999.99;

		putative_new_value_float = curr_value_buffer_prior;
		curr_best_new_value = curr_value_buffer_prior;
		curr_diff = Math.abs(putative_new_value_float - curr_value_buffer_source);

		while (curr_diff > max_acceptible_diff_per_point &&
			curr_attempt < max_attempts_per_point) {

			putative_new_value_float = genome.get_random_float(-1.0, +1.0);

			curr_diff = Math.abs(putative_new_value_float - curr_value_buffer_source);

			if (curr_diff < min_diff_witnessed_so_var) {

				min_diff_witnessed_so_var = curr_diff;
				curr_best_new_value = putative_new_value_float;
			};

			curr_attempt++;
		};

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
var genome_synth_evolved_filename = path.join(output_dir, genome_synth_evolved + "_" + 
												desired_aphorism + "_" +
												max_acceptible_diff_per_point + "_" +
												max_attempts_per_point + "_" +
												output_format);

shared_utils.show_object(audio_genome_synth_evolved_obj, " POST after reading file ", "total", 10);

// shared_utils.write_buffer_to_wav_file(audio_genome_synth_evolved_obj, genome_synth_evolved_filename);
shared_utils.write_32_bit_float_buffer_to_16_bit_wav_file(audio_genome_synth_evolved_obj, 
															genome_synth_evolved_filename);

console.log("genome_synth_evolved_filename   ", genome_synth_evolved_filename);


// ------------ read wav file -------------------- //

console.log("\n\nread wav file\n\n");

var wav_file_input_obj = {};  // create stub object to which we attach .buffer


var property_buffer_raw_input_file = "buffer_raw_input_file";
// var property_buffer_input_file     = "buffer_input_file";

// shared_utils.copy_properties_across_objects(audio_file_obj, wav_file_input_obj);

// wav_file_input_obj.filename = "Elephant_sounds_rgUFu_hVhlk_roar_mono_tiny.wav";
// wav_file_input_obj.filename = "../data/Elephant_sounds_rgUFu_hVhlk_roar_mono_tiny.wav";
wav_file_input_obj.filename = genome_synth_evolved_filename;

wav_file_input_obj[property_buffer_raw_input_file] = new Buffer(0);

console.log("abouttttt to read genome_synth_evolved_filename ", genome_synth_evolved_filename);

var spec = {};

shared_utils.read_16_bit_wav_file_into_32_bit_float_buffer(
								wav_file_input_obj,
								genome_synth_evolved_filename, 
                                spec,
                                cb_read_file_done);


};
exports.evolveit = evolveit;

// ---

})(typeof exports === "undefined" ? this["iterate_mutate_judge"]={}: exports);
