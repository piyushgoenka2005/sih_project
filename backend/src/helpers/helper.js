const crypto = require('crypto');
const moment = require('moment-timezone');

const timeZone = 'Asia/Kolkata';

exports.getHashValue = function(text) {
    const hash = crypto.createHash('sha512');
    const hashdata = hash.update(text, 'utf-8');
    return hashdata.digest('hex');
}    


exports.generateToken = function() {
    const tokenLength = 32;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';

    for (let i = 0; i < tokenLength; i++) {
        const randomIndex = crypto.randomInt(0, characters.length);
        token += characters.charAt(randomIndex);
    }

    return token;
}

exports.getRandomCode = function(len = 6) {
    var char = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    var randomstring = '';

    for (var i=0; i<len; i++){
        var rnum = Math.floor(Math.random()*char.length);
        randomstring += char.substring(rnum, rnum+1);
    }
    return randomstring;
}

exports.getCurrentDateTime = () => {
    const currentDateTime = moment().tz(timeZone).format('YYYY-MM-DD HH:mm:ss');
    return currentDateTime;
}

exports.decodeFileContent = function(encodedContent) {
    // For example, if you encoded the content using Base64, you can decode it like this:
    const decodedContent = Buffer.from(encodedContent, 'base64').toString('utf-8');
    return decodedContent;
}