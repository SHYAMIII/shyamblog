const Footer = () => {
    return (
      <footer className="py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Shyam. All rights reserved.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  