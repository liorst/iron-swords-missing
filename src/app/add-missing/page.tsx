'use client'

import { AddPersonForm } from "@/components/AddPersonForm"
import React, { useState } from 'react';



const AddPerson = () => {
  
  return (
		<div>
			<h1 className="text-center text-3xl mt-10">דיווח על נעדר</h1>
			<div className="flex-wrap flex items-center justify-center min-h-screen py-2 space-y-1.5 -mx-3 mb-6">
		{/* <div className="w-full max-w-lg flex  items-center"> */}

			<AddPersonForm />
			</div>
		 </div>
  );
};

export default AddPerson;
