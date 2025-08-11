const Footer = () => {
  return (
    <footer className="px-4 relative mt-8 text-[10px] text-center">
      <div className="flex flex-col items-center gap-4">
        <p className="font-gotham-light flex flex-wrap justify-center items-center gap-1">
          <span className="text-secondary">&copy; {new Date().getFullYear()} Ariel Jr Mimura.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;