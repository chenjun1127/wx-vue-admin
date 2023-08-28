const rsa = {
  PRIVATE_KEY:
    'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAJdsZuLPQKtOPLfcmZ86LaTaM60cjzSr7XnjzP6hlO5d5/zjzk7p2tpLGOXl8+cW18o6+yOtHw+woa4FNRp4+kOhnBKZg5jFyV7QE/KoregSnc885Mdeh5m6XOtMWni1XC4/MuHjHsxNm5/a0EdpK7CI6nXt5p+hdSIvWl2WqRzdAgMBAAECgYAn5wL9xcuu2MEbWmCJGxWoGXAAsEP0h1HfCu6cMwxB/DED7SwSk4F+gMeg3YX2YYif3AcOEbLbuZoBd5HU1ghsnj+3jh9rAxcsTyYMYDQ3p9OZFKFVsI3zEBG494Zx8vBOhO5Fudv1HIQ8z9GDfa+iSa/SKLbtGPO50Rn8Qm5MKQJBAMms9bpK/pbKmnViT1MV1/RTtb7lAGEucn0ZMbZhZDO176A89bvJJ2voIE5D/X4G+9H+790XBYVITaQ1GsZnqG8CQQDANi3VEUYZBjAG0V38nX2LQKD5gGFcsppySn+qyzHWFGP1IdHTSmS/pYtoKqR4v9kSUccaT7z5+uxeBqzLaj1zAkACttMvyKaYfO2LOuF6asbXQPEnOonAxRFBYb9rhvAESiSJcYiVGGXxa9RTeVLGCW4GK3oq7Y5jds+ksBpGJUr9AkEAtpC/Z6lIk2w1IcSrKM3N+P4h59nwoENkPzpTmL33UAd+Cc9dpPr8RqvOhdo67hYK8EOMgYlLTYTwDT750RvP0QJBAJFWdtR/SK7t//6YSrjn7ceYF0hPOI6i2iIVhU8DkZ/5qBoHShArimHraY9Ndw1gx3ExIsWZURVf7o88/ohcjwQ=',
  PUBLIC_KEY: `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXbGbiz0CrTjy33JmfOi2k2jOtHI80q+1548z+oZTuXef8485O6draSxjl5fPnFtfKOvsjrR8PsKGuBTUaePpDoZwSmYOYxcle0BPyqK3oEp3PPOTHXoeZulzrTFp4tVwuPzLh4x7MTZuf2tBHaSuwiOp17eafoXUiL1pdlqkc3QIDAQAB`,
};

import { JSEncrypt } from 'jsencrypt';
// 加密（origin：原始text，key：公钥）
export const encryptMI = (origin: string) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(rsa.PUBLIC_KEY);
  return encrypt.encrypt(origin);
};

// 解密（cipher：加密text，key：私钥）
export const decryptMI = (cipher: string) => {
  const decrypt = new JSEncrypt();
  decrypt.setPrivateKey(rsa.PRIVATE_KEY);
  return decrypt.decrypt(cipher);
};
