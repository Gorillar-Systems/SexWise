const Footer = () => {
  return (
    <footer className="bg-[#561D39] text-white rounded-t-3xl py-10 px-6 md:px-16">
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        {/* Left Section */}
        <div className="flex flex-wrap gap-8 md:gap-16">
          <div>
            <ul className="space-y-2 text-sm">
              <li className="font-bold">About SexWise</li>
              <li>Contact</li>
              <li>Shop</li>
              <li>Afterpay</li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 text-sm">
              <li className="font-bold">Explore</li>
              <li>Quiz Yourself</li>
              <li>Product Guides</li>
              <li>FAQs</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 text-sm">
              <li className="font-bold">Resources</li>
              <li>Refund Policy</li>
              <li>Course</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6 lg:w-1/3">
          <p className="text-sm">
            Want to join the new normal? A regular dose of modern sex education,
            behind-the-scenes content, exclusive offers, and new products.
            Unsubscribe anytime.
          </p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow p-4 rounded-l-full h-auto text-gray-800"
            />
            <button className="bg-primary-main h-full px-4 py-2 rounded-r-full text-sm font-bold">
              Join now
            </button>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-xs">Accepted Payments:</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Visa_2021.svg/1200px-Visa_2021.svg.png"
              alt="Visa"
              className="h-6"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png"
              alt="MasterCard"
              className="h-6"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Amex-logo.svg"
              alt="AmEx"
              className="h-6"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 flex flex-col lg:flex-row justify-between items-center text-xs border-t border-gray-700 pt-4">
        <p>© {new Date().getFullYear()} SexWise. All rights reserved.</p>
        <div className="flex items-center gap-6 mt-4 lg:mt-0">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
