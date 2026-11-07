// Turns Firebase / OAuth errors into short messages users can act on.
export function friendlyAuthError(error) {
  const code = error?.code || '';
  switch (code) {
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return null; // user closed the popup, nothing to show
    case 'auth/popup-blocked':
      return 'Your browser blocked the sign-in popup. Allow popups and try again.';
    case 'auth/network-request-failed':
      return 'Network problem. Check your connection and try again.';
    case 'auth/unauthorized-domain':
      return 'This site is not authorised for sign-in. Add it to Firebase > Authentication > Settings > Authorised domains.';
    case 'auth/operation-not-allowed':
      return 'Google sign-in is not enabled in Firebase yet.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Wait a moment and try again.';
    default:
      return 'Something went wrong while signing in. Please try again.';
  }
}
