declare module 'jsencrypt' {
  class JSEncrypt {
    constructor();
    setPublicKey(publicKey: string): void;
    setPrivateKey(privateKey: string): void;
    encrypt(text: string): string;
    decrypt(encryptedText: string): string;
    // 根据需要添加更多方法和属性
  }
}
