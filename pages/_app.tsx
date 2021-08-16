import '../styles/globals.scss'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Head>
        <title>Roadtrip App</title>
        <script type="text/javascript" src="https://kit.fontawesome.com/c8a09f3a5c.js"></script>
      </Head>
    </>
  )
}

export default MyApp
