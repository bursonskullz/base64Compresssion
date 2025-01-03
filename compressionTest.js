// Author: Roy Burson 
// purpose: Finish base 64 finite compression algorithm taken from website design 
// Date: janurary 3rd, 2025 

const bursonCryptopgraphy = require('./base64Encryption.js');

// Verify the imported object:
console.log(bursonCryptopgraphy);
console.log('initializing data . . .');


let uniqueChars = [];
let uniqueChars2 = [];
let uniqueChars3 = [];

let mainBase = 26; 
let digitBase = 10;
let modulus = 3;  // to implement 5-char or 6 char increase here. May experience memory issues. 
let mainAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const startTime = performance.now();



let customSymbolArray = bursonCryptopgraphy.setMainUniquebaseCharMapping(modulus, mainAlphabet); // this creates as many symbols as we need but will fail when modulus is to large i.e 6-8
const endTime = performance.now();
const duration = endTime - startTime;


console.log(`Initializing base set symbols time:  ${duration.toFixed(2)} milliseconds.`);
let kmferChars = bursonCryptopgraphy.setUniquePermutationMapping(modulus);
console.log('setting unique digit mapping');


let japaneseChars = bursonCryptopgraphy.setUniqueDigitCharsMapping(modulus, digitBase); // returns inverse of the set I_m
uniqueChars = customSymbolArray;

for (const kmferChar of kmferChars) {
    uniqueChars2.push(kmferChar);
}
for (const jChar of japaneseChars) {
    uniqueChars3.push(jChar);
}

console.log(`inverse of ${modulus}-char base map`, uniqueCharsInverse); // has been verified uncomment to check again
console.log('inverse permutations ', uniqueChars2Inverse); // has been verified uncomment to check again
console.log(`unique set of symbols to reduce A_${modulus}` , uniqueChars); // has been verified uncomment to check again
console.log(`unique set of permutation symbols P_${modulus}` , uniqueChars2); // has been verified uncomment to check again
console.log(`unique set of symbols to reduce I_${modulus}`, uniqueChars3); // has been verified uncomment to check again

const ifA_mHasDuplicate = bursonCryptopgraphy.hasDuplicates(uniqueChars);
const ifI_mHasDuplicate = bursonCryptopgraphy.hasDuplicates(uniqueChars2);
const ifP_mHasDuplicate = bursonCryptopgraphy.hasDuplicates(uniqueChars3);

let intersection = bursonCryptopgraphy.checkIntersection();// has not been verified 

var base64TestString = `data:image/png;base64, 123456789`; // test string (edit here for results);

if(uniqueChars.length >= mainBase**modulus && !ifA_mHasDuplicate && !ifI_mHasDuplicate && !ifP_mHasDuplicate && intersection){
    console.log('calling compressor using unique set of symbols generated with length:', uniqueChars.length);
    console.log(`Calling burson encryption using a ${modulus}-char reduction technique`);
    const encryptedStringTest = bursonCryptopgraphy.BursonBase64Encrypted(base64TestString, modulus);

    let stripped = base64TestString.replace(/^data:image\/[a-z]+;base64,/, ''); // must strip before performing calculation to be accurate
    console.log(`Compression amount = ${(stripped.length/encryptedStringTest.length).toFixed(3)}x`);
    const decryptionTestStringTest = bursonCryptopgraphy.BursonBase64Decrypt(encryptedStringTest, modulus);

    console.log('decryptedString length', decryptionTestStringTest.length);
    console.log('Image base 64 representation after decompression', decryptionTestStringTest);
}else if(ifA_mHasDuplicate || ifI_mHasDuplicate|| ifP_mHasDuplicate){
    console.warn(`duplicator is true spirals are not unique`, uniqueChars);
}else if(!intersection){
    console.warn(`code detected that the intersection of the three sets we use are not unique (they share an element`);
}else{
    console.warn(`Error unique char array length is not long enough `);
    console.log('unique symbol length for main base:', customSymbolArray.length);
}

