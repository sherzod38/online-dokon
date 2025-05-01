'use server';

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};
// import { craeteClient } from '@/lib/supabase/server';
import { createClient } from '@/utils/supabase/server';

export async function sendContractForm(values: ContactFormValues) {
  const supabase = await createClient();
  const { error } = await supabase.from('contact_form_submissions').insert(values);
  if (error) {
    return {succsess: false, error: error.message};
  }
  return {succsess: true};         
}