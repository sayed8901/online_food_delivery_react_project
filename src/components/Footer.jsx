const Footer = () => {
  return (
    <div className="text-center relative isolate overflow-hidden bg-gray-900 py-2 sm:py-4 lg:py-6">
      <div className="mx-auto max-w-[90%] px-6 lg:px-8">
        <div className="mx-auto ">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Feeling Hungry!! Call <span className="text-red-500">16427</span> to order
              some food.
            </h2>
            <p className="mt-4 text-md leading-8 text-gray-300">
              Our Service is available from 9 am to 8 pm (Saturday to Thursday).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
