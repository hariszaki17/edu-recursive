function loop(num) {
    console.log(num)
    if (num > 0) {
        loop(num - 1)
    }
}
loop(2)