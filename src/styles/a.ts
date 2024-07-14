// function addSpacesBetweenLetters(str) {
//   return str.split('').join(' ');
// }

// const originalString = "HelloWorld";
// const spacedString = addSpacesBetweenLetters(originalString);
// console.log(spacedString);

// originalString.replace(/(.)/g, '$1 ')


// function addSpacesBetweenLetters(str) {
//     let result = '';
//     for (let i = 0; i < str.length; i++) {
//       result += str[i] + ' ';
//     }
//     return result.trim(); // Trim the trailing space
//   }


const a = [1,2,3]
a.map(x => console.log(x));
a.map(console.log);


const multiply = (a: number, b: number) => {
    console.log(a, b);
    return a * b;
  };
  
  const stringify = (a: string, b: string) => {
    return a + b;
  };
  
  function memoize<T, K>(func: (...args: T[]) => K) {
    const cache: Record<string, K> = {};
  
    return function (...args: T[]) {
      const key = args.toString();
      cache[key] ||= func(...args);
  
      return cache[key];
    };
  }


function ipToInt(ip: string): number {
    let parts = ip.split('.').map(Number);
    return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
}

function countIpAddresses(start: string, end: string): number {
    let startInt = ipToInt(start);
    let endInt = ipToInt(end);
    return endInt - startInt;
}

console.log(countIpAddresses("10.0.0.0", "10.0.0.50")); 

  
  export const memoMult = memoize(multiply);
  export const memoStringi = memoize(stringify);
  


function a(fn) {
  const cache = {};
  return function (...args) {
  const key = json.stringify(args);
  if(!(key in cache)){
    cache[key] = fn(...args);
  }
  return cache[key];
  };
}