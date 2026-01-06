import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, CreditCard, Award, ArrowLeft, Check, X, Search, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  has_paid: boolean;
  created_at: string;
}

interface UserWithProgress extends UserProfile {
  completed_modules: number;
  has_certificate: boolean;
}

export default function Admin() {
  const { isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserWithProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingUser, setUpdatingUser] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/curso');
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      loadUsers();
    }
  }, [isAdmin]);

  const loadUsers = async () => {
    try {
      // Get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Get progress counts
      const { data: progress, error: progressError } = await supabase
        .from('course_progress')
        .select('user_id');

      if (progressError) throw progressError;

      // Get certificates
      const { data: certificates, error: certificatesError } = await supabase
        .from('certificates')
        .select('user_id');

      if (certificatesError) throw certificatesError;

      // Count modules per user
      const progressCounts: Record<string, number> = {};
      progress?.forEach(p => {
        progressCounts[p.user_id] = (progressCounts[p.user_id] || 0) + 1;
      });

      // Set of users with certificates
      const usersWithCertificates = new Set(certificates?.map(c => c.user_id));

      // Combine data
      const usersWithProgress: UserWithProgress[] = (profiles || []).map(profile => ({
        ...(profile as UserProfile),
        completed_modules: progressCounts[profile.user_id] || 0,
        has_certificate: usersWithCertificates.has(profile.user_id),
      }));

      setUsers(usersWithProgress);
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error('Error al cargar usuarios');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePaymentStatus = async (userId: string, currentStatus: boolean) => {
    setUpdatingUser(userId);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ has_paid: !currentStatus })
        .eq('user_id', userId);

      if (error) throw error;
      
      setUsers(prev => prev.map(u => 
        u.user_id === userId ? { ...u, has_paid: !currentStatus } : u
      ));
      
      toast.success(`Acceso ${!currentStatus ? 'activado' : 'desactivado'}`);
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast.error('Error al actualizar estado');
    } finally {
      setUpdatingUser(null);
    }
  };

  const filteredUsers = users.filter(user => 
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: users.length,
    paid: users.filter(u => u.has_paid).length,
    completed: users.filter(u => u.has_certificate).length,
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/curso')}
              className="mb-2 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al curso
            </Button>
            <h1 className="text-2xl font-black text-foreground">Panel de Administración</h1>
            <p className="text-sm text-muted-foreground">Gestiona usuarios y accesos al curso</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass-card rounded-2xl p-6 text-center">
            <Users className="w-8 h-8 mx-auto text-primary mb-2" />
            <div className="text-3xl font-bold text-foreground">{stats.total}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Total usuarios</div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <CreditCard className="w-8 h-8 mx-auto text-success mb-2" />
            <div className="text-3xl font-bold text-foreground">{stats.paid}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Con acceso</div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <Award className="w-8 h-8 mx-auto text-accent mb-2" />
            <div className="text-3xl font-bold text-foreground">{stats.completed}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Certificados</div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Users table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Progreso
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Certificado
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Acceso
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-foreground">
                          {user.full_name || 'Sin nombre'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-medium text-foreground">
                        {user.completed_modules}/6
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {user.has_certificate ? (
                        <Check className="w-5 h-5 text-success mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.has_paid 
                          ? 'bg-success/20 text-success' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {user.has_paid ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        size="sm"
                        variant={user.has_paid ? 'outline' : 'default'}
                        onClick={() => togglePaymentStatus(user.user_id, user.has_paid)}
                        disabled={updatingUser === user.user_id}
                        className="text-xs"
                      >
                        {updatingUser === user.user_id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : user.has_paid ? (
                          'Desactivar'
                        ) : (
                          'Activar acceso'
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No se encontraron usuarios
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
