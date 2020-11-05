
const apiHost = {};


if (process.env.ENV === 'dev') {
    // apiHost.nethost = 'http://sit-operation.allcitygo.com/';
    apiHost.netImg = 'http://operation.allcitygo.com/';
    // apiHost.nethost = 'http://sit-basic-gw.allcitygo.com/op/';
    apiHost.nethost = 'https://bmapi.allcitygo.com:13002/op/';
}
if (process.env.ENV === 'test') {
    apiHost.nethost = 'http://sit-operation.allcitygo.com:9109/';
}
if (process.env.ENV === 'beta') {
    apiHost.nethost = 'http://sit-operation.allcitygo.com:9109/';
}
if (process.env.ENV === 'v5') {
    apiHost.nethost = 'http://sit-operation.allcitygo.com:9109/';
}
if (process.env.ENV === 'release') {
    apiHost.netImg = 'https://operation.allcitygo.com/';
    apiHost.nethost = 'https://bmapi.allcitygo.com:13002/op/';
}


export default apiHost;
