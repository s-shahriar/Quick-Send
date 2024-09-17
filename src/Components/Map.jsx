import React from "react";

const Map = () => {
  return (
    <div>
      <section className="">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-teal-500">
              Visit Our Location
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Find us at our convenient location and get the support you need.
              Whether you have inquiries or need assistance, our team is ready
              to help.
            </p>
          </div>
          <div className="mt-16 lg:mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-lg overflow-hidden">
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <iframe
                      src="https://maps.google.com/maps?q=Dhaka&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                      frameBorder="0"
                      scrolling="no"
                      style={{ width: "100%", height: "400px", border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>
              <div>
                <div className="max-w-full mx-auto rounded-lg overflow-hidden">
                  <div className="px-6 py-4">
                    <h3 className="text-2xl font-medium text-teal-500">
                      Our Address
                    </h3>
                    <p className="mt-1 text-gray-600">
                      123 Larmini Street, Dhaka, Bangladesh
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-6 py-4">
                    <h3 className="text-2xl font-medium text-teal-500">
                      Hours
                    </h3>
                    <p className="mt-1 text-gray-600">
                      Monday - Friday: 9am - 5pm
                    </p>
                    <p className="mt-1 text-gray-600">Saturday: 10am - 4pm</p>
                    <p className="mt-1 text-gray-600">Sunday: Closed</p>
                  </div>
                  <div className="border-t border-gray-200 px-6 py-4">
                    <h3 className="text-2xl font-medium text-teal-500">
                      Contact
                    </h3>
                    <p className="mt-1 text-gray-600">
                      Email: query@quicksend.com
                    </p>
                    <p className="mt-1 text-gray-600">
                      Phone: +88 013494 34993
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Map;
