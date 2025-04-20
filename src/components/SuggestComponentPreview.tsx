"use client";

import React from "react";

// Define Ref type (even if unused, for consistency in Showcase if needed)
export interface SuggestComponentPreviewRef {}

export const SuggestComponentPreview = React.forwardRef<SuggestComponentPreviewRef>(
  (props, ref) => {
    // Expose empty ref handle if needed
    React.useImperativeHandle(ref, () => ({}));

    // GitHub issues URL
    const githubIssuesUrl = "https://github.com/vibeh/components/issues";

    return (
      // Container to center the content within the card's preview area
      <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
        {/* <p className="text-sm text-gray-400 mb-4">
          Have an idea for a new component? Open an issue or submit a PR!
        </p> */}
        {/* Visually styled link as a button - styles change on PARENT hover */}
        <span
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium 
                     h-8 px-4 
                     bg-[#2a2a2a] text-[#ccc] border border-[#444] /* Default dark gray appearance */
                     group-hover:bg-[#238636] group-hover:text-white group-hover:border-[#2a6033] /* GitHub green on parent hover */
                     transition-colors duration-150 ease-in-out /* Smooth transition */
                    "
        >
          Suggest on GitHub
          {/* Icon removed */}
        </span>
      </div>
    );
  }
);

SuggestComponentPreview.displayName = "SuggestComponentPreview"; 