import React from "react";

const Textimonials = () => {
  return (
    <div>
      <section class="max-w-7xl mx-auto w-full px-10 text-teal-500 mb-10">
        <div class="flex items-center justify-center flex-col gap-y-2 py-5">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold">
            Testimonials
          </h2>
          <p class="text-lg font-medium text-slate-700/70 dark:text-gray-400 text-center max-w-2xl mt-5">
          Hear from our satisfied customers and discover how our service has transformed their businesses. Let their experiences show you the value we can bring to yours!
          </p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-5 w-full">
          <div class="border p-7 rounded-xl bg-white dark:bg-gray-700 drop-shadow-md border-neutral-200/50 col-span-2 flex flex-col gap-y-10 justify-between">
            <div class="flex flex-col gap-y-3.5">
              <p class="font-bold text-xl">Outstanding Business Platform!</p>
              <p class="font-medium text-slate-700/90 dark:text-gray-300">
              Our team’s transition to this platform was a game-changer for managing our daily operations. It streamlined everything, from communication to project tracking. We're saving so much time and the results are phenomenal!
              </p>
            </div>
            <div class="flex flex-col">
              <img
                src="https://randomuser.me/api/portraits/women/54.jpg"
                alt="Jane Cooper"
                class="h-10 w-10"
              />
              <p class="pt-2 text-sm font-semibold">Jane Cooper</p>
              <p class="text-sm font-medium text-slate-700/70 dark:text-gray-400">
                CEO at ABC Corporation
              </p>
            </div>
          </div>
          <div class="border p-7 rounded-xl bg-white dark:bg-gray-700 drop-shadow-md border-neutral-200/50 col-span-3 flex flex-col gap-y-10 justify-between">
            <div class="flex flex-col gap-y-3.5">
              <p class="font-bold text-xl">Efficient customer support</p>
              <p class="font-medium text-slate-700/90 dark:text-gray-300">
              The customer support team at our service has exceeded all expectations. They are incredibly responsive, going above and beyond to address every concern. Their dedication and assistance were instrumental in resolving my issues swiftly and effectively. It’s clear they genuinely care about their customers and are committed to providing top-notch service.
              </p>
            </div>
            <div class="flex flex-col">
              <img
                src="https://randomuser.me/api/portraits/women/30.jpg"
                alt="John Doe"
                class="h-10 w-10"
              />
              <p class="pt-2 text-sm font-semibold">Emily Smith</p>
              <p class="text-sm font-medium text-slate-700/70 dark:text-gray-400">
                Marketing Manager at ABC Company
              </p>
            </div>
          </div>
          <div class="border p-7 rounded-xl bg-white dark:bg-gray-700 drop-shadow-md border-neutral-200/50 col-span-3 flex flex-col gap-y-10 justify-between">
            <div class="flex flex-col gap-y-3.5">
              <p class="font-bold text-xl">Effortless Setup and Integration</p>
              <p class="font-medium text-slate-700/90 dark:text-gray-300">
              The integration process was seamless. We were up and running in no time, and the support team was incredibly responsive, guiding us every step of the way. Our business processes have never been smoother!
              </p>
            </div>
            <div class="flex flex-col">
              <img
                src="https://randomuser.me/api/portraits/women/90.jpg"
                alt="Jane Doe"
                class="h-10 w-10"
              />
              <p class="pt-2 text-sm font-semibold">Sarah Brown</p>
              <p class="text-sm font-medium text-slate-700/70 dark:text-gray-400">
                CTO at XYZ Corporation
              </p>
            </div>
          </div>
          <div class="border p-7 rounded-xl bg-white dark:bg-gray-700 drop-shadow-md border-neutral-200/50 col-span-2 flex flex-col gap-y-10 justify-between">
            <div class="flex flex-col gap-y-3.5">
              <p class="font-bold text-xl">Reliable service uptime</p>
              <p class="font-medium text-slate-700/90 dark:text-gray-300">
                Our service has consistently maintained high uptime, ensuring
                that our operations run smoothly without any disruptions.
              </p>
            </div>
            <div class="flex flex-col">
              <img
                src="https://randomuser.me/api/portraits/men/90.jpg"
                alt="Ash Doe"
                class="h-10 w-10"
              />
              <p class="pt-2 text-sm font-semibold">James White</p>
              <p class="text-sm font-medium text-slate-700/70 dark:text-gray-400">
                COO at XYZ Corporation
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Textimonials;
