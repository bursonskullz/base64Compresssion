// Author: Roy Burson 
// purpose: Finish Base 64 Finite Compression Algorithm Taken from Website Design for Publication Consideration.
// Date: Janurary 29, 2025 

/*
Notes:

    1) Decompressor needs fixed throws erorrs when using strings involoving permuations but seems to be fine for all caps and all integer strings
    2) after fixing the decompressor work on making abtriary amount of symbols not in unicode. 
    
*/

const bursonCryptopgraphy = require('./base64Encryption.js'); // Import functions from file into object. 
console.log(bursonCryptopgraphy); // Verify the imported object:

global.uniqueChars = [];
global.uniqueChars2 = [];
global.uniqueChars3 = [];

let mainBase = 26; 
let digitBase = 10;
let modulus = 3;  //  Modulus determines reducible string length and number of elements needed during the initilization process (May experience memory issues for large  values). 
let mainAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const startTime = performance.now(); // Starts a timer to check how long it took to initilize symbols used during reduction process 



let customSymbolArray = bursonCryptopgraphy.setMainUniquebaseCharMapping(modulus, mainAlphabet); // retruns the set of symbols used to reduce strings in A_m (strictly caps and alhabetical)
let kmferChars = bursonCryptopgraphy.setUniquePermutationMapping(modulus);


let japaneseChars = bursonCryptopgraphy.setUniqueDigitCharsMapping(modulus, digitBase); // returns the set of symbols used to reduced integer strings using the modulus 
uniqueChars = customSymbolArray;

for (const kmferChar of kmferChars) {
    uniqueChars2.push(kmferChar);
}
for (const jChar of japaneseChars) {
    uniqueChars3.push(jChar);
}

const endTime = performance.now(); 
const duration = endTime - startTime;
console.log(`Finite Initializing Time:  ${duration.toFixed(2)} milliseconds.`); 

console.log(`Inverse of ${modulus}-char base map`, uniqueCharsInverse); // Prints global object containing inverse of base map to A_m 9 (which are alphabetical strings of length m that have all capital case chars).
console.log('Inverse permutations ', uniqueChars2Inverse); // Prints global object containing inverse of integer mapping I_m (which are strings of length m that contain only integers).
console.log(`Unique set of symbols to reduce A_${modulus}` , uniqueChars);  // Print the set of symbols used to reduce strings in A_m.
console.log(`Unique set of symbols to reduce P_${modulus}` , uniqueChars2); // Print the set of symbols used to reduce permuation symbols (should be 2^m-2 of them).
console.log(`Unique set of symbols to reduce I_${modulus}`, uniqueChars3);  // Print the set of symbols used to reduce string of length m containing only integers. 

const ifA_mHasDuplicate = bursonCryptopgraphy.hasDuplicates(uniqueChars);  //  checks the array uniqueChars has no repeated elements 
const ifI_mHasDuplicate = bursonCryptopgraphy.hasDuplicates(uniqueChars2); //  checks the array uniqueChars2 has no repeated elements
const ifP_mHasDuplicate = bursonCryptopgraphy.hasDuplicates(uniqueChars3); //  checks the array uniqueChars3 has no repeated elements

let intersection = bursonCryptopgraphy.checkIntersection(); // has not been verified but purposes is to check if the intersecion of A_m, I_m, and P_m is empty.
var base64TestString = `data:image/png;base64, 2RgIRgIAbC-j+mfmfANAN`; // Edit string here to test and gather results. 

if(uniqueChars.length >= mainBase**modulus && !ifA_mHasDuplicate && !ifI_mHasDuplicate && !ifP_mHasDuplicate && intersection){
    console.log('calling compressor using unique set of symbols generated with length:', uniqueChars.length);
    console.log(`Calling Burson Encryption using a ${modulus}-char reduction technique`);

    const encryptedStringTest = bursonCryptopgraphy.BursonBase64Encrypted(base64TestString, modulus);
    let stripped = base64TestString.replace(/^data:image\/[a-z]+;base64,/, ''); // must strip before performing calculation to be accurate
    console.log(`Compression amount = ${(stripped.length/encryptedStringTest.length).toFixed(3)}x`);

    const decryptionTestStringTest = bursonCryptopgraphy.BursonBase64Decrypt(encryptedStringTest, modulus);
    console.log('decryptedString length', decryptionTestStringTest.length);
    console.log('Base 64 string representation after decompression', decryptionTestStringTest); // this needs to print original string that we passed into the compressor. 
}else if(ifA_mHasDuplicate || ifI_mHasDuplicate|| ifP_mHasDuplicate){
    console.warn(`The code was unable to create the symbols uniquely it detected the duplicator is true`, uniqueChars);
}else if(!intersection){
    console.warn(`code detected that the intersection of the three sets we use are not unique (they share an element)`);
}else{
    console.warn(`Code detected that the uniquechar array length is not long enough `);
    console.log('Printing length for main base to reduce element in A_m:', customSymbolArray.length);
}

