
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

var subsection_mode = "decimation"; // keep dividing buffer size by incrementing counter
// var subsection_mode = "continuous"; // continuously slide left/right center point closer to start

var spec_to_from_freq_detector = {

    // min_error_thresold : 0.2
    min_error_thresold : 0.015,
    minimum_size_subsection : 6,
    max_samples_per_subsection : 9999999,
    subsection_mode : subsection_mode
};

// ------------------------------------- //

var compare_source_with_post_write_read = function(source_obj, post_process_obj) {

	var diff_spec = { 
						extent : "entire",	// diff which portions of buffers
						master : "left",	// determines which buffer determines buffer length
					};

	shared_utils.diff_buffers(source_obj, post_process_obj, diff_spec);

	console.log(  "___________ pre N post writeNread  diff_spec   ", diff_spec,
				"\n___________ pre N post writeNread  diff_spec");
};

var cb_read_file_done = function(audio_obj) {

    console.log("cb_read_file_done ");

    shared_utils.show_object(audio_obj, 
        "backHome cb_read_file_done ", "total", 0);

	// compare_source_with_post_write_read(source_obj, wav_file_input_obj);

    console.log("cb_read_file_done AAAAAbout to call detect_fundamental_frequency");

    // audio_utils.detect_fundamental_frequency(audio_obj, SIZE_BUFFER_SOURCE, samples_per_cycle);
    // audio_utils.detect_fundamental_frequency(audio_obj, spec_answer_back);
    audio_utils.play_detect_frequency(audio_obj, spec_to_from_freq_detector);

    var all_low_error_sample_sizes = spec_to_from_freq_detector.all_low_error_sample_sizes;

    console.log("spec_to_from_freq_detector ", spec_to_from_freq_detector);
    console.log("all_low_error_sample_sizes ", all_low_error_sample_sizes);
};

// ---

var cb_write_file_done = function(audio_obj, cb_post_write) {

    console.log("cb_write_file_done ");
    console.log("cb_write_file_done ");
    console.log("cb_write_file_done ");


    shared_utils.show_object(audio_obj, 
        "backHome audio_obj 32 bit signed float    write_file_done ", "total", 10);
};

// ------------ read wav file -------------------- //

var wav_file_input_obj = {};  // create stub object to which we attach .buffer


var property_buffer_raw_input_file = "buffer_raw_input_file";
// var property_buffer_input_file     = "buffer_input_file";

// var input_audiofile = "~/Elephant_sounds_rgUFu_hVhlk_roar_mono_tiny.wav";
var input_audiofile = "~/Dropbox/Documents/data/audio/Contrabass_Saxophone_mono__excerpt_audible_hXBeu7o9uUM.wav";
// var input_audiofile = "~/Dropbox/Documents/data/audio/source_wave_256_8.wav";


console.log("read input_audiofile ", input_audiofile);

// ---

wav_file_input_obj.filename = resolvePath(input_audiofile);

wav_file_input_obj[property_buffer_raw_input_file] = new Buffer(0);

var spec = {};

shared_utils.read_16_bit_wav_file_into_32_bit_float_buffer(
                                wav_file_input_obj,
                                wav_file_input_obj.filename, 
                                spec,
                                cb_read_file_done); // <--- followup processing happens in THIS callback

console.log("<><><>  <><><>  <><><>   end of best detection processing   <><><>  <><><>  <><><>");

};
exports.evolveit = evolveit;


// ---

})(typeof exports === "undefined" ? this["iterate_mutate_judge"]={}: exports);


