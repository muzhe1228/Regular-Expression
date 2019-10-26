/*
1、量词元字符

* 零到多次
+ 一到多次
？ 零次或者一次
{n} 出现n次
{n，} 出现n到多次
{n,m} 出现n到m次


2、特殊元字符： 单个或者组合在一起代表特殊的含义

\  转义字符 （普通->特殊->普通）

. 除了\n (换行符)以外的任意字符

^  以哪一个元字符作为开始

$  以哪一个元字符作为结束

\n 换行符

\d  0~9之间的一个数字

\D 非0~9之间的一个数字 （大小写的意思是相反的）

\w  数字、字母、下划线中的任意一个字符

\s  一个空白字符（包含空格、制表符、换页符等）

\t 一个制表符（一个 TAB 键  四个空格）

\b  匹配一个单词的边界

x|y x或者y中的一个字符 1|9|8|6

[xyz] x或者y或者z中的任意一个字符 [adgh,1235u] 其中的一个字符(,也包括)

[^xy] 除去x/y以外的任意字符

[a-z]  指a-z 这个范围内的任意字符  [0-9a-zA-Z_] === \w

[^a-z] 上一个的取反

()  正则中的分组符号

(?:) 只匹配不捕获

(?=)  正向预查

(?!)  负向预查


3、普通元字符： 代表本身含义的

/zhufeng/  正则匹配的就是  zhufeng



*/

/*
 修饰符 “img”

 i =>ignoreCase   忽略单词大小写匹配

 m => multiline   可以进行多行匹配

 g => global    全局匹配
  
/A/.test('lalala') =>false

/A/i.test('lalala') =>true



  */

//元字符详细解析

// ^ $

let reg = /^\d/;
console.log(reg.test("ken")); //=>false
console.log(reg.test("2019ken")); //=>true
console.log(reg.test("ken2019")); //=>false

let reg = /\d$/;
console.log(reg.test("ken")); //=>false
console.log(reg.test("2019ken")); //=>true
console.log(reg.test("ken2019")); //=>true

// =>^/$ 两个都不加：字符串中包含符合规则的内容即可
let reg1 = /\d+/;

//=>^/$ 两个都加：字符串只能是和规则一致的内容
let reg1 = /^\d+$/;

//举个例子：验证手机号码（11未，第一个数字是1即可）
let reg3 = /^1\d{10}$/; //(1后面加10个数字)

//转义字符    \
// . 代表的不是小数点   是除了 \n  之外的任意字符
let reg = /^2.3$/;
console.log(reg.test("2.3")); //=>true
console.log(reg.test("2@3")); //=>true
console.log(reg.test("2&3")); //=>true
console.log(reg.test("23")); //=>false

let reg1 = /^2\.3$/; //  \.转义为  只是 .
console.log(reg.test("2.3")); //=>true
console.log(reg.test("2@3")); //=>false
console.log(reg.test("2&3")); //=>false
console.log(reg.test("23")); //=>false

let str = "\\d";
let reg2 = /^\d$/; // => \d 代表特殊含义  0-9数字
reg2.test(str); //false

let reg2 = /^\\d$/; // => \d 代表特殊含义  0-9数字
reg2.test(str); //true

// x|y

let reg = /^18|29$/;

console.log(reg.test("18")); //=>true
console.log(reg.test("29")); //=>true
console.log(reg.test("129")); //=>true
console.log(reg.test("189")); //=>true
console.log(reg.test("1829")); //=>true
console.log(reg.test("829")); //=>true
console.log(reg.test("182")); //=>true

///// --- 直接x|y 会存在优先级问题，一般我们写的时候都伴随着小括号进行分组，因为小括号改变处理的优先级=>小括号：分组
let reg = /^(18|29)$/;  //只能是18或者29的其中一个

console.log(reg.test("18")); //=>true
console.log(reg.test("29")); //=>true
console.log(reg.test("129")); //=>false
console.log(reg.test("189")); //=>false
console.log(reg.test("1829")); //=>false
console.log(reg.test("829")); //=>false
console.log(reg.test("182")); //=>false
