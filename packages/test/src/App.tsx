import React, {useEffect} from 'react';
import './App.css';
import { IceteaId } from 'iceteaid-web';

const i = new IceteaId('xx');
const instance = i.instance;

function App() {
    useEffect(() => {
        const test = async () => {
            const data = await instance.user.getDataAfterRedirect();
            console.log('data', data);
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
