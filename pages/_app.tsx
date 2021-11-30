import { AppProps } from 'next/dist/shared/lib/router/router';
import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return <>
		<Head>
			<title>TopApp</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<Component {...pageProps} />;
	</>;
}

export default MyApp;
