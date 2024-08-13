import React, { useState, useEffect } from "react";
import "./JoinInForm.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm, useFieldArray } from "react-hook-form";
import { FieldArray } from "formik";
import {
  AddCircleOutlineOutlined,
  CheckBox,
  DeleteOutline,
} from "@mui/icons-material";
import { Backdrop, CircularProgress, IconButton } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  GeoPoint,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../../firebase-config";
import Snackbar from '@mui/material/Snackbar';
import { createUserWithEmailAndPassword } from "firebase/auth";
import CloseIcon from '@mui/icons-material/Close';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import AddressLookup from './AddressLookup'

// const steps = ["User", "Partner", "Bank", "Document", "Terms"];
const steps = ["User", "Partner", "Document", "Terms"];
const sampleRichText = `<p>Moufit DMCC is a DMCC Free Zone company incorporated under the laws of Dubai, United Arab Emirates with business licence number DMCC179386 (“Moufit”, “We”, “Our”, “Us”) and having its principal place of business at Office 106, The Binary, Al Abraj Street, Business Bay, P.O. Box 413383, Dubai, United Arab Emirates.</p>
<p>Moufit is the owner and/or licensor of the Platform and is in the business of providing the Online Services.</p>
<p>Gym Partner warrants and represents to Moufit that it is the entity specified in Part A | Particulars, and that:</p>
<ol>
  <li>it is incorporated under and in accordance with Applicable Laws;</li>
  <li>it is licensed to operate the Gyms in accordance with Applicable Laws and/or all required Approvals; and</li>
  <li>the Authorised Representative is authorised to agree and accept these T&amp;C’s.</li>
</ol>
<p>Once agreed, the Part A | Particulars taken together with these T&amp;C’s constitutes a binding agreement by and between each of Moufit and the Gym Partner (each constituting a “Party” and together the “Parties”).</p>
<p>The Parties acknowledge and agree that these T&amp;C’s are binding upon each of them and each shall procure that its Personnel shall observe the terms and conditions contained herein.</p>
<h2>CONSENT AND AGREEMENT</h2>
<p>By registering for a Gym Partner Account and/or allowing Customers access to your Gym(s) and/or providing Fitness Services to Customers, Gym Partner acknowledges and agrees that it has understood, accepts and shall comply with these T&amp;Cs.</p>
<h2>INDEPENDENCE OF MOUFIT &amp; GYM PARTNER</h2>
<p>Gym Partner acknowledges and agrees that:</p>
<ol>
  <li>it is and shall remain independent and unrelated to Moufit; and/or</li>
  <li>Moufit does not control or have any right to control, whether under these T&amp;Cs or otherwise, the manner or means by which Gym Partner and/or its Personnel:</li>
  <ul>
    <li>operate the Gym(s); and/or</li>
    <li>perform or provide Fitness Services (if and where relevant) as may be requested by a Customer.</li>
  </ul>
</ol>
<p>Gym Partner irrevocably acknowledges and agrees that it is solely responsible for and shall hold Moufit harmless in respect of:</p>
<ol>
  <li>operating the Gym(s) and/or providing the Fitness Services in accordance with Applicable Law and in accordance with Good Industry Practice and/or all Approvals;</li>
  <li>any loss of or damage to any property of a Customer, the Gym Partner or any third party user of the Gym(s) howsoever arising;</li>
  <li>any death or personal injury of any user(s) of the Gym(s) (including without limitation Customers provided Gym Access) or the Gym Partner’s Personnel howsoever arising; and</li>
  <li>any loss or liability of any nature sustained or arising from permitting a Customer with Gym Access.</li>
</ol>
<h2>PROVISION OF THE PLATFORM, MOUFIT DEVICE AND THE ONLINE SERVICES</h2>
<p>In consideration for the Gym Partner:</p>
<ul>
  <li>complying with these T&amp;C’s;</li>
  <li>providing Gym Access to Customers at the Gym(s); and/or</li>
  <li>providing Fitness Services as may be requested by Customers (if and where relevant),</li>
<p>Moufit shall:</p>
<ul>
  <li>provide the Platform and the Online Services to the Gym Partner; and</li>
  <li>supply the Moufit Device (if and where applicable) to the Gym Partner.</li>
</ul>
<p>Gym Partner acknowledges and agrees that the supply of the Moufit Device is subject to separate terms and conditions.</p>
`;

const DynamicUseFormInput = ({ data, useFormPropsObj, setNextBtnDisplay }) => {
  const { register, getValues, setValue, checkUserFieldVals } = useFormPropsObj;
  const { index, target } = data;
  return (
    <input
      className="commonInput"
      type="text"
      {...register(`locations[${index}].${target}`)}
      placeholder={target}
      value={getValues(`locations[${index}].${target}`) ?? ""}
      onChange={(e) => {
        setValue(`locations[${index}].${target}`, e.target.value ?? "");
        let isFormComplete = checkUserFieldVals();
        setNextBtnDisplay(isFormComplete);
      }}
    />
  );
};

function JoinInForm() {
  const { register, control, getValues, setValue, watch } = useForm({
    defaultValues: {
      joinInForm: {
        file1: "",
        file2: "",
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "locations",
  });

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [nextBtnDisplay, setNextBtnDisplay] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  let [stepperFormOne, setStepperFormOne] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  let [stepperFormTwo, setStepperFormTwo] = useState({
    // category: "selectCategory",
    businessName: "",
    // location: [
    //     { name: '', lat: '', long: '', address1: '', address2: '' },
    // ],
    businessPhone: "",
    // service: "serviceSelect",
    // address: '',
  });
  let [stepperFormThree, setStepperFormThree] = useState({
    beneficiaryName: "",
    bankName: "",
    branchName: "",
    accountNumber: "",
    ibanNumber: "",
    swiftCode: "",
  });
  let [stepperFormFour, setStepperFormFour] = useState({
    file1: "",
    file1Url: "",
    file2: "",
    file2Url: "",
    file3: "",
    file3Url: "",
  });

  let [stepperFormFive, setStepperFormFive] = useState({
    agreeToTerms: false,
  });
  
  const [loading, setLoading] = useState(false);

  const createDocument = async (companyName) => {
    try {
      const collectionExists = await checkCollectionExists("gym_partners");
      if (!collectionExists) {
        await createCollection("gym_partners");
      }

      const timestamp = new Date().getTime();
      const docId = `${timestamp}_${companyName}`;

      const documentData = {
        id: docId,
        company: companyName,
        status: "pending",
        response: "complete response goes here",
      };

      await db.collection("gym_partners").doc(docId).set(documentData);
      console.log("Document created successfully:", docId);
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  const checkCollectionExists = async (collectionName) => {
    try {
      const collectionRef = db.collection(collectionName ?? "gym_partners");
      const snapshot = await collectionRef.limit(1).get();
      return !snapshot.empty;
    } catch (error) {
      console.error("Error checking collection:", error);
      return false;
    }
  };

  const createCollection = async (collectionName) => {
    try {
      await db.collection(collectionName).doc();
      console.log("Collection created successfully:", collectionName);
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  };

  const checkUserFieldVals = () => {
    let isFormComplete = true;
    getValues("locations")?.map((x) => {
      isFormComplete = Object.values(x).every((value) => value !== "");
    });
    console.log("isFormComplete func", isFormComplete);

    return isFormComplete;
  };

  useEffect(() => {
    // Initialize a variable to track the form completion status
    let isFormComplete = true;

    switch (activeStep) {
      case 0:
        // Check if all fields in stepperFormOne are filled
        isFormComplete = Object.values(stepperFormOne).every(
          (value) => value !== ""
        );
        break;
      case 1:
        // Check if all fields in stepperFormTwo are filled
        isFormComplete = Object.values(stepperFormTwo).every(
          (value) => value !== ""
        );
        isFormComplete = checkUserFieldVals();

        break;
      case 2:
        isFormComplete = Object.values(stepperFormFour).every((value) => value !== "");
        isFormComplete = isFormComplete;
        break;
      case 3:
        // isFormComplete = Object.values(stepperFormThree).every(
        //   (value) => value !== ""
        // );
        isFormComplete = Object.values(stepperFormFive).every(
          (value) => value !== ""
        );
        break;
      case 4:
        // Check if all fields in stepperFormFive are filled
        // isFormComplete = Object.values(stepperFormFive).every(
        //   (value) => value !== ""
        // );
        isFormComplete = true;
        break;
      default:
        // Default to true for other steps
        isFormComplete = true;
    }

    // Set the next button display based on the form completion status
    setNextBtnDisplay(isFormComplete);
    console.log("nextBtnDisplay", nextBtnDisplay);
  }, [
    stepperFormOne,
    stepperFormTwo,
    stepperFormThree,
    stepperFormFour,
    stepperFormFive,
    activeStep,
  ]);

  useEffect(() => {
    console.log(
      stepperFormOne,
      stepperFormTwo,
      stepperFormThree,
      stepperFormFour,
      stepperFormFive,
      activeStep
    );
    // console.log(
    //     getValues('locations')?.map(x => {

    //     })
    // )
  }, [nextBtnDisplay]);

  const onChangeOne = (e) => {
    try {
      var targetValue = e.target.value;
      if (targetValue === "" || targetValue === " " || targetValue === "") {
        targetValue = null;
      }
      setStepperFormOne((prevState) => ({
        ...prevState,
        [e.target.name]: targetValue,
      }));
      console.log("the stepped form one values", stepperFormOne);
    } catch (err) {
      console.error(err);
    }
  };

  const onChangeTwo = (e) => {
    try {
      setStepperFormTwo((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e, target) => {
    if (e) {
      try {
        const file = e?.target?.files[0];
        const reader = new FileReader();
        reader.onloadend = async () => {
          const imageData = reader?.result;

          // Set the optimized image URL

          // Set the image source using the optimized URL
          //   setStepperFormThree((prevState) => ({
          //     ...prevState,
          //     // [e.target.name]: e.target.value,
          //     [e.target.name]: imageData,
          console.log("imageData Here", imageData);
          setStepperFormFour((prevState) => ({
            ...prevState,
            // [e.target.name]: e.target.value,
            [`${e.target.name}Url`]: imageData,

            // [e.target.name]: e.target.value?.substring(e.target.value?.lastIndexOf('-')+1) ,

            // [e.target.name]: handleImageChange(e),
          }));

          console.log("stepperFormFour Here", stepperFormFour);

          //   }));
          // return imageData
          // return reader?.result
        };
        if (file) {
          reader?.readAsDataURL(file);
          // let tempUrl = reader?.readAsDataURL(file);
          //   return tempUrl;
        }
      } catch (err) {
        console.error(err);
      }
    }
    // console.log('target',`${target}`)
  };
  const onChangeThree = async (e) => {
    try {
      console.log(stepperFormThree);
      //   console.log(e.target.value?.substring(e.target.value?.lastIndexOf('-')+1));
      handleImageChange(e);
      setStepperFormFour((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        // [`${e.target.name}Url`]: tempUrl,

        // [e.target.name]: e.target.value?.substring(e.target.value?.lastIndexOf('-')+1) ,

        // [e.target.name]: handleImageChange(e),
      }));
    } catch (err) {
      console.error(err);
    }
  };
  const onFilesChangeThree = (e) => {
    const { name, files, value } = e.target;
    // console.log("The target name", name);
    // console.log("The target files", files);

    // Assuming you want to store the file object(s) in your state
    console.log(setStepperFormThree);
    setStepperFormThree((prevState) => ({
      ...prevState,
      [name]: files[0].name ?? "",
    }));
    console.log(setStepperFormThree);
  };

  const handleUseFormFileChange = (e, name) => {
    console.log(e);
    console.log(watch());

    // setValue(`joinInForm.${name}`, e?.name ?? "")
    setValue(`joinInForm.${name}`, e ?? "");
  };
  const onChangeFour = (e) => {
    try {
      setStepperFormThree((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const onChangeFive = (e) => {
    try {
      console.log(e.target.checked);
      setStepperFormFive({ agreeToTerms: e.target.checked });
    } catch (err) {
      console.error(err);
    }
  };

  const isStepOptional = (step) => {
    // return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    try {
      // @@ IF activeStep === 3 || activeStep === 4, show popup that you won't be able to go back
      // @@ with confirm or cancel option !!!!
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);

      if(activeStep === 0 || activeStep === 1) {
        setStepperFormFour({
          file1: "",
          file1Url: "",
          file2: "",
          file2Url: "",
          file3: "",
          file3Url: "",
        })
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBack = () => {
    try {
      if (activeStep === 3) {
        setActiveStep(activeStep - 1);
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      }
      setStepperFormFour({
        file1: "",
        file1Url: "",
        file2: "",
        file2Url: "",
        file3: "",
        file3Url: "",
      })
    } catch (err) {
      console.error(err);
    }
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleAddLocations = (data, index, e) => {
    let tempObj = {
      name: "",
      lat: "",
      long: "",
      address1: "",
      address2: "",
    };
    append(tempObj);

    // console.log(data);
    // console.log(index && index);
    if (!index && !data) {
      // tempObj = {
      //     name: '',
      //     lat: '',
      //     address1: '',
      //     address2: '',
      // };
    } else if (index && data) {
      // append(tempObj);
      // setValue(`locations[${index}].name`, data?.name);
      // setValue(`locations[${index}].lat`, data?.lat);
      // setValue(`locations[${index}].address1`, data?.address1);
      // setValue(`locations[${index}].address2`, data?.address2);
      // tempObj = {
      //     name: data?.name ?? '',
      //     lat: data?.lat ?? '',
      //     address1: data?.address1 ?? '',
      //     address2: data?.address2 ?? '',
      // };
      // append(tempObj);
    }
  };

// Convert base64 string to a Blob
const base64ToBlob = (base64) => {
  if (!base64 || !base64.includes(',')) {
    throw new Error("Invalid base64 string");
  }
  
  const [meta, content] = base64.split(",");
  const contentType = meta.match(/data:(.*);base64/)[1];
  const byteCharacters = atob(content);
  const byteArrays = Array.from({ length: Math.ceil(byteCharacters.length / 512) }, (_, offset) => {
    const slice = byteCharacters.slice(offset * 512, (offset + 1) * 512);
    return new Uint8Array(slice.split("").map((char) => char.charCodeAt(0)));
  });
  return new Blob(byteArrays, { type: contentType });
};

// Upload base64 data to Firebase Storage and return the download URL
const uploadBase64File = async (base64String, filePath) => {
  try {
    const blob = base64ToBlob(base64String);
    const storageRef = ref(storage, filePath);
    const snapshot = await uploadBytes(storageRef, blob);
    return getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error(`Error uploading ${filePath}:`, error);
    return null; // Return null if there was an error
  }
};

  const mapToCollectionFormat = (partnerData) => {
    const obj = {
      user_type: 2,
      first_name: stepperFormOne.firstName,
      last_name: stepperFormOne.lastName,
      phone: stepperFormOne.phone,
      email: stepperFormOne.email,
      business_name: stepperFormTwo.businessName,
      business_phone: stepperFormTwo.businessPhone,
      is_agreed: stepperFormFive.agreeToTerms,
      documents: [
        stepperFormFour?.file1Url || "",
        stepperFormFour?.file2Url || "",
        stepperFormFour?.file3Url || "",
      ],
      status: 'pending',
    };

    return obj;
  };

  const sendPartnerApproval = async () => {
    setLoading(true);
    // create partner as user
    const partnerInfo = mapToCollectionFormat();
    const password = "12345678";
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        partnerInfo.email,
        password
      );
      partnerInfo.id = response.user.uid;

      let locations = getValues('locations')
      locations = locations.map((location) => ({...location, lat_long: new GeoPoint(location.lat, location.long) , partner_id: partnerInfo.id}))
      // add partner's data to users collection

      console.log('partnerInfo', partnerInfo)

      const resp = await setDoc(doc(db, "users", partnerInfo.id), partnerInfo);

      const locationPromises = locations.map(async (item, index) => {
        const docRef = await setDoc(doc(db, 'locations', partnerInfo.id + '-' +index), item);
        console.log('Document written with ID: ', docRef);
      });
  
      await Promise.all(locationPromises); // Wait for all uploads to complete


      const uploadPromises = partnerInfo.documents.map((base64) => {
        const [meta] = base64.split(",");
        const contentType = meta.match(/data:(.*);base64/)[1];
        const extension = contentType.split("/")[1]; // Get file extension from content type
        const timestamp = Date.now(); // Get the current timestamp
        const filePath = `files/${timestamp}.${extension}`; // Use timestamp as the filename
        return uploadBase64File(base64, filePath);
      });
      
      const downloadURLs = await Promise.all(uploadPromises);

      // Filter out any null URLs resulting from failed uploads
      const validURLs = downloadURLs.filter((url) => url !== null);
      console.log("Uploaded successfully:", validURLs);
      if (resp == undefined && validURLs) {
        // success
        setLoading(false);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setMessage("Account created Successfully!");
        setOpen(true);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      if (error?.message === "Firebase: Error (auth/email-already-in-use).") {
      } else {
        setOpen(true);
        setMessage("Something went wrong! Please try again.");
      }
    }
    return;
  };
  const useFormPropsObj = {
    getValues,
    setValue,
    register,
    checkUserFieldVals,
  };
  useEffect(() => {
    console.log(watch());
    if (getValues("locations")?.length === 0) {
      handleAddLocations();
    }
  }, [watch]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const isAddressFieldEmpty = () => {
    const locations = getValues('locations');
    const isAddressEmpty = locations.some(item => !item.address1 || item.address1.trim() === "");
    return !isAddressEmpty;
  };

  const isStepTwoComplete = () => {
    if(activeStep === 1) {
      if (stepperFormTwo.businessName === '') return true;
      if (stepperFormTwo.businessPhone === '')return true;

      isAddressFieldEmpty()
    } else {
      return false;
    }
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: 999999 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
      <Box sx={{ width: "50%", margin: "50px auto" }}>
        <Stepper activeStep={activeStep} sx={{flexWrap: 'wrap'}}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
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
        <div className="main-Container">
          {activeStep === 0 ? (
            <>
              <div className="inputContainer noyh-regular-moufit userForm">
                <input
                  className="commonInput"
                  type="text"
                  placeholder="First Name"
                  value={stepperFormOne.firstName}
                  onChange={onChangeOne}
                  name="firstName"
                />
                <input
                  className="commonInput"
                  type="text"
                  placeholder="Last Name"
                  value={stepperFormOne.lastName}
                  onChange={onChangeOne}
                  name="lastName"
                />
                <input
                  className="commonInput"
                  type="tel"
                  placeholder="Phone Number"
                  value={stepperFormOne.phone}
                  onChange={onChangeOne}
                  name="phone"
                />
                <input
                  className="commonInput"
                  type="email"
                  placeholder="Email"
                  value={stepperFormOne.email}
                  onChange={onChangeOne}
                  name="email"
                />
              </div>
            </>
          ) : null}

          {activeStep === 1 ? (
            <>
              <div className="inputContainer noyh-regular-moufit partnerForm">
                <input
                  className="commonInput"
                  type="text"
                  placeholder="Business Name"
                  value={stepperFormTwo.businessName}
                  onChange={onChangeTwo}
                  name="businessName"
                />
                <input
                  className="commonInput"
                  type="number"
                  placeholder="Business Phone"
                  value={stepperFormTwo.businessPhone}
                  onChange={onChangeTwo}
                  name="businessPhone"
                />
                {fields?.map((field, index) => (
                  <React.Fragment key={index}>
                    {/* @@ ADD + ICON IN EVERY ROW, and send complete item to make  */}
                    {/* @@ duplicate entry of any location  */}
                    <div className="dynamicSectionWrapper">
                      {`Location ${index + 1}`}
                      <div>
                        {index === 0 ? (
                          ""
                        ) : (
                          <IconButton
                            color="error"
                            aria-label="search coupon"
                            onClick={() => remove(index)}
                          >
                            <DeleteOutline />
                          </IconButton>
                        )}
                        {index === fields?.length - 1 && (
                          <IconButton
                            color="secondary"
                            aria-label="search coupon"
                            onClick={handleAddLocations}
                          >
                            <AddCircleOutlineOutlined />
                          </IconButton>
                        )}
                      </div>
                    </div>

                    <DynamicUseFormInput
                      data={{ index, target: "name" }}
                      useFormPropsObj={useFormPropsObj}
                      setNextBtnDisplay={setNextBtnDisplay}
                    />

                    <AddressLookup  
                      data={{ index, target: "" }} 
                      setNextBtnDisplay={setNextBtnDisplay}
                      useFormPropsObj={useFormPropsObj}
                      setStepperFormTwo={setStepperFormTwo}
                    />
                  </React.Fragment>
                ))}
              </div>
            </>
          ) : null}

          {/* {activeStep === 3 ? ( */}
          {activeStep === 2 ? (
            <>
              <div className="inputContainer noyh-regular-moufit documentForm">
                <label className="Commonlabel">Upload Trade License</label>
                <br />
                <input
                  type="file"
                  placeholder="Upload file"
                  className="input-feild commonUpload"
                  // value={file}
                  required
                  name="file1"
                  accept="image/png, image/jpeg, .doc, .docx,.pdf"
                  value={stepperFormFour?.file1 ?? ""}
                  onChange={onChangeThree}
                />
                <br />
                <label className="Commonlabel">
                  Upload National ID (Emirates ID, or Passport copy with VISA)
                </label>
                <br />
                <input
                  type="file"
                  required
                  placeholder="Upload file2"
                  className="input-feild commonUpload"
                  name="file2"
                  accept="image/png, image/jpeg, .doc, .docx,.pdf"
                  value={stepperFormFour?.file2 ?? ""}
                  onChange={onChangeThree}
                />
                <br />

                <label className="Commonlabel">
                  Upload either certified and stamped document by the bank with
                  having the information mentioned above OR Cancelled Cheque.
                </label>

                <input
                  type="file"
                  placeholder="Browse Files"
                  className="input-feild commonUpload"
                  required
                  name="file3"
                  accept="image/png, image/jpeg, .doc, .docx,.pdf"
                  value={stepperFormFour?.file3 ?? ""}
                  onChange={onChangeThree}
                />
                <br />
              </div>
            </>
          ) : null}

          {/* {activeStep === 2 ? (
            <>
              <div className="inputContainer noyh-regular-moufit bankForm">
                <input
                  className="commonInput"
                  type="text"
                  placeholder="Beneficiary Name"
                  value={stepperFormThree?.beneficiaryName ?? ""}
                  onChange={onChangeFour}
                  name="beneficiaryName"
                />
                <input
                  className="commonInput"
                  type="text"
                  placeholder="Bank Name"
                  value={stepperFormThree?.bankName ?? ""}
                  onChange={onChangeFour}
                  name="bankName"
                />
                <input
                  className="commonInput"
                  type="text"
                  placeholder="Branch Name"
                  value={stepperFormThree?.branchName ?? ""}
                  onChange={onChangeFour}
                  name="branchName"
                />
                <input
                  className="commonInput"
                  type="text"
                  placeholder="Account Number"
                  value={stepperFormThree?.accountNumber ?? ""}
                  onChange={onChangeFour}
                  name="accountNumber"
                />
                <input
                  className="commonInput"
                  type="text"
                  placeholder="IBAN Number"
                  value={stepperFormThree?.ibanNumber ?? ""}
                  onChange={onChangeFour}
                  name="ibanNumber"
                />
                <input
                  className="commonInput"
                  type="text"
                  placeholder="Swift Code"
                  value={stepperFormThree?.swiftCode ?? ""}
                  onChange={onChangeFour}
                  name="swiftCode"
                />

                <br />
              </div>
            </>
          ) : null} */}

          {activeStep === 3 ? (
            <>
              <div className="inputContainer noyh-regular-moufit termsForm">
                <div dangerouslySetInnerHTML={{ __html: sampleRichText }} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    checked={stepperFormFive?.agreeToTerms ?? false}
                    onClick={onChangeFive}
                    name="agreeToTerms"
                  />
                  {/* <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"> */}
                  <label htmlFor="agreeToTerms">
                    I Agree to the terms and conditions !
                  </label>
                </div>
              </div>
            </>
          ) : null}

          {activeStep === steps.length ? (
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />

                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  pt: 2,
                  width: "100%",
                }}
              >
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>

                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}

                {((activeStep !== steps.length - 1 )) ?
                  (<Button
                    onClick={() => {
                      handleNext();
                      setNextBtnDisplay(false);
                    }}
                    disabled={activeStep !==1 ? !nextBtnDisplay : isStepTwoComplete()}
                    sx={{ display: "block" }}
                  >
                    Next
                  </Button>
                ) : (
                  ""
                )}

                {/* }  */}

                {/* @@ HANDLE SUBMIT HERE !!! */}
                {activeStep === steps.length - 1 && (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      onClick={() => {
                        sendPartnerApproval();
                      }}
                      // disabled={stepperFormFive.agreeToTerms === false ? false : stepperFormFive.agreeToTerms === 'false' ? false : true}
                      disabled={
                        stepperFormFive.agreeToTerms === false
                          ? true
                          : stepperFormFive.agreeToTerms === "false"
                          ? true
                          : false
                      }
                    >
                      {" "}
                      Finish
                    </Button>
                  </Box>
                )}
              </Box>
            </>
          )}
        </div>
      </Box>
    </>
  );
}

export default JoinInForm;
