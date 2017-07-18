/**
 * new Promise(function(resolve, reject) {
    if(true) { resolve() };
    if(false) { reject() };
})
 */

function want () {
    console.log('do func want()')
}

function fn (want) {
    console.log('do func fn()')

    // 返回 Promise
    return new Promise(function (resolve, reject) {
        if (typeof want === 'function') {
            resolve(want)
        } else {
            reject('TypeError: ' + want + '不是一个函数')
        }
    })
}

fn(want).then(function (want) {
    want()
})

fn('1234').catch(function(err) {
    console.log(err)
})