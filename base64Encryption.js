global.uniqueCharsInverse = [];
global.uniqueChars2Inverse = [];

function getModCharInverse(x, modulus, mainBase) {
    let myArray = [];
    let baseLength = mainBase.length;
    if (x === 0) {
        myArray = Array(modulus).fill(1); 
    } else {
        for (let i = modulus; i > 0; i--) {
            let lowerBound = Math.pow(baseLength, i - 1);
            let upperBound = Math.pow(baseLength, i);
            if (lowerBound <= x && x < upperBound) {
                let vector = [];
                for (let j = i; j > 0; j--) {
                    let divisor = Math.pow(baseLength, j - 1);
                    let q = Math.floor(x / divisor);
                    x = x % divisor;
                    vector.push(q + 1);
                }
                while (vector.length < modulus) {
                    vector.unshift(1);
                }
                myArray = vector;
                break;
            }
        }
    }
    let modChar = '';
    for (let i = 0; i < myArray.length; i++) {
        let charIndex = myArray[i] - 1; 
        if (charIndex >= 0 && charIndex < baseLength) {
            modChar += mainBase[charIndex];
        } else {
            console.log('char index out of range, cannot set data');
        }
    }
    return modChar; 
}

function isInMainBase(char){
    const uniqueCharsSet = new Set(uniqueChars);
    return uniqueCharsSet.has(char);
}

function isbaseDigit(char) {
    return uniqueChars3.includes(char);
}

function isAKMfer(char){
    const uniqueCharsSet = new Set(uniqueChars2);
    return uniqueCharsSet.has(char);
}

function isDigitChunk(chunk){
    let digitChcker = true;
    let base = '012345678';
    for (var i = chunk.length - 1; i >= 0; i--) {
         if(base.includes(chunk[i])){
         }else{
            digitChcker = false;
            break;
         }
     } 
     return digitChcker;
}

function getMaxChunkCount(chunk, bestChunks) {
    let maxCount = 0;
    let startIndex = bestChunks.indexOf(chunk);
    if (startIndex === -1) {
        return maxCount;
    }
    for (let i = startIndex; i < bestChunks.length; i++) {
        if (bestChunks[i] === chunk) {
            maxCount += 1;
        } else {
            break; 
        }
    }
    return maxCount;
}


function getUniqueModulusChar(word, charArray, modLength) {
    if (word.length !== modLength) {
        throw new Error(`Input word must be exactly ${modLength} characters long`);
    }
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let base = alphabet.length;    
    let calculatedIndex = 0;

    for (var i = 1; i<= modLength; i++) {
        if(i != modLength){
            calculatedIndex += (alphabet.length ** (modLength-i)) * (alphabet.indexOf(word[i-1]))
        }else{
            calculatedIndex += alphabet.indexOf(word[i-1]) +1;
        }

    }
    let uniqueIndex = calculatedIndex;
    if (uniqueIndex >= 0 && uniqueIndex <= charArray.length) {
        return charArray[uniqueIndex]; 
    } else {
        console.log('Error index out of boundary', calculatedIndex);
        throw new Error("Unique index is out of bounds of the character array");
    }
}

function hasDuplicates(uniqueChars) {
    for (var i = 0; i < uniqueChars.length; i++) {
        for (var j = i + 1; j < uniqueChars.length; j++) {
            if (uniqueChars[i] === uniqueChars[j]) {
                return true; // Found a duplicate
            }
        }
    }
    return false;
}


function checkIntersection() {
    let set1 = new Set(uniqueChars); 
    let set2 = new Set(uniqueChars2);
    let set3 = new Set(uniqueChars3);
    let smallestSet = set1.size <= set2.size && set1.size <= set3.size ? set1 :
                      set2.size <= set1.size && set2.size <= set3.size ? set2 : set3;

    for (let char of smallestSet) {
        if (set1.has(char) && set2.has(char) && set3.has(char)) {
            return false; 
        }
    }

    return true;  
}


function setMainUniquebaseCharMapping(modulus, alphabetBase)  {
    let chineseChars = [];
    let base = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
    const start = 0x4E00; 
    const end = 0x9FFF;   
    let permutationLimit = base.length ** modulus;
    let chineseLimit = Math.min(permutationLimit, end - start + 1); 
    let counter = 0;
    for (let i = start; i <= end; i++) {
        if (counter >= chineseLimit) {
            break;
        } else {
            chineseChars.push(String.fromCharCode(i));
            let permStringInverse = getModCharInverse(counter, modulus, base); 
            uniqueCharsInverse.push(permStringInverse);
            counter += 1;
        }
    }
    return chineseChars;
}

function setUniqueDigitCharsMapping(modulus,baseLength) {
    let emojiChars = [];
    let limit = baseLength ** modulus;
    // Unicode ranges for emojis (expanding to include more)
    const emojiRanges = [
        [0x1F600, 0x1F64F],  // Emoticons (e.g., 😀 to 🙏)
        [0x1F680, 0x1F6FF],  // Transport & map symbols (e.g., 🚀 to 🛀)
        [0x1F900, 0x1F9FF],  // Supplemental symbols and pictographs (e.g., 🤐 to 🤿)
        [0x1F300, 0x1F5FF],  // Miscellaneous Symbols and Pictographs (e.g., 🌀 to 🗿)
        [0x1F700, 0x1F77F],  // Alchemical symbols (e.g., 🜀 to 🝿)
        [0x2600, 0x26FF],    // Miscellaneous symbols (e.g., ☀️ to ⛿)
        [0x2700, 0x27BF],    // Dingbats (e.g., ✂️ to ➿)
        [0x1FA70, 0x1FAFF],  // Symbols and pictographs extended-A (e.g., 🪀 to 🪶)
    ];
    let totalAvailableEmojis = 0;
    for (let [start, end] of emojiRanges) {
        totalAvailableEmojis += (end - start + 1);
    }
    if (limit > totalAvailableEmojis) {
        throw new Error(`Symbol limit of ${limit} exceeds the available range of ${totalAvailableEmojis} emojis.`);
    }
    var counter = 0;

    for (let [start, end] of emojiRanges) {
        for (let i = start; i <= end && counter < limit; i++) {
            emojiChars.push(String.fromCodePoint(i));
            counter++;
        }
        if (counter >= limit) break;
    }
    return emojiChars;
}

function getUniquePermutationSymbol(word, khmerChars, modulus) {
    let calculatedIndex = 0;
    let base = '01';
    if (word.length !== modulus) {
        throw new Error(`Word must be exactly ${modulus} characters long.`);
    }
    let permutation = []; 
    const baseLength = 2;
    for(const char of word){
        if(char === char.toUpperCase()){
            permutation.push(1);
        }else{
            permutation.push(0);
        }
    }


    for (let k = 0; k < permutation.length; k++) {
        let digit = permutation[k];
        let indexOfDigitInBase = base.indexOf(digit) + 1;
        //console.log('index in  base', indexOfDigitInBase);
        calculatedIndex += (baseLength ** (modulus - k - 1)) * (digit); 
    }

    //console.log('permutation', permutation);
    //console.log('index of permutation symbol using formula', calculatedIndex); // here we can also 

    return khmerChars[calculatedIndex];  

    
}

function getUniqueDigitModulusCharSymbol(digitChunk, charArray, modLength) {
    if (digitChunk.length !== modLength) {
        throw new Error(`Input word must be exactly ${modLength} characters long`);
    }
    const alphabet = "0123456789";
    let base = alphabet.length;    
    let calculatedIndex = 0;
    for (var i = 1; i<= modLength; i++) {
        if(i != modLength){
            calculatedIndex += (alphabet.length ** (modLength-i)) * (alphabet.indexOf(digitChunk[i-1]))
        }else{
            calculatedIndex += alphabet.indexOf(digitChunk[i-1]) +1;
        }

    }
    let uniqueIndex = calculatedIndex;
    if (uniqueIndex >= 0 && uniqueIndex <= charArray.length) {
        return charArray[uniqueIndex]; 
    } else {
        console.log('Error index out of boundary', calculatedIndex);
        throw new Error("Unique index is out of bounds of the character array");
    }
}

function performOwlphaLoop(encryptedString) {
    let result = '';
    let i = 0;
    function findPattern(str, startIndex) {
        for (let patternLength = Math.floor((str.length - startIndex) / 2); patternLength >= 1; patternLength--) {
            let pattern = str.substring(startIndex, startIndex + patternLength);
            let repeatCount = 1;
            let j = startIndex + patternLength;
            while (str.substring(j, j + patternLength) === pattern) {
                repeatCount++;
                j += patternLength;
            }
            if (repeatCount > 1) {
                return { pattern, repeatCount, patternLength };
            }
        }
        return null;
    }
    while (i < encryptedString.length) {
        let patternData = findPattern(encryptedString, i);
        if (patternData) {
            let { pattern, repeatCount, patternLength } = patternData;
            let compressedLength = `[${repeatCount}$${pattern}$`.length;
            let originalLength = repeatCount * patternLength;

            if (compressedLength < originalLength) {
                result += `[${repeatCount}$${pattern}$`;
                i += repeatCount * patternLength; 
            } else {
                result += encryptedString.substring(i, i + patternLength);
                i += patternLength;
            }
        } else {
            result += encryptedString[i];
            i++;
        }
    }
    return result;
}

function reverseOwlphaLoop(encryptedString) {
    let lastDollarPosition = null;
    let intgerChunk = ''; 
    let intermediateString = '';
    let skipMode = false; 
    for (var i = 0; i < encryptedString.length; i++) {
        let currentChunk = '';
        if (encryptedString[i] === '$') {
            skipMode = false; 
            intgerChunk = '';
            if (lastDollarPosition) {
                for (var k = i - 1; k >= lastDollarPosition; k--) {
                    if (encryptedString[k] === '[') {
                        break;
                    } else {
                        intgerChunk = encryptedString[k] + intgerChunk;
                    }
                }               
            } else {
                for (var k = i - 1; k >= 0; k--) {
                    if (encryptedString[k] === '[') {
                        break;
                    } else {
                        intgerChunk = encryptedString[k] + intgerChunk; 
                    }
                }
            }
            let chunk = '';
            for (var l = i + 1; l < encryptedString.length; l++) {
                if (encryptedString[l] === '$') {
                    lastDollarPosition = l;
                    break;
                } else {
                    chunk += encryptedString[l];
                }
            }
            let loopLength = parseInt(intgerChunk);
            if (!isNaN(loopLength)) {
                for (var q = 0; q < loopLength; q++) {
                    currentChunk += chunk;
                }
                intermediateString += currentChunk;
            }
            let difference = lastDollarPosition - i;
            i += difference;
        } else if (encryptedString[i] === '[') {
            skipMode = true; 
        } else if (!skipMode) {
            intermediateString += encryptedString[i];
        }
    }
    return intermediateString;
}

function getBarNumberAttachment(i, encryptedString){
    let repeatCount = '';
    for (let j = i - 1; j >= 0; j--) {
        const previousChar = encryptedString[j];
        if (!isNaN(previousChar)) {
            repeatCount = previousChar + repeatCount;
        } else {
            break;
        }
    }   
    return repeatCount;
}

function separateIntoBestChunk(base64String, chunkLength) {
    const chunks = [];
    let buffer = "";
    let i = 0;
    const pushBuffer = () => {
        if (buffer.length) {
            chunks.push(buffer);
            buffer = ""; 
        }
    };
    const charType = (char) => {
        if (/[A-Z]/.test(char)) return 'upper';
        if (/[a-z]/.test(char)) return 'lower';
        if (/[0-9]/.test(char)) return 'number';
        return 'other';
    };

    while (i < base64String.length) {
        let char = base64String[i];
        let type = charType(char);

        if (type === 'upper' || type === 'lower') {
            let letterChunk = "";
            while (i < base64String.length && /[A-Za-z]/.test(base64String[i]) && letterChunk.length < chunkLength) {
                letterChunk += base64String[i];
                i++;
            }
            if (letterChunk.length === 3 || i === base64String.length || charType(base64String[i]) !== 'number') {
                chunks.push(letterChunk);
            } else {
                chunks.push(letterChunk.slice(0, 3)); 
                buffer = letterChunk.slice(3); 
            }
        } else if (type === 'number') {
            let numChunk = "";
            while (i < base64String.length && charType(base64String[i]) === 'number' && numChunk.length < chunkLength) {
                numChunk += base64String[i];
                i++;
            }
            chunks.push(numChunk);
        } else {
            pushBuffer();
            chunks.push(char);
            i++;
        }
    }
    pushBuffer();
    return chunks;
}

function setUniquePermutationMapping(modulus) {
    let khmerChars = [];  
    let base = "01";
    const start = 0x1780; 
    const end = 0x17FF;   
    let permutationLimit = base.length ** modulus - 2; 
    let khmfersLimit = 48; 
    if (permutationLimit > khmfersLimit) {
        console.warn(`Capping permutation limit to khmfersLimit (${khmfersLimit})`);
        permutationLimit = khmfersLimit; 
    }

    var counter = 1;     
    for (let i = start; i <= end; i++) {
        if (counter >= permutationLimit+1) {
            break;
        } else {
            khmerChars.push(String.fromCharCode(i));
            let permStringInverse = getModCharInverse(counter, modulus, base); 
            uniqueChars2Inverse.push(permStringInverse);
            counter += 1;
        }
    }
    
    return khmerChars;
}

function mapCharsToTransformedWord(chineseChar, khmerChar) {
    let indexOfChineseChar = uniqueChars.indexOf(chineseChar)-1;
    const reverseChinaChunk = uniqueCharsInverse[indexOfChineseChar];
    let caseValues = []; 
    let transformedWord = '';
    if (!reverseChinaChunk) {
        throw new Error("Chinese character not found in reverse mapping.");
    }
    if (typeof reverseChinaChunk !== 'string') {
        throw new Error("Retrieved value is not a string.");
    }
    const khmerIndex = uniqueChars2.indexOf(khmerChar)-1;

    if (khmerIndex === -1) {
        throw new Error("permutation character not found in array.");
    }

    let stringPerm = uniqueChars2Inverse[khmerIndex];
    for(var i = 0; i< stringPerm.length; i++ ){
        caseValues.push(parseInt(stringPerm[i]));
    }

    for(var i = 0; i<reverseChinaChunk.length; i++){
        let char = reverseChinaChunk[i];
        if(caseValues[i] == 0){
            transformedWord+= char.toLowerCase();
        }else{
           transformedWord+= char.toUpperCase();
        }
    }
    return transformedWord;
}


function BursonBase64Encrypted(base64String, modulus) {
    base64String = base64String.replace(/^data:image\/[a-z]+;base64,/, '').replace(/ /g, "");
    let bestChunks = separateIntoBestChunk(base64String, modulus);
    console.log('Calling burson compressor with the string', base64String);
    console.log('Image length before compression applied', base64String.length);
    console.log('encryption using chunks', bestChunks);
    console.log('best chunks length (how many loops inside compressor):', bestChunks.length);
    
    let encryptedString = '';
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let processedIndices = new Set(); 
    
    for (let i = 0; i < bestChunks.length; i++) {
        if (processedIndices.has(i)) continue;
        
        const chunk = bestChunks[i];
        let maxCount = getMaxChunkCount(chunk, bestChunks);
        let frontEncryption = chunk; 
        
        let isUpperCase = chunk === chunk.toUpperCase();
        let isLowerCase = chunk === chunk.toLowerCase();
        let isEnglishChunk = [...chunk].every(char => alphabet.includes(char));
        let isStringDigits = isDigitChunk(chunk);
        
        if (maxCount > 1 && chunk.length === modulus) {
            let uniqueSymbol;
            if (isUpperCase && isEnglishChunk) {
                uniqueSymbol = getUniqueModulusChar(chunk.toUpperCase(), uniqueChars, modulus);
                frontEncryption = `~${maxCount}|${uniqueSymbol}`;
            } else if (isLowerCase && isEnglishChunk) {
                uniqueSymbol = getUniqueModulusChar(chunk.toUpperCase(), uniqueChars, modulus);
                frontEncryption = `~${maxCount}|${uniqueSymbol}^`;
            } else if (!isUpperCase && !isLowerCase && isEnglishChunk) {
                let mainBaseSymbol = getUniqueModulusChar(chunk.toUpperCase(), uniqueChars, modulus);
                uniqueSymbol = getUniquePermutationSymbol(chunk, uniqueChars2, modulus);
                frontEncryption = `~${maxCount}|${mainBaseSymbol}${uniqueSymbol}`;
            } else if (isStringDigits) {
                uniqueSymbol = getUniqueDigitModulusCharSymbol(chunk, uniqueChars3, modulus);
                frontEncryption = `~${maxCount}|${uniqueSymbol}`;
            } else {
                frontEncryption = `~${maxCount}|${chunk}`;
            }
        } else if (chunk.includes('+') || chunk.includes('/') || chunk.includes('=')) {
            frontEncryption = chunk.repeat(maxCount);
        } else if (maxCount === 1 && chunk.length === modulus) {
            let uniqueSymbol;
            if (isUpperCase && isEnglishChunk) {
                uniqueSymbol = getUniqueModulusChar(chunk.toUpperCase(), uniqueChars, modulus);
                frontEncryption = uniqueSymbol;
            } else if (isLowerCase && isEnglishChunk) {
                uniqueSymbol = getUniqueModulusChar(chunk.toUpperCase(), uniqueChars, modulus);
                frontEncryption = `${uniqueSymbol}^`;
            } else if (!isUpperCase && !isLowerCase && isEnglishChunk) {
                let permutationFrontEncryption = getUniqueModulusChar(chunk.toUpperCase(), uniqueChars, modulus);
                uniqueSymbol = getUniquePermutationSymbol(chunk, uniqueChars2, modulus);
                frontEncryption = `${permutationFrontEncryption}${uniqueSymbol}`;
            } else if (isStringDigits) {
                uniqueSymbol = getUniqueDigitModulusCharSymbol(chunk, uniqueChars3, modulus);
                frontEncryption = uniqueSymbol;
            }
        }
        encryptedString += frontEncryption;
        
        for (let j = 1; j < maxCount; j++) {
            if (i + j < bestChunks.length) {
                processedIndices.add(i + j);
            }
        }
    }
    
    console.log('Image length before Owlphaloop', encryptedString.length);
    let owlphaString = performOwlphaLoop(encryptedString);
    console.log('Image length after owl compression', owlphaString.length);
    console.log('Image representation after Owlphaloop', owlphaString);
    return owlphaString;
}

function BursonBase64Decrypt(encryptedString, modulus) {
    let decryptedString = ''; 
    let alphabet = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    let encryptedLength = Array.from(encryptedString).length;
    console.log('Image to decrypt:', encryptedString);
    encryptedString = reverseOwlphaLoop(encryptedString);
    console.log('image after reversing Owlphaloop', encryptedString);
    encryptedString = Array.from(encryptedString); 
    let encryptedLengthOwl = Array.from(encryptedString).length;
    for (let i = 0; i < encryptedLengthOwl; i++) {
        const char = encryptedString[i];
        if (char === '|') {
            let repeatCount = getBarNumberAttachment(i, encryptedString);
            if (repeatCount === undefined || isNaN(parseInt(repeatCount))) {
                console.log(`Invalid repeatCount extracted: ${repeatCount}, defaulting to 1`);
                repeatCount = 1;
            }
            const repeatCountNumber = parseInt(repeatCount);
            let nextChar = encryptedString[i + 1]; 
            let decryptedKMFERString = '';
            let newString = '';
            
            if (isInMainBase(nextChar) && !isbaseDigit(nextChar)) {
                if (i + 2 < encryptedString.length) {
                    const getKmferChar = encryptedString[i + 2]; 
                    if (isAKMfer(getKmferChar)) {
                        decryptedKMFERString = mapCharsToTransformedWord(nextChar, getKmferChar);
                        i += 2;  
                    }else if(getKmferChar === '^'){
                        let index = uniqueChars.indexOf(nextChar) - 1;
                        let modCharInverse = uniqueCharsInverse[index];
                        decryptedKMFERString += modCharInverse.toLowerCase();
                        i+=1;
                    } else {
                        let index = uniqueChars.indexOf(nextChar) - 1;
                        let modCharInverse = uniqueCharsInverse[index];
                        decryptedKMFERString += modCharInverse;
                        i += 1;  
                    }
                } else {
                    let index = uniqueChars.indexOf(nextChar) - 1;
                    let modCharInverse = uniqueCharsInverse[index];
                    decryptedKMFERString += modCharInverse;
                }
            } else if (isbaseDigit(nextChar) && !isInMainBase(nextChar)) {
                let jpanIntegerString = uniqueChars3.indexOf(nextChar); 
                decryptedKMFERString += jpanIntegerString;
                
            }
            
            for (let k = 0; k < repeatCountNumber; k++) {
                newString += decryptedKMFERString;
            }
            decryptedString += newString; 
        }else if (!isbaseDigit(char) && isInMainBase(char)) { 
            let decryptedKMFERString = '';
            let index = uniqueChars.indexOf(char) -1;
            let modCharInverse = uniqueCharsInverse[index];

            if (i < encryptedString.length) {
                let nextChar = encryptedString[i+1];
                if (isAKMfer(nextChar)) {
                    decryptedKMFERString += mapCharsToTransformedWord(char, nextChar);
                    i += 1;
                }else if (nextChar === '^') {
                    decryptedKMFERString += modCharInverse.toLowerCase();
                    i += 1;
                } else {
                    decryptedKMFERString += modCharInverse;
                }
            } else{
                decryptedKMFERString += modCharInverse;
            }

            decryptedString += decryptedKMFERString;
        }else if (isbaseDigit(char) && !isInMainBase(char)) { 
            let index = uniqueChars3.indexOf(char)-1;
            decryptedString += index;
        }else if (parseInt(char)) {
            let integerChunk = '';
            let streamLine = 0;
            let pattern = false;

            for (var k = i+1; k < encryptedLengthOwl; k++) {
                if(parseInt(encryptedString[k])){ 
                    integerChunk += encryptedString[k];
                    streamLine += 1;
                    pattern = true;
                }else if(encryptedString[k] === "|"){
                    streamLine+=1;
                    pattern = true;
                    break;
                }else{
                    break;
                }
            }
            if(!pattern){
            }else{
                decryptedString+= integerChunk;
            }
        }else if(char === '~' || char === '^'){
        }else{
            decryptedString+= char;
        }
    }
    return decryptedString;
}

module.exports = {
    BursonBase64Decrypt,
    BursonBase64Encrypted,
    setMainUniquebaseCharMapping,
    setUniquePermutationMapping,
    setUniqueDigitCharsMapping,
    hasDuplicates,
    checkIntersection
};
