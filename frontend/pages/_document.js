import { ColorModeScript } from "@chakra-ui/react";
import theme from "@styles/theme";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
   render() {
      return (
         <Html>
            <Head>
               <meta
                  name="description"
                  content="Smart contract auditing website"
               />
               <link rel="icon" href="/favicon.ico" />
               <link rel="preconnect" href="https://fonts.googleapis.com" />
               <link
                  rel="preconnect"
                  href="https://fonts.gstatic.com"
                  crossOrigin="true"
               />
               <link
                  href="https://fonts.googleapis.com/css2?family=Didact+Gothic&family=Geostar&family=Space+Grotesk:wght@300&family=Space+Mono&display=swap"
                  rel="stylesheet"
               />
            </Head>
            <body>
               <ColorModeScript
                  initialColorMode={theme.config.initialColorMode}
               />
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}
