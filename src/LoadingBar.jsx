export default function LoadingBar({ isVisible }) {
 return (
  <>
   {isVisible && (
    <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600 animate-pulse z-50"></div>
   )}
  </>
 );
}