const nJwt = require('njwt');

const secretKey = 'oqLlmSRa5j3Y8YEYRsYrgO9ubTS2wv/ENuMCpm5HX555ef4aRPkceYru1lTuvccXm1dT73QuU3nqB5aRzq4nDVKpFSQs3oXvFSEEk2XNt2RPgMPTDWPU2h3Fblc5nDxLJHKRqsXDgncc/8aOXmGrMp2+SruMuz3NTFUf0YlyB+Fwb8z+hnK7JN4uszxO//72d4tcrs0xbuv4ke+2WXUN5ROu4/2nky0eJUP38/VH41jifprI0EHfrrt2aY3O9FvH5vFWT2NHmPJBz7ZVl6zoKB4ja1D03ZklOD/zJuYTNRUBo+2zaHyjmmvOFkvG3NiCtlguIM0tpgwV468eM2KKTQ';

let generateToken = (properties, delay = 0) => {
    let jwt = nJwt.create(properties, secretKey);
    jwt.setExpiration(new Date().getTime() + 60 * 60 * 1000);
    jwt.setNotBefore(delay);
    return jwt.compact();
}

module.exports = generateToken;