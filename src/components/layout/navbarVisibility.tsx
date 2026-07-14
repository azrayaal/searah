import { createContext, useContext } from 'react';

/**
 * Whether the navbar is currently retracted. Anything else that sticks to the top of the
 * viewport — the entity page's section rail, for one — has to follow it, or it leaves a
 * band of bare page where the navbar used to be.
 */
export const NavbarHiddenContext = createContext(false);

export function useNavbarHidden() {
  return useContext(NavbarHiddenContext);
}

/** Height of the primary bar; the offset a sticky element sits at while the nav is out. */
export const NAVBAR_HEIGHT = 74;
