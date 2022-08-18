import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
    @font-face {
        font-family: 'Laser';
        font-style: normal;
        font-weight: bold;
        src: url('/fonts/Laser.otf') format('opentype');
    }
    @font-face {
        font-family: 'Aeonik Regular';
        font-style: normal;
        font-weight: normal;
        src: url('/fonts/Aeonik-Regular.otf') format('opentype');
    }
    @font-face {
        font-family: 'Aeonik Light';
        font-style: normal;
        font-weight: normal;
        src: url('/fonts/Aeonik-Light.otf') format('opentype');
    }
    @font-face {
        font-family: 'Porqge';
        font-style: normal;
        font-weight: normal;
        src: url('/fonts/Porqge.ttf') format('truetype');
    }
    @font-face {
        font-family: 'Ultramono';
        font-style: normal;
        font-weight: normal;
        src: url('/fonts/Ultramonos.ttf') format('truetype');
    }
    @font-face {
        font-family: 'Laser';
        font-style: normal;
        font-weight: bold;
        src: url('/fonts/Laser.ttf') format('truetype');
    }
    @font-face {
        font-family: 'Azeret Thin';
        font-style: normal;
        font-weight: normal;
        src: url('/fonts/Azeret-Mono-Thin.otf') format('opentype');
    }
    @font-face {
        font-family: 'Azeret Light';
        font-style: normal;
        font-weight: lighter;
        src: url('/fonts/Azeret-Mono-Light.otf') format('opentype');
    }
    @font-face {
        font-family: 'Azeret Regular';
        font-style: normal;
        font-weight: normal;
        src: url('/fonts/Azeret-Mono-Regular.otf') format('opentype');
    }

    `}
  />
);

export default Fonts;
