import React from "react";

const Warning = () => {
  return (
    <div>
      <div className="relative m-16">
        <button className="absolute py-1 px-3 -left-8 -top-2 -rotate-[10deg] border border-black shadow-[4px_4px_1px_rgb(13,148,136)] bg-teal-500 text-white font-bold">
          WARNING!
        </button>

        <div className="shadow-[4px_4px_1px_rgb(13,148,136)] p-8 border border-black text-center">
          It looks like your account is still not approved, please wait for
          <span className="font-mono text-teal-700 font-bold">{" "}Admin's approval</span>{" "}
          for transaction permissions.....
        </div>
      </div>
    </div>
  );
};

export default Warning;
