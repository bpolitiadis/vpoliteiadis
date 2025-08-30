export interface SocialProfile {
  platform: string;
  username: string;
  displayName: string;
  deepLink: string;
  webUrl: string;
  icon: string;
  ariaLabel: string;
}

export const socialProfiles: SocialProfile[] = [
  {
    platform: 'github',
    username: 'bpolitiadis',
    displayName: 'GitHub',
    deepLink: 'https://github.com/bpolitiadis',
    webUrl: 'https://github.com/bpolitiadis',
    icon: 'github',
    ariaLabel: 'GitHub profile'
  },
  {
    platform: 'linkedin',
    username: 'vasileios-politeiadis',
    displayName: 'LinkedIn',
    deepLink: 'linkedin://profile/vasileios-politeiadis',
    webUrl: 'https://www.linkedin.com/in/vasileios-politeiadis/',
    icon: 'linkedin',
    ariaLabel: 'LinkedIn profile'
  },
  {
    platform: 'instagram',
    username: 'arte.imaginari',
    displayName: 'Instagram',
    deepLink: 'instagram://user?username=arte.imaginari',
    webUrl: 'https://www.instagram.com/arte.imaginari/',
    icon: 'instagram',
    ariaLabel: 'Instagram profile'
  }
];

export const getSocialProfile = (platform: string): SocialProfile | undefined => {
  return socialProfiles.find(profile => profile.platform === platform);
};

export const getAllSocialProfiles = (): SocialProfile[] => {
  return socialProfiles;
};
