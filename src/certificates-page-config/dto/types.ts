export type CertificatesDocument = {
  title: string;
  link: string; // stored filename
};

export type CertificatesItem = {
  id: number;
  title: string;
  content: string;
  order: number;
  documents: CertificatesDocument[];
};

export type CertificatesTab = {
  name: string;
  items: CertificatesItem[];
};

