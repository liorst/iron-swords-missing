'use server';
import { uuid } from '@supabase/supabase-js/src/lib/helpers';
import {PersonData} from '../app/utils/types';
import supabase from './supabase';


export async function insertMissingPerson(props: PersonData){//: Promise<PersonData> {
  const {firstName, lastSeen, lastName, contactName, identifyingDetails, image, contactPhone, notes} = props
  

  const {error} = await supabase.from("people").insert({
    id: uuid(),
    contact_name: contactName,
    contact_phone: contactPhone,
    details: identifyingDetails,
    status: "unknown",
    first_name: firstName,
    image: "https://no-image.jpg",
    last_name: lastName,
    last_seen: lastSeen,
    notes,
  })
  
      
  return {error}
}

