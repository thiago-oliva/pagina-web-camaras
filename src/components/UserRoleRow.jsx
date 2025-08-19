import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Button, Spinner, Form } from 'react-bootstrap';

const UserRoleRow = ({ user }) => {
  const [newRole, setNewRole] = useState(user.role);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', user.id);
      
      if (error) throw error;
      alert('Rol actualizado correctamente');
    } catch (err) {
      setError('Error al actualizar el rol');
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <Form.Select 
          value={newRole} 
          onChange={(e) => setNewRole(e.target.value)}
          disabled={loading}
        >
          <option value="customer">Cliente</option>
          <option value="vip">VIP</option>
          <option value="premium">Premium</option>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </Form.Select>
      </td>
      <td>
        <Button 
          variant="primary" 
          size="sm"
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading ? <Spinner size="sm" /> : 'Actualizar'}
        </Button>
        {error && <div className="text-danger small mt-1">{error}</div>}
      </td>
    </tr>
  );
};

export default UserRoleRow;