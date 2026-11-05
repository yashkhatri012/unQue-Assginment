import * as Device from 'expo-device';
import { Platform, StyleSheet,View, Text, FlatList } from 'react-native';


import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useEffect, useState } from "react";

import { connectSocket, socket } from "../services/socket";
type Lead = {
  _id: string;
  leadgenId: string;
  name: string;
  email: string;
  createdAt: string;
};


export default function HomeScreen() {
  const [leads, setLeads] = useState<Lead[]>([]);


  useEffect(() => {
  connectSocket();
  socket.on("new-lead", (lead:Lead) => {


    setLeads((prevLeads) => [...prevLeads, lead]);
  console.log("New lead received:", lead);
});
  return () => {
    socket.off("new-lead");
    socket.disconnect();
  };
}, []);


    return (
    <View style={styles.container}>
      <Text style={styles.title}>Lead Dashboard</Text>

      <Text style={styles.subtitle}>
        Total Leads: {leads.length}
      </Text>

      <FlatList
        data={leads}
        keyExtractor={(item) => item.leadgenId}
        renderItem={({ item }) => (
          <View style={styles.leadCard}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.leadId}>
              Lead ID: {item.leadgenId}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No leads received yet.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 8,
    marginBottom: 24,
  },
  leadCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
  },
  email: {
    fontSize: 14,
    color: "#475569",
    marginTop: 6,
  },
  leadId: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 8,
  },
  emptyText: {
    textAlign: "center",
    color: "#94A3B8",
    marginTop: 40,
    fontSize: 15,
  },
});