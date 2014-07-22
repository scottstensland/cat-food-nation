
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

        console.log("environment_mode is ", environment_mode, " so pulling in sibling dir source code");
        shared_utils  = require(resolvePath("~/Dropbox/Documents/code/github/shared-utils/src/node_utils"));
        genome_module = require(resolvePath("~/Dropbox/Documents/code/github/node-genome/src/genome"));
        audio_util_obj = require(resolvePath("~/Dropbox/Documents/code/github/audio-utils/src/audio_utils"));
        break;

    case "dev":
        console.log("environment_mode is ", environment_mode, " so using locally installed npm module");
        shared_utils  = require("shared-utils");
        genome_module = require("node-genome");
        audio_util_obj = require("audio-utils");    // get these modules from global install
        break;

    default :
        console.log("environment_mode is ", environment_mode, " so using locally installed npm module");
        shared_utils  = require("shared-utils");
        genome_module = require("node-genome");
        audio_util_obj = require("audio-utils");    // get these modules from global install
        break;
};

console.log(shared_utils);

audio_utils = audio_util_obj.audio_utils(environment_mode);

console.log("audio_utils ", audio_utils);

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

    shared_utils.show_object(audio_obj, 
        "backHome audio_obj 32 bit signed float   read_file_done", "total", 10);

	// compare_source_with_post_write_read(source_obj, wav_file_input_obj);

    console.log("cb_read_file_done AAAAAbout to call detect_fundamental_frequency");

    audio_utils.detect_fundamental_frequency(audio_obj, SIZE_BUFFER_SOURCE, samples_per_cycle);
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


// ------------  synthesize an audio buffer  ------------  //


// var SIZE_BUFFER_SOURCE = 5;
// var SIZE_BUFFER_SOURCE = 256;
var SIZE_BUFFER_SOURCE = 512;
// var SIZE_BUFFER_SOURCE = 4096;
// var SIZE_BUFFER_SOURCE = 16384;



// var samples_per_cycle = 5;
// var samples_per_cycle = 64;
// var samples_per_cycle = 256;
// var samples_per_cycle = SIZE_BUFFER_SOURCE;


// ---------- generates nice listenable sin tone ------------- //

// var samples_per_cycle = 8;
var samples_per_cycle = 16;
// var samples_per_cycle = 17;
// var samples_per_cycle = 32;
// var samples_per_cycle = 64;
// var samples_per_cycle = SIZE_BUFFER_SOURCE;
// var samples_per_cycle = 256;


var audio_file_dir = resolvePath("~/Dropbox/Documents/data/audio/");

var output_format = ".wav";

console.log(" audio_file_dir ", audio_file_dir);

var source_obj = {};


// ------------ read wav file -------------------- //


var output_dir = resolvePath("~/Dropbox/Documents/data/audio/");

var output_format = ".wav";

console.log(" output_dir ", output_dir);



var source_wave = "source_wave";

var source_wave_filename = path.join(output_dir, source_wave + output_format);


console.log("\n\nread wav file  source_wave_filename ", source_wave_filename, "\n\n");

// return;

var wav_file_input_obj = {};  // create stub object to which we attach .buffer


var property_buffer_raw_input_file = "buffer_raw_input_file";
var property_buffer_input_file     = "buffer_input_file";

wav_file_input_obj.filename = source_wave_filename;

// wav_file_input_obj.filename = resolvePath("~/Elephant_sounds_rgUFu_hVhlk_roar_mono_tiny.wav");


wav_file_input_obj[property_buffer_raw_input_file] = new Buffer(0);


console.log("abouttttt to read wav_file_input_obj.filename ", wav_file_input_obj.filename);

var spec = {};

shared_utils.read_16_bit_wav_file_into_32_bit_float_buffer(
                                wav_file_input_obj,
                                wav_file_input_obj.filename, 
                                spec,
                                cb_read_file_done);

console.log("<><><>  <><><>  <><><>   end of best detection processing   <><><>  <><><>  <><><>");

};
exports.evolveit = evolveit;


// ---

})(typeof exports === "undefined" ? this["iterate_mutate_judge"]={}: exports);


