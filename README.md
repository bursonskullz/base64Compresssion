# base64Compression

This repository implements an algorithm for compressing Base64-encoded data. The goal is to optimize storage and transmission by reducing the size of Base64 strings, which can significantly reduce production costs in various applications. The algorithm is currrently in production and is being encahnced. 

---

## Installation

### 1. Clone the Repository

Clone the repository to your local machine using the following command:

```
git clone https://github.com/your-username/base64Compression.git

```


### 2. Install JSON Packages (if needed for the project)

If required, compile the necessary JSON packages by running the following command : mpm niit -y inside the same directory where you installed the files.

## 3.  To test a base64 string edit the line "var base64TestString = `data:image/png;base64, 123456789`; // test string (edit here for results);" 

## 4. compile with compresstionTest.js and compare results 

## 5. For Industrial Application

We recommend waiting for the code to be fully fixed, but the necessary functions to run the algorithm are located in `bursonBase64Encryption.js`. The file `compressionTest.js` is an implementation of the algorithm. You must initialize the data to use the encryption, and we encourage users to create their own set of symbols in the arrays `uniqueChars`, `uniqueChars2`, and `uniqueChars3`. 

Currently, we are testing the algorithm with Chinese, Japanese, and Cambodian symbols, but we're experiencing some minor issues. Our intention is to develop unique trifold notes that we can implement into the algorithm instead of relying on a set of pre-defined symbols in Unicode. This will make the code more adaptable and secure at the same time.
