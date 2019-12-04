import React from 'react'
import { Provider } from 'react-redux'
import App, { AppContext } from 'next/app'
import withRedux from 'next-redux-wrapper'
import { PageContextProps } from '../interfaces/index'
import { PersistGate } from 'redux-persist/integration/react'
import { initStore } from '../store'

export default withRedux(initStore)(
    class extends App<PageContextProps> {
        static async getInitialProps({ Component, ctx }: AppContext) {
            return {
                pageProps: {
                    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
                }
            }
        }

        render() {
            const { Component, pageProps, store } = this.props

            return (
                <Provider store={store}>
                    <PersistGate loading={null} persistor={store.persistor}>
                        <Component {...pageProps} />
                    </PersistGate>
                </Provider>
            )
        }
    }
)