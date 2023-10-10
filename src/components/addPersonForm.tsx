import React, { useState } from 'react';
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { addPerson } from "@/actions"
import { redirect } from 'next/dist/server/api-utils';

// import { useCallback } from "react";

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
  
    <form onSubmit={handleSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<label htmlFor="firstName">First name (Missing Person)</label>
			<Input
				type="text"
				name="firstName"
				placeholder=""
				value={formData.firstName}
				onChange={handleChange}
        required
			/>
      <ErrorMessage message={errorData.firstName}/>

			<label htmlFor="lastName">Last name (Missing Person)</label>
      <Input
        type="text"
        name="lastName"
        placeholder=""
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <ErrorMessage message={errorData.lastName}/>
			{/* <label htmlFor="mp_phone_number">Phone number (Missing Person)</label>

      <Input
        type="tel"
        name="mp_phone_number"
        placeholder=""
        value={formData.mp_phone_number}
        onChange={handleChange}
      /> */}
			{/* <label htmlFor="image">Upload a photo of the missing person</label>
      <Input
        type="file"
        name="mmp_image_upload"
        placeholder=""
        onChange={handleChange}
      /> */}
			<label htmlFor="contactName">Contact person's name</label>
      <Input
        type="text"
        name="contactName"
        placeholder=""
        value={formData.contactName}
        onChange={handleChange}
      />
      <ErrorMessage message={errorData.contactName}/>

			<label htmlFor="contactPhone">Contact person's phone number</label>
      <Input
        type="tel"
        name="contactPhone"
        placeholder=""
        value={formData.contactPhone}
        onChange={handleChange}
        required
      />
      <ErrorMessage message={errorData.contactPhone}/>
			<label htmlFor="contactEmail">Contact person's Email address</label>
      <Input
        type="email"
        name="contactEmail"
        placeholder=""
        value={formData.contactEmail}
        onChange={handleChange}
        required
      />
      <ErrorMessage message={errorData.contactEmail}/>

			<label htmlFor="lastSeen">Where the missing person was last seen?</label>
      <Input
        type="text"
        name="lastSeen"
        placeholder=""
        value={formData.lastSeen}
        onChange={handleChange}
      />
      <ErrorMessage message={errorData.lastSeen}/>

			<label htmlFor="identifyingDetails">Missing person's identification details (e.g., ID, driver's license number)</label>
      <Input
        type="text"
        name="identifyingDetails"
        placeholder=""
        value={formData.identifyingDetails}
        required
        onChange={handleChange}
      />

			<label htmlFor="notes">Any additional information about the missing person that could be relevant</label>
      <Input
			type="text"
        name="notes"
        placeholder=""
        value={formData.notes}
        onChange={handleChange}
      />
				<Button type="submit">Submit</Button>
    </form>
  );
};

export { AddPersonForm }