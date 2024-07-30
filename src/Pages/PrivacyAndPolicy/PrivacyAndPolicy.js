import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { setSingleBannerState } from "../../Components/Helpers/apiCalls/globalApiCalls";
import FixedContainer from "../../Components/Sections/FixedContainer/FixedContainer";

const PrivacyAndPolicy = () => {
  // const [gridSpan, setGridSpan] = useState(6);
  const [policyData, setPolicyData] = useState({});

  const fetchPolicyData = async () => {
    const firstBannerCall = await setSingleBannerState(
      "privacy_and_policy",
      "global_customization",
      setPolicyData
    );
    console.log(firstBannerCall);
  };

  useEffect(() => {
    fetchPolicyData();
  }, []);

  useEffect(() => {}, [policyData]);

  return (
    <Grid container xs={12}>
      <FixedContainer data={policyData?.policy_section} />
      <FixedContainer data={policyData?.privacy_section} />

    </Grid>
  );
};

export default PrivacyAndPolicy;
