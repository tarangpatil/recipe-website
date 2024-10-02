"use client";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import LoginExtraDisplay from "./LoginExtraDisplay";
import SignupExtraDisplay from "./SignupExtraDisplay";

export default function DynamicForm() {
  const [visiblePageLogin, setVisiblePageLogin] = useState<boolean>(true);
  return (
    <div className="border-2 h-[70vh] mt-20 w-2/3 rounded-md flex overflow-hidden">
      <div className="relative h-full w-1/2  overflow-hidden">
        <SignupExtraDisplay />
        <div
          className={`bg-custom-peach h-full w-full absolute top-0 
            ${visiblePageLogin ? "left-0" : "left-full"} transition-all `}
        >
          <LoginForm setVisiblePageLogin={setVisiblePageLogin} />
        </div>
      </div>
      <div className="relative h-full w-1/2  overflow-hidden">
        <LoginExtraDisplay />
        <div
          className={`bg-custom-peach h-full w-full absolute top-0 
            ${visiblePageLogin ? "right-full" : "right-0"} transition-all `}
        >
          <SignupForm setVisiblePageLogin={setVisiblePageLogin} />
        </div>
      </div>
    </div>
  );
}
