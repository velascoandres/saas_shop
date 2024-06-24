import type { CONTACT_TYPE } from '../constants';

export type ContactType = (typeof CONTACT_TYPE)[keyof typeof CONTACT_TYPE];
