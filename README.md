# 一次性搞懂File、Blob、FileReader、ArrayBuffer、Base64

#### <img src="D:\fn-pro\assets\cf702f942b5840ada87a079d2ad090c3.png" style="zoom: 67%;" />

---

## Blob

> Blob 全称为 binary large object ，即[二进制](https://so.csdn.net/so/search?q=二进制&spm=1001.2101.3001.7020)大对象。blob对象本质上是JavaScript中的一个对象，里面可以储存大量的二进制编码格式的数据。Blob 对象一个不可修改，从Blob中读取内容的唯一方法是使用 FileReader。

###  ① 创建

> new Blob(array,options)
>
> 其有两个参数：
>
> array：由 ArrayBuffer、ArrayBufferView、Blob、DOMString 等对象构成的，将会被放进 Blob；
>
> options：它可能会指定如下两个属性: options = {type: xxx, endings: xxx}
>
> ​				  type：默认值为 ""，表示将会被放入到 blob 中的[数组](https://so.csdn.net/so/search?q=数组&spm=1001.2101.3001.7020)内容的 MIME 类型；
>
> ​				  endings：默认值为"transparent"，用于指定包含行结束符\n的字符串如何被写入，不常用。

​		

| MIME 类型     | 描述                                                         | 典型示例                                                     |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `text`        | 表明文件是普通文本，理论上是人类可读                         | `text/plain`, `text/html`, `text/css, text/javascript`       |
| `image`       | 表明是某种图像。不包括视频，但是动态图（比如动态 gif）也使用 image 类型 | `image/gif`, `image/png`, `image/jpeg`, `image/bmp`, `image/webp`, `image/x-icon`, `image/vnd.microsoft.icon` |
| `audio`       | 表明是某种音频文件                                           | `audio/midi`, `audio/mpeg, audio/webm, audio/ogg, audio/wav` |
| `video`       | 表明是某种视频文件                                           | `video/webm`, `video/ogg`                                    |
| `application` | 表明是某种二进制数据                                         | `application/octet-stream`, `application/pkcs12`, `application/vnd.mspowerpoint`, `application/xhtml+xml`, `application/xml`, `application/pdf` |

演示：

![image-20221127144022691](D:\fn-pro\assets\image-20221127144022691.png)

### ② 分片

> Blob 对象内置了 slice() 方法用来将 blob 对象分片
>
> 其有三个参数：
>
> start：设置切片的起点，即切片开始位置。默认值为 0，这意味着切片应该从第一个字节开始；
>
> end：设置切片的结束点，会对该位置之前的数据进行切片。默认值为blob.size；
>
> contentType：设置新 blob 的 MIME 类型。如果省略 type，则默认为 blob 的原始值。

演示：

![image-20221127144803136](D:\fn-pro\assets\image-20221127144803136.png)

## File

> File 对象是特殊类型的 Blob，
>
> 在 JavaScript 中，主要有两种方法来获取 File 对象：
>
> （1）<input> 元素上选择文件后返回的 FileList 对象；
>
> （2）文件拖放操作生成的 DataTransfer 对象；

### (1) input

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <input type="file" name="file" id="fileId">
    <script>
    	const fileObj = document.getElementById('fileId')
		fileObj.addEventListener('change', (e)=> {
    		console.log(e.target.files[0]);
		})
    </script>
</body>
</html>
~~~

![image-20221127150004434](D:\fn-pro\assets\image-20221127150004434.png)

### (2) 文件拖放

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .drop-area {
            width: 300px;
            height: 300px;
            border: 1px solid #f00;
        }
    </style>
</head>
<body>
    <div class="drop-area" id="dropId"></div>
    <script>
        const dropObj = document.getElementById('dropId')
        dropObj.addEventListener('drop', function(e) {
            e.preventDefault()
            const files = e.dataTransfer.files
            console.log(files);
        })
        dropObj.addEventListener('dragover', function(e) {
            e.preventDefault()
        })
    </script>
</body>
</html>
~~~

![image-20221127151208919](D:\fn-pro\assets\image-20221127151208919.png)

## FileReader

> 通过上面我都知道了blob是不可修改也是无法读取里面的内容的。无法读取里面的内容肯定是不可行的。
>
> 所以Filereader就提供了读取blob里面内容的方法

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <input type="file" name="file" id="fileId">
    <script>
    	const fileObj = document.getElementById('fileId')
		fileObj.addEventListener('change', (e)=> {
    		const reader = new FileReader()
    		reader.readAsDataURL(e.target.files[0])
    		reader.onload = function(event) {
        		console.log(event.currentTarget.result)
    		}
		})
    </script>
</body>
</html>
~~~

FileReader对象提供了以下方法来加载文件：

- [`FileReader.readAsArrayBuffer()`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsArrayBuffer)：开始读取指定的 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容，一旦完成，result 属性中保存的将是被读取文件的 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 数据对象。
- [`FileReader.readAsBinaryString()`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsBinaryString)：开始读取指定的[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容。一旦完成，`result`属性中将包含所读取文件的原始二进制数据。(**非标准:** 该特性是非标准的，请尽量不要在生产环境中使用它！)
- [`FileReader.readAsDataURL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL)：开始读取指定的[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容。一旦完成，`result`属性中将包含一个`data:` URL 格式的 Base64 字符串以表示所读取文件的内容。
- [`FileReader.readAsText()`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsText)：开始读取指定的[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)中的内容。一旦完成，`result`属性中将包含一个字符串以表示所读取的文件内容。

## ArrayBuffer

> 我们可以把它理解为特殊的数组，特殊在哪里呢？
>
> ArrayBuffer 本身就是一个黑盒，不能直接读写所存储的数据，需要借助以下视图对象来读写
>
> TypedArray只是一个概念，实际使用的是那9个对象

<img src="D:\fn-pro\assets\0063558fe53c4a0ea11f53312c4efd54.png" style="zoom:67%;" />

| 元素    | 类型化数组        | 字节 | 描述                                   |
| :------ | :---------------- | :--- | :------------------------------------- |
| Int8    | Int8Array         | 1    | 8 位有符号整型                         |
| Uint8   | Uint8Array        | 1    | 8 位无符号整型                         |
| Uint8C  | Uint8ClampedArray | 1    | 8 位无符号整型（一定在 0 到 255 之间） |
| Int16   | Int16Array        | 2    | 16 位有符号整型                        |
| UInt16  | UInt16Array       | 2    | 16 位无符号整型                        |
| Int32   | Int32Array        | 4    | 32 位有符号整型                        |
| UInt32  | UInt32Array       | 4    | 32 位无符号整型                        |
| Float32 | Float32Array      | 4    | 32 位 IEEE 浮点数                      |
| Float64 | Float64Array      | 8    | 64 位 IEEE 浮点数                      |

### Ⅰ. 创建buffer

> new ArrayBuffer(bytelength)
>
> 参数：它接受一个参数，即 bytelength，表示要创建数组缓冲区的大小（以字节为单位）

![image-20221127155108384](D:\fn-pro\assets\image-20221127155108384.png)

### Ⅱ. TypedArray读写buffer

![image-20221127155254353](D:\fn-pro\assets\image-20221127155254353.png)

### Ⅲ. DataView读写buffer

DataView实例提供了以下方法来读取内容，它们的参数都是一个字节序号，表示开始读取的字节位置：

- getInt8：读取1个字节，返回一个8位整数
- getUint8：读取1个字节，返回一个8位无符号整数
- getInt16：读取1个字节，返回一个16位整数
- getUint16：读取1个字节，返回一个16位无符号整数
- getInt32：读取1个字节，返回一个32位整数
- getUint32：读取1个字节，返回一个32位无符号整数
- getFloat32：读取1个字节，返回一个32位浮点数
- getFloat64：读取1个字节，返回一个64位浮点数

DataView实例提供了以下方法来读取内容，它们都接受两个参数，第一个参数表示开始写入数据的字节序号，第二个参数为写入的数据：

- getInt8：写入1个字节的8位整数
- getUint8：写入1个字节的8位无符号整数
- getInt16：写入2个字节的16位整数
- getUint16：写入2个字节的16位无符号整数
- getInt32：写入4个字节的32位整数
- getUint32：写入4个字节的32位无符号整数
- getFloat32：写入4个字节的32位浮点数
- getFloat64：写入8个字节的64位浮点数

![image-20221127163851874](D:\fn-pro\assets\image-20221127163851874.png)

## Object URL

> 它是一个用来表示File Object 或 Blob Object 的 URL

演示一下：

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <input type="file" name="file" id="fileId">
    <script>
    	const fileObj = document.getElementById('fileId')
		fileObj.addEventListener('change', (e)=> {
    		let file = e.target.files[0]
    		console.log(URL.createObjectURL(file))
		})
    </script>
</body>
</html>
~~~

![image-20221127164427891](D:\fn-pro\assets\image-20221127164427891.png)

## base64

> 在 JavaScript 中，有两个函数被分别用来处理解码和编码 *base64* 字符串：
>
> - atob()：解码，解码一个 Base64 字符串；
> - btoa()：编码，从一个字符串或者二进制数据编码一个 Base64 字符串。

![image-20221127164636442](D:\fn-pro\assets\image-20221127164636442.png)

### 主要使用：

(1) 将canvas画布内容生成base64的图片

(2) 将获取的图片文件，生成base64图片【这个在上面的FileReader的时候已经演示过了，这里就不演示了】

演示①：

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

</head>
<body>
    <canvas id="canvasId" width="200" height="200"></canvas>
    <script>
    	const canvas = document.getElementById('canvasId')
        const context = canvas.getContext('2d')
        context.fillStyle = '#ff0000'
        context.fillRect(0, 0, 200, 200)
        const dataUrl = canvas.toDataURL()
        console.log(dataUrl)
    </script>
</body>
</html>
~~~

