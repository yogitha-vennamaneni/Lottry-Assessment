function generateUniqueRandomNumber(generatedNumbers: number[], maxNumber: number): number {
    let randomNumber: number;
  
    do {
      randomNumber = Math.floor(Math.random() * maxNumber) + 1;
    } while (generatedNumbers.includes(randomNumber));
        
    return randomNumber;
}

export default generateUniqueRandomNumber;