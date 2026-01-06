import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Certificate {
  id: string;
  user_id: string;
  certificate_number: string;
  full_name: string;
  issued_at: string;
}

export function useCertificate() {
  const { user, profile } = useAuth();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const loadCertificate = useCallback(async () => {
    if (!user) {
      setCertificate(null);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      setCertificate(data as Certificate | null);
    } catch (error) {
      console.error('Error loading certificate:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadCertificate();
  }, [loadCertificate]);

  const generateCertificate = async () => {
    if (!user) return { error: new Error('No user logged in') };
    
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase
        .rpc('generate_certificate', { p_user_id: user.id });

      if (error) throw error;
      
      await loadCertificate();
      return { data, error: null };
    } catch (error) {
      console.error('Error generating certificate:', error);
      return { data: null, error };
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    certificate,
    isLoading,
    isGenerating,
    generateCertificate,
    hasCertificate: !!certificate,
    refreshCertificate: loadCertificate,
  };
}
