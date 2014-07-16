

(function(exports) {

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
        // shared_utils  = require(resolvePath("~/Dropbox/Documents/code/github/shared-utils/src/node_utils.js"));
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

console.log("shared_utils ", shared_utils);


// ----------------------------------------------- //


function do_typed_array_calc(given_obj) {

    console.log("%O", given_obj);

    given_obj.buffer = new Float32Array(given_obj.desired_size); // integer division by 2
};

// -------------


function test_16_bit_to_32_bit_and_back() {

var size_source_buffer = 4;

var new_16_bit_array = new Uint16Array(size_source_buffer);

new_16_bit_array[0] = 0;
new_16_bit_array[1] = 32767;
new_16_bit_array[2] = 32768;
// new_16_bit_array[3] = 65520;
new_16_bit_array[3] = 65536 - 1;

// new_16_bit_obj.buffer = new_16_bit_array;

// for (var index = 0; index < new_16_bit_array.length; index++) {

//     console.log("new_16_bit_array ", index, new_16_bit_array[index]);
// }

// --------------------------------

// var new_32_bit_obj = {};

            // new_32_bit_array[index] = given_16_bit_buffer[index] / 32767 - 1.0;

for (var index = 0; index < size_source_buffer; index++) {

    // console.log("new_16_bit_array ", index, new_16_bit_array[index], new_16_bit_array[index] / 32767 - 1.0);

    var new_32_bit_float = new_16_bit_array[index] / 32768 - 1.0;

    var back_16_bit_int = ~~((new_32_bit_float + 1.0) * 32768);


    console.log("new_16_bit_array ", index, new_16_bit_array[index], new_32_bit_float, back_16_bit_int);
};

// process.exit(8);


};

// ---

function test_write_32_bit_float_into_file() {

    var fs = require('fs');
    var wstream = fs.createWriteStream('data.dat');

    var data = new Float32Array([1.1, 2.2, 3.3, 4.4, 5.5]);

    //prepare the length of the buffer to 4 bytes per float
    var buffer = new Buffer(data.length*4);

    // ---

    var new_16_bit_signed_int = new Int16Array(size_source_buffer);

    for(var i = 0; i < data.length; i++){


            prelim_value = ~~((input_32_bit_buffer[index] < 0) ? input_32_bit_buffer[index] / 0x8000 : 
                                                                 input_32_bit_buffer[index] / 0x7FFF);


        //write the float in Little-Endian and move the offset
        buffer.writeFloatLE(data[i], i*4);
    }

    wstream.write(buffer);
    wstream.end();
};

// ---

function test_write_32_bit_float_to_16_bit_signed_ints_to_file() {

    var fs = require('fs');
    var wstream = fs.createWriteStream('data_32_bit_float_to_signed_ints.dat');

    var input_32_bit_buffer = new Float32Array([0.0, 1.0, -1.0]);

    //prepare the length of the buffer to 4 bytes per float
    // var buffer = new Buffer(input_32_bit_buffer.length*4);
    var buffer = new Buffer(input_32_bit_buffer.length*4);

    // ---

    var new_16_bit_signed_int = new Int16Array(input_32_bit_buffer.length);
    var prelim_value;

    for(var index = 0; index < input_32_bit_buffer.length; index++) {

        // prelim_value = ~~((input_32_bit_buffer[index] < 0) ? input_32_bit_buffer[index] / 0x8000 : 
        //                                                      input_32_bit_buffer[index] / 0x7FFF);

        prelim_value = ~~((input_32_bit_buffer[index] < 0) ? input_32_bit_buffer[index] * 0x8000 : 
                                                             input_32_bit_buffer[index] * 0x7FFF);

        new_16_bit_signed_int[index] = prelim_value;

        console.log(index, input_32_bit_buffer[index], prelim_value, new_16_bit_signed_int[index]);

        //write the float in Little-Endian and move the offset
        // buffer.writeFloatLE(input_32_bit_buffer[i], i*4);
        buffer.writeFloatLE(new_16_bit_signed_int[index], index*4);
    }

    wstream.write(buffer);
    wstream.end();
};


// ---


function test_write_16_bit_int_into_file() {

    var fs = require('fs');
    var wstream = fs.createWriteStream('data_16_bit_unsigned_ints.dat');

    // var data = new Float32Array([1.1, 2.2, 3.3, 4.4, 5.5]);

    // Uint16Array         2   16-bit unsigned integer                 unsigned short

    var data = new Uint16Array([0, 32767, 32768, 65535]);

    //prepare the length of the buffer to 4 bytes per float
    // var buffer = new Buffer(data.length*4);
    var buffer = new Buffer(data.length*2);


    for(var i = 0; i < data.length; i++){
        //write the float in Little-Endian and move the offset
        // buffer.writeFloatLE(data[i], i*4);
        buffer.writeUInt16LE(data[i], i*2);
    }

    wstream.write(buffer);
    wstream.end();
};

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

    // read_audio_obj.buffer = shared_utils.convert_16_bit_signed_int_to_32_bit_float(input_obj[property_buffer_input_file]);
    read_audio_obj.buffer = shared_utils.convert_16_bit_signed_int_to_32_bit_float(input_obj[property_buffer_input_file]);
    
    shared_utils.show_object(read_audio_obj, " CWCWCW read_audio_obj 32 bit floating point ", "total", 10);

    // return;

    var audio_16_bit_signed_int_obj = {};

    audio_16_bit_signed_int_obj.buffer  = shared_utils.convert_32_bit_float_into_signed_16_bit_int_lossy(read_audio_obj.buffer);


    shared_utils.show_object(audio_16_bit_signed_int_obj, 
        " SSSSSS audio_16_bit_signed_int_obj 16 bit signed int ", "total", 20);

    // return;

    console.log("\n\n ggggggggggEEEEEEEEEEErrrrrrmanyyyyyyyyyyyyyyyyy\n\n");

    var wav_output_filename = "started_32_bit_float_now_back_to_16_bit_signed.wav";

    shared_utils.write_32_bit_buffer_to_wav_file(audio_16_bit_signed_int_obj, wav_output_filename);

};      //      cb_after_reading_input_file_grow_curve



function read_wav_file() {

    console.log("read_wav_file");

    // var input_file = resolvePath("~/Elephant_sounds_rgUFu_hVhlk_roar_mono_tiny.wav");
    // var input_file = resolvePath("../data/Elephant_sounds_rgUFu_hVhlk_roar_mono_tiny.wav");
    // var input_file = resolvePath("~/Dropbox/Documents/data/audio/Justice_Genesis_first_30_seconds.wav");
    // var input_file = resolvePath("~/Dropbox/Documents/data/audio/Die_Antwoord_11_doong_doong_minute_sec.wav");
    // var input_file = resolvePath("~/Dropbox/Documents/data/audio/Lee_Smolin_Physics_Envy_and_Economic_Theory_cWn86ESze6M_mono.wav");

    // var input_file = resolvePath("~/Videos/Google_I_O_2014_-wtLJPvx7-ys.wav");


    var input_file = resolvePath("../data/started_32_bit_float_now_back_to_16_bit_signed.wav");


    var wav_file_input_obj = {};  // create stub object to which we attach .buffer


    var property_buffer_raw_input_file = "buffer_raw_input_file";
    var property_buffer_input_file     = "buffer_input_file";

    // shared_utils.copy_properties_across_objects(audio_file_obj, wav_file_input_obj);

    // wav_file_input_obj.filename = "Elephant_sounds_rgUFu_hVhlk_roar_mono_tiny.wav";
    // wav_file_input_obj.filename = "../data/Elephant_sounds_rgUFu_hVhlk_roar_mono_tiny.wav";

    wav_file_input_obj.filename = input_file;

    wav_file_input_obj[property_buffer_raw_input_file] = new Buffer(0);

    shared_utils.read_file_into_buffer(wav_file_input_obj, property_buffer_raw_input_file,
                                    property_buffer_input_file,
                                    cb_after_reading_input_file_grow_curve);

};      //      read_wav_file

// ---

var cb_read_file_done = function(audio_obj) {

    console.log("cb_read_file_done ");
    console.log("cb_read_file_done ");
    console.log("cb_read_file_done ");
    console.log("cb_read_file_done ");

    shared_utils.show_object(audio_obj, 
        " SSSSSS audio_obj 32 bit signed float ", "total", 20);
};

// ---------------------------------------------------------------- //

	// var shared_utils = require(resolvePath("~/Dropbox/Documents/code/github/shared-utils/src/node_utils.js"));

	// console.log("here is shared_utils ", shared_utils);

/*
    // console.log("ABOUT to call test_write_32_bit_float_into_file ");
    // test_write_32_bit_float_into_file();

    console.log("ABOUT to call test_write_16_bit_int_into_file ");

    test_write_16_bit_int_into_file();


    return;

    // process.exit(8);
*/

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
// SIZE_BUFFER_SOURCE = 16384;
// var samples_per_cycle = 64;



// ---------- testing ONLY not intended to listen to ------------- //
// SIZE_BUFFER_SOURCE = 4;
// SIZE_BUFFER_SOURCE = 8;
// SIZE_BUFFER_SOURCE = 256;
// SIZE_BUFFER_SOURCE = 16384;
SIZE_BUFFER_SOURCE = 32768;
// SIZE_BUFFER_SOURCE = 131072;
// SIZE_BUFFER_SOURCE = 1048576;






// var samples_per_cycle = 4;
// var samples_per_cycle = 8;
// var samples_per_cycle = 32;
// var samples_per_cycle = 8;
// var samples_per_cycle = SIZE_BUFFER_SOURCE;
var samples_per_cycle = 64;
// var samples_per_cycle = 128;
// var samples_per_cycle = 1024;




// test_write_32_bit_float_to_16_bit_signed_ints_to_file();

// return;

// ---


var output_dir = resolvePath("~/Dropbox/Documents/data/audio/");

var output_format = ".wav";

console.log(" output_dir ", output_dir);

// var limit_size_input_file_buffer = 16;

// read_wav_file();

// return;

// test_16_bit_to_32_bit_and_back();

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
var source_wave = "source_wave_" + SIZE_BUFFER_SOURCE + "_" + samples_per_cycle;

var source_wave_filename = path.join(output_dir, source_wave + output_format);


console.log("source_wave_filename   ", source_wave_filename);
console.log("write_32_bit_buffer_to_wav_file   ");






// shared_utils.write_buffer_to_wav_file(source_obj, source_wave_filename);
shared_utils.write_32_bit_float_buffer_to_16_bit_wav_file(source_obj, source_wave_filename);

console.log("source_wave_filename   ", source_wave_filename);


// ---


console.log("AAAAAbout to call read_16_bit_wav_file_into_32_bit_float_buffer");
console.log("AAAAAbout to call read_16_bit_wav_file_into_32_bit_float_buffer");
console.log("AAAAAbout to call read_16_bit_wav_file_into_32_bit_float_buffer");
console.log("AAAAAbout to call read_16_bit_wav_file_into_32_bit_float_buffer");
console.log("AAAAAbout to call read_16_bit_wav_file_into_32_bit_float_buffer");

var audio_32_bit_float_from_16_bit_wav_obj = {};

var wav_input_filename = source_wave_filename;

console.log("wav_input_filename ", wav_input_filename);

var spec = {};

shared_utils.read_16_bit_wav_file_into_32_bit_float_buffer(audio_32_bit_float_from_16_bit_wav_obj,
                                                            wav_input_filename, spec, cb_read_file_done);


// shared_utils.read_16_bit_wav_file_into_32_bit_float_buffer(audio_32_bit_float_from_16_bit_wav_obj,
//                                                             wav_input_filename, spec);



// shared_utils.show_object(audio_32_bit_float_from_16_bit_wav_obj, 
//     " omomomommo audio_32_bit_float_from_16_bit_wav_obj 16 bit signed int ", "total", 20);



// ------------------------------------------------------------- //
// ------------------------------------------------------------- //
// ------------------------------------------------------------- //
// ------------------------------------------------------------- //

};
exports.evolveit = evolveit;

// ---

})(typeof exports === "undefined" ? this["test_write_wav"]={}: exports);




