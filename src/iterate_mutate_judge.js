

(function(exports) {

var path = require('path');

function resolvePath(str) {
  if (str.substr(0, 2) === '~/') {
    str = (process.env.HOME || process.env.HOMEPATH || process.env.HOMEDIR || process.cwd()) + str.substr(1);
  }
  return path.resolve(str);
}

// ---------------------------------------------------------------- //

var evolveit = function() {

	console.log("IN evolveit");

	var shared_utils = require(resolvePath("~/Dropbox/Documents/code/github/shared-utils/src/node_utils.js"));

	console.log("here is shared_utils ", shared_utils);

	// var genome_module = require('node-genome');
	// var genome_module = require('../src/genome');
	// var genome_module = require("~/Dropbox/Documents/code/github/node-genome/src/genome");
	var genome_module = require(resolvePath("~/Dropbox/Documents/code/github/node-genome/src/genome"));
	var genome = genome_module.init({ name : "Corinde Wiers"});

	genome.set_random_seed(117); // uncomment to see repeated random sequence

	// ---



// ------------  synthesize an audio buffer  ------------  //


SIZE_BUFFER_SOURCE = 256;
// SIZE_BUFFER_SOURCE = 16384;



// var samples_per_cycle = 64;
var samples_per_cycle = 256;

var source_obj = {};

var source_obj = shared_utils.pop_audio_buffer(SIZE_BUFFER_SOURCE, samples_per_cycle);

// var max_index = 3;
var max_index = SIZE_BUFFER_SOURCE;

for (var index = 0; index < max_index; index++) {

    console.log(index, " pop_audio_buffer ", source_obj.buffer[index]);
}





// process.exit(9);


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


	console.log("-----------------");

	genome.show_genome_buffer();


	console.log("-----------------");

	var audio_genome_synth_obj = {};

	audio_genome_synth_obj.buffer = genome.get_genome_buffer();

	console.log("genome_buffer length ", audio_genome_synth_obj.buffer.length);

	var wav_output_filename = "/tmp/genome_synth_audio.wav";


	// node_utils.write_buffer_to_file(audio_obj, wav_output_filename);
	shared_utils.write_buffer_to_file(audio_genome_synth_obj, wav_output_filename);

	console.log("wav_output_filename   ", wav_output_filename);



	// --- do buffer diff

	var diff_spec = { 
						extent : "entire",	// diff which portions of buffers
						master : "left",	// determines which buffer determines buffer length
					};

	shared_utils.diff_buffers(source_obj, audio_genome_synth_obj, diff_spec);
	// shared_utils.diff_buffers(source_obj, source_obj, diff_spec);
	// shared_utils.diff_buffers(source_obj, audio_genome_synth_obj);


	console.log("diff_spec   ", diff_spec);



};
exports.evolveit = evolveit;


// ---

})(typeof exports === "undefined" ? this["iterate_mutate_judge"]={}: exports);
