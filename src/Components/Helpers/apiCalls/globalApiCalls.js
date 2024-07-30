import axios from "axios";

import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db, storage } from "../../../firebase-config";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
// import { getUniqueArray } from "../globalFuncs/globalArrFuncs";

// const getUsersListFromFirebase = async () => {
//   try {

//     const humanCollectionRef = collection(db, "homepage_customization");
//     const querySnapshot = await getDocs(humanCollectionRef);
//     const users = querySnapshot.docs.map((doc) => doc.data());
//     console.log(users);

//   } catch (err) {

//     console.log(err);
//     return err;

//   };
// };

export const getAllDocsWithinCollection = async (
  collectionName,
  documentId
) => {
  try {
    
    const collectionRef = collection(db, collectionName);

    const snapshot = await getDocs(collectionRef);

    const documents = snapshot.docs.map((doc) => ({
      // id: doc.id,
      // data: doc.data(),
      ...doc.data(),
    }));
    console.log("documents:", documents);

    let newArr = documents?.map((x) => {
      if (typeof x.related_parent !== "number") {
        return x;
      }
      // if(!x.id.includes('imgs_arr')){
      // return x
      // }
    });

    return newArr.filter((value) => value !== undefined && value !== null);
  } catch (err) {
    console.error(err);
  }
};

export const fetchImgSrcListFromFirebase = async (
  dir,
  subDir,
  childDir,
  nestedDir
) => {
  try {
    const folderPath = `gs://moufit-prod.appspot.com${dir ?? "/home_page"}${
      subDir ?? "/second_banner_img"
    }${childDir ?? ""}${nestedDir ?? ""}`;
    const folderRef = ref(storage, folderPath);
    const imageList = await listAll(folderRef);

    const promises = imageList.items.map(async (item) => {
      const imageUrl = await getDownloadURL(item);
      return { name: item.name, url: imageUrl, item: item };
    });

    const results = await Promise.all(promises);
    // console.log(results);
    return results;
  } catch (err) {
    console.error("Error fetching image list:", err);
  }
};

export const getImgUrlFromFirebase = async (imagePath) => {
  try {
    const imageURL = await getDownloadURL(ref(storage, imagePath));
    return imageURL;
  } catch (err) {
    console.error(err);
  }
};

// export const uploadImageToFirebaseStorage = async (fileObj, dirName, fileName) => {

//     try {

//         const storageRef = ref(storage, `${dirName}/${fileName}`);
//         await uploadBytes(storageRef, fileObj);
//         let downloadURL = await getDownloadURL(storageRef);
//         return downloadURL;
//         } catch (err) {
//             console.error(err);
//         };
// };

// @@-----------------------------------------------------------------------------------------------------------------------------
// @@ **LOGIC/REASON** IN ORDER TO STORE IMGS OR ALL OBJS AS SEPARATE DOCUMENT IN COLLECTION FOR REMOVING SIZE/DATA DEPENDENCY !!!
// @@-----------------------------------------------------------------------------------------------------------------------------
// @@ MAKE A FUNC THAT WILL FETCH COLLECTION,
// @@ GET ALL DOCS AND SORT ALL OBJS BY INDEX
// @@ (E.G: fetch all objects with param'INDEX' that starts with 1
// @@ WHERE INDEX === '1-1' || 1.1  && store in new array as single OBJ) !!!
export const getSingleColletionFromFirebase = async (collectionName) => {
  try {
    const collectionRef = collection(
      db,
      collectionName ?? "homepage_customization"
    );
    const querySnapshot = await getDocs(collectionRef);
    console.log(querySnapshot)
    console.log(querySnapshot.docs)

    const docs = querySnapshot.docs.map((doc) => doc.data());
    console.log("docs==>", docs);

    // const sortedObjsByIndex = docs.sort((a, b) => a.index - b.index);
    // console.log(sortedObjsByIndex);

    return docs || [];
  } catch (err) {
    console.error(err);
  }
};

export const setSingleCollectionState = async (collectionName, setState) => {
    try {
        // const resp = await getSingleColletionFromFirebase(collectionName);

        // setState()
        
    } catch (err) {
        console.error(err);
    }

};

export const getSingleFirebaseDocById = async (id, collection) => {
  try {
    const homeCustomizationDocRef = doc(
      db,
      collection ?? "homepage_customization",
      id ?? "first_banner"
    );
    const docSnapshot = await getDoc(homeCustomizationDocRef);

    if (docSnapshot.exists()) {
      const customizationData = docSnapshot.data();
      console.log(customizationData);
      return customizationData;
    } else {
      console.log("Document does not exist...");
    }
  } catch (err) {
    console.log(err);
    return err;
  }
  // finally{
  // return{data, err}
  // }
};

export const setSingleBannerState = async (id, collection, setStateObj) => {
  try {
    const bannerData = await getSingleFirebaseDocById(
      id ?? "first_banner",
      collection ?? "homepage_customization"
    );
    // console.log('bannerData', bannerData);
    setStateObj(bannerData);

    return bannerData;
  } catch (err) {
    console.log(err);
  }
};

// export const fetchCMSListWithoutPagination = async (
//     // token,
//     listName) => {

//     let fetchError = '';
//     let fetchData = '';

//     try {

//         const tempList = await axios.get(`http://127.0.0.1:8000/cms/${listName ?? 'navigation'}`
//             // , {
//             //     headers: {
//             //         'Authorization': `${token ?? ""}`
//             //     }
//             // }
//         );

//         // console.log(tempList)
//         fetchData = tempList?.data;

//     } catch (err) {
//         console.log(err);
//         fetchError = err;
//     }

//     // return fetchError === '' ? fetchData : fetchError;
//     return {
//         data: fetchData,
//         error: fetchError
//     }
// };

// export const fetchSingleRecordById = async (id, route
//     // , token
// ) => {

//     let fetchError = '';
//     let fetchData = '';

//     try {
//         const tempResp = await axios.get(`http://127.0.0.1:8000/cms/${route}/${id}`
//             // , {
//             //     headers: {
//             //         'Authorization': `${token}`
//             //     }
//             // }
//         );
//         // console.log("tempResp.data", tempResp);
//         fetchData = tempResp.data;

//     } catch (err) {
//         console.log(err);
//         fetchError = err;
//     };

//     return {
//         data: fetchData,
//         error: fetchError
//     };

// };
