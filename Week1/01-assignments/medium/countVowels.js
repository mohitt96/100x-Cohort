/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    // Your code here
    const vowelArray = ['a', 'e', 'i', 'o', 'u'];
    let countVowel = 0;

    for(const char of str) {
      if(vowelArray.includes(char.toLowerCase())) {
        countVowel++;
      }
    }

    return countVowel;
}

module.exports = countVowels;