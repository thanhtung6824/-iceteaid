import React, {useEffect} from 'react';
import './App.css';
import { IceteaId } from 'iceteaid-web';

const i = new IceteaId('xx');
const instance = i.instance;

function App() {
    useEffect(() => {
        const test = async () => {
            try {
                const data = await instance.user.generateEncryptionKey();
                console.log('data', data);
            } catch (err) {
                console.log('err from effect', err);
            }
            // const data = await instance.auth.sendOtp('+840834122419', 'sms');
        };
        test();
    }, []);
    return (
        <div>
            <button onClick={async () => {
                const key = await instance.auth.loginWithGoogle('http://localhost:3002');
                console.log(key);
                // const key1 = await instance1.user.generateEncryptionKey();
                // console.log(key1);
            }}>
                Test
            </button>
        </div>
    );
}

export default App;
