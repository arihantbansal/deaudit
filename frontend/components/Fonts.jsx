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
    `}
  />
);

export default Fonts;
