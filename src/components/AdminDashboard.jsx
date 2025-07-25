import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from './AuthContext';
import { Container, Row, Col, Card, Table, Spinner, Button, Badge } from 'react-bootstrap';

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const [metrics, setMetrics] = useState({
    monthlyRevenue: 0,
    activeClients: 0,
    recentOrders: [],
    loading: true
  });
  const [updatingOrder, setUpdatingOrder] = useState(null);

  useEffect(() => {
    if (!isAdmin()) return;

    const fetchData = async () => {
      setMetrics(prev => ({ ...prev, loading: true }));
      
      // Obtener ingresos mensuales
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      
      // Calcular ingresos directamente en JavaScript
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

      // Obtener clientes activos
      const { count: clientsCount } = await supabase
        .from('clientes')
        .select('*', { count: 'exact', head: true });

      // Obtener últimas ventas
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

    fetchData();
  }, [isAdmin, updatingOrder]);

  const updateOrderStatus = async (orderId, newStatus) => {
    setUpdatingOrder(orderId);
    try {
      await supabase
        .from('ventas')
        .update({ estado: newStatus })
        .eq('id', orderId);
      
      // Actualizar métricas
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

  if (!isAdmin()) {
    return (
      <Container className="mt-5 text-center">
        <h3>Acceso restringido</h3>
        <p>No tienes permisos para ver esta sección.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Panel de Administración</h2>
      
      {metrics.loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Cargando métricas...</p>
        </div>
      ) : (
        <>
          <Row className="mb-4">
            <Col md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>Ingresos Mensuales</Card.Title>
                  <Card.Text className="h3 text-success">
                    ${metrics.monthlyRevenue.toLocaleString('es-AR')}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>Clientes Activos</Card.Title>
                  <Card.Text className="h3">
                    {metrics.activeClients}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>Órdenes Pendientes</Card.Title>
                  <Card.Text className="h3">
                    {metrics.recentOrders.filter(o => o.estado === 'pendiente').length}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

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