export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
        <h1 className="text-9xl font-extrabold text-[#e57339] animate-bounce">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mt-4">Oops! Page Not Found</h2>
        <p className="text-gray-600 mt-2">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
  
        <img 
          src="https://i.imgur.com/qIufhof.png" 
          alt="Lost" 
          className="w-64 my-6"
        />
  
        <a href="/" className="bg-[#e57339] text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-[#cf5c22] transition duration-300">
          Go Back Home
        </a>
      </div>
    );
  }
  