import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants, { ExecutionEnvironment } from 'expo-constants';

import LoginScreen from './src/screens/loginScreen';
import InventarioScreen from './src/screens/solicitudScreen';
import GestionScreen from './src/screens/perfilScreen';
import InicioScreen from './src/screens/inicioScreen';
import ReporteScreen from './src/screens/reporteScreen';
import MenuInferior from './src/components/menuInferior';
import Fondo from './src/components/fondo';
import Titulo from './src/components/titulo';

// Expo Go (Android) no trae los módulos nativos de push y expo-notifications se cae al importarse.
// Por eso la pantalla de notificaciones solo se carga en la app de desarrollo (APK de EAS).
const enExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
const NotificacionesPush = enExpoGo ? null : require('./src/screens/NotificacionesPush').default;

export default function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const [pantallaActual, setPantallaActual] = useState('inicio');
  // los reportes viven aquí y no en ReporteScreen: al cambiar de pantalla
  // ReporteScreen se desmonta y su estado se perdía
  const [reportes, setReportes] = useState([
    {
      id: 1,
      codigo: 'REP-001',
      producto: 'Monitor LED 24"',
      tipo: 'Dañado',
      descripcion: 'Pantalla con rayones en la esquina inferior.',
      imagen: null,
      fecha: 'Oct 1',
      estado: 'Aprobado',
    },
    {
      id: 2,
      codigo: 'REP-002',
      producto: 'Caja de cereal',
      tipo: 'Vencido',
      descripcion: 'Lote con fecha de caducidad pasada.',
      imagen: null,
      fecha: 'Oct 2',
      estado: 'En revisión',
    },
  ]);

  if (!usuarioAutenticado){
    return(
      <View style={styles.contenedor}>
        <StatusBar style="dark"/>
        <Fondo/>
        <LoginScreen onLogin={() => setUsuarioAutenticado(true)}/>
      </View>
    )
  }

  let pantalla;
  if (pantallaActual === 'inventario'){
    pantalla = <InventarioScreen/>
  } else if (pantallaActual === 'gestion'){
    pantalla = <GestionScreen/>
  } else if (pantallaActual === 'reporte'){
    pantalla = <ReporteScreen reportes={reportes} setReportes={setReportes}/>
  } else if (pantallaActual === 'notificaciones'){
    pantalla = NotificacionesPush
      ? <NotificacionesPush/>
      : <View style={styles.aviso}>
          <Titulo texto="Notificaciones" subtitulo="No disponibles en Expo Go: ábrelas en la app de desarrollo (APK)."/>
        </View>
  } else{
    pantalla = <InicioScreen/>
  }

  return(
    <View style={styles.contenedor}>
      <StatusBar style="dark"/>
      <Fondo/>
      {pantalla}
      <MenuInferior
        cambiarPantalla={setPantallaActual}
        pantallaActual={pantallaActual}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, flexDirection: 'column' },
  aviso: { flex: 1, paddingHorizontal: 20, paddingTop: 56 },
});
