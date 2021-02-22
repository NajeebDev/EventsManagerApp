import { Steps, Step } from "react-step-builder";
import styles from "./multiStep.module.css";

import Eventname1 from "./EventName1";
import Eventphoto2 from "./EventPhoto2";
import Description3 from "./description3";
import Location4 from "./location4";
import Language5 from "./language5";
import Member6 from "./member6";
import Eventtype7 from "./Eventtype7";
import Category8 from "./Category8";
import Date9 from "./date";
import FinalStep from "./FinalStep";

import React from "react";

export default function MultiStepForm() {
  return (
    <div className={styles.multiForm}>
      <Steps>
        <Step component={Eventname1} />
        <Step component={Eventphoto2} />
        <Step component={Description3} />
        <Step component={Location4} />
        <Step component={Language5} />
        <Step component={Member6} />
        <Step component={Eventtype7} />
        <Step component={Category8} />
        <Step component={Date9} />
        <Step component={FinalStep} />
      </Steps>
    </div>
  );
}
