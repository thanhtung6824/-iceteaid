import React, { useState, useCallback } from 'react';
import { lastValueFrom } from 'rxjs';
import { Iframe, subjectBuilder, randomId, viewIsNotReady } from 'iceteaid-core';
import { StyleSheet, Platform, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { RequestType } from 'iceteaid-type';
import { filter, take, tap } from 'rxjs/operators';
import { NativeTransporter } from './native-transporter';

export class NativeIframe extends Iframe<NativeTransporter> {
    protected iframe: WebView | null = null;
    protected view: any;
    private googleLoginId = '';

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected bootstrap(): void {
    }

    protected openIframe(): void  {
        if (this.view) {
            return this.view.openIframe();
        }
        throw viewIsNotReady();
    }

    protected closeIframe(): void {
        if (this.view) {
            return this.view.closeIframe();
        }
        throw viewIsNotReady();
    }

    public async postMessage(payload: string): Promise<void> {
        const message = JSON.parse(payload);
        if (message.requestType === RequestType.LOGIN_WITH_GOOGLE) {
            this.view.openIframe();
            this.googleLoginId = message.id;
        }

        (this.iframe as any).postMessage(payload);
    }

    public isReady(): Promise<any> {
        return new Promise(async (resolve) => {
            const id = randomId();
            const subject = subjectBuilder(id, this.transporter.messageHandlers);
            const timer = setInterval(async () => {
                if (this.iframe) {
                    (this.iframe as any).postMessage(JSON.stringify({
                        id,
                        payload: 'Are u ready?',
                        requestType: RequestType.IS_READY,
                    }));
                    const isOkay = await lastValueFrom(subject.asObservable().pipe(
                        filter(message => !!message),
                        take(1),
                        tap(() => {
                            this.transporter.messageHandlers.delete(id);
                        })
                    ));
                    if (isOkay) {
                        clearInterval(timer);
                        resolve(isOkay);
                    }
                }
            }, 1000);
        });
    }

    public handleWebViewNavigationStateChangeWrapper(newNavState: { url: any; canGoForward: any; }): void  {
        const { url } = newNavState;
        if (!url) return;
        const returnUrl = new URL(url);
        const urlParams = new URLSearchParams(returnUrl.search);
        const credentials = urlParams.get('token');
        const existUser = urlParams.get('existUser');
        if (credentials && existUser && this.googleLoginId) {
            const token = JSON.parse(credentials);
            const subject = this.transporter.messageHandlers.get(this.googleLoginId);
            subject.next({
                payload: { token: token.access_token, existUser }, id: this.googleLoginId
            });
            this.googleLoginId = '';
            this.view.closeIframe();
        }
    }

    public IFrame: React.FC = () => {
        const [open, setOpen] = useState(false);
        const os = Platform.OS;
        const webviewRef = useCallback((webView: any): void => {
            this.iframe = webView;
        }, []);

        const openIframe = useCallback(() => {
            setOpen(true);
        }, []);

        const closeIframe = useCallback(() => {
            setOpen(false);
        }, []);

        const viewRef = useCallback((): void => {
            this.view = {
                openIframe,
                closeIframe,
            };
        }, []);

        const onMessage = (event: any) => {
            this.transporter.handleMessage(event);
        };

        const handleWebViewNavigationStateChange = (newNavState: { url: any; canGoForward: any; }) => {
            this.handleWebViewNavigationStateChangeWrapper(newNavState);
        };

        return (
            <SafeAreaView
                testID={'qwerty'}
                ref={viewRef} style={[styles.container, open ? styles.showContainer : styles.hideContainer ]}>
                <WebView
                    testID={'abcxyz'}
                    ref={webviewRef}
                    startInLoadingState={true}
                    javaScriptEnabled={true}
                    source={{ uri: this.endpoint }}
                    onMessage={onMessage}
                    userAgent={
                        os === 'ios' ?
                            'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0 Mobile/14E5239e Safari/602' :
                            'Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'
                    }
                    onNavigationStateChange={handleWebViewNavigationStateChange}
                />
            </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    webview: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    showContainer: {
        zIndex: 10000,
        elevation: 10000,
    },
    hideContainer: {
        zIndex: -10000,
        elevation: -10000,
    },
    activityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center',
    },
});
