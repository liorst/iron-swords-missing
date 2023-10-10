'use server';

import { AddPersonData } from '../app/utils/types';
import { insertMissingPerson } from '../services/add-missing';
import { uploadImage } from '../services/imageUpload';

export async function addPerson(params: AddPersonData) {
    const {firstName, lastSeen, lastName, contactName, identifyingDetails, image, contactPhone, notes} = params
    // const imageUrl = await uploadImage(image)
    const status = 'unknown'
    return await insertMissingPerson({firstName, lastSeen, lastName, contactName, identifyingDetails, image, contactPhone, notes, status})
}