
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

var evolveit = function() {

console.log("IN evolveit");

var shared_utils = require("shared-utils");
var genome_module = require("node-genome");
var audio_utils = require("audio-utils");    

console.log("audio_utils ", audio_utils);

// ---

var fs = require('fs');

// ------------------------------------- //

var cb_read_file_done = function(audio_obj) {

    console.log("cb_read_file_done ");
    console.log("cb_read_file_done ");
    console.log("cb_read_file_done ");
    console.log("cb_read_file_done ");

    shared_utils.show_object(audio_obj, 
        "backHome audio_obj 32 bit signed float   read_file_done", "total", 10);

    console.log("source_wave_filename   ", source_wave_filename);
    console.log("source_wave_filename   ", source_wave_filename);
    console.log("source_wave_filename   ", source_wave_filename);
};

// ---

var cb_write_file_done = function(audio_obj, cb_post_write) {

    console.log("cb_write_file_done ");
    console.log("cb_write_file_done ");
    console.log("cb_write_file_done ");


    shared_utils.show_object(audio_obj, 
        "backHome audio_obj 32 bit signed float    write_file_done ", "total", 10);
};

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

var SIZE_BUFFER_SOURCE = 256;
// var SIZE_BUFFER_SOURCE = 2048;
// var SIZE_BUFFER_SOURCE = 16384;
// var SIZE_BUFFER_SOURCE = 1048576;

var samples_per_cycle = 8;
// var samples_per_cycle = 16;
// var samples_per_cycle = 32;
// var samples_per_cycle = 64;




// var local_output_dir = process.env.AUDIO_DIR || process.env.HOME;

// var output_dir = resolvePath(local_output_dir);





var output_dir = resolvePath(process.env.AUDIO_DIR || process.env.HOME);





var output_format = ".wav";

console.log(" output_dir ", output_dir);



/*


var source_obj = {};

var source_obj = audio_utils.pop_audio_buffer(SIZE_BUFFER_SOURCE, samples_per_cycle);
// var source_obj = audio_utils.pop_audio_buffer(SIZE_BUFFER_SOURCE);

var max_index = 3;
// var max_index = SIZE_BUFFER_SOURCE;

for (var index = 0; index < max_index; index++) {

    console.log(index, " pop_audio_buffer ", source_obj.buffer[index]);
}


// ---------- write to output file ------------- //


var source_wave = "source_wave";

// var source_wave_filename = path.join(output_dir, source_wave + output_format);
var source_wave_filename = path.join(output_dir, source_wave + "_" +
                                    SIZE_BUFFER_SOURCE + "_" + samples_per_cycle + output_format);


console.log("source_wave_filename   ", source_wave_filename);

shared_utils.write_32_bit_float_buffer_to_16_bit_wav_file(source_obj, source_wave_filename);

console.log("source_wave_filename   ", source_wave_filename);

// return;

*/


// ----------- read 24 bit wav file -------------- //


console.log("\n\nread wav file\n\n");


// var source_wave_filename = "/home/stens/Dropbox/Documents/data/audio/genome_synth_evolved_sloppy.wav";
// var source_wave_filename = "/home/stens/Dropbox/Documents/data/audio/audacity_chirp_24_bit_signed_mono_44100_bitrate.wav";
var source_wave_filename = "/home/stens/Dropbox/Documents/data/audio/audacity_sin_curve_24_bit_signed_mono_44100_bitrate.wav";



var wav_file_input_obj = {};  // create stub object to which we attach .buffer


var property_buffer_raw_input_file = "buffer_raw_input_file";
var property_buffer_input_file     = "buffer_input_file";

wav_file_input_obj.filename = source_wave_filename;


wav_file_input_obj[property_buffer_raw_input_file] = new Buffer(0);


console.log("abouttttt to read wav_file_input_obj.filename ", wav_file_input_obj.filename);

var spec = {};

/*
shared_utils.read_16_bit_wav_file_into_32_bit_float_buffer(
                                wav_file_input_obj,
                                wav_file_input_obj.filename, 
                                spec,
                                cb_read_file_done);
*/

shared_utils.read_wav_file(wav_file_input_obj.filename, cb_read_file_done);


/*
shared_utils.read_wav_file(wav_file_input_obj.filename, (function(audio_obj) {

    console.log("cb_read_file_done ");

    console.log("populated buffer size ", audio_obj.buffer.length);

    shared_utils.show_object(audio_obj,
        "backHome audio_obj 32 bit signed float   read_file_done", "total", 10);
}));
*/






// ------------ read wav file -------------------- //

/*       stens TODO - IMPORTANT - below is GOOD one above is experimental

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

*/


};
exports.evolveit = evolveit;


// ---

})(typeof exports === "undefined" ? this["iterate_mutate_judge"]={}: exports);


