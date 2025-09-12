#!/usr/bin/env tsx

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Configuration Firebase pour la production
const firebaseConfig = {
  projectId: 'vrai-9a598',
  clientEmail: 'firebase-adminsdk-8hr3l@vrai-9a598.iam.gserviceaccount.com',
  privateKey: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC1M79IoCduUFhl
KXpQDnMQHE+8fPNkMWy68la7bUV6NZJEKcVj6HZRyziLjkxX1OFefpAxxIZHL64D
GGFSzZW235PVs7ZaXkGWIg7wUV0Tm7JdwinBfxuzi23MzfkDV0L9P0c5MTdp6QHm
U8vHLXzdHV+Jk4jkGZUm7P4SQfR9y3Pd/DxQwQZEqfjUioKte6wmxONpccu07URI
z8TTa76WZU2OLMa+eCuPym4fyG8AErj5s12Cr6+Abm/zbJ240XPFVDVQBg6PA6GK
5jlaUBb+S2P+xOY9/sB6OlPAy6g53iZ2lxBqNzqqHatxP73CEJ4m4iA5Z2zCF8Uc
LxWsa469AgMBAAECggEADK6qbBqbepGAh6oOGmrR0QDuRWwTEUI9UN3+cIqkGCWG
Oc5DohZmgPCMjLChCsJb+LllKGU6cbfhAcHz09q5kw2rGEQGVrpYnvmoxSyoq03p
1L1EH2Z2VEwasKuCNXfmziNJk0jszt/vpwTakx5NqjXbVogfMWR8p4y4S/kA8/SK
LJF/pV3lo+k8chI91G+AlvY/QkDWw2pJ+KOq8hvfDs+oUspvqA+wRxEhLqm0ah1o
pJVW2L5zzkSdYtUbWAMfTmOXiC94foHFKp+ebq9NsrAy76HYMGhYacKDx5WDZQTL
8ytEbQsZCzXHUqy5QT5JGjfxu1/rLune7yUrSViOSQKBgQD7fR8ZwRT2xRek2IuZ
y7U0/o6JO3mWqWSc79k/sk3dYnQNWN7ZMpPciv7bnSWx+8g+vf2PvcDinMAxgPCc
n2BFQfrT6u9COls453aHMP2HNR3lwp5Oh0oquvRv1vxEZimlpZFb0bUv3NHt8NzO
1ydG59QJoP3PkqWJHp+72lRFaQKBgQC4c9uXx+wmUS0moCAMXPbF5iL7nNPsrmtw
OWraZvz9DAjs/NxFncAruQEnzVcbB/ATyvH5/EfSFNmO/W0R1zXdZVxx9btwi9cP
x4jh1Iq3+Fy+emRlA5Zxb7DP/0yw+EYY1VhFu7f7tN2AptB3U3POlqI6JdCm06TA
cCvUchmwNQKBgQCV3i99eonSsQtxCjbPFQ1MonIwp8fCl/nEaE6P3eL3DifYmGBd
EP36jL5qA5EmKsRfV3tWgJ8ErKMAHTXGMFf/jd07EqM4VWxtUcpZsEE1pNrHRB5w
78CsDDOEvpog7Lze4Pbpv+P4vOBBqqr7fE4EvDyo7E60t1B8kUpheS+FGQKBgGmK
SVzIlPO7wQT33D6WttC3hM7Jhm1Hw8vb3qsHALzdtQG9EWB4Cew6mFGo6a1a1mDM
37X1RzcKnQ13LoBlzrlWdRXz0ANu0GiD+GuXTKRFZPPMXkN6UQupJ9drsfsUpC8z
a6XC6lwIujERwfh09K+Be2OgHYpHUV6XEE0n2FD9AoGAMol29WMas1wJlbZrLPO1
0pGRWKxNoQhsjnWuiHx4t9mFg32YyjS55ktVWFar4MOuVvj4euPFykGR2G8SXS6a
SlyFaNPf8cWj25uKGHUtwABH0adO18UEEXbQUgVVwvdv9GgROZgViJr1g4Ymo8LF
IUCvEnYsHdVT91QillEsW7M=
-----END PRIVATE KEY-----`,
};

// Initialiser Firebase Admin
if (!getApps().length) {
  initializeApp({
    credential: cert(firebaseConfig),
    projectId: 'vrai-9a598',
  });
}

const db = getFirestore();

async function testProductionData() {
  try {
    console.log('🔍 Test des données de production...');
    
    // Récupérer tous les projets
    const projectsRef = db.collection('projects');
    const snapshot = await projectsRef.get();
    
    console.log(`📊 Nombre de projets: ${snapshot.docs.length}`);
    
    if (snapshot.docs.length === 0) {
      console.log('❌ Aucun projet trouvé en production');
      return;
    }
    
    // Afficher les détails des projets
    console.log('\n📋 Détails des projets:');
    snapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`${index + 1}. ${data.title}`);
      console.log(`   - Type: ${data.projectType}`);
      console.log(`   - URL: ${data.projectUrl}`);
      console.log(`   - Tech: ${data.techStack?.join(', ') || 'N/A'}`);
      console.log(`   - Image: ${data.imageUrl}`);
      console.log('');
    });
    
    // Vérifier les types de projets
    const webProjects = snapshot.docs.filter(doc => doc.data().projectType === 'web');
    const mobileProjects = snapshot.docs.filter(doc => doc.data().projectType === 'mobile');
    
    console.log(`🌐 Projets Web: ${webProjects.length}`);
    console.log(`📱 Projets Mobile: ${mobileProjects.length}`);
    
    console.log('\n✅ Test terminé avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
    process.exit(1);
  }
}

// Exécuter le test
testProductionData();