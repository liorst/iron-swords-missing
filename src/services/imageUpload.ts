'server only';


import {createClient} from '@supabase/supabase-js'
import {Database} from './database.types'


const supabaseUrl = process.env.SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || ""

const supabase = createClient<Database>(supabaseUrl, supabaseKey)  

export async function uploadImage(recordId, filename, fileStream: any) {
    
    const filepath = `public/${recordId}/${filename}`
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
    
}