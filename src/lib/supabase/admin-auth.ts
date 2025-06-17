import { createClient } from './client';

export async function ensureAdminUser() {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: 'No authenticated user' };
  }

  const { error: checkError } = await supabase
    .from('admin_users')
    .select('id')
    .eq('id', user.id)
    .single();

  if (checkError && checkError.code === 'PGRST116') {
    const { error: insertError } = await supabase.from('admin_users').insert({
      id: user.id,
      email: user.email!,
    });

    if (insertError) {
      console.error('Error adding user to admin_users:', insertError);
      return { error: insertError.message };
    }

    return { success: true, newUser: true };
  }

  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking admin user:', checkError);
    return { error: checkError.message };
  }

  return { success: true, newUser: false };
}
