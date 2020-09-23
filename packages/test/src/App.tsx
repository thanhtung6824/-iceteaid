import React, {useEffect} from 'react';
import './App.css';
import { IceteaId } from 'iceteaid-web';
const i = new IceteaId('xx');

function App() {
    return (
        <div>
            <button onClick={async () => {
                const key = await i.user.generateEncryptionKey();
                console.log(key);
            }}>
                Test
            </button>
        </div>
    );
}

export default App;
