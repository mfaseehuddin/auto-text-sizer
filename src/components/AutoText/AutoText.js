import React, { useEffect, useRef, useState } from "react";
import ResizeObserver from "rc-resize-observer";

export default function AutoText({ children, uwidth }) {
    const setNewTextWidth = (e) => {
        const text = e.target;
        const textWidth = text.clientWidth;
        const fontSize = parseInt(window.getComputedStyle(text).fontSize);
        console.log("Text Width:", textWidth);
        console.log("Font Size:", fontSize);
        //now we need to get the width of the parent element
        const parent = text.parentElement;
        const parentWidth = parent.clientWidth;
        console.log("Parent Width:", parentWidth);

        //set font width to 1px less than parent width
        const fontRatio = textWidth / fontSize;
        const newFontSize = parentWidth / fontRatio;
        console.log("New Font Size:", Math.floor(newFontSize));

        //set new font size
        text.style.fontSize = newFontSize + "px";
    };

    const [textWidth, setTextWidth] = useState({
        width: 0,
        pad: 10,
    });
    const autoTextRef = useRef();

    useEffect(() => {
        //set textWidth.width of the autoText element
        setTextWidth({
            width: autoTextRef.current.parentElement.clientWidth,
            pad: 10,
        });
        setNewTextWidth({ target: autoTextRef.current });
    }, []);

    useEffect(() => {
        setNewTextWidth({ target: autoTextRef.current });
    }, [textWidth.width]);
    return (
        /**
         * @brief AutoText: A component that automatically rizes static broken text to fit the container.
         * @specs
         *  1. The text should be broken into lines - Done by user
         *  2. The text will be resized to fit the container
         *
         */
        <ResizeObserver
            onResize={() => {
                if (
                    Math.abs(
                        textWidth.width -
                            autoTextRef.current.parentElement.clientWidth
                    ) > textWidth.pad
                ) {
                    setTextWidth({
                        width: autoTextRef.current.parentElement.clientWidth,
                        pad: 10,
                    });
                }
            }}
            disabled={false}
            style={{
                width: "100%",
            }}
        >
            <div
                //log resized when div size is changed
                style={{
                    border: "1px solid black",
                    width: uwidth,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    //no text wrap
                    whiteSpace: "nowrap",
                }}
            >
                <p ref={autoTextRef} id="autoText">
                    {children}
                </p>
            </div>
        </ResizeObserver>
    );
}
