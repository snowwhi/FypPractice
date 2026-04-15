import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <section className="py-10 bg-white font-['Arvo',_serif] min-h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl text-center">
            {/* Background Image Container */}
            <div 
              className="h-[400px] bg-center bg-no-repeat"
              style={{ 
                backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)' 
              }}
            >
              <h1 className="text-[80px] font-bold text-[#ec1313]">404</h1>
            </div>

            {/* Content Box */}
            <div className="-mt-7">
              <h3 className="text-2xl md:text-4xl mb-4 text-[#ec1313]">
                Looks like you're lost
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                The page you are looking for is not available!
              </p>
              <Link 
                to="/" 
                className="inline-block px-5 py-2.5 bg-[#ec1313] text-white rounded transition-colors hover:bg-[#0a070f]"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;