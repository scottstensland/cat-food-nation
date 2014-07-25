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

// ----------------------------------------------- //

audio_utils = audio_util_obj.audio_utils(environment_mode);
console.log("audio_utils ", audio_utils);

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


    for(var i = 0; i < data.length; i++){
        //write the float in Little-Endian and move the offset
        buffer.writeFloatLE(data[i], i*4);
    }

    wstream.write(buffer);
    wstream.end();
};

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

// ---------------------------------------------------------------- //

console.log("here is shared_utils ", shared_utils);

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
SIZE_BUFFER_SOURCE = 16384;


// var samples_per_cycle = 4;
// var samples_per_cycle = 8;
var samples_per_cycle = 32;
// var samples_per_cycle = 8;
// var samples_per_cycle = SIZE_BUFFER_SOURCE;
// var samples_per_cycle = 64;




var output_dir = resolvePath(process.env.AUDIO_DIR || process.env.HOME);




var output_format = ".wav";

console.log(" output_dir ", output_dir);


// test_16_bit_to_32_bit_and_back();

// process.exit(9);


var source_obj = {};

var source_obj = audio_utils.pop_audio_buffer(SIZE_BUFFER_SOURCE, samples_per_cycle);

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

// shared_utils.write_buffer_to_wav_file(source_obj, source_wave_filename);

shared_utils.write_32_bit_float_buffer_to_16_bit_wav_file(source_obj, source_wave_filename);


console.log("source_wave_filename   ", source_wave_filename);

return;

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


