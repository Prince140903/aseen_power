import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const images = [
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800', // Substation/transformer
  'https://images.unsplash.com/photo-1541888081695-021c6df3d31c?auto=format&fit=crop&q=80&w=800', // Electrician/wiring
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800', // Control panel / data
  'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=800', // Factory/Industrial
  'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=800'  // General industry
];

async function update() {
  console.log('Connecting to Supabase...');
  const { data: services, error } = await supabase.from('services').select('*');
  if (error) {
    console.error('Error fetching services:', error);
    return;
  }
  
  if (!services || services.length === 0) {
    console.log('No services found to update');
    return;
  }

  for (let i = 0; i < services.length; i++) {
    const service = services[i];
    const newImage = images[i % images.length];
    
    if (!service.image_url || !service.image_url.includes('unsplash')) {
      console.log(`Updating ${service.title}...`);
      const { error: updateError } = await supabase
        .from('services')
        .update({ image_url: newImage })
        .eq('id', service.id);
        
      if (updateError) {
        console.error('Failed to update service', service.id, updateError);
      } else {
        console.log('Updated service', service.title, 'with image', newImage);
      }
    } else {
      console.log('Service', service.title, 'already has an unsplash image');
    }
  }
  console.log('Finished.');
}

update();
