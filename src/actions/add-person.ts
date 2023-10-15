'use server';
import { createHash } from 'crypto';

import { insertMissingPerson } from '../services/add-missing';

import { uploadImage } from '../services/imageUpload';

const generateFileHash = async (stream) => {
    const hash = createHash('sha256');
    for await (const chunk of stream) {
        hash.update(chunk);
    }
    return hash.digest('hex');
}

export async function addPerson(params: FormData) {
    const firstName = params.get('firstName') as string
    const lastSeen = params.get('lastSeen') as string
    const lastName = params.get('lastName') as string
    const contactName = params.get('contactName') as string
    const identifyingDetails = params.get('identifyingDetails') as string
    const image = params.get('image') as File
    const contactPhone = params.get('contactPhone') as string
    const notes = params.get('notes') as string
    const contactEmail = params.get('contactEmail') as string
    
    // const imageUrl = await uploadImage(image)
    console.info("Add Person Params", params)
    const personId = createHash('sha256')
                    .update([firstName, lastName ,contactName ,contactPhone].join(""))
                    .digest('hex')
                    .substring(0, 8).toUpperCase()
    
    const fileHash = await generateFileHash(image.stream())
    const {error, publicUrl} = await uploadImage(personId, fileHash, image);
    const status = 'pending'
    return await insertMissingPerson({id: personId, firstName, lastSeen, lastName, contactName, identifyingDetails, image: publicUrl, contactPhone, notes, status, source: "addPersonForm", contactEmail})
}

