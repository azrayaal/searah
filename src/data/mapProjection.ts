/**
 * Placement of assets on `public/assets/maps.png`.
 *
 * The plate is a 3D render, not a geodetic projection, so lat/lng cannot be
 * projected analytically. The affine transform below was fitted against three
 * landmarks read off the render — the Mahakam delta, the northern tip of Sabah
 * and Pontianak — which keeps every operating region we actually plot (the
 * Makassar Strait, offshore Sarawak/Sabah and Papua's Bird's Head) landing on
 * the right stretch of coastline.
 *
 * Both outputs are percentages of the image box, so markers stay locked to the
 * coastline at any rendered size.
 */
export const MAP_IMAGE = {
  src: '/assets/maps.png',
  width: 3466,
  height: 1456,
} as const;

const X = { lng: 1.95857, lat: 0.10051, offset: -183.07216 };
const Y = { lng: 0.24085, lat: -1.37508, offset: 35.17534 };

export function projectToImage(lat: number, lng: number): { x: number; y: number } {
  return {
    x: X.lng * lng + X.lat * lat + X.offset,
    y: Y.lng * lng + Y.lat * lat + Y.offset,
  };
}

/** Marker artwork, one per asset status. */
export const statusPin: Record<'Producing' | 'Development' | 'Exploration', string> = {
  Producing: '/assets/pinpointprod.png',
  Development: '/assets/pinpointdev.png',
  Exploration: '/assets/pinpointexp.png',
};

/** Accent used for the legend and the glow behind an active marker. */
export const statusColour: Record<'Producing' | 'Development' | 'Exploration', string> = {
  Producing: '#F2A03D',
  Development: '#00A3E0',
  Exploration: '#8FB4C9',
};

/**
 * The teardrop's point sits at 92% of the artwork's height — markers are shifted
 * by this much so the tip, not the centre, lands on the coordinate.
 */
export const PIN_TIP = { x: 50, y: 92 };
