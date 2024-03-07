import React, { useState, useEffect } from 'react'
import { Modal, Label, TextInput,Button } from 'flowbite-react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { getAuth,RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth, firestore } from "../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import Loader from './Loader';
import OtpTimer from "otp-timer";

const RegisterModal = (props) => {
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState("");
    const [user,setUser] = useState(null);
    const [otp,setOtp] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const navigate = useNavigate();
     const auth = getAuth();

    const setUpRecaptcha = () => {
        if(!window.recaptchaVerifier){
      window.recaptchaVerifier = new RecaptchaVerifier(auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
    }

        window.recaptchaVerifier.verify();
    };

    const isPhoneNumberValid = phone.length >= 10;

    const sendOtp = async() => {
        setUpRecaptcha()
        const appVerifier = await window.recaptchaVerifier;
        try {
            if(phone.length !== 10)alert("Please enter a valid Phone number");
            else {
            setLoading(true);
            // const recaptcha = new RecaptchaVerifier(auth,"recaptcha",{});
            // setLoading(false);
            const confirmation = await signInWithPhoneNumber(auth, "+91"+phone, appVerifier)
            setUser (confirmation);
            setShowOtpInput(true);
            setLoading(false);
            }
        } catch(e) {
            setLoading(false);
            console.log(e);
            window.recaptchaVerifier.recaptcha.reset();
            window.recaptchaVerifier.clear();
            alert("Something went wrong! Contact administrator if situation persists")
        }
    }

    const verifyOtp = async() => {
        try {
            setLoading(true);
            const data = await user.confirm(otp);
            
            const userRef = collection(firestore, "users");
            const q = query(userRef, where("userId", "==", data.user.uid));
            const querySnapshot = await getDocs(q);
            if(querySnapshot.empty){
                await addDoc(userRef,{
                    userId : data.user.uid,
                    name: data.user.displayName,
                    mobile : data.user.phoneNumber,
                    email : data.user.email,
                    registerationTime : Timestamp.now(),
                    address : ""
                })
            }
            localStorage.setItem('userId', data.user.uid)
            setLoading(false);
            navigate("/");
            window.location.reload();
        }catch(e) {
            setLoading(false);
            alert("Somethign went wrong!Please try again")
        }
        setOtp("");

    }

    const resendOTP = async() => {
        setUpRecaptcha()
        const appVerifier = await window.recaptchaVerifier;
        try{
            const confirmation = await signInWithPhoneNumber(auth, "+91"+phone, appVerifier)
            setUser (confirmation);
            setShowOtpInput(true);
            setLoading(false);
        } catch(e) {
            setLoading(false);
            console.log(e);
            alert("Something went wrong! Contact administrator if situation persists")
        }
        }

  return (
    <div className={` ${props.modal?"":"hidden"} bg-opacity-60 h-screen w-screen absolute bg-black text-gray-900 flex flex-row justify-center items-center`}>
    {loading && <Loader />}
    <div className="max-w-screen-md h-5/6 max-h-[768px]   bg-white shadow sm:rounded-lg flex justify-center flex-1 mx-2 sm:mx-12">
        <div className="flex-1 bg-contain bg-no-repeat bg-center bg-[url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')] text-center hidden lg:flex">
        </div>
        {showOtpInput?
           <div className="flex-1 lg:w-1/2 xl:w-5/12 overflow-auto">
            <div>
                <h1 className='py-4 flex justify-center items-center border-b text-md text-black'>Almost Done!</h1>
            </div>
            <div className='p-8 space-y-6'>
            <h1>OTP Sent via SMS to +91 {phone} to verify your mobile number</h1>
            <div className="max-w-md">
                <div className="mb-2 block">
                    <Label htmlFor="otp" value="Enter OTP" className='text-gray-400 font-normal' />
                </div>
                <TextInput id="otp" type='text' value={otp}  onChange={(e) => setOtp(e.target.value)}  required />
            </div>
            <OtpTimer
            minutes={1}
            seconds={30}
            text="Resend OTP in:"
            ButtonText="Resend"
            buttonColor = "red" 
            background ="white"
            resend={resendOTP}
            />
            <h2 className='text-gray-400'>By continuing, you agree to our Terms, Refunds and Privacy Policy</h2>
            <Button color='warning' className='w-full' onClick={verifyOtp}>Verify OTP</Button>
            <Button onClick={() => {setShowOtpInput(false)}}>Go Back</Button>
            </div>
            </div>
            :
            <div className="flex-1 lg:w-1/2 xl:w-5/12 overflow-auto max-w-md">
                <div>
                    <h1 className='py-4 flex justify-center items-center border-b text-md text-black'>Let's Get You Logged In</h1>
                </div>
                <div className='p-8  space-y-6'>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="username3" value="Enter your 10 digit mobile number" className='text-gray-400 font-normal' />
                    </div>
                    <TextInput id="username3" addon="+91" type='text' value={phone} onChange={(e) =>setPhone(e.target.value)}  required />
                </div>
                <h2 className='text-gray-400'>By continuing, you agree to our Terms, Refunds and Privacy Policy</h2>
                
                <Button color='warning' className='max-w-md w-full' disabled={!isPhoneNumberValid} onClick={sendOtp}>CONTINUE</Button>
                </div>
            </div>

        }
        
    </div>
    {/* x mark to close modal */}
    {/* <div className='h-5/6 max-h-[768px] ml-2 cursor-pointer' onClick={() => {props.setModal(false)}}><XMarkIcon className="h-6 w-6" color='white' aria-hidden="true" /></div> */}
    
    </div>
    
  )
}

export default RegisterModal
