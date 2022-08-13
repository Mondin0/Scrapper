export const mockProfiles = [
    'https://www.linkedin.com/in/piero-sandro-0206?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADE17_kBJj4XmHhDKVQ-24OXAdpYNAsv678',
    'https://www.linkedin.com/in/phool-antony-herrera-condezo-143004205?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADQl68MB7PhbkYUmF_5Ik_NOeMsXMi14Yu4',
    'https://www.linkedin.com/in/robert-landeo-89b82a192?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAC1UKncB8kq6AQ-12PxxsIz721tovmrzAA0',
  ];
  
  export const mockResponseProfiles = mockProfiles.map(profile => ({
    raw: profile,
    profileVar: profile.match(/urn.+/)[0].replace('miniP','p').replace('Afs','Afsd')
  }));