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

// Données des projets à migrer
const projectsData = [
  {
    id: 'urt9AatDM1vGtIOXeJLX',
    title: 'Ndupé',
    description: 'Plateforme de gestion des étudiants pour les universités togolaises',
    imageUrl: '/images/ndupe.png',
    projectUrl: 'https://ndupe.com',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
    projectType: 'web',
    sortOrder: 1,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'affund123456789',
    title: 'Affund',
    description: 'Plateforme de financement participatif pour les projets africains',
    imageUrl: '/images/affund_1.png',
    projectUrl: 'https://affund.com',
    techStack: ['Next.js', 'TypeScript', 'Firebase', 'Stripe'],
    projectType: 'web',
    sortOrder: 2,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: 'dresslike123456789',
    title: 'DressLike',
    description: 'Application mobile de mode et style personnel',
    imageUrl: '/images/dresslike.png',
    projectUrl: 'https://dresslike.app',
    techStack: ['React Native', 'Firebase', 'Expo'],
    projectType: 'mobile',
    sortOrder: 3,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15')
  },
  {
    id: 'fginfluence123456789',
    title: 'FG Influence',
    description: 'Plateforme de marketing d\'influence pour les marques',
    imageUrl: '/images/fginfluence.png',
    projectUrl: 'https://fginfluence.com',
    techStack: ['Vue.js', 'Laravel', 'MySQL', 'AWS'],
    projectType: 'web',
    sortOrder: 4,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01')
  },
  {
    id: 'growl123456789',
    title: 'Growl',
    description: 'Application de fitness et nutrition personnalisée',
    imageUrl: '/images/growl.png',
    projectUrl: 'https://growl.app',
    techStack: ['Flutter', 'Firebase', 'Dart'],
    projectType: 'mobile',
    sortOrder: 5,
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15')
  },
  {
    id: 'ift123456789',
    title: 'Institut Français Togo',
    description: 'Site web officiel de l\'Institut Français du Togo',
    imageUrl: '/images/ift.png',
    projectUrl: 'https://institutfrancais-togo.org',
    techStack: ['WordPress', 'PHP', 'MySQL'],
    projectType: 'web',
    sortOrder: 6,
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-04-01')
  },
  {
    id: 'klumer123456789',
    title: 'Klumer',
    description: 'Plateforme de e-commerce pour les artisans locaux',
    imageUrl: '/images/klumer.png',
    projectUrl: 'https://klumer.com',
    techStack: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma'],
    projectType: 'web',
    sortOrder: 7,
    createdAt: new Date('2024-04-15'),
    updatedAt: new Date('2024-04-15')
  },
  {
    id: 'latribu123456789',
    title: 'LaTribu',
    description: 'Réseau social pour les communautés africaines',
    imageUrl: '/images/latribu.png',
    projectUrl: 'https://latrib.io',
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    projectType: 'web',
    sortOrder: 8,
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date('2024-05-01')
  },
  {
    id: 'look123456789',
    title: 'Look',
    description: 'Application de réalité augmentée pour essayer des vêtements',
    imageUrl: '/images/look.png',
    projectUrl: 'https://look.app',
    techStack: ['Unity', 'ARCore', 'C#', 'Firebase'],
    projectType: 'mobile',
    sortOrder: 9,
    createdAt: new Date('2024-05-15'),
    updatedAt: new Date('2024-05-15')
  }
];

async function syncProductionData() {
  try {
    console.log('🔄 Synchronisation des données de production...');
    
    // Supprimer tous les projets existants
    console.log('🧹 Suppression des anciens projets...');
    const projectsRef = db.collection('projects');
    const snapshot = await projectsRef.get();
    
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    console.log(`✅ ${snapshot.docs.length} anciens projets supprimés`);
    
    // Ajouter les nouveaux projets
    console.log('📝 Ajout des nouveaux projets...');
    const addBatch = db.batch();
    
    projectsData.forEach((project) => {
      const docRef = projectsRef.doc(project.id);
      addBatch.set(docRef, {
        ...project,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
      });
    });
    
    await addBatch.commit();
    console.log(`✅ ${projectsData.length} nouveaux projets ajoutés`);
    
    // Vérifier la synchronisation
    console.log('🔍 Vérification de la synchronisation...');
    const verifySnapshot = await projectsRef.get();
    console.log(`✅ ${verifySnapshot.docs.length} projets dans la base de production`);
    
    // Afficher les détails des projets
    verifySnapshot.docs.forEach((doc) => {
      const data = doc.data();
      console.log(`  - ${data.title} (${data.projectType})`);
    });
    
    console.log('🎉 Synchronisation terminée avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error);
    process.exit(1);
  }
}

// Exécuter la synchronisation
syncProductionData();