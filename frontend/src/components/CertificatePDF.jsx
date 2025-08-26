import React from 'react';
import {useEffect} from 'react';

import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 40
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
    paddingBottom: 20
  },
  logo: {
    width: 120,
    height: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 30
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  label: {
    fontSize: 12,
    color: '#6b7280',
    width: '30%'
  },
  value: {
    fontSize: 12,
    color: '#111827',
    width: '70%'
  },
  images: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  imageContainer: {
    width: '30%',
    marginRight: '3%',
    marginBottom: 10
  },
  image: {
    width: '100%',
    height: 80
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    fontSize: 10,
    color: '#6b7280'
  },
  hash: {
    fontFamily: 'Courier',
    fontSize: 10,
    color: '#6b7280',
    wordBreak: 'break-all'
  }
});

const CertificatePDF = ({asset, assetId, date}) => {

  const categoryDetailsFields = () => {

    switch(asset.category) {
      case 'RealEstate':
        return [
          { name: 'address', label: 'PropertyAddress'},
        ];
      case 'Vehicle':
        return [
          { name: 'type', label: 'Vehicle Type:'},
        ];
      case 'Equipment':
        return [
          { name: 'manufacturer', label: 'Manufacturer'},
      ];
    }
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Verisys</Text>
            <Text style={styles.subtitle}>Asset Ownership Certificate</Text>
          </View>
          <View>
            <Text style={{ fontSize: 12 }}>Date: {date}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Asset Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.value}>{asset.asset_type === 'Physical' ? 'Physical Asset' : 'Non-Physical Asset'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Category:</Text>
           <Text style={styles.value}>
              {asset.category?.replace(/([A-Z])/g, ' $1').trim()}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{asset.details.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.value}>{asset.details.description}</Text>
          </View>
          
          {/* Display category-specific fields */}
          {
            ['RealEstate', 'Equipment', 'Vehicle'].includes(asset.category) && 
            categoryDetailsFields().map((field) => {
              return (
                  <View style={styles.row}>
                    <Text style={styles.label}>{field.label}</Text>
                    <Text style={styles.value}>{asset.details[field.name]}</Text>
                  </View>
             );
            })
          }

          <View style={styles.row}>
            <Text style={styles.label}>Asset ID:</Text>
            <Text style={styles.hash}>0x{assetId}</Text>
          </View>
        </View>

        {/*{asset.details.images.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Asset Images</Text>
            <View style={styles.images}>
              {asset.details.images.map((img, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image src={URL.createObjectURL(img)} style={styles.image} />
                </View>
              ))}
            </View>
          </View>
        )}*/}

       {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Blockchain Verification</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Transaction Hash:</Text>
            <Text style={[styles.value, styles.hash]}>{assetHash}</Text>
          </View>
        </View>*/}

        <View style={styles.footer}>
          <Text>This certificate serves as proof of registration on the Verisys site on the Internet Computer.</Text>
          <Text>The information contained in this document is immutable and verifiable.</Text>
        </View>
      </Page>
    </Document>
  );
};

export default CertificatePDF;