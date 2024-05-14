const Button = ({ children, className, type }) => {
  return (
    <button type={type} className={`${className} btn `}>
      {children}
    </button>
  );
};

export default Button;
