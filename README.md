

# Regular-Expression

## 正则表达式

#### 1.量词元字符

```javascript
* 零到多次
+ 一到多次
? 零次或者一次
{n} 出现n次
{n,} 出现n到多次
{n,m} 出现n到m次
```



#### 2.特殊元字符：单个或者组合在一起代表特殊的含义

```javascript
\ 转义字符 (普通=>特殊=>普通)

. 除了\n(换行符)以外的任意字符

^ 以哪一个元字符作为开始

$ 以哪一个元字符作为结束

\n 换行符

\d 0~9 之间的一个数字

\D 非0~9之间的一个数字 (大写的意思是相反的)

\w 数字、字母、下划线中的任意一个字符

\s 一个空白字符 (包括空格、制表符、换页符等)

\t 一个制表符 (一个 TAB 键 四个空格)

\b 匹配一个单词的边界

x|y x或者y中的一个字符

[xyz] x或者y或者z中的任意一个字符

[^xy] 除去 x/y 以外的任意字符

[a-z] 指 a-z 这个范围内的任意字符 [0-9a-zA-Z] === \w

[^a-z] 上一个的取反

() 正则中的分组符号

(?:) 只匹配不捕获

(?=) 正向预查
 
(?!) 负向预查

```



#### 3.普通元字符：代表本身含义

```javascript
/webken/ 正则匹配的就是  webken
```



#### 4.修饰符  "img"

```javascript
i => ignoreCase  忽略单词大小写匹配

m => multiline  可以进行多行匹配

g => global  全局匹配
```



### 常用正则表达式

------



#### 1.验证是否是有效数字

```javascript
/*
 * 规则分析
 * 1.可能出现 + - 号，也可能不出现  [+-]?
 * 2.一位0-9都可，多位首位不能是0  (\d|([1-9]\d+))
 * 3.小数部分可能没有，一旦有后面必须有小数点+数字  (\.\d+)?
 */

let reg = /^[+-]?(\d|([1-9]\d+))(\.\d+)?$/;
```

#### 2.验证密码

```javascript
//=>数字、字母、下划线  /w
//=> 6~16位  {6,16}

let pwd="password_123",
    reg = /^/w{6,16}$/;
reg.test(pwd)
```

#### 3.验证真实姓名

```javascript
/*
 * 1.汉字  /^[\U4E00-\U9FA5]/  (全部汉字)
 * 2.名字长度 2~10位  [\U4E00-\u9FA5]{2,10}
 * 3.可能有译名·汉字  (·[\U4E00-\u9FA5]{2,10}){0,}
 */
let reg = /^[\U4E00-\u9FA5]{2,10}(·[\U4E00-\u9FA5]{2,10}){0,}$/;

"尼古拉斯·赵四"

```

#### 4.验证邮箱的 => 分析

```javascript
let reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-|\+)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
/*
 * => w+((-\w+)|(\.\w+))*
 * 1.开头是数字字母下划线(1到多位)
 * 2.还可以是 - 数字、字母、下划线  或者  . 数字、字母、下划线，整体零到多次
 * ** 邮箱的名字由“数字、字母、下划线、-、.”几部分组成，但是-/.不能连续出现也不能为开始
 
 * => @[a-zA-Z0-9]+
 * 1.@后面紧跟着：数组、字母、下划线(1-多位)
 
 * => ((\.|-)[A-Za-z0-9]+)*
 * 1.对@后面名字的补充
 * 多域名 .com.cn
 * 企业邮箱 @webken-web-study.com
 
 * => \.[A-Za-z0-9]+
 * 1. @xxx.com / @xxx.cn 这个是匹配的最后的域名  (.com/.cn/.org/.edu/.net/.vip...)
 */
```

#### 5.身份证号码

```javascript
/*
 * 1.一共18位
 * 2.最后一位可能是 X
 *
 * 身份证前六位：省市县 411421
 * 中间8位：是年月日
 * 最后四位
 *   最后一位 => X或者数字
 *   倒数第二位 => 偶数 女  奇数 男
 *   其余的是经过算法算出来的
 */

 //let reg = /^\d{17}(\d|X)$/;
//=> 小括号分组的第二个作用：分组捕获，不仅可以把大正则匹配的信息捕获到，还可以单独捕获到每个小分组的内容
  var reg = /^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(\d|X)$/
  reg.exec('411421199512107218') //=>["411421199512107218", "411421", "1995", "12", "10", "1", "8"]  捕获结果是数组，包含每一个小分组单独获取的内容

```

### 正则两种创建方式的区别

------



```javascript
//=>构造函数因为传递的是字符串，\需要传递两个才代表斜杠
let reg = /\d+/g;
reg = new RegExp("\\d+","g");

//=>正则表达式中的部分内容是变量存储的值
// 1.两个斜杠中间包起来的都是元字符（如果正则中药包含某个变量的值，则不能使用变量形式创建）
let type = "webken";
reg = /^@"+type+"@$/;
console.log(reg.test("@webken@")); //=>false
console.log(reg.test('@"""typeeee"@')); //=>true
//2.这种情况只能使用构造函数方式（因为它传递的规则是字符串，只有这样才能进行字符串拼接）
reg = new RegExp("@"+type+"@$");
console.log(reg.test("@webken@"))

```

### 正则的捕获

------

> 实现正则捕获的办法
>
> * 正则RegExp.prototype的方法
>   * exec
>   * test
>
> * 字符串String.prototype上支持正则表达式处理的方法
>   * replace
>   * match
>   * splite
>   * .......

```javascript
let str = 'webken2019yangfan2020qihang2021';
let reg = /\d+/;
/*
 * 基于exec实现正则的捕获
 *   1.捕获到的记过是null或者一个数组
 *     第一项：本次捕获到的内容
 *     其余项：对应小分组本次单独捕获的内容
 *     index：当前捕获内容在字符串中的其实索引
 *     input：原始字符串
 *   2.每执行一次exec，只能捕获到一个符合正则规则的，但是默认情况下，我们执行一百遍，获取的结果永远都是第一个匹配德奥的，其余的捕获不到
 *    =>"正则捕获的懒惰性"：默认只捕获第一次
 */
console.log(reg.exec(str));//["2019", index: 6, input: "webken2019yangfan2020qihang2021"]
/*
let reg = /^\d+$/;
=>实现正则捕获的前提是：当前正则要和字符串匹配，如果不匹配捕获的结果是null
console.log(reg.test(str));//=>false
console.log(reg.exec(str));//=>null
*/
```

#### 懒惰性的解决办法

```javascript
 //   let str = "webken2019yangfan2020qihang2021";

      /**
       * reg.lastIndex: 当前正则下一次匹配的起始索引位置
       * 懒惰性的原因：默认情况下lastIndex的值不会被修改，
       * 每一次都是从字符串开始位置查找，所以找的永远都是第一个
       * 解决办法：全局修饰符g
       */
      //    let reg = /\d+/
      //   console.log(reg.lastIndex); //=>0
      //   console.log(reg.exec(str));
      //   console.log(reg.lastIndex); //=>0 第一次捕获完，lastIndex 值不会改变

      //设置全局修饰符后lastIndex更新
      //   let reg = /\d+/g;

      //   console.log(reg.lastIndex); //=>0
      //   console.log(reg.exec(str)); //[2019]
      //   console.log(reg.lastIndex); //=>10 第一次捕获完，lastIndex 改变为10
      //   console.log(reg.exec(str)); //[2020]
      //   console.log(reg.exec(str)); //[2021]
      //   console.log(reg.exec(str)); //null 当全部捕获后，再次捕获的时候为null，但是lastIndex又回归了初始值零

      //   let reg = /\d+/g;
      //   if (res.test(str)) {
      //     //=>验证一下：只有正则和字符串匹配我们再捕获
      //     console.log(reg.lastIndex); //=>10  lastIndex再test时候已经被修改了，下次捕获不会重头修改了
      //     console.log(reg.exec(str)); //[2020]
      //   }

      //=>需求：编写一个方法exxecAll ，执行一次可以把所有匹配的结果捕获到（前提正则一定要设置全局匹配g）
      ~(function() {
        function execAll(str = "") {
          //=>str：需要匹配的字符串
          //=>this.RegExp 的实例（当前操作的正则）
          //=>进来后的第一件事，验证正则是否设置g，不设置不能循环捕获
          if (!this.global) return this.exec(str);
          //ary 存储所有捕获到的信息   REs 存储每次捕获的内容
          let ary = [],
            res = this.exec(str);
          while (res) {
            //把每次捕获的内容res[0]存放到数组中
            ary.push(res[0]);
            //只要捕获的内容部位NULL，则继续捕获下去
            res = this.exec(str);
          }
          return ary.length === 0 ? null : ary;
        }
        RegExp.prototype.execAll = execAll;
      })();
      let reg = /\d+/g;
      console.log(reg.execAll("webken2019yangfan2020qihang2021"));
      //=>字符串中的MATCH方法，可以在执行一次的情况下，捕获到所有匹的数据（前提：正则也得设置g）
      console.log("webken2019yangfan2020qihang2021".match(reg));
```

#### 正则的分组捕获

```javascript
//=>身份证号码 (?:)只匹配不捕获
let str = '411421199309153650';
let reg = /^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(?:\d|X)$/;
console.log(reg.exec(str));
console.log(str.match(reg));
//['411421199309153650','411421','1993','09','15','5','0',index: 0]
//=>第一项：大正则匹配的结果
//=>其余项：每一个小分组单独匹配捕获的结果
//=>如果设置了分组（改变优先级），但是捕获的时候不需要单独捕获，可以基于?:（只匹配不捕获）来处理
```

```javascript
//=>即要捕获到{数字}，也想单独的把数字也捕获到，例如：第一次找到{0}还需要单独获取0
let str = "{0}年{1}月{2}日";
//=>不设置g只匹配一次，exec和match获取的结果一直（即有大正则匹配的信息，也有小分组匹配的信息）
let reg = /\{\d+\}/;
console.log(reg.exec(str));
console.log(str.match(reg));
//["{0}",0,...]
let reg = /\{\d+\}/g;
console.log(str.match(reg));//=>["{0}","{1}","{2}"]多次匹配match只能匹配大正则匹配的内容获取到，小分组匹配的信息无法获取
let aryBig = [],
    arySmall = [],
    res = reg.exec(str);
wile(reg){
    let [big,small] = res;
    aryBig.push(big);
    arySmall.push(small);
    res = reg.exec(str);
}
console.log(aryBig);//=>["{0}","{1}","{2}"]
console.log(arySmall);//=>["0","1","2"]
```

```javascript
//=>分组的第三个作用：“分组引用”
let str = "book";//=> good look moon foot
let reg = /^[a-zA-Z]([a-zA-Z])\1[a-zA-Z]$/;//=>分组引用就是通过"\数字"让其代表和对应分组出现一摸一样的内容；
console.log(reg.test('book'));//true
console.log(reg.test('good'));//true
console.log(reg.test("some"));//false
```

#### 正则捕获的贪婪性

```javascript
let str = "ken2019@2020study";
//=>正则捕获的贪婪性：默认情况下，正则捕获的时候，是按照当前正则所匹配的最长结果来获取的
let reg = /\d+/g;
console.log(str.match(reg));//=>["2019","2020"]

let str = "ken2019@2020study";
let reg = /\d+?/g;
console.log(str.match(reg));//=> ["2", "0", "1", "9", "2", "0", "2", "0"]
```

#### 问好在正则中的5大作用：

* 问好左边是非量词元字符：本身代表量词元字符，出现零到一次
* 问好左边是量词元字符：取消捕获时候的贪婪性
* (?:)值匹配不捕获
* (?=)正向预查
* (?!)负向预查

#### 其他正则捕获的方法

1. ##### test也能捕获（本意匹配）

```javascript
let str = "{0}年{1}月{2}日";
let reg = /\{(\d+)\}/g;
console.log(reg.test(str));//=>true
console.log(RegExp.$1);//=>0

console.log(reg.test(str));//=>true
console.log(RegExp.$1);//=>1

console.log(reg.test(str));//=>true
console.log(RegExp.$1);//=>2

console.log(reg.test(str));//=>false
console.log(RegExp.$1);//=>2 存储的是上一次捕获的结果

//=>RegExp.$1~RegExp.$9：获取当前本次正则匹配后，第一道第九组的信息（真实项目使用少）
```

2. ##### replace 字符串中实现替换的方法 （一般都是伴随正则一起使用的）

```javascript
let str = "ken@2019|ken@2020";
//=>把字符串ken 全部替换成 前端
//1.不用正则，执行一次只替换一次
str = str.replace("ken","前端").replace("ken","前端");

//使用正则  要加 g
str.replac(/ken/g,"前端");
```

```javascript
let str = "ken@2019|ken@2020";
//=>把字符串ken 全部替换成 kenStudy
//1.不用正则，实现不了
str = str.replace("ken","kenStudy").replace("ken","kenStudy");

//使用正则  可以完美实现   要加 g
str.replac(/ken/g,"kenStudy");
```

##### 案例：把时间字符串进行处理

```javascript
let time = "2019-10-31";
//=>变成“2019年10月23日”
let reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
time.replace(reg,"$1年$2月$3日");
```

##### 单词首字母大写

```javascript
let str = "good good study, day day up!";
let reg = /\b([a-zA-Z])[a-zA-Z]*\b/g;
//=>函数执行了六次，每次都把正则匹配信息传递给函数
//=>每一次ARG：["good","g"] ["good","g"] ["study","s"]...
str = str.replace(reg,(...arg)=>{
    let [content,$1] = arg;
    $1 = $1.toUpperCase();
    content = content.substring(1);
    return $1 + content;
});
console.log(str);//Good Good Study, Day Day Up!
```

##### 验证一个字符串中哪个字母出现的次数最多，多少次

```javascript
let str = "webkensstudyRegularExpression",
    max=0,
    res=[],
    flag = false;
str = str.split('').sort((a,b)=>a.localeCompare(b)).join('');
//str = "abdeeeeEgiklnnoprrRssstuuwxy"
for (let i = str.length;i > 0;i--){
    let reg = new RegExp("([a-zA-Z])\\1{" + (i-1) + "}","g");
    str.replace(reg,(content,$1)=>{
        res.push($1);
        max = i;
        flag = true;
    })
    if(flag) break;
}
console.log(max,res)//4 ["e"]
```

