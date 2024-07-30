import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import HeaderBannerPages from '../../Components/Sections/HeaderBannerPages/HeaderBannerPages'
import JoinInForm from '../../Components/Sections/JoinInForm/JoinInForm'
import NewJoinInForm from '../../Components/Sections/JoinInForm/NewJoinInForm'

function Joinnow() {

  const location = useLocation();
  // const [planId, setPlanId] = useState('');
  // const [planList, setPlanList] = useState([]);
  const [plansObj, setPlansObj] = useState({})


  useEffect(() => {
    const data = location?.state?.tempObj;
    // console.log(data);
    if (data) {
      setPlansObj({
        planId: data?.planId,
        priceData: data?.priceData,
      });
    }
    // setPlanId(data);
  }, [location?.state?.tempObj]);

  // useEffect(() => {
  //   const data = location?.state?.planId?.priceData;
  //   console.log(data);
  //   setPlanList(data);
  // }, [location?.state?.planId?.priceData, planList]);


  return (
    <>
      <HeaderBannerPages text="Join Now" />
      
      {/* <JoinInForm planId={plansObj} /> */}
      <NewJoinInForm planId={plansObj} />
    </>
  )
}

export default Joinnow