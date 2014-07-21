
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

        console.log("environment_mode is ", environment_mode, " so pulling in sibling dir source code");
        shared_utils  = require(resolvePath("~/Dropbox/Documents/code/github/shared-utils/src/node_utils"));
        genome_module = require(resolvePath("~/Dropbox/Documents/code/github/node-genome/src/genome"));
        break;

    case "dev":
        console.log("environment_mode is ", environment_mode, " so using locally installed npm module");
        shared_utils  = require("shared-utils");
        genome_module = require("node-genome");
        break;

    default :
        console.log("environment_mode is ", environment_mode, " so using locally installed npm module");
        shared_utils  = require("shared-utils");
        genome_module = require("node-genome");
        break;
};

console.log(shared_utils);

// ---

var fs = require('fs');

var util = require('util');

// ------------------------------------- //

var compare_source_with_post_write_read = function(source_obj, post_process_obj) {

	var diff_spec = { 
						extent : "entire",	// diff which portions of buffers
						master : "left",	// determines which buffer determines buffer length
					};

	shared_utils.diff_buffers(source_obj, post_process_obj, diff_spec);

	console.log(  "___________ pre N post writeNread  diff_spec   ", diff_spec,
				"\n___________ pre N post writeNread  diff_spec");

}

var cb_read_file_done = function(audio_obj) {

    console.log("cb_read_file_done ");
    console.log("cb_read_file_done ");
    console.log("cb_read_file_done ");
    console.log("cb_read_file_done ");

    shared_utils.show_object(audio_obj, 
        "backHome audio_obj 32 bit signed float   read_file_done", "total", 10);


	// compare_source_with_post_write_read(source_obj, wav_file_input_obj);
};

// ---

var cb_write_file_done = function(audio_obj, cb_post_write) {

    console.log("cb_write_file_done ");
    console.log("cb_write_file_done ");
    console.log("cb_write_file_done ");


    shared_utils.show_object(audio_obj, 
        "backHome audio_obj 32 bit signed float    write_file_done ", "total", 10);
};

// ---



/*
var some_var = 2.07;

console.log(shared_utils.toFixed(some_var, 5));

var some_neg_var = -2.08;

console.log(shared_utils.toFixed(some_neg_var, 5));

return;
*/


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

// SIZE_BUFFER_SOURCE = 64;
// SIZE_BUFFER_SOURCE = 128;
SIZE_BUFFER_SOURCE = 256;
// SIZE_BUFFER_SOURCE = 1024;
// SIZE_BUFFER_SOURCE = 16384;

// var samples_per_cycle = 8;
// var samples_per_cycle = 16;
var samples_per_cycle = 17;
// var samples_per_cycle = 32;
// var samples_per_cycle = 64;
// var samples_per_cycle = SIZE_BUFFER_SOURCE;
// var samples_per_cycle = 256;


var audio_file_dir = resolvePath("~/Dropbox/Documents/data/audio/");

var output_format = ".wav";

console.log(" audio_file_dir ", audio_file_dir);

var source_obj = {};


// ----------- read wav file populate buffer ----------------  //


// var audio_32_bit_float_from_16_bit_wav_obj = {};

var raw_input_filename = "Elephant_sounds_rgUFu_hVhlk_roar_mono_tiny.wav";

var wav_input_filename = path.join(audio_file_dir, raw_input_filename);

console.log("wav_input_filename ", wav_input_filename);

var spec = {};

shared_utils.read_16_bit_wav_file_into_32_bit_float_buffer(source_obj,
                                                            wav_input_filename, spec, cb_read_file_done);



// return;


/*
// ---------- populate sin curve ------------- //

var source_obj = shared_utils.pop_audio_buffer(SIZE_BUFFER_SOURCE, samples_per_cycle);

var max_index = 3;
// var max_index = SIZE_BUFFER_SOURCE;

for (var index = 0; index < max_index; index++) {

    console.log(index, " pop_audio_buffer ", source_obj.buffer[index]);
}

// return;

console.log("\n\n");

*/

// ---- read wav file populate buffer ---- //



var detect_fundamental_frequency = function(audio_obj) {

// --- iterate across to identify dominate frequency --- //

var minimum_size_subsection = 10;
// var minimum_size_subsection = 25;

var curr_interval = 2;	// take entire input buffer and divide by this looking for similarities between such subsections

var size_subsection;

var count_subsection = 0;

var size_chunks;
var curr_chunk;
var curr_start;
var curr_end;
var curr_sample_left;
var curr_sample_right;

// var curr_sample_space;

var curr_left;
// var min_left;
// var max_left;

var curr_right;
// var min_right;
// var max_right;

var prev_size_subsection = 0;

var max_samples_per_subsection = 30;
var size_increment;
var reconstituted_size_subsection;
// var max_size_subsample_to_do_increment_fixup = 30;
var max_size_subsample_to_do_increment_fixup = max_samples_per_subsection;

// ---

var aggregate_total;
var aggregate_diff;
var subsection_total;
var subsection_diff;
var count_num_iterations;

do {

    size_subsection = ~~(SIZE_BUFFER_SOURCE / curr_interval);

    if (size_subsection == prev_size_subsection) {

        curr_interval++;
        continue;
    }

    if (size_subsection < max_size_subsample_to_do_increment_fixup) {        

        size_increment = 1;

        reconstituted_size_subsection = size_subsection;

    } else {

        size_increment = ~~(size_subsection / max_samples_per_subsection);

        reconstituted_size_subsection = size_increment * max_samples_per_subsection;
    };

    // stens TODO - we may want to compare more than ONE pair ... make it a parm to compare X cycles


    // console.log("size_subsection ", size_subsection, " curr_interval ", curr_interval, 
    //             " size_increment ", size_increment, reconstituted_size_subsection);

    // min_left = 0;
    // max_left = size_subsection;

    // min_right = size_subsection;
    // max_right = size_subsection * 2;

    // console.log("min_left ", min_left, " max_left ", max_left, " min_right ", min_right, " max_right ", max_right);


    subsection_total = 0;
    subsection_diff = 0;
    count_num_iterations = 0;

    for (curr_left = 0; curr_left < reconstituted_size_subsection; curr_left += size_increment) {

        curr_right = curr_left + size_subsection;

        curr_sample_left = audio_obj.buffer[curr_left];
        curr_sample_right = audio_obj.buffer[curr_right];

        subsection_total += curr_sample_right;
        subsection_diff  += Math.abs(curr_sample_left - curr_sample_right);
        count_num_iterations++;

        // console.log("User %s has %d points", userName, userPoints);

        // console.log(reconstituted_size_subsection, curr_left, curr_sample_left, curr_right, curr_sample_right);

        // console.log("aaa %d %d %f %d %f", reconstituted_size_subsection, curr_left, curr_sample_left, curr_right, curr_sample_right);
        // process.stdout.write('aaa %d %d %f %d %f\n', reconstituted_size_subsection, curr_left, curr_sample_left, curr_right, curr_sample_right);
        console.log("" + shared_utils.toFixed(reconstituted_size_subsection, 5),
                    // curr_left, curr_sample_left.toFixed(5), 
                    // curr_right, curr_sample_right.toFixed(5), " vs mine ",
                    shared_utils.toFixed(curr_left, 5), shared_utils.toFixed(curr_sample_left, 5), 
                    shared_utils.toFixed(curr_right, 5), shared_utils.toFixed(curr_sample_right, 5)
                    );
    };

    // console.log("" + size_subsection, samples_per_cycle, count_num_iterations,
    //          " subsection_diff ", subsection_diff/count_num_iterations);


    console.log("" + shared_utils.toFixed(size_subsection, 5),
        shared_utils.toFixed(samples_per_cycle, 5),
        shared_utils.toFixed(count_num_iterations, 5),
             " subsection_diff ", 
              shared_utils.toFixed(subsection_diff/count_num_iterations, 5)
             );



    // ---
    
    prev_size_subsection = size_subsection;
    curr_interval++;

} while (size_subsection > minimum_size_subsection);

};
exports.detect_fundamental_frequency = detect_fundamental_frequency;

detect_fundamental_frequency(source_obj);


return;

// ---

do {

	console.log("count_subsection ------------ ", count_subsection);

	size_subsection = ~~(SIZE_BUFFER_SOURCE / curr_interval);

	console.log("SIZE_BUFFER_SOURCE ", SIZE_BUFFER_SOURCE);
	console.log("curr_interval ", curr_interval);
	console.log("size_subsection ", size_subsection);

	// ---

    /*
	var array_start_end = [];

	var aggregate_index = 0;

	for (var index = 0; index < curr_interval; index++) {

		var this_section = {};

		this_section.index_start = aggregate_index;
		this_section.index_end   = aggregate_index + size_subsection;

		array_start_end.push(this_section);

		// ---

		aggregate_index += size_subsection;
	}

	console.log("array_start_end ", array_start_end);

    // ---

    size_chunks = array_start_end.length;
    */


    /*
    for (var curr_chunk_index = 0; curr_chunk_index < size_chunks; curr_chunk_index++) {

        curr_chunk = array_start_end[curr_chunk_index];

        curr_start = curr_chunk.index_start;
        curr_end   = curr_chunk.index_end;

        console.log(curr_chunk_index, " curr_chunk ", curr_chunk, curr_start, curr_end);

        for (var index_sample = curr_start; index_sample < curr_end; index_sample++) {

            curr_sample = source_obj.buffer[index_sample];

            console.log(index_sample, " curr_sample ", curr_sample);
        }
    }
    */
    

    var offset_jump;
    var iii;
    var audio_value;

    var aggregate_total;
    var aggregate_diff;
    var subsection_total = 0;
    var subsection_diff = 0;

    var sample_value;
    var total_value;
    var diff_value;

    for (var index_sample = 0; index_sample < size_subsection; index_sample++) {
    // for (var index_sample = 0; index_sample < 2; index_sample++) {

        offset_jump = 0;
        aggregate_total = 0;
        aggregate_diff = 0;

        for (var index_interval = 0; index_interval < curr_interval; index_interval++) {

            iii = index_sample + offset_jump;

            // stens TODO - just calc standard deviation across - 

            /*
            audio_value = source_obj.buffer[iii];

            total_value = Math.abs(audio_value);

             aggregate_total += total_value;
            subsection_total += total_value;

            if (index_interval == 0) {

                sample_value = audio_value;

            } else {

                diff_value = Math.abs(sample_value - audio_value);

                 aggregate_diff += diff_value;
                subsection_diff += diff_value;
            }
            */

            // ---

            offset_jump += size_subsection;

            // console.log(size_subsection, iii, index_sample, index_interval, audio_value);
            console.log("inner index_interval ", index_interval, size_subsection, iii, index_sample, offset_jump);
        };

        // console.log("aggregate_total ", aggregate_total/curr_interval, " aggregate_diff ", aggregate_diff/curr_interval);

        console.log("outer index_sample ", index_sample);
    };

    var sub_points = curr_interval * size_subsection;
        
    // console.log(size_subsection, " subsection total ", subsection_total, subsection_total/sub_points, " diff ", subsection_diff, sub_points, subsection_diff/sub_points);

    // console.log("size_chunks ", size_chunks);    

	// ---

	curr_interval++;

} while (size_subsection > minimum_size_subsection);


// return;

// ---------- write to output file ------------- //


var source_wave = "source_wave";

var source_wave_filename = path.join(audio_file_dir, source_wave + output_format);


console.log("source_wave_filename   ", source_wave_filename);

shared_utils.write_32_bit_float_buffer_to_16_bit_wav_file(source_obj, source_wave_filename);

console.log("source_wave_filename   ", source_wave_filename);

return;


// ------------ read wav file -------------------- //



console.log("\n\nread wav file\n\n");

var wav_file_input_obj = {};  // create stub object to which we attach .buffer


var property_buffer_raw_input_file = "buffer_raw_input_file";
var property_buffer_input_file     = "buffer_input_file";

wav_file_input_obj.filename = source_wave_filename;


wav_file_input_obj[property_buffer_raw_input_file] = new Buffer(0);


console.log("abouttttt to read wav_file_input_obj.filename ", wav_file_input_obj.filename);

var spec = {};

shared_utils.read_16_bit_wav_file_into_32_bit_float_buffer(
								wav_file_input_obj,
								wav_file_input_obj.filename, 
                                spec,
                                cb_read_file_done);




};
exports.evolveit = evolveit;


// ---

})(typeof exports === "undefined" ? this["iterate_mutate_judge"]={}: exports);


