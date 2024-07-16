import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";


const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottom: "1px solid #ddd",
    paddingBottom: 10,
  },
  companyInfo: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  printDate: {
    fontSize: 12,
    textAlign: "right",
    marginTop: 10,
  },
  infoSection: {
    marginBottom: 20,
    border: "1px solid #ddd",
    borderRadius: 5,
    padding: 10,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: "bold",
    fontSize: 12,
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderRadius: 5,
    width: "40%",
  },
  infoValue: {
    fontSize: 12,
    padding: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    width: "55%",
    textAlign: "left",
  },
  status: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#61C74F",
    color: "#ffffff",
    marginBottom: 20,
    fontSize: 14,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: "1px solid #ddd",
    paddingTop: 10,
    marginTop: 20,
    fontSize: 10,
  },
});

const AssetPDF = ({ data }) => {
  const formattedDate = new Date().toLocaleDateString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.companyInfo}>Company X</Text>
          <Text style={styles.printDate}>Printed on: {formattedDate}</Text>
        </View>

        {/* Asset Details */}
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Asset Name:</Text>
            <Text style={styles.infoValue}>{data.assetName}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Asset ID:</Text>
            <Text style={styles.infoValue}>{data.assetId}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Asset Type:</Text>
            <Text style={styles.infoValue}>{data.assetType}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Company:</Text>
            <Text style={styles.infoValue}>{data.companyName}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Request Date:</Text>
            <Text style={styles.infoValue}>{new Date(data.requestDate).toLocaleDateString()}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Approval Date:</Text>
            <Text style={styles.infoValue}>
              {data.approvalDate ? new Date(data.approvalDate).toLocaleDateString() : 'N/A'}
            </Text>
          </View>
        </View>

        {/* Status Section */}
        <View style={styles.status}>
          <Text style={{ color: "#ffffff" }}>Approved</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Requester Email: {data.userEmail}</Text>
          <Text>Request ID: {data._id}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default AssetPDF;
