const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
  const { userId, newRole } = JSON.parse(event.body);
  
  // Verificar autenticación
  if (!context.clientContext.user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }
  
  const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
  
  // Verificar si el usuario que hace la solicitud es admin
  const { data: adminUser, error: adminError } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', context.clientContext.user.sub)
    .single();
    
  if (adminError || !adminUser || adminUser.role !== 'admin') {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'Forbidden' })
    };
  }
  
  // Actualizar el rol
  const { error } = await supabaseAdmin
    .from('profiles')
    .update({ role: newRole })
    .eq('id', userId);
    
  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};