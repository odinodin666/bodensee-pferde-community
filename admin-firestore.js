// Firestore integration for members management
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js";

// Initialize Firestore
const db = getFirestore(window.app); // app initialized in admin-auth.js

// Export Firestore functions
window.firestore = {
  db,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc
};

// Members collection reference
const membersCollection = collection(db, "members");

// Load all members from Firestore
export async function loadMembers() {
  try {
    const querySnapshot = await getDocs(membersCollection);
    const members = [];
    querySnapshot.forEach((doc) => {
      members.push({ id: doc.id, ...doc.data() });
    });
    return members;
  } catch (error) {
    console.error("Error loading members:", error);
    throw error;
  }
}

// Add a new member
export async function addMember(memberData) {
  try {
    // Only allow certain fields for security
    const allowedData = {
      firstName: memberData.firstName || '',
      lastName: memberData.lastName || '',
      email: memberData.email || '',
      phone: memberData.phone || '',
      address: memberData.address || '',
      city: memberData.city || '',
      role: memberData.role || 'member',
      status: memberData.status || 'active',
      membershipLevel: memberData.membershipLevel || 'free',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await addDoc(membersCollection, allowedData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding member:", error);
    throw error;
  }
}

// Update an existing member
export async function updateMember(memberId, memberData) {
  try {
    const memberDoc = doc(db, "members", memberId);
    const updateData = {
      ...memberData,
      updatedAt: new Date()
    };
    // Remove undefined fields
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);
    
    await updateDoc(memberDoc, updateData);
  } catch (error) {
    console.error("Error updating member:", error);
    throw error;
  }
}

// Delete a member
export async function deleteMember(memberId) {
  try {
    const memberDoc = doc(db, "members", memberId);
    await deleteDoc(memberDoc);
  } catch (error) {
    console.error("Error deleting member:", error);
    throw error;
  }
}

// Search members by email or name
export async function searchMembers(searchTerm) {
  try {
    if (!searchTerm) return await loadMembers();
    
    // Note: Firestore doesn't support OR queries easily, so we'd need to do separate queries
    // For simplicity, we'll load all and filter client-side for small datasets
    const members = await loadMembers();
    const lowerTerm = searchTerm.toLowerCase();
    return members.filter(member => 
      (member.firstName && member.firstName.toLowerCase().includes(lowerTerm)) ||
      (member.lastName && member.lastName.toLowerCase().includes(lowerTerm)) ||
      (member.email && member.email.toLowerCase().includes(lowerTerm))
    );
  } catch (error) {
    console.error("Error searching members:", error);
    throw error;
  }
}