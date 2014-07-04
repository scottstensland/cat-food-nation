(function(exports) {

var path = require('path');

function resolvePath(str) {
  if (str.substr(0, 2) === '~/') {
    str = (process.env.HOME || process.env.HOMEPATH || process.env.HOMEDIR || process.cwd()) + str.substr(1);
  }
  return path.resolve(str);
}


var evolveit = function(environment_mode) {

console.log("IN evolveit");

var shared_utils;
var genome_module;

switch (environment_mode) {

    case "nubia": // repository owner tinkering mode - ignore it and use nothing which defaults to dev which is OK
        // shared_utils  = require(resolvePath("~/Dropbox/Documents/code/github/shared-utils/src/node_utils.js"));
        shared_utils  = require(resolvePath("~/Dropbox/Documents/code/github/shared-utils/src/node_utils"));
        genome_module = require(resolvePath("~/Dropbox/Documents/code/github/node-genome/src/genome"));
        break;

    case "dev":
        shared_utils  = require(resolvePath("shared-utils"));
        genome_module = require(resolvePath("node-genome"));
        break;

    default :
        shared_utils  = require(resolvePath("node_utils"));
        genome_module = require(resolvePath("node-genome"));
        break;
};

// ----------------------------------------------- //


function do_typed_array_calc(given_obj) {

    console.log("%O", given_obj);

    given_obj.buffer = new Float32Array(given_obj.desired_size); // integer division by 2
};

// -------------

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

// ---

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

// ---------------------------------------------------------------- //

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

	// var desired_aphorism = aphorism_sloppy;
	var desired_aphorism = aphorism_strict;



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

var max_index = 4;
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

shared_utils.write_buffer_to_wav_file(source_obj, source_wave_filename);

console.log("source_wave_filename   ", source_wave_filename);

// ---------- now read back same wav file ------------ //


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

// --- IMPORTANT - above is async so its callback is probably still running when this line is reached


// ------------------------------------------------------------- //
// ------------------------------------------------------------- //
// ------------------------------------------------------------- //
// ------------------------------------------------------------- //

};
exports.evolveit = evolveit;

// ---

})(typeof exports === "undefined" ? this["synth_write_read"]={}: exports);


