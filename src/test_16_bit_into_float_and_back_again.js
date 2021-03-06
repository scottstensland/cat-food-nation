

/*
c16_32 0       254 9 2558 		0.07806634902954102
c16_32 2 43 24 6187 0.18881802260875702
c16_32 4 84 9 2388 0.07287820428609848
c16_32 6 205 22 5837 0.17813654243946075
c16_32 8 5 29 7429 0.22672200202941895
c16_32 10 83 18 4691 0.1431623250246048
c16_32 12 137 25 6537 0.19949950277805328
c16_32 14 235 18 4843 0.14780114591121674
c16_32 16       20 248 -2028 		 -0.0618896484375


4 ' ------------------------- ' -0.0618896484375
value_16_bit_signed_int  -2028
byte_one_of_two  20
byte_two_of_two  -8
back_16_bit_signed_int  -2028
new_32_bit_value  -0.0618896484375

*/

function float_to_int_and_back() {

	var new_32_bit_array = [0.07806634902954102, -1.0, 0, 1.0, -0.0618896484375];

	for (var index = 0; index < new_32_bit_array.length; index++) {

		var new_32_bit_float_value = new_32_bit_array[index];

		console.log(index, " ------------------------- ", new_32_bit_float_value);

		var value_16_bit_signed_int = (0 < new_32_bit_float_value) ? new_32_bit_float_value * 0x7FFF : 
															   		 new_32_bit_float_value * 0x8000;

		console.log("value_16_bit_signed_int ", value_16_bit_signed_int);

		// -----------

		var byte_one_of_two = value_16_bit_signed_int & 0xFF;
		// var byte_two_of_two = (value_16_bit_signed_int >> 8) & 0xFF;
		var byte_two_of_two = (value_16_bit_signed_int >> 8);

		console.log("byte_one_of_two ", byte_one_of_two);
		console.log("byte_two_of_two ", byte_two_of_two);

		// -------------- and now back to float from int ------------------- //

		var back_16_bit_signed_int = (byte_two_of_two << 8) | byte_one_of_two; // good way

		console.log("back_16_bit_signed_int ", back_16_bit_signed_int);

		var new_32_bit_value = ((0 < back_16_bit_signed_int) ?  back_16_bit_signed_int / 0x7FFF : 
				    											back_16_bit_signed_int / 0x8000);

		console.log("new_32_bit_value ", new_32_bit_value);



	}
};
exports.float_to_int_and_back = float_to_int_and_back;

// ---

function doit() {

// c16_32 0 254 9 65033 0.984649658203125


// var value_16_bit_signed_int =  -15693;


/*
// var source_byte_one_of_two = 254;
var source_byte_one_of_two = 0xFE;
var source_byte_two_of_two = 0x9;

console.log("source_byte_one_of_two ", source_byte_one_of_two);
console.log("source_byte_two_of_two ", source_byte_two_of_two);
*/


// now convert into floating point ... but first into a pair of one byte chunks

// var value_16_bit_signed_int = (source_byte_two_of_two << 8) | source_byte_one_of_two; // good way
// var value_16_bit_signed_int = (source_byte_one_of_two << 8) | source_byte_two_of_two; // bad way

var value_16_bit_signed_int = -0x8000;
// var value_16_bit_signed_int = 0x7FFF;


console.log("value_16_bit_signed_int ", value_16_bit_signed_int);

// var new_32_bit_value = ((0 < value_16_bit_signed_int) ?  value_16_bit_signed_int / 0x8000 : 
// 		    											 value_16_bit_signed_int / 0x7FFF) - 1;


var new_32_bit_value = ((0 < value_16_bit_signed_int) ?  value_16_bit_signed_int / 0x7FFF : 
		    											 value_16_bit_signed_int / 0x8000);

console.log("new_32_bit_value ", new_32_bit_value);


// --------- THIS is CUT over POINT - convert 32 bit float into 16 bit signed integer ------
// --------- THIS is CUT over POINT - convert 32 bit float into 16 bit signed integer ------
// --------- THIS is CUT over POINT - convert 32 bit float into 16 bit signed integer ------


var back_again_value_16_bit_signed_int = (0 < new_32_bit_value) ? new_32_bit_value * 0x7FFF : 
											 new_32_bit_value * 0x8000;

console.log("back_again_value_16_bit_signed_int ", back_again_value_16_bit_signed_int);


// -----------

var back_again_byte_one_of_two = back_again_value_16_bit_signed_int & 0xFF;
var back_again_byte_two_of_two = (back_again_value_16_bit_signed_int >> 8) & 0xFF;


console.log("back_again_byte_one_of_two ", back_again_byte_one_of_two);
console.log("back_again_byte_two_of_two ", back_again_byte_two_of_two);


};
exports.doit = doit;
