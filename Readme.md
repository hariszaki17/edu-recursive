## Table of Content
1. [Recalling function](#recalling-function)
1. [What is recursive?](#what-is-recursive)
1. [What makes recursive work?](#what-makes-recursive-work )
1. [What if we put return on recursive function?](#what-if-we-put-return-on-recursive-function)
1. [The Biggest Question of why we need this?](#the-biggest-question-of-why-we-need-this)
1. [References](#references)

## Recalling function
Sebelum masuk ke pembahasan inti idealnya kita membahas kembali materi terkait fungi pada javascript karena recursive tidak mungkin bisa digunakan jika kita tidak menggunakan fungsi.

Jika kita mengacu pada model umum yang digunakan di dunia IT yaitu IPO(input-process-output) dimana kita dapat memberikan input data pada program, lalu program memperoses dan akhirnya mengeluarkan output data, maka function menjadi bentuk implementasi paling nyata yang bisa kita langsung temui.

<img src="https://chbe241.github.io/_images/Input-Output_Diagrams1.jpg"/>

Kita bisa telaah lebih lanjut kenapa function bisa menjadi representasi dari model IPO ini. Let's take a look for the anatomy of function.

<img src="https://documents.sessions.edu/eforms/courseware/coursedocuments/javascript_for_designers/javascriptfordesigners_images/img_1l_function-anatomy.png"/>

Dapat dilihat dari gambar di atas bahwa function memiliki beberapa komponen seperti: nama fungsi, parameter, block code statement, dan return value.

Jika kita misalkan pada model IPO(input-process-output) pada masing-masing komponen mewakili langkah kerja model IPO. Contohnya adalah input diwakili oleh komponen parameter dimana ketika kita invoke(panggil fungsi) function kita memberikan data pada parameter, selanjutnya langkah proses diwakili oleh komponen block statement dimana data yang didapat dari parameter akan diolah disini dan yang terakhir adalah output yang diwakili oleh return value sebagai hasil dari proses.

Contoh pembuatan fungsi dan pemanggilannya:

```javascript
function perkalian(num1, num2) {
    let result = num1 * num2
    return result
} // deklarasi fungsi

perkalian(13, 2) // pemanggilan / penggunaan fungsi
```

## What is recursive?
Recursive atau pengulangan secara praktik adalah dimana sebuah function memanggil dirinya sendiri. Kita dapat mengimplementasi recursive secara sederhana dengan membuat sebuah loop menggunakan fungsi yang dipanggil berkali-kali tanpa memerlukan keyword loop seperti for.

Kode loop menggunakan recursive:
```javascript
function loop(num) {
    console.log(num)
    if (num > 0) {
        loop(num - 1)
    }
}
loop(2)
/* 
output
2
1
0
*/
```

Debug:
```shell
< Debugger listening on ws://127.0.0.1:9229/e3f68c51-ab24-41b3-867d-3e45b287eedd
< For help, see: https://nodejs.org/en/docs/inspector
< Debugger attached.
Break on start in loop.js:7
  5     }
  6 }
> 7 loop(2)
debug> setBreakpoint(2)
  1 function loop(num) {
> 2     console.log(num)
  3     if (num > 0) {
  4         loop(num - 1)
  5     }
  6 }
  7 loop(2)
debug> watch('num')
debug> watch('num > 0')
debug> cont
break in loop.js:2
Watchers:
  0: num = 2
  1: num > 0 = true

  1 function loop(num) {
> 2     console.log(num)
  3     if (num > 0) {
  4         loop(num - 1)
debug> cont
< 2
break in loop.js:2
Watchers:
  0: num = 1
  1: num > 0 = true

  1 function loop(num) {
> 2     console.log(num)
  3     if (num > 0) {
  4         loop(num - 1)
debug> cont
< 1
break in loop.js:2
Watchers:
  0: num = 0
  1: num > 0 = false

  1 function loop(num) {
> 2     console.log(num)
  3     if (num > 0) {
  4         loop(num - 1)
debug> cont
< 0
```
untuk melihat detail cara kerja loop diatas saya menggunakan debugger dgn memanfaatkan fitur watchers untuk monitoring kondisi dan perubahan data sehingga kita bisa melihat jelas kenapa terjadi loop serta kapan kondisi terpenuhi dan fungsi dipanggil kembali.

## What makes recursive work?
Pada kodingan sebelumnya bisa dilihat bahwa di sana terdapat kondisi if pada baris ke 3. Konidisi inilah yang biasa disebut Recursive Case dan kondisi apapun yang membuat fungsi recursive tidak dipanggil kembali disebut Base case.

Recursive function process diagram.
<img src="https://s3.ap-south-1.amazonaws.com/afteracademy-server-uploads/what-is-recursion-in-programming-countdown-be8af290e510d331.png"/>

What if we ignore this kind of stuff?
<img src="https://lh3.googleusercontent.com/rA2gwJun1elD3Dh5de9_pcyL5wYWP08zvRl_cWwYb6VCjE3owZylaOAEhrsKhMwkFR_K2vjEBMydeBBlE3hMuohMpsmFmDyeGlYoMemr1225hxRN2tsxNC3IUJUeayoJ6P0qP8K07AY"/>
Yaps, jika kita tidak membuat base case maka fungsi akan terus dipanggil terus sampai pada titik dimana program akan berhetin. Error ini dinamakan call stack exceeded, untuk lebih lanjtunya akan kita bahas di section setelah ini.

## How recursive function being called and finished?
Mungkin saat ini kita melihat belum terdapat perbadaan yang nampak dari proses eksekusi recursive function pada section sebelumnya. Disini kita akan menejelaskan lebih lanjut bagaimana recursive function dieksekusi.

Let's put the previous code and add some trinkets.
```javascript
function loop(num) {
    console.log(num)
    if (num > 0) {
        loop(num - 1)
    }
    console.log(`this where loop function with value of num ${num} going to be finished`)
}
loop(2)
```

Jika kita beranggapan bahwa perintah console.log() pada baris 6 akan langsung dieksekusi maka kita telah salah, karena output yang dihasilkan pada kodingan di atas akan seperti di bawah ini.

```shell
2
1
0
this where loop function with value of num 0 going to be finished
this where loop function with value of num 1 going to be finished
this where loop function with value of num 2 going to be finished
```

Kita lihat pada output di atas jika kita menggunakan pengulangan biasa maka block statement pada loop for akan langsung ekesekusi sampai selesai sebelum memulai iterasi selanjutnya, akan tetapi recursive berbeda.

ketika function loop dengan nilai num dipanggil dan memenuhi recursive case maka function yang dipanggil saat ini akan mengalami proses blocking, dimana akan menunggu hingga pemanggilan loop pada recursive case selesai dieksekusi. Ketika function loop dengan nilai num 1 dieksekusi dan ternyata memenuhi recursive case maka function ini juga tidak akan langsung menyelesaikan eksekusinya tapi memanggil kembali function di dalam recursive case dengan nilai num 0, begitu seterusnya hingga program mencapai base case maka function akan mengeksekusi program sampai bawah dan lalu kembali di titik dimana function itu dipanggil.

Mari kita lihat detailnya. Step 1
```javascript
{
    console.log(num) // 2
    if (num > 0) { // true
        loop(num - 1) // executed with param num = 1
    }
}
```

Step 2, memnaggil ulang loop dengan nilai 1
```javascript
{
    console.log(num) // 1
    if (num > 0) { // true
        loop(num - 1) // executed with param num = 0
    }
}
```

Step 3, memnaggil ulang loop dengan nilai 0. Dan melanjutkan eksekusi hingga akhir block statement
```javascript
{
    console.log(num) // 0
    if (num > 0) { // false
        loop(num - 1) 
    } // go to base case
    console.log(`this where loop function with value of num ${num} going to be finished`)
}
```

Step 4, Kembali ke titik dimana function loop dengan parameter 0 di eksekusi. Lalu block statement dieksekusi hingga akhir.
```javascript
{
    console.log(num) // 1
    if (num > 0) {
        loop(num - 1) // loop(0)
    }
    console.log(`this where loop function with value of num ${num} going to be finished`)
}
```

Step 5, Kembali ke titik dimana function loop dengan parameter 1 di eksekusi. Lalu block statement dieksekusi hingga akhir dan  proses recursive selesai.
``` javascript
{
    console.log(num) // 2
    if (num > 0) {
        loop(num - 1) // loop(1)
    }
    console.log(`this where loop function with value of num ${num} going to be finished`)
}
```
## What if we put return on recursive function?
Well good question! Selayaknya function pada umumnya,, recursive function tentu bisa kita buat untuk memiliki return value, bahkan iniliah yang biasa dilakukan untuk mengerjakan program-program kompleks yang loop tidak dapat lakukan. Let's jump to the code.

Kita coba ambil contoh kasus yaitu operasi faktorial pada matematika.
<img src="https://lh3.googleusercontent.com/MFtkDOj5Gt3cXlrwgEjUTQaD-vcxlVp7GwgG1lrWWS0EVBGLjmDGHGQTWKNN1MzhShmpXzYv9GWSFDhNyOlDApe2X3vH7IO4FQ92Yc40O6ta9UsKmZ_CJ3_vwR06-NVDgwBZO84V6ew"/>

Sebenarnya kasus ini hampir mirip cara kerjanya dengan loop yang sebelumnya telah dibuat hanya saja tiap function yang dieksekusi akan menghasilkan value.

Value yang dihasilkan dari tiap eksekusi function akan dikembalikan di titik dimana function itu dipanggil, sebagai contoh pada pemanggilan terakhir dari kasus diatas.

```javascript
return n * faktoiral(n-1)
// pada eksekusi terakhir akan berupa return 2 * 1
```

Dari 2 kasus, loop dan faktorial kita bisa menyimpulkan bahwa function yang dipanggil pertama kali akan selesai terakhir dari proses recursive.

Inilah mengapa terdapat batasan yaitu call stack exceeded, karena pada asalnya kita memanggil function yang tidak akan berakhir hingga pemanggilan-pemanggilan function di dalamnya selesai. Dan karena hal ini juga recursive tidak cocok jika digunakan sebagai loop dengan iterasi dengan jumlah sangat banyak sebagai, contoh:

```javascript
function loop(num) {
    console.log(num)
    if (num > 0) {
        loop(num - 1)
    }
}
loop(10000000000000000000000000000000000)
```

Maka program yang dihasilkan akan berupa error seperti ini.
```shell
RangeError: Maximum call stack size exceeded
    at formatPrimitive (internal/util/inspect.js:1337:25)
    at formatValue (internal/util/inspect.js:695:12)
    at inspect (internal/util/inspect.js:293:10)
    at formatWithOptions (internal/util/inspect.js:1949:40)
    at Object.value (internal/console/constructor.js:301:14)
    at Object.log (internal/console/constructor.js:336:61)
    at loop (/home/zakariya/Documents/education/edu-recursive/loop.js:2:13)
    at loop (/home/zakariya/Documents/education/edu-recursive/loop.js:4:9)
    at loop (/home/zakariya/Documents/education/edu-recursive/loop.js:4:9)
    at loop (/home/zakariya/Documents/education/edu-recursive/loop.js:4:9)
```

Tapi jika kita masukan function yang sama pada for loop maka hasilnya akan berbeda.
```javascript
for (let i = 0; i < 10000000000000000000000000000000000; i++) {
    console.log(i);
}
```

## The biggest question of why we need this?
Yaps, this maybe something clinging in your head while you read this article. Salah satu jawabannya adalah recursive sangat cocok untuk kasus yang mana kita dapat petakan pemecahan masalahnya dengan membentuk sebuah struktur data yang dinamakan tree. Once again yaps it's tree, jika kalian bertanya emang datanya punya akar(root)? apakah punya daun(leaf)? well all you ask is definitely true. Let's see how i could say it true.

<img src="https://www.cs.cornell.edu/courses/cs2112/2018fa/lectures/lec_trees/tree_anatomy.png"/>

This is it, bagamana data tree itu divisualisasikan. Jika kalian masih belum percaya kita coba lihat bagaimana proses fatorial digambarkan sebagai tree.

<img src="https://www.edureka.co/blog/wp-content/uploads/2019/08/2019-08-06-12_31_29-Window.png"/>

Mungkin terlihat berbeda karena jenis tree ini hanya memiliki ranting kek kanan tidak seperti contoh sebelumnya, but it's still tree.

Untuk saat ini kalian tidak perlu untuk mengetahui bagaimana memetakan kasus menjadi tree structure karena kita mempelajari recursive ini salah satunya untuk bisa dapat membuat koding dari algoritma populer seperti searching (banyak menggunakan struktur tree) dan sorting yang nanti kita akan bahas pada lecure selanjutnya.

## References

http://www.curiousart.org/electronic2/include/C_Program.pdf

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function

https://www.computerhope.com/jargon/r/recursive.htm

https://medium.com/better-programming/when-to-loop-when-to-recurse-b786ad8977de

https://press.rebus.community/programmingfundamentals/chapter/input-process-output-model/