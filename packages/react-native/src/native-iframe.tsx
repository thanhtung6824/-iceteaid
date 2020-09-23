import React, { useState, useCallback } from 'react';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

import { Iframe, randomId, subjectBuilder } from 'iceteaid-core';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { RequestType } from 'iceteaid-type';
import { filter, take, tap } from 'rxjs/operators';

export class NativeIframe extends Iframe {
    protected iframe: WebView | null = null;
    protected view: any;
    public messageHandler = new Map<string, any>();
    private googleLoginId = '';

    protected closeIframe(): void {
        if (this.view) {
            this.view.closeIframe();
        }
    }

    protected openIframe(): void {
        if (this.view) {
            this.view.openIframe();
        }
    }

    public postMessage(payload: string): void {
        const message = JSON.parse(payload);
        if (message.requestType === RequestType.LOGIN_WITH_GOOGLE) {
            this.view.openIframe();
            this.googleLoginId = message.id;
        }

        (this.iframe as any).postMessage(payload);
    }

    public isReady(): Promise<any> {
        return new Promise(async (resolve) => {
            // const idMessage = randomId();
            // const subject = new BehaviorSubject('');
            // this.messageHandler.set(idMessage, subject);
            const { id, subject } = subjectBuilder(this.messageHandler);
            console.log(id, subject);
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
                            this.messageHandler.delete(id);
                        })
                    ));
                    if ((isOkay as any).payload) {
                        clearInterval(timer);
                        resolve();
                    }
                }
            }, 500);
        });
    }

    public IFrame: React.FC = () => {
        const [open, setOpen] = useState(false);
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
            if (!event.nativeEvent && event.nativeEvent.url !== this.endpoint) {
                return;
            }
            console.log('message received', event.nativeEvent.data);
            const message = JSON.parse(event.nativeEvent.data);
            const subject = this.messageHandler.get(message.id);
            if (!subject) {
                return;
            }
            subject.next(message);
        };

        const handleWebViewNavigationStateChange = (newNavState: { url: any; canGoForward: any; }) => {
            const { url } = newNavState;
            if (!url) return;
            const returnUrl = new URL(url);
            const urlParams = new URLSearchParams(returnUrl.search);
            const credentials = urlParams.get('token');
            const existUser = urlParams.get('existUser');
            if (credentials && existUser && this.googleLoginId) {
                const token = JSON.parse(credentials);
                const subject = this.messageHandler.get(this.googleLoginId);
                subject.next({
                    payload: { token: token.access_token }, id: this.googleLoginId
                });
                this.googleLoginId = '';
                this.view.closeIframe();
            }
        };

        return (
            <View ref={viewRef} style={[styles.container, open ? styles.showContainer : styles.hideContainer ]}>              
                <WebView
                    ref={webviewRef}
                    startInLoadingState={true}
                    javaScriptEnabled={true}
                    source={{ uri: this.endpoint }}
                    onMessage={onMessage}
                    userAgent={'Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'}
                    onNavigationStateChange={handleWebViewNavigationStateChange}
                />
            </View>
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
    showWebview: {
        display: 'flex'
    },
    hideWebview: {
        display: 'none'
    },
    showContainer: {
        zIndex: 10000
    },
    hideContainer: {
        zIndex: -10000,
    },
    activityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center',
    },
});
