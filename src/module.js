console.log('Work Module.js')

async function start() {
    return await Promise.resolve('async is working!')
}

start().then(console.log)