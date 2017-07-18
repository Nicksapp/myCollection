// 原生 XMLHttpRequest 的实现
let url = 'https://bird.ioliu.cn/v1?url=http://nickj.leanapp.cn/api/content-list'
let url2 = 'https://bird.ioliu.cn/v1?url=http://nickj.leanapp.cn/api/article/58e60440570c350057be64ee'
let result

let XHR = new XMLHttpRequest()
XHR.open('GET', url, true)
XHR.send()

XHR.onreadystatechange = () => {
    if (XHR.readyState === 4 && XHR.status === 200) {
        result = XHR.response
        console.log(result)
    }
}

// Promise封装一个 GET 请求方法
function getJSON (url) {
    return new Promise(function (resolve, reject) {
        var XHR = new XMLHttpRequest()
        XHR.open('GET', url, true)
        XHR.send()

        XHR.onreadystatechange = () => {
            if (XHR.readyState === 4) {
                if (XHR.status === 200) {
                    try {
                        var response = JSON.parse(XHR.responseText)
                        resolve(response)
                    } catch (e) {
                        reject(e)
                    }
                } else {
                    reject(new Error(XHR.statusText))
                }
            }
        }
    })
}
//当这个数组所有的Promise对象状态都变成resolved或者rejected的时候，它才会去调用then方法
function renderAll () {
    return Promise.all([getJSON(url), getJSON(url2)])
}
//只要当数组中的其中一个Promsie状态变成resolved或者rejected时，就可以调用.then方法了
function renderRace() {
    return Promise.race([getJSON(url), getJSON(url2)]);
}

renderRace().then(function(value) {
    console.log(value);
})
renderAll().then(function(value) {
    console.log(value)
})

getJSON(url)
    .then(response => console.log(response))
    .then(response => console.log('finished!'))
    .catch(err => console.log(err))