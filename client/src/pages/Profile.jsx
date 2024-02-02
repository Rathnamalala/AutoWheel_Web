import { useSelector } from "react-redux"
import {useEffect, useRef, useState} from 'react'
import { getDownloadURL, getStorage,ref,uploadBytesResumable } from "firebase/storage"
import {app} from '../firebase'
import { updateUserStart,updateUserFailure,updateUserSuccess, deleteUserFailure, deleteUserSuccess, deleteUserStart, signOutUserStart } from "../redux/userSlice"  
import { useDispatch } from "react-redux"

export default function Profile() {
  const {currentUser,loading , error} = useSelector(state => state.user)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePerc,setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [formData, setFormData] = useState({}) 
  const dispatch = useDispatch()
  



  useEffect(() => {
    if(file){
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = async (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)


    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setFilePerc(Math.round(progress))
    },
    (error)=>{
      setFileUploadError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
        setFormData({...formData, avatar:downloadURL}) 
      )
    }  
      
    
    
    )

  }

  const	handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
      
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser = async() => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
        
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
      setUpdateSuccess(true)
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
      
  
  }


  const handleSignOut = async() => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch(`/api/auth/signout`)
        
        
    
      const data = await res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
      
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center m-7'>Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input onChange={(e)=>setFile(e.target.files[0])} type="file"  ref={fileRef} hidden accept="image/*"/>
        <img onClick={()=> fileRef.current.click()} src={currentUser.avatar || currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
        <p>{fileUploadError ? 
            (<span className="text-red-700">Error uploading file</span> ):
            filePerc > 0 && filePerc < 100 ?
            (<span className="text-slate-700">Uploading {filePerc}%</span>) :
            filePerc === 100 ? (
              <span className="text-green-700">File uploaded</span>)
            : (''
            ) 
            }
        </p>
         <input type="text" placeholder="username"defaultValue={currentUser.username} id="username" className="border p-3 rounded-lg" onChange={handleChange}/>
         <input type="text" placeholder="email"defaultValue={currentUser.email} id="email" className="border p-3 rounded-lg" onChange={handleChange}/>
         <input type="text" placeholder="password"id="password" className="border p-3 rounded-lg" onChange={handleChange}/>

         <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">{loading ? 'Loading...': 'update'} </button>
      </form>
      <div className="flex justify-between mt-5">
        <span  onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
       <p className='text-red-700 mt-5'>{error ? error : ''}</p>
       <p className='text-green-700 mt-5'>{updateSuccess ?'user updated successfulluy' : ''}</p>
    </div>
  )
}




















//fire base

//rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
//service firebase.storage {
  //match /b/{bucket}/o {
    //match /{allPaths=**} {
      //allow read;
      //allow write:if
      //request.resource.size< 2 * 1024 * 1024 &&
      //request.resource.contentType.matches('image/.*')
    //}
  //}
//}