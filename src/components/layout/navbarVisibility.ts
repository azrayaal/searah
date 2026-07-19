/**
 * Height of the fixed primary bar. Sticky page furniture offsets itself by this — the bar
 * never retracts, so the offset is a constant rather than something to track.
 *
 * It must cover everything the bar *draws*, not just the nav pill. The pill ends around
 * 66px, but the 48px search and language controls are centred in the padded bar and hang
 * to ~78px; an offset measured against the pill left their bottom edge protruding over
 * whatever parked beneath, which read as a stray white blob on the entity page's sticky
 * tab rail. The bar's own box is the only honest measure.
 */
export const NAVBAR_HEIGHT = 84;
