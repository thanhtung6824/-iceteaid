# IceteaID 

>  IceteaID Passwordless authentication.

##Installation
```bash
yarn add iceteaid-web # If you're targeting web browsers
yarn add iceteaid-react-native # If you're targeting React Native
```

## Documentation
```ts
import { IceteaId } from 'iceteaid-react-native';

const iceteaId = new IceteaId('xxx');

<App>
  <iceteaId.IFrame />
</App>
```

We provided some method to login with IceteaId 

 - Login with google
```ts
  const token = await iceteaId.auth.loginWithGoogle('http://example.com/redirect')
```
- Login with OTP
```ts
  await iceteaId.auth.sendOtp('emailOrPhone', 'channel') // now we support send OTP via sms and email
  const token = await iceteaId.auth.verifyOtp('emailOrPhone', 'channel', 'otpCode')
```

After get token, use some method below to register or login.
```ts
  // register
  const encryptionKey = await iceteaId.user.generateEncryptionKey(); //generate 256bit random key to encrypt your private key
  await iceteaId.user.encrypt('your private key', encryptionKey); // encrypt private key with encryption key then encrypt encryption key with AWS KMS

  //login
  const key = await iceteaId.user.getKey(); //return encrypted private key and encrypted encryption key
  await iceteaId.user.decrypt(key.privateKey, key.encryptionKey) // decrypt private key with encryption key then decrypt encryption key with AWS KMS
```
