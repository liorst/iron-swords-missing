import React, { useState } from 'react';
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { addPerson } from "@/actions"
import { redirect } from 'next/dist/server/api-utils';


// import { useCallback } from "react";
const Label = ({htmlFor, children}) => <label htmlFor={htmlFor} style={{float: "right"}}>{children}</label>

const ErrorMessage = ({ message }) => (
  <div className="text-red-600">{message}</div>
);

const AddPersonForm = (props) => {
  const [formData, setFormData,] = useState({
    firstName: '',
    firstNameErr: '',
    lastName: '',
    // mp_phone_number: '',
    image: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    lastSeen: '',
    identifyingDetails: '',
    notes: '',
  });
const [errorData, setErrorData] = useState({
    firstName: '',
    firstNameErr: '',
    lastName: '',
    // mp_phone_number: '',
    image: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    lastSeen: '',
    identifyingDetails: '',
    notes: '',
});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // setErrorData({ ...errorData, [e.target.name]: '' });
  };
  const validatePhoneNumber = (phoneNumber) => {
    const regex = /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return regex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.info('Form submitted', formData);
    // if (!formData.contactPhone) {
    // console.warn('Invalid phone number');
    if (!validatePhoneNumber(formData.contactPhone)) {
      console.warn('Invalid phone number');
      setErrorData({ ...errorData, contactPhone: 'Invalid phone number' });
      return;
    }
    return
    // Submit the form data to your API
    
    const {error} = await addPerson(formData)
    if (error){
      console.error(error.status, error.message)
    }
    else {
      console.info("Success")
      // redirect("/")
    }
  }
  return (
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb- max-w-2xl">
    <form onSubmit={handleSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<Label htmlFor="firstName">שם פרטי (נעדר)</Label>
			<Input
				type="text"
				name="firstName"
				placeholder=""
				value={formData.firstName}
				onChange={handleChange}
        required
        // className="w-full"
			/>
      <ErrorMessage message={errorData.firstName}/>

			<Label htmlFor="lastName">שם משפחה (נעדר)</Label>
      <Input
        type="text"
        name="lastName"
        placeholder=""
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <ErrorMessage message={errorData.lastName}/>
			{/* <label htmlFor="mp_phone_number">טלפון (נעדר)</label>
      <Input
      type="tel"
      name="mp_phone_number"
      placeholder=""
      value={formData.mp_phone_number}
      onChange={handleChange}
      />
      <ErrorMessage message={errorData.lastName}/> */}
			{/* <label htmlFor="image">Upload a photo of the missing person</label>
      <Input
        type="file"
        name="mmp_image_upload"
        placeholder=""
        onChange={handleChange}
      /> */}
			<Label htmlFor="contactName">שם איש קשר</Label>
      <Input
        type="text"
        name="contactName"
        placeholder=""
        value={formData.contactName}
        onChange={handleChange}
      />
      <ErrorMessage message={errorData.contactName}/>

			<Label htmlFor="contactPhone">טלפון איש קשר</Label>
      <Input
        type="tel"
        name="contactPhone"
        placeholder=""
        value={formData.contactPhone}
        onChange={handleChange}
        required
      />
      <ErrorMessage message={errorData.contactPhone}/>
			<Label htmlFor="contactEmail">כתובת מייל ליצירת קשר</Label>
      <Input
        type="email"
        name="contactEmail"
        placeholder=""
        value={formData.contactEmail}
        onChange={handleChange}
        required
      />
      <ErrorMessage message={errorData.contactEmail}/>

			<Label htmlFor="lastSeen">נצפה לאחרונה</Label>
      <Input
        type="text"
        name="lastSeen"
        placeholder=""
        value={formData.lastSeen}
        onChange={handleChange}
      />
      <ErrorMessage message={errorData.lastSeen}/>

			<Label htmlFor="identifyingDetails">פרטים מזהים</Label>
      <Input
        type="text"
        name="identifyingDetails"
        placeholder=""
        value={formData.identifyingDetails}
        required
        onChange={handleChange}
      />

			<Label htmlFor="notes">הערות</Label>
      <Input
			type="text"
        name="notes"
        placeholder=""
        value={formData.notes}
        onChange={handleChange}
      />
      <div style={{textAlign: "center"}}>
				<Button type="submit" className="text-2xl">שׁלח</Button>
      </div>
    </form>
    </div>
  );
};

export { AddPersonForm }