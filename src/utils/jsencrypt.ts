import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey =
  'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIAKdXV94FrgR7Ynn8CcxDplbmEdnQxP' +
  'VAD4Jb/ddfIzgnTeWNiZKg14d8Tp20c8QuGA3WQu5G0uclYwZBeeYPcCAwEAAQ=='

const privateKey =
  'MIIBOwIBAAJBAIAKdXV94FrgR7Ynn8CcxDplbmEdnQxPVAD4Jb/ddfIzgnTeWNiZ' +
  'Kg14d8Tp20c8QuGA3WQu5G0uclYwZBeeYPcCAwEAAQJADVMepSL73vPZ0qLYqlPw' +
  'zH5IwzIwk/A0zEMGtABT1BK8A0qnjECFSh7d75VMsMkphrpGANbwqTIEoEuYoywm' +
  'VQIhAPAhtFuvSa01WXvWQW188zQisgjNH/herXnEvf6ebBadAiEAiICFCbIQKc9T' +
  'Vo05no1aBK8DTZBCm9mnK5es+sydd6MCIQDHToI/Evco3z3dThDSCkJlxGJWccKW' +
  'SCbeCZDUk7MM9QIgc36ikhiKWoXkUpg9h2y8HLhkCA2mfi2Dp3u3TaExHxcCIQDF' +
  'rQft62GIhS9zX7zq0GpaET7I6jqWOpreZP0fCjR1Pw=='

export function encrypt(txt: string) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey)
  return encryptor.encrypt(txt)
}

export function decrypt(txt: string) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)
  return encryptor.decrypt(txt)
}
