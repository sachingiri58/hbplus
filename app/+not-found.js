import { Redirect } from 'expo-router';

// Unknown URL: send to the guard, which decides between login and dashboard
export default function NotFound() {
  return <Redirect href="/" />;
}
