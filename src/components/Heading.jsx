/* eslint-disable react/prop-types */


const Heading = ({heading, title}) => {
  return (
    <div className="max-w-screen-md mx-auto px-4 text-center">
      {
        heading && <h3 className="font-bold text-2xl">{heading}</h3>
      }
      {
        title && <p className="text-gray-400">{title}</p>
      }
    </div>
  );
};

export default Heading;