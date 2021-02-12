function loop(num) {
    console.log(num)
    if (num > 0) {
        loop(num - 1)
    }
    console.log(`this where loop function with value of num ${num} going to be finished`)
}
loop(2)