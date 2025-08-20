import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from './AuthContext';
import { Container, Row, Col, Card, Table, Spinner, Button, Badge, Form, Modal, Alert } from 'react-bootstrap';

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const [metrics, setMetrics] = useState({
    monthlyRevenue: 0,
    activeClients: 0,
    recentOrders: [],
    loading: true
  });
  const [updatingOrder, setUpdatingOrder] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    if (!isAdmin()) return;

    fetchData();
    fetchUsers();
    fetchRoles();
  }, [isAdmin, updatingOrder]);

  const fetchData = async () => {
    setMetrics(prev => ({ ...prev, loading: true }));
    
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    
    const { data: ventasData, error: ventasError } = await supabase
      .from('ventas')
      .select('total, fecha, estado')
      .eq('estado', 'completada');
    
    let monthlyRevenue = 0;
    if (ventasData) {
      monthlyRevenue = ventasData
        .filter(venta => {
          const fecha = new Date(venta.fecha);
          return fecha.getMonth() + 1 === currentMonth && 
                 fecha.getFullYear() === currentYear;
        })
        .reduce((sum, venta) => sum + venta.total, 0);
    }

    const { count: clientsCount } = await supabase
      .from('clientes')
      .select('*', { count: 'exact', head: true });

    const { data: ventasRecientes } = await supabase
      .from('ventas')
      .select(`
        id,
        numero_factura,
        fecha,
        total,
        estado,
        clientes:cliente_id(nombre),
        direccion_entrega,
        telefono_contacto
      `)
      .order('fecha', { ascending: false })
      .limit(10);

    setMetrics({
      monthlyRevenue,
      activeClients: clientsCount || 0,
      recentOrders: ventasRecientes || [],
      loading: false
    });
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data: usersData, error } = await supabase
        .from('usuarios')
        .select(`
          *,
          roles:rol_id (nombre, descripcion)
        `)
        .order('email');

      if (error) throw error;
      setUsers(usersData || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const { data: rolesData, error } = await supabase
        .from('roles')
        .select('*')
        .order('nombre');

      if (error) throw error;
      setUserRoles(rolesData || []);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const searchUserByEmail = async () => {
    if (!searchEmail.trim()) {
      fetchUsers();
      return;
    }

    setLoadingUsers(true);
    try {
      const { data: usersData, error } = await supabase
        .from('usuarios')
        .select(`
          *,
          roles:rol_id (nombre, descripcion)
        `)
        .ilike('email', `%${searchEmail}%`)
        .order('email');

      if (error) throw error;
      setUsers(usersData || []);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    setUpdatingOrder(orderId);
    try {
      await supabase
        .from('ventas')
        .update({ estado: newStatus })
        .eq('id', orderId);
      
      setMetrics(prev => ({
        ...prev,
        recentOrders: prev.recentOrders.map(order => 
          order.id === orderId ? { ...order, estado: newStatus } : order
        )
      }));
    } catch (error) {
      console.error('Error updating order status:', error);
    } finally {
      setUpdatingOrder(null);
    }
  };

  const updateUserRole = async (userId, newRoleId) => {
    try {
      const { error } = await supabase
        .from('usuarios')
        .update({ rol_id: newRoleId })
        .eq('id', userId);

      if (error) throw error;

      // Actualizar lista de usuarios
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, rol_id: newRoleId } : user
      ));

      setShowUserModal(false);
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  if (!isAdmin()) {
    return (
      <Container className="mt-5 text-center">
        <h3>Acceso restringido</h3>
        <p>No tienes permisos para ver esta sección.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4 admin-container">
      <h2 className="mb-4">Panel de Administración</h2>
      
      {metrics.loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Cargando métricas...</p>
        </div>
      ) : (
        <>
          <Row className="mb-4">
            <Col md={3} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>Ingresos Mensuales</Card.Title>
                  <Card.Text className="h3 text-success">
                    ${metrics.monthlyRevenue.toLocaleString('es-AR')}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>Clientes Activos</Card.Title>
                  <Card.Text className="h3">
                    {metrics.activeClients}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>Órdenes Pendientes</Card.Title>
                  <Card.Text className="h3">
                    {metrics.recentOrders.filter(o => o.estado === 'pendiente').length}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>Usuarios Conectados</Card.Title>
                  <Card.Text className="h3">
                    {users.filter(u => u.ultima_conexion && 
                      new Date(u.ultima_conexion) > new Date(Date.now() - 15 * 60 * 1000)).length}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Gestión de Usuarios */}
          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="d-flex justify-content-between align-items-center">
                <span>Gestión de Usuarios</span>
                <Button variant="outline-primary" size="sm" onClick={fetchUsers}>
                  <i className="fas fa-sync"></i> Actualizar
                </Button>
              </Card.Title>
              
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Buscar por email:</Form.Label>
                    <div className="d-flex">
                      <Form.Control
                        type="text"
                        placeholder="Ingresa email..."
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && searchUserByEmail()}
                      />
                      <Button variant="primary" onClick={searchUserByEmail} className="ms-2">
                        <i className="fas fa-search"></i>
                      </Button>
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              {loadingUsers ? (
                <div className="text-center">
                  <Spinner animation="border" />
                  <p>Cargando usuarios...</p>
                </div>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Nombre</th>
                      <th>Rol Actual</th>
                      <th>Última Conexión</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>{user.nombre || 'N/A'}</td>
                        <td>
                          <Badge bg={
                            user.roles?.nombre === 'admin' ? 'danger' :
                            user.roles?.nombre === 'staff' ? 'warning' :
                            user.roles?.nombre === 'client' ? 'info' : 'secondary'
                          }>
                            {user.roles?.nombre || 'Sin rol'}
                          </Badge>
                        </td>
                        <td>
                          {user.ultima_conexion ? 
                            new Date(user.ultima_conexion).toLocaleString('es-AR') : 
                            'Nunca'
                          }
                        </td>
                        <td>
                          <Badge bg={
                            user.ultima_conexion && 
                            new Date(user.ultima_conexion) > new Date(Date.now() - 15 * 60 * 1000) ? 
                            'success' : 'secondary'
                          }>
                            {user.ultima_conexion && 
                            new Date(user.ultima_conexion) > new Date(Date.now() - 15 * 60 * 1000) ? 
                            'Conectado' : 'Desconectado'}
                          </Badge>
                        </td>
                        <td>
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => openUserModal(user)}
                          >
                            <i className="fas fa-edit"></i> Editar Rol
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>

          {/* Modal para editar rol de usuario */}
          <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Rol de Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedUser && (
                <>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Nombre:</strong> {selectedUser.nombre || 'N/A'}</p>
                  <Form.Group>
                    <Form.Label>Seleccionar Rol:</Form.Label>
                    <Form.Select 
                      defaultValue={selectedUser.rol_id}
                      onChange={(e) => updateUserRole(selectedUser.id, parseInt(e.target.value))}
                    >
                      {userRoles.map(role => (
                        <option key={role.id} value={role.id}>
                          {role.nombre} - {role.descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowUserModal(false)}>
                Cancelar
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Últimas Órdenes (sección original) */}
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Últimas Órdenes</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.recentOrders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.clientes?.nombre || 'N/A'}</td>
                      <td>{new Date(order.fecha).toLocaleDateString()}</td>
                      <td>${order.total.toLocaleString('es-AR')}</td>
                      <td>
                        <Badge 
                          bg={
                            order.estado === 'completada' ? 'success' : 
                            order.estado === 'pendiente' ? 'warning' : 
                            order.estado === 'cancelada' ? 'danger' : 'secondary'
                          }
                        >
                          {order.estado}
                        </Badge>
                      </td>
                      <td>
                        {order.estado === 'pendiente' && (
                          <div className="d-flex gap-1">
                            <Button 
                              variant="success" 
                              size="sm"
                              disabled={updatingOrder === order.id}
                              onClick={() => updateOrderStatus(order.id, 'completada')}
                            >
                              {updatingOrder === order.id ? 
                                <Spinner size="sm" /> : 
                                'Completar'
                              }
                            </Button>
                            <Button 
                              variant="danger" 
                              size="sm"
                              disabled={updatingOrder === order.id}
                              onClick={() => updateOrderStatus(order.id, 'cancelada')}
                            >
                              Cancelar
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default AdminDashboard;