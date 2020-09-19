import React, { useState, useCallback } from 'react';
import { Iframe } from 'iceteaid-core';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { BehaviorSubject } from 'rxjs';
import { RequestType } from 'iceteaid-type';

export class NativeIframe extends Iframe {
    protected iframe: WebView | null = null;
    protected view: any;
    public subject = new BehaviorSubject<any>('');
    public messageHandler = new Map<string, any>();

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

    ActivityIndicatorLoadingView(): JSX.Element {
        return (
            <ActivityIndicator
                color="#009688"
                size="large"
                style={styles.activityIndicatorStyle}
            />
        );
    }

    public postMessage(payload: string): void {
        if (this.iframe) {
            const message = JSON.parse(payload);
            if (message.requestType === RequestType.LOGIN_WITH_GOOGLE) {
                this.view.openIframe();
            }
            (this.iframe as any).postMessage(payload);
        }
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
            const message = JSON.parse(event.nativeEvent.data);
            if (message.needToClose) {
                closeIframe();
            }
            const subject = this.messageHandler.get(message.id);
            subject.next(event.nativeEvent.data);

        };

        return (
            <View ref={viewRef} style={styles.container}>
                <WebView
                    ref={webviewRef}
                    startInLoadingState={true}
                    javaScriptEnabled={true}
                    source={{ uri: this.endpoint }}
                    onMessage={onMessage}
                    containerStyle={open ? styles.webview : styles.hideWebview}
                    renderLoading={this.ActivityIndicatorLoadingView}
                    userAgent={'Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    webview: {
        flex: 1,
        margin: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10000,
    },
    hideWebview: {
        display: 'none',
    },
    activityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center',
    },
});
