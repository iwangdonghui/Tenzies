import React  from "react";

const DiceFace = ({ value }) => {
    const faceClass = `face ${['one', 'two', 'three', 'four', 'five', 'six'][value - 1]}`;
    
    const renderDots = () => {
      switch (value) {
        case 1:
          return <div className="dot"></div>;
        case 2:
          return (
            <>
              <div className="dot"></div>
              <div className="dot"></div>
            </>
          );
        case 3:
          return (
            <>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </>
          );
        case 4:
          return (
            <>
              <div className="container">
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <div className="container">
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </>
          );
        case 5:
          return (
            <>
              <div className="container">
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <div className="container">
                <div className="dot"></div>
              </div>
              <div className="container">
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </>
          );
        case 6:
          return (
            <>
              <div className="container">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <div className="container">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </>
          );
        default:
          return null;
      }
    };
    
    return (
      <div className={faceClass}>
        {renderDots()}
      </div>
    );
  };



export default function Dice(props) {
    const styles = {
        backgroundColor: props.isHeld? "#59E391": "#ffffff"
    }
    console.log(props.isHeld)

    return (
       <div 
            className={`dice ${props.isHeld ? "held" : ""}`}
            style={styles} 
            onClick={props.holdDice}
        >
                <DiceFace 
                    value={props.value}  
                />
        </div>
    )
}