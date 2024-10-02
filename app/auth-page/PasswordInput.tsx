import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordInput() {
  const [passVis, setPassVis] = useState(false);
  return (
    <>
      <label htmlFor="password" className="w-1/2 my-2 mt-4">
        Password
      </label>
      <div className="w-1/2 relative">
        <input
          type={passVis ? "text" : "password"}
          id="password"
          name="password"
          className="w-full px-4 py-2 rounded"
          placeholder="secure-pass-123"
          minLength={5}
          required
        />
        {passVis ? (
          <FaEyeSlash
            className="absolute top-1/2 right-4 -translate-y-1/2 text-xl cursor-pointer"
            onClick={() => setPassVis((i) => !i)}
          />
        ) : (
          <FaEye
            className="absolute top-1/2 right-4 -translate-y-1/2 text-xl cursor-pointer"
            onClick={() => setPassVis((i) => !i)}
          />
        )}
      </div>
    </>
  );
}
