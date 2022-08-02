import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
    @font-face {
        font-family: 'Eirian';
        font-style: normal;
        font-weight: normal;
        src: url('/fonts/Eirian.ttf') format('truetype');
    }
    @font-face {
        font-family: 'Geostar';
        font-style: normal;
        font-weight: bold;
        src: url('/fonts/Geostar.ttf') format('truetype');
    }
    @font-face {
        font-family: 'Geostar Fill';
        font-style: normal;
        font-weight: bold;
        src: url('/fonts/Geostar-Fill.ttf') format('truetype');
    }
    @font-face {
        font-family: 'Atures';
        font-style: normal;
        font-weight: bold;
        src: url('/fonts/Atures.ttf') format('truetype');
    }
    @font-face {
        font-family: 'Space Mono';
        font-style: normal;
        font-weight: bold;
        src: url('/fonts/Space-Mono.ttf') format('truetype');
    }
    @font-face {
        font-family: 'Monosphere';
        font-style: normal;
        font-weight: normal;
        src: url('/fonts/Monosphere.ttf') format('truetype');
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
    @font-face {
        font-family: 'Azeret Bold';
        font-style: normal;
        font-weight: bold;
        src: url('/fonts/Azeret-Mono-Bold.otf') format('opentype');
    }


    `}
  />
);

export default Fonts;
