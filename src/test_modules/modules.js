const sum  = (a,b) => a + b;

const sumPromise = (a, b) => {
    return new Promise((resolve, reject) => {

        if(a < 0 || b < 0){
            resolve('Both numbers must be positive')
        }

        resolve(a+b) 
    })
}

module.exports = {
    sum,
    sumPromise
}