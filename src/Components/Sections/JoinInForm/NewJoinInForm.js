import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import {
  MenuItem,
  IconButton,
  Box,
  Button,
  Typography,
  TextField,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
// import { configure } from 'chargebee'
import { Country, State, City } from "country-state-city";

const steps = ["User", "Address", "Coupon", "Final"];

const Styles = {
  inputFieldWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  inputField: { width: "70%", textAlign: "start", margin: "0.3em 0" },
  couponWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    textAlign: "start",
    margin: "0.3em 0  ",
  },
  couponBtn: {
    backgroundColor: "#9c27b0",
    borderRadius: "0px 5px 5px 0px",
    "& :hover": { color: "#9c27b094" },
  },
  couponIcon: { color: "#fff" },
  planWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  plansFieldWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  phoneWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
  },
  btnsWrapper: {
    width: "70%",
    display: "flex",
    justifyContent: "space-between",
  },
  codeContainer: {
    padding: "0.6em",
    backgroundColor: "#d5a2fbe8",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
  },
};

function NewJoinInForm({ planId }) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [nextBtnDisplay, setNextBtnDisplay] = useState(true);

  const [stepperForm, setStepperForm] = useState({
    0: { firstName: "", lastName: "", email: "" },
    1: {
      addressOne: "",
      zip: "",
      country: "",
      state: "",
      city: "",
      phone: "",
      phoneCode: "",
    },
    2: {
      planId:
        planId?.planId?.plan?.name === ""
          ? ""
          : planId?.planId?.plan?.name ?? "",
    },
    3:{}
  });

  const [optionalValues, setOptionalValues] = useState({
    0: {},
    1: { addressTwo: "" },
    2: { code: "" },
    3: {}
  });

  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const [planSwitch, setPlanSwitch] = useState(
    planId?.planId?.plan?.id ? true : false
  );
  const [plansList, setPlansList] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");

  const fetchPlansList = async () => {
    try {
      const resp = await axios.get(
        " https://us-central1-moufit-prod.cloudfunctions.net/api/plan/fetch-subscription-plans"
      );
      if (resp?.data?.success) {
        setPlansList(resp?.data?.plans?.list ?? []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPlansList();
    console.log(Country.getAllCountries());
  }, []);

  useEffect(() => {}, [planSwitch]);
  useEffect(() => {}, [plansList]);

  useEffect(() => {
    try {
      const isStepCompleted = Object.values(stepperForm[activeStep])?.every(
        (value) => value !== "" && value !== undefined
      );
      setNextBtnDisplay(!isStepCompleted);
    } catch (err) {
      console.log(err);
    }
  }, [activeStep, stepperForm, optionalValues]);

  // const [tempUrl, setTempUrl] = useState('')
  // useEffect(() => { }, [tempUrl])

  // configure({
  //   site: 'moufit',
  //   api_key: 'live_Dy73uZlae63a9jcbpakbYDcu6N6TVdvtO',
  // });

  const handleNext = async (str) => {
    if (activeStep === steps.length - 1) {
      // @@ SHOW CHECKOUT BTN HERE
      try {
        // const urlResp = await axios.post('http://127.0.0.1:5001/moufit-prod/us-central1/api/checkout/checkout', {
        const urlResp = await axios.post(
          "http://localhost:5000/moufit-prod/us-central1/api/checkout/checkout",
          {
            plan_id: selectedPlan?.plan?.id ?? "",
            auto_collection: "off",
            first_name: stepperForm[0]?.firstName ?? "",
            last_name: stepperForm[0]?.lastName ?? "",
            email: stepperForm[0]?.email ?? "",
            phone: `${stepperForm[1]?.phoneCode ?? ""}${
              stepperForm[1]?.phone ?? ""
            }`, // `${stepperForm[1]?.phoneCode ?? ""}${stepperForm[1]?.phone ?? ""}`
            // 'company': stepperForm[0].company,

            line1: stepperForm[1]?.addressOne ?? "",
            line2: optionalValues[1]?.addressTwo ?? "",

            city: stepperForm[1]?.city ?? "",
            state: stepperForm[1]?.state ?? "",
            zip: stepperForm[1]?.zip ?? "",
            country: stepperForm[1]?.country ?? "",

            coupons: optionalValues[2]?.code ?? "",
          }
        );
        console.log(urlResp);
        if (urlResp?.data?.requirements?.disabled_reason) {
          // Handle disabled account error here
          const disabledReason = urlResp.data.requirements.disabled_reason;
          console.log("Disabled Reason:", disabledReason);
          // Display an error message to the user or take appropriate action
        } else {
          const windowTarget = "_target";
          const windowFeatures = "popup";
          //   // const windowFeatures = "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400";
          console.log(urlResp.data);
          window.open(urlResp?.data?.url, windowTarget, windowFeatures);
          // console.log(urlResp)
        }
        // .then(data => {
        //   console.log(data)
        //   // setTempUrl(data?.data?.url);
        //   const windowTarget = '_target';
        //   const windowFeatures = 'popup';
        //   // const windowFeatures = "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400";
        //   window.open(data?.data?.url, windowTarget, windowFeatures);

        //   // Create an iframe element
        //   // const iframe = document.createElement('iframe');
        //   // iframe.src = data?.data?.url;
        //   // iframe.style.width = '50%';
        //   // iframe.style.height = '50vh';
        //   // document.body.appendChild(iframe);
        // })
        // .catch(err => console.log(err))
        // console.log(urlResp)
        // console.log(tempUrl)
        // setTempUrl(urlResp?.data?.url);
      } catch (err) {
        // alert("Error while creating checkout session")
        // @@ !!!!REFRESH OR REDIRECT TO SAME PAGE !!!!!!!
        // @@ SAVE DATA IN LOCAL SESSION && CLEAR SESSION STORAGE => !error !!!!!!
        console.error(err);
        if (err?.code && err.code === "ERR_NETWORK") {
          alert("NETWORK ERROR");
        }
        if (
          err?.response?.data?.error?.message &&
          err?.response?.data?.error?.message
        ) {
          console.error(err?.response?.data?.error?.message);
          alert(err?.response?.data?.error?.message);
        }
      }
    }
    let newSkipped = skipped;
    console.log(stepperForm);
    if (!isStepCompleted()) {
      newSkipped = new Set(skipped);
      newSkipped.add(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setCouponMsg("");
    setActiveStep(0);
    setStepperForm({
      0: { firstName: "", lastName: "", email: "" },
      1: {
        addressOne: "",
        zip: "",
        country: "",
        state: "",
        city: "",
        phoneCode: "",
        phone: "",
      },
      2: { planId: "" },
    });
    setOptionalValues({
      0: {},
      1: { addressTwo: "" },
      2: { code: "" },
    });
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const isStepCompleted = () => {
    return Object.values(stepperForm[activeStep]).every(
      (value) => value !== "" && value !== undefined
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // @@ HANDLE OPTIONAL VALUES
    if (name === "code" || name === "addressTwo") {
      setOptionalValues((prevState) => ({
        ...prevState,
        [activeStep]: {
          ...prevState[activeStep],
          [name]: value,
        },
      }));
    }

    // @@ HANDLE REQUIRED VALUES
    if (name === "country") {
      const selectedCountry = Country.getAllCountries().find(
        (country) => country.isoCode === value
      );
      const countryPhoneCode = selectedCountry ? selectedCountry.phonecode : "";

      setStepperForm((prevState) => ({
        ...prevState,
        [activeStep]: {
          ...prevState[activeStep],
          country: value,
          phoneCode: countryPhoneCode,
          state: "",
          city: "",
        },
      }));

      setStateOptions(State.getStatesOfCountry(value));
      setCityOptions(City.getCitiesOfCountry(value));

      // @@ ADD ELSE IF HERE TO HANDLE ANY OTHER
      // @@ SPECIFIC INPUT CHANGE BY NAME !!
    } else {
      setStepperForm((prevState) => ({
        ...prevState,
        [activeStep]: {
          ...prevState[activeStep],
          [name]: value,
        },
      }));
    }
  };

  const createSubscription = async (subscriptionData) => {
    try {
      console.log(subscriptionData);
      const response = await axios.post(
        " https://us-central1-moufit-prod.cloudfunctions.net/api/subscription/apply-subscription",
        subscriptionData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      // throw error.response.data;
    }
  };
  const [couponMsg, setCouponMsg] = useState("");
  const checkCouponInfo = async () => {
    try {
      console.log(selectedPlan);
      // console.log(stepperForm[2].code);
      const tempResp = await axios.post(
        ` https://us-central1-moufit-prod.cloudfunctions.net/api/coupon/check-coupon/${optionalValues[2]?.code}/${selectedPlan?.plan?.id}`
      );
      console.log(tempResp);
      if (tempResp?.couponExists) {
        // @@ COUPON EXIST
        setCouponMsg("VALID COUPON CODE");
      } else {
        // @@ COUPON DOESNOT EXIST
        setCouponMsg("INVALID COUPON CODE");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (stepperForm[1].country !== "") {
      const states = State.getStatesOfCountry(stepperForm[1].country);
      setStateOptions(states);
      const cities = City.getCitiesOfCountry(stepperForm[1].country);
      setCityOptions(cities);
    } else {
      setStateOptions([]); // Clear the state options if no country is selected
    }
  }, [stepperForm[1].country]);

  useEffect(() => {}, [couponMsg]);

  return (
    <div className="new-join-in-form">
      <Box sx={{ width: "50%", margin: "50px auto" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Step {activeStep + 1}
              </Typography>
              <div style={Styles.inputFieldWrapper}>
                {activeStep === 0 && (
                  <>
                    <TextField
                      name="firstName"
                      label="First Name"
                      value={stepperForm[activeStep].firstName}
                      onChange={handleInputChange}
                      style={Styles.inputField}
                      inputProps={{
                        style: {
                          padding: 9.5,
                          width: "95%",
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      name="lastName"
                      label="Last Name"
                      value={stepperForm[activeStep].lastName}
                      onChange={handleInputChange}
                      style={Styles.inputField}
                      inputProps={{
                        style: {
                          padding: 9.5,
                          width: "95%",
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />

                    <TextField
                      name="email"
                      label="Email"
                      value={stepperForm[activeStep].email}
                      onChange={handleInputChange}
                      style={Styles.inputField}
                      inputProps={{
                        style: {
                          padding: 9.5,
                          width: "95%",
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </>
                )}
                {activeStep === 1 && (
                  <>
                    <TextField
                      name="addressOne"
                      label="Address Line 1"
                      value={stepperForm[activeStep].addressOne}
                      onChange={handleInputChange}
                      style={Styles.inputField}
                      inputProps={{
                        style: {
                          padding: 9.5,
                          width: "95%",
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      name="addressTwo"
                      label="Address Line 2"
                      value={optionalValues[activeStep].addressTwo}
                      onChange={handleInputChange}
                      style={Styles.inputField}
                      inputProps={{
                        style: {
                          padding: 9.5,
                          width: "95%",
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      name="zip"
                      label="ZIP Code"
                      value={stepperForm[activeStep].zip}
                      onChange={handleInputChange}
                      style={Styles.inputField}
                      inputProps={{
                        style: {
                          padding: 9.5,
                          width: "95%",
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      label="Country"
                      name="country"
                      placeholder="Country"
                      value={stepperForm[activeStep].country ?? ""}
                      onChange={handleInputChange}
                      inputProps={{
                        style: {
                          padding: 9.5,
                        },
                      }}
                      size="small"
                      style={Styles.inputField}
                      sx={{
                        // width: "95%",
                        fontSize: "11px",
                        textAlign: "initial",
                      }}
                      select
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {Country?.getAllCountries()?.map((country, index) => (
                        <MenuItem key={country.isoCode} value={country.isoCode}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    {stepperForm[activeStep].country !== "" && (
                      <TextField
                        label="State"
                        name="state"
                        placeholder="State"
                        value={stepperForm[activeStep].state ?? ""}
                        onChange={handleInputChange}
                        inputProps={{
                          style: {
                            padding: 9.5,
                          },
                        }}
                        size="small"
                        style={Styles.inputField}
                        sx={{
                          // width: "95%",
                          fontSize: "11px",
                          textAlign: "initial",
                        }}
                        select
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                      >
                        {stateOptions.map((state) => (
                          <MenuItem key={state.isoCode} value={state.isoCode}>
                            {state.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}

                    {stepperForm[activeStep].state !== "" && (
                      <TextField
                        label="City"
                        name="city"
                        placeholder="City"
                        value={stepperForm[activeStep].city ?? ""}
                        onChange={handleInputChange}
                        inputProps={{
                          style: {
                            padding: 9.5,
                          },
                        }}
                        size="small"
                        style={Styles.inputField}
                        sx={{
                          // width: "95%",
                          fontSize: "11px",
                          textAlign: "initial",
                        }}
                        select
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                      >
                        {cityOptions.map((city) => (
                          <MenuItem key={city.name} value={city.name}>
                            {city.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}

                    {stepperForm[activeStep].city !== "" && (
                      <Box sx={Styles.phoneWrapper}>
                        <span style={Styles.codeContainer}>
                          {stepperForm[1]?.phoneCode ?? ""}
                        </span>
                        <TextField
                          name="phone"
                          label="Phone"
                          value={stepperForm[activeStep].phone}
                          onChange={handleInputChange}
                          sx={[Styles.inputField, { width: "100%" }]}
                          inputProps={{
                            style: {
                              padding: 9.5,
                              width: "95%",
                            },
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Box>
                    )}
                    {/* <input type='text'   /> */}
                  </>
                )}
                {activeStep === 2 && (
                  <Box sx={[Styles.inputFieldWrapper, { width: "70%" }]}>
                    {planSwitch === true ? (
                      <Box sx={Styles.planWrapper}>
                        <Typography variant="body1" gutterBottom>
                          Plan ID:{" "}
                          {stepperForm[2]?.planId ??
                            planId?.planId?.plan?.id ??
                            ""}
                        </Typography>
                        <IconButton
                          color="warning"
                          aria-label="search coupon"
                          onClick={() => {
                            setPlanSwitch(!planSwitch);
                            stepperForm[2].code = "";

                            setStepperForm(stepperForm);
                            console.log(stepperForm);
                          }}
                        >
                          <ChangeCircleIcon sx={Styles.planIcon} />
                        </IconButton>
                      </Box>
                    ) : (
                      <TextField
                        sx={[Styles.couponWrapper]}
                        fullWidth
                        required
                        id="planId"
                        name="planId"
                        label="Subscription Plan"
                        select
                        value={selectedPlan?.plan?.name ?? ""}
                        onChange={(e) => {
                          const selectedPlanId = e.target.value;
                          const selectedPlanObject = plansList?.find(
                            (plan) => plan?.plan?.name === selectedPlanId
                          );
                          setPlanSwitch(!planSwitch);
                          setSelectedPlan(selectedPlanObject);
                          setStepperForm((prevState) => ({
                            ...prevState,
                            [2]: {
                              ...prevState[2],
                              planId: selectedPlanObject?.plan?.name,
                            },
                          }));
                        }}
                      >
                        {(planId?.priceData ?? plansList).map((plan) => (
                          <MenuItem
                            key={plan?.plan?.name}
                            value={plan?.plan?.name}
                          >
                            {plan?.plan?.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}

                    {/* {selectedPlan?.plan?.name && ( */}
                    <Box sx={Styles.couponWrapper}>
                      <TextField
                        id="code"
                        name="code"
                        label="Coupon Code"
                        fullWidth
                        value={optionalValues[2].code}
                        // onChange={(e) => handleInputChange(2, 'code', e.target.value)}
                        onChange={handleInputChange}
                      />

                      <IconButton
                        onClick={checkCouponInfo}
                        disabled={optionalValues[2].code === ""}
                        sx={Styles.couponBtn}
                        color="secondary"
                        aria-label="search coupon"
                      >
                        <SearchIcon
                          sx={[
                            Styles.couponIcon,
                            {
                              color:
                                optionalValues[2].code === "" ? "black" : "",
                            },
                          ]}
                        />
                      </IconButton>

                      {optionalValues[2].code !== "" &&
                        couponMsg !== "" &&
                        couponMsg}
                    </Box>
                    {/* )} */}
                  </Box>
                )}

                {activeStep === 3 && (
                  <>
                    {/* <iframe src={'https://moufit.chargebee.com/pages/v3/YUSUvcLcucu0KbLSDhsbCOZqT9gD0MNcuQc/'} title="Checkout" width="100%" height="500px" /> */}
                    Proceed To Checkout By Clicking Finish
                    {/* {tempUrl ?? ''} */}
                  </>
                )}

                <div style={Styles.btnsWrapper}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>

                  {/* <Button onClick={() => createSubscription({
                  'plan_id': selectedPlan?.plan?.id,
                  'auto_collection': 'off',
                  'first_name': stepperForm[0].firstName,
                  'last_name': stepperForm[0].lastName,
                  'email': stepperForm[0].email,
                  'phone': `${stepperForm[1].phoneCode}${stepperForm[1].phone}`, // `${stepperForm[1].phoneCode}${stepperForm[1].phone}`
                  // 'company': stepperForm[0].company,

                  'line1': stepperForm[1].addressOne,
                  'line2': stepperForm[1].addressTwo,

                  'city': stepperForm[1].city,
                  'state': stepperForm[1].state,
                  'zip': stepperForm[1].zip,
                  'country': stepperForm[1].country,

                  'coupons': stepperForm[2].code

                })}>Apply</Button> */}
                  {/* {activeStep !== steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1 }}
                    disabled={nextBtnDisplay}
                  >
                    Next
                  </Button>
                ) : 'Finish'} */}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1 }}
                    disabled={nextBtnDisplay}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Box>
    </div>
  );
}

export default NewJoinInForm;
