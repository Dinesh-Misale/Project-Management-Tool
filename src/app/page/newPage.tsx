import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "400px",
  },

  imageContainer: {
    zIndex: 1,
    width: "100%",
    height: "inherit",
    background: "red",
    position: "relative",

    overflow: "hidden",
  },
  roundedImage: {
    borderRadius: "50%",
    // minWidth: "100px",
    // height: "100px",
    position: "absolute",
    bottom: "-50px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "white",
    opacity: 0,
  },
  newStyle: {
    width: "100%",
    height: "100%",
    bottom: 0,
    // zIndex: 3,
    animation: "$exampleAnimation 1.5s 1",
    borderRadius: 0,
    opacity: 1,
    backgroundImage:
      "url(https://camo.githubusercontent.com/56ea24702a43a27f55794275849e38c16cd393e244a59297a71266b9b34e3e53/68747470733a2f2f617368616c6c656e64657369676e2e636f2e756b2f696d616765732f637573746f6d2f73686f72742d75726c2d6c6f676f2e706e67)",
    backgroundClip: "border-box",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  loaderActive: {
    minHeight: "100vh",
    zIndex: 4,
    background: "green",
  },
  "@global": {
    "@keyframes exampleAnimation": {
      "0%": {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        opacity: 0,
      },
      "50%": {
        height: "inherit",
        width: "200px",
      },
      "100%": {
        width: "100%",
        borderRadius: 0,
        // opacity: 1,
      },
    },
  },
});

const arr = [
  "Web Development",
  "Automation Testing",
  "Machine Learning",
  "Cloud Computing",
];

const NewPage = () => {
  // State to hold the text content
  const classes = useStyles();
  const [displayText, setDisplayText] = useState<string>("");
  // const [stringCompleted, setStringCompleted] = useState(false);
  const [valid, setValid] = useState(false);
  const len = 1;
  const targetRef = useRef(null);

  // Event handler for button click
  const handleClick = (timeout: any) => {
    // Update the text content when the button is clicked
    let interval: any;
    let arrayIndex = 0;
    let newArr: any;
    var index = -1;
    var removeString = false;
    interval = setInterval(
      () => {
        setDisplayText((prevState): any => {
          newArr = arr[arrayIndex]?.split("");
          if (removeString) {
            let str = prevState;
            if (typeof str === "string") {
              let temp = str?.split("");
              temp?.pop();
              if (index === 0) {
                arrayIndex++;
                removeString = false;
                return temp;
              }

              return temp.join("");
            }
            return prevState;
          }
          if (newArr?.length === index) {
            removeString = true;
            return prevState;
          }
          if (arrayIndex === arr?.length) {
            clearInterval(interval);
            timeout.time = null;
            return prevState;
          }
          return !prevState
            ? newArr[index < 0 ? 0 : index]
            : prevState + newArr[index];
        });
        // based on if the character is added or removed the index value is updated .
        // -- is done when we are removing character and ++ is done when we are adding character .
        if (removeString) {
          index--;
        } else {
          index++;
        }
      },
      50,
      index,
      arrayIndex
    );
  };

  const someFunction = () => {
    const ele: any = document.getElementById("image");
    ele.classList.add(classes.newStyle);
  };

  const handleLoading = () => {};

  // useEffect(() => {
  //   // new code

  //   const timeOut: any = {};

  //   const callFun = () => {
  //     if (timeOut.time) {
  //       return;
  //     } else {
  //       timeOut.time = setTimeout(() => {
  //         setValid(false);
  //         handleClick(timeOut);
  //       }, 1000);
  //     }
  //   };

  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         // Element is now visible on the screen
  //         // Add your logic or call your function here
  //         console.log("Element is visible!");
  //         callFun();
  //       }
  //     });
  //   });

  //   if (targetRef.current) {
  //     observer.observe(targetRef.current);
  //   }

  //   // Cleanup: disconnect the observer when the component unmounts
  //   return () => {
  //     if (targetRef.current) {
  //       observer.unobserve(targetRef.current);
  //     }
  //   };
  // }, [valid]);

  return (
    <div>
      <div id="loader"></div>
      <div className={classes.container}>
        <div className={classes.imageContainer} id="image-container">
          <div className={classes.roundedImage} id="image">
            testing value is
          </div>
        </div>
      </div>
      <p>
        <span style={{ paddingLeft: "20px" }}>
          We provide services for {displayText}
        </span>
        <span className="test" ref={targetRef}>
          _
        </span>
        <button onClick={someFunction}>fadein</button>
        <button onClick={handleLoading}>load</button>
      </p>
    </div>
  );
};

export default NewPage;
