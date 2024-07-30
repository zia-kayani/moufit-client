import React, { useEffect, useState } from "react";
import ContactForm from "../../Components/Sections/ContactForm/ContactForm";
import ContactUsIcons from "../../Components/Sections/ContactUsIcons/ContactUsIcons";
import HeaderBannerPages from "../../Components/Sections/HeaderBannerPages/HeaderBannerPages";
import "./ContactUs";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import {
  fetchImgSrcListFromFirebase,
  getAllDocsWithinCollection,
  getSingleFirebaseDocById,
  setSingleBannerState,
} from "../../Components/Helpers/apiCalls/globalApiCalls";
import { CircularProgress } from "@mui/material";
import LoaderComp from "../../Components/Sections/Loader/LoaderComp";

const testDynamicSections = [
  {
    label: "main_banner",
    index: 1,
    is_active: true,
    body: { title: "Contact Us !" },
  },
  // {title: 'main_banner', index: 1, is_active: 'true', body: {title: 'Contact Us !'}},
  {
    label: "three_icons",
    index: 0,
    is_active: true,
    body: [
      {
        heading: "Address",
        info: "AddressAstrolabs, Parkside Retail Level - Cluster R - Jumeirah Lakes Towers - Dubai",
      },
      {
        heading: "Address",
        info: "AddressAstrolabs, Parkside Retail Level - Cluster R - Jumeirah Lakes Towers - Dubai",
      },
    ],
  },
  {
    label: "contact_form",
    index: 2,
    is_active: true,
    body: {
      heading: "Contact Us !",
      paragraph:
        "We share a common interest to revolutionise the way fitness is consumed.",
      btnText: "Send Message",
    },
  },
];
// console.log('unsort', testDynamicSections);
// console.log('sort',testDynamicSections.sort((a, b) => a.index - b.index));

function ContactUs() {
  const [dynamicBannerObj, setDynamicBannerObj] = useState([]);

  const [firstBannerImgs, setFirstBannerImgs] = useState({});
  const [secondBannerImg, setSecondBannerImg] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getContactSectionsFromFirebase = async () => {
    try {
      const fetchSections = async (respArr) => {
        return await getAllDocsWithinCollection("contact_us_dynamic_page");
      };
      let resp = fetchSections().then((data) => {
        console.log(data);
        setDynamicBannerObj(data);
      });
      console.log(resp);

      setIsLoading(true);

      console.log("COntact Us  dynamicBannerCall", dynamicBannerObj);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  // const getContactSectionsFromFirebase = async () => {

  //     try {
  //         setIsLoading(true);

  //         // const dynamicBannerCall = await setSingleBannerState("contact_page", 'pages_customization', setDynamicBannerObj);
  //         const dynamicBannerCall = await setSingleBannerState("contact_us_test_page", 'test_collection', setDynamicBannerObj);

  //         console.log('dynamicBannerCall', dynamicBannerCall);
  //         setIsLoading(false);

  //     } catch (err) {
  //         console.error(err);
  //         setIsLoading(false);

  //     };
  // };

  useEffect(() => {}, [isLoading]);

  const getContactImgsFromFirebase = async () => {
    fetchFirstBannerImgs();
    fetchSecondBannerImgs();
  };

  const fetchFirstBannerImgs = async () => {
    try {
      const firstBannerDesktopImg = await fetchImgSrcListFromFirebase(
        "/contact_page",
        "/first_banner_imgs",
        "/desktop_imgs"
      );
      const firstBannerMobileImg = await fetchImgSrcListFromFirebase(
        "/contact_page",
        "/first_banner_imgs",
        "/mobile_imgs"
      );

      setFirstBannerImgs({
        desktop_img:
          firstBannerDesktopImg[0]?.url ?? "/MoufitMedia/moufitPagesBanner.jpg",
        mobile_img: firstBannerMobileImg[0]?.url ?? "/MoufitMedia/overlay.png",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSecondBannerImgs = async () => {
    try {
      const imgsArr = await fetchImgSrcListFromFirebase(
        "/contact_page",
        "/second_banner_imgs"
      );
      setSecondBannerImg(imgsArr);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getContactSectionsFromFirebase();
    getContactImgsFromFirebase();

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {}, [dynamicBannerObj]);

  useEffect(() => {}, [firstBannerImgs, secondBannerImg]);

  return (
    <>
      <div className="contactUs">
        {isLoading ? (
          <LoaderComp />
        ) : (
          <>
            {dynamicBannerObj
              ?.sort((a, b) => a.index - b.index)
              ?.map((section, ind) => {
                if (section.is_active) {
                  if (
                    section.label === "main_banner"
                    //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                  ) {
                    return (
                      <HeaderBannerPages
                        imgData={firstBannerImgs}
                        text={section?.body?.title ?? "Contact Us"}
                      />
                    );
                  } else if (
                    section.label === "three_icons"
                    //  && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                  ) {
                    return (
                      <ContactUsIcons
                        imgData={secondBannerImg}
                        defaultIcon={"./MoufitMedia/locationContact.svg"}
                        newData={section?.body}
                        data={[
                          {
                            imageIcon:
                              section?.body?.col1?.imgSrc ??
                              "./MoufitMedia/locationContact.svg",
                            heading: section?.body?.col1?.heading ?? "Address",
                            info:
                              section?.body?.col1?.info ??
                              "AddressAstrolabs, Parkside Retail Level - Cluster R - Jumeirah Lakes Towers - Dubai",
                          },
                          {
                            imageIcon:
                              section?.body?.col2?.imgSrc ??
                              "./MoufitMedia/mobileContact.svg",
                            heading: section?.body?.col2?.heading ?? "Call Us",
                            info:
                              section?.body?.col2?.info ?? "+971 56 964 2280",
                          },
                          {
                            imageIcon:
                              section?.body?.col3?.imgSrc ??
                              "./MoufitMedia/emailContact.svg",
                            heading: section?.body?.col3?.heading ?? "Email",
                            info: section?.body?.col3?.info ?? "yalla@mou.fit",
                          },
                        ]}
                      />
                    );
                  } else if (
                    section.label === "contact_form"
                    // && ind === section.index // @@ BECAUSE ARRAY IS SORTED FIRST, BEFORE MAPPING STARTS !
                  ) {
                    return (
                      <ContactForm
                        title={{
                          heading: section?.body?.title ?? "Contact Us",
                          paragraph:
                            section?.body?.desc ??
                            "We share a common interest to revolutionise the way fitness is consumed.",
                          btnText: section?.body?.btnText ?? "Send Message",
                        }}
                      />
                    );
                  }
                }
                return null;
              })}
          </>
        )}
      </div>
    </>
  );
}

export default ContactUs;
