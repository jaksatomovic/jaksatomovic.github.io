/** Cleave: Android precision puzzle. Used by the challenge landing page at /cleave/c/. */
export const cleave = {
  name: "Cleave",
  packageId: "com.cleave.game",
  playStore: "https://play.google.com/store/apps/details?id=com.cleave.game",
  /** Deep link handled by the app: cleave://challenge/<code>. */
  scheme: "cleave",
};

/**
 * The app's challenge codes: CLV1-T<n> (optical traps) or CLV1-G<6 Crockford base32> (gem puzzles),
 * optionally followed by -E<tenths> with the sender's error in tenths of a percentage point.
 * Keep in sync with ChallengeCodes in the app.
 */
export const challengeCodePattern = "CLV1-?(T[1-8]|G[0-9A-HJKMNP-TV-Z]{6})(?:-E(\\d{1,3}))?";

/** The illustration on the page: one shape, one cut, 50.1 % against 49.9 %. */
export const demoCut = {
  left: "78,132 229.6,76.4 172.1,333.3 150,336 66,262",
  right: "229.6,76.4 236,74 338,176 300,318 172.1,333.3",
  blade: { x1: 233.1, y1: 60.7, x2: 168.6, y2: 349 },
};
