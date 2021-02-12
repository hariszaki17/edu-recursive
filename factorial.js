function faktorial(n) {
    if (n === 0) return 1
    return n * faktorial(n-1)
}

let result = faktorial(5)
console.log(result)