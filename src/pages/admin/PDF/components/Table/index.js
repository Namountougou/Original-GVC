import { View, StyleSheet } from '@react-pdf/renderer';
import { Header } from './header';
import { Row } from './row';
import { Footer } from './footer';

const styles = StyleSheet.create({
  tableContainer: {
    
    margin: '0 20px',
    border : '1px solid #DFE2E9',
  },
});

export const Table = () => (
  <View style={styles.tableContainer}>
    <Header />
  
      <Row 
        numero_serie = "1000"
        marque = "2000"
        modele = "2020-10-10"
        couleur = "3000"
        prix = "3000"
      />
   
   
  </View>
);

