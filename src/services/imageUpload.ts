'server only';
// import supabase from './supabase';

import {createClient} from '@supabase/supabase-js'
import {Database} from './database.types'


const supabaseUrl = process.env.SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || ""

const supabase = createClient<Database>(supabaseUrl, supabaseKey)  
//   async function saveFile(_file: File, documentHash: string) {
    
//     // await fs.appendFile(`./public/${documentHash}.pdf`, Buffer.from(data));
//     return;
//   }

export async function uploadImage(recordId, filename, fileStream: any) {
    console.info('imageFile', fileStream)
    // const data = await fileStream.arrayBuffer();
    const filepath = `public/${recordId}/${filename}`
    console.info(filepath)
    const { error } = await supabase
    .storage
    .from('people-public')
    .upload(filepath, fileStream, {
        cacheControl: '3600',
        upsert: false
    })
    if(error && error?.statusCode === '409') {
        // Duplicate file, do nothing
    }
    else if(error && error?.statusCode !== '200') {

        throw new Error(error.statusCode)
    }
    const publicUrl = await supabase.storage.from('people-public').getPublicUrl(filepath)
    return {error: error ?? null, publicUrl: publicUrl.data.publicUrl}
    // const response = await fetch('/api/upload', {
    //     method: 'POST',
    //     body: image
    // });
    // const data = await response.json();
    // return data;
}