import React from 'react';
import { Globe, Lock, Bell, Database } from 'lucide-react';

interface AdminSettingsProps {
  config?: any;
  onUpdateConfig?: (updatedConfig: any) => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ config = {}, onUpdateConfig }) => {
  const handleChange = (key: string, value: any) => {
    if (onUpdateConfig) {
      onUpdateConfig({ [key]: value });
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white">Configuración</h1>
        <p className="text-white/50 mt-1">Personaliza el comportamiento de la plataforma.</p>
      </header>

      <div className="space-y-6 max-w-4xl">
        <SettingsGroup title="General" icon={Globe}>
          <SettingsItem 
            title="Nombre del Curso" 
            description="Cómo aparecerá en la página principal" 
            value={config.course_name || "Curso de Godot 4: Desde Cero"} 
            type="text" 
            onChange={(v: string) => handleChange('course_name', v)}
          />
          <SettingsItem 
            title="URL de la API" 
            description="Endpoint principal para los datos" 
            value={config.api_url || "https://godotapi.rsanjur.com"} 
            type="text" 
            onChange={(v: string) => handleChange('api_url', v)}
          />
        </SettingsGroup>

        <SettingsGroup title="Seguridad" icon={Lock}>
          <SettingsItem 
            title="Registro Público" 
            description="Permitir que nuevos usuarios se registren" 
            checked={config.public_registration !== false} 
            type="toggle" 
            onChange={(v: boolean) => handleChange('public_registration', v)}
          />
          <SettingsItem 
            title="Autenticación de Dos Pasos" 
            description="Requerir 2FA para administradores" 
            checked={config.two_factor_auth === true} 
            type="toggle" 
            onChange={(v: boolean) => handleChange('two_factor_auth', v)}
          />
        </SettingsGroup>

        <SettingsGroup title="Notificaciones" icon={Bell}>
          <SettingsItem 
            title="Emails de Progreso" 
            description="Enviar resumen semanal a los estudiantes" 
            checked={config.email_notifications !== false} 
            type="toggle" 
            onChange={(v: boolean) => handleChange('email_notifications', v)}
          />
        </SettingsGroup>

        <SettingsGroup title="Base de Datos" icon={Database}>
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Limpiar Cache</p>
              <p className="text-xs text-white/40">Elimina todos los archivos temporales</p>
            </div>
            <button className="px-4 py-2 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-lg text-xs font-bold transition-all border border-white/10">Ejecutar Limpieza</button>
          </div>
        </SettingsGroup>
      </div>
    </div>
  );
};

const SettingsGroup = ({ title, icon: Icon, children }: any) => (
  <div className="glass rounded-2xl border border-white/10 overflow-hidden">
    <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
      <div className="p-2 rounded-lg bg-godot-blue/20 text-godot-blue"><Icon className="w-4 h-4" /></div>
      <h3 className="font-bold text-sm">{title}</h3>
    </div>
    <div className="divide-y divide-white/5">{children}</div>
  </div>
);

const SettingsItem = ({ title, description, type, value, checked, onChange }: any) => (
  <div className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
    <div className="space-y-0.5">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-white/40">{description}</p>
    </div>
    {type === 'text' ? (
      <input 
        type="text" 
        defaultValue={value} 
        onBlur={(e) => onChange(e.target.value)}
        className="bg-godot-dark border border-white/10 rounded-lg px-3 py-1.5 text-xs focus:border-godot-blue/50 outline-none w-64 text-right" 
      />
    ) : (
      <button 
        onClick={() => onChange(!checked)}
        className={`w-10 h-5 rounded-full relative transition-colors ${checked ? 'bg-godot-green' : 'bg-white/10'}`}
      >
        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${checked ? 'left-6' : 'left-1'}`} />
      </button>
    )}
  </div>
);
