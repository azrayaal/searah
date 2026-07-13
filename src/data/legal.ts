import type { LegalDocument } from '@/types';

/**
 * Legal notices published on the corporate portal.
 * Slugs are stable and used directly as route parameters (`/legal/:slug`).
 */
export const legalDocuments: LegalDocument[] = [
  {
    slug: 'terms',
    title: 'Terms & Conditions',
    updatedAt: '2026-05-18',
    intro:
      'These Terms & Conditions govern access to and use of the Searah corporate portal at searah.com, including its public pages and the authenticated areas made available to employees, contractors and approved partners. The portal is operated by Searah Energy Holdings, a joint venture owned in equal shares by Eni and PETRONAS, with its registered office at Menara Searah, Jakarta. Please read these terms carefully before using the site.',
    sections: [
      {
        id: 'terms-acceptance',
        heading: '1. Acceptance of these terms',
        paragraphs: [
          'By accessing, browsing or otherwise using this portal you confirm that you have read, understood and agreed to be bound by these Terms & Conditions and by our Privacy Policy. If you do not accept them, you must stop using the portal immediately.',
          'Where you access the portal using credentials issued by Searah — as an employee, a seconded shareholder staff member, a contractor or an approved supplier — you additionally agree to comply with the Searah Information Security Policy, the Acceptable Use Standard and any conditions attached to your account. Your organisation may also be bound by a separate written agreement with Searah; where that agreement conflicts with these terms in respect of the subject matter it covers, that agreement prevails.',
          'If you are using the portal on behalf of a company or other legal entity, you represent that you have authority to bind that entity to these terms, and references to "you" include that entity.',
        ],
      },
      {
        id: 'terms-permitted-use',
        heading: '2. Permitted use',
        paragraphs: [
          'The portal is provided for information, for corporate communication and for the delivery of internal services to authorised users. You may view, download and print material from the public areas of the portal for your own lawful reference, provided you do not alter it and you retain all proprietary notices.',
          'You must not use the portal in any way that is unlawful, that interferes with its operation, or that compromises the security of Searah, its shareholders, its personnel or its counterparties.',
        ],
        bullets: [
          'Do not attempt to gain unauthorised access to any part of the portal, any server on which it is hosted, or any account other than your own.',
          'Do not introduce malware, conduct penetration testing, or use automated tools to scrape, index or harvest content or personal data without our prior written consent.',
          'Do not share, publish or resell content from the authenticated areas of the portal, and do not disclose credentials issued to you.',
          'Do not use Searah names, logos or content to imply endorsement, partnership or authorisation that has not been given in writing.',
          'Do not use the portal to transmit unlawful, defamatory, harassing or misleading material, or material that infringes the rights of others.',
        ],
      },
      {
        id: 'terms-ip',
        heading: '3. Intellectual property',
        paragraphs: [
          'All content on this portal — including text, graphics, photographs, video, data, maps, charts, page design, source code and the arrangement of the material — is owned by Searah or licensed to it, and is protected by Indonesian and international copyright, database and trade mark law. Except as expressly permitted in section 2, no licence is granted to you.',
          'The name "Searah", the Searah device mark, and the names and marks of Eni and PETRONAS are the registered or unregistered trade marks of their respective owners. Nothing on this portal grants any right to use them. Requests to use Searah brand assets in publications, media or supplier material must be made in advance to the Corporate Communications department, and are subject to the Searah Brand Guidelines.',
          'Any feedback, suggestions or ideas you submit through the portal may be used by Searah without restriction and without obligation to you.',
        ],
      },
      {
        id: 'terms-confidentiality',
        heading: '4. Confidentiality of internal content',
        paragraphs: [
          'Substantial parts of this portal are restricted to authenticated users and contain information that is confidential to Searah, its shareholders or its counterparties. This includes, without limitation, production data, subsurface and well information, project schedules and cost estimates, procurement and tender material, HSE incident records, the staff directory and organisational structure, and internal policies and procedures.',
          'You must treat all such information as confidential, use it solely for the purpose for which access was granted, and not disclose it to any third party — including to colleagues within your own organisation who do not require it — without prior written authorisation from Searah. This obligation survives the termination of your access.',
          'Certain material on the portal may constitute inside information in relation to the securities of Eni, PETRONAS or their affiliates. Where it does, you must not deal in those securities on the basis of it, nor disclose it other than in the proper performance of your duties. If you believe you have received such information in error, notify legal@searah.com and delete it.',
        ],
      },
      {
        id: 'terms-accounts',
        heading: '5. Accounts and security',
        paragraphs: [
          'Credentials issued to you are personal, non-transferable and must be protected with the multi-factor authentication method assigned to your account. You are responsible for all activity conducted under your credentials.',
          'You must notify the IT Service Desk immediately if you suspect that your credentials have been disclosed or misused, or that any part of the portal has been accessed without authorisation. Searah may suspend or withdraw access at any time, with or without notice, where it considers that these terms have been breached, that access is no longer required, or that suspension is necessary to protect the security of its systems.',
        ],
      },
      {
        id: 'terms-third-party',
        heading: '6. Third-party links and services',
        paragraphs: [
          'The portal contains links to websites and services operated by third parties, including those of Eni, PETRONAS, regulators, joint venture partners and service providers. Those links are provided for convenience only. Searah does not control those sites, does not endorse them, and accepts no responsibility for their content, their availability or their handling of your personal data.',
          'Your use of a third-party site or service is governed by that party’s own terms and privacy notice, which you should read before providing any information to it.',
        ],
      },
      {
        id: 'terms-disclaimers',
        heading: '7. Disclaimers',
        paragraphs: [
          'The content of this portal is provided for general information. While Searah takes reasonable care to ensure that it is accurate at the time of publication, the portal is provided "as is" and "as available", without warranty of any kind, whether express or implied, including any implied warranty of merchantability, fitness for a particular purpose or non-infringement. Searah does not warrant that the portal will be uninterrupted, error-free or free of harmful components.',
          'Production figures, reserves and resource estimates, project schedules, investment amounts and targets published on this portal — including the target of more than 500,000 BOE/D and the USD 20 billion investment programme — are forward-looking statements based on assumptions and expectations current at the date of publication. Actual results may differ materially as a result of reservoir performance, commodity prices, regulatory decisions, supply-chain conditions and other factors outside Searah’s control. Searah undertakes no obligation to update them.',
          'Nothing on this portal constitutes an offer, an invitation to invest, financial or investment advice, or a binding commitment by Searah to enter into any transaction. Contractual commitments are made only in signed written agreements executed by authorised signatories.',
        ],
      },
      {
        id: 'terms-liability',
        heading: '8. Limitation of liability',
        paragraphs: [
          'To the fullest extent permitted by applicable law, Searah, its shareholders, its affiliates and their respective directors, officers and employees shall not be liable for any indirect, incidental, special or consequential loss, or for any loss of profit, revenue, production, contract, goodwill or anticipated saving, arising out of or in connection with your access to or use of the portal, or your inability to access it — whether in contract, tort (including negligence), under statute or otherwise, and whether or not Searah was advised of the possibility of such loss.',
          'Nothing in these terms excludes or limits liability for death or personal injury caused by negligence, for fraud or fraudulent misrepresentation, or for any other liability that cannot lawfully be excluded or limited.',
        ],
      },
      {
        id: 'terms-governing-law',
        heading: '9. Governing law and jurisdiction',
        paragraphs: [
          'These Terms & Conditions, and any non-contractual obligation arising out of or in connection with them, are governed by and construed in accordance with the laws of the Republic of Indonesia.',
          'Any dispute arising out of or in connection with these terms, including any question as to their existence, validity or termination, shall be submitted to and finally resolved by arbitration administered by the Indonesian National Board of Arbitration (Badan Arbitrase Nasional Indonesia, BANI) in accordance with its rules in force at the time of submission. The seat of arbitration shall be Jakarta, the tribunal shall consist of three arbitrators, and the language of the proceedings shall be English.',
          'Nothing in this section prevents Searah from seeking injunctive or other urgent interim relief before any court of competent jurisdiction to protect its confidential information or intellectual property.',
        ],
      },
      {
        id: 'terms-changes',
        heading: '10. Changes to these terms',
        paragraphs: [
          'Searah may amend these Terms & Conditions at any time to reflect changes in law, in regulatory requirements or in the way the portal operates. The version published on this page is the version in force, and the date at the head of this document records when it was last revised.',
          'Material changes affecting authenticated users will be notified through the portal or by email before they take effect. Your continued use of the portal after an amendment has taken effect constitutes acceptance of the amended terms. If you do not accept them, you must stop using the portal.',
          'Questions about these terms should be addressed to the Legal department at legal@searah.com, or in writing to the Legal Department, Menara Searah, Jakarta, Indonesia.',
        ],
      },
    ],
  },

  {
    slug: 'privacy',
    title: 'Privacy Policy',
    updatedAt: '2026-05-18',
    intro:
      'This Privacy Policy explains how Searah Energy Holdings collects, uses, shares, transfers and protects personal data through the searah.com corporate portal and in the course of its business. It applies to visitors to the public site, to employees, contractors and seconded staff using the authenticated areas, and to candidates, suppliers and community members whose data we hold. Searah is the data controller for the processing described here, and complies with Indonesia’s Personal Data Protection Law (Law No. 27 of 2022) and Malaysia’s Personal Data Protection Act 2010.',
    sections: [
      {
        id: 'privacy-scope',
        heading: '1. Scope and who we are',
        paragraphs: [
          'Searah Energy Holdings is an upstream oil and gas joint venture owned in equal shares by Eni and PETRONAS, with its headquarters at Menara Searah, Jakarta, a regional office in Kuala Lumpur, and operating bases in Balikpapan, Bintulu and Kota Kinabalu. This policy covers processing carried out by Searah and by its operating entities Searah Mahakam (SM), Searah Kutai (SK) and Searah Malaysia Borneo (SMB).',
          'Where Searah processes personal data on behalf of a shareholder, a joint venture partner or a regulator, that party may be a separate controller with its own privacy notice. This policy does not cover processing carried out by third-party websites linked from our portal.',
        ],
      },
      {
        id: 'privacy-data-collected',
        heading: '2. Personal data we collect',
        paragraphs: [
          'We collect only the personal data we need for the purposes set out in this policy. The categories we hold depend on your relationship with Searah.',
        ],
        bullets: [
          'Identity and contact data: name, employee or contractor number, job title, entity and department, work email address, work telephone number, office or site location.',
          'Access and security data: credentials, multi-factor authentication records, badge and turnstile logs, visitor records, and CCTV footage at our offices and operated sites.',
          'Technical and usage data: IP address, browser and device type, operating system, pages viewed, time and duration of visits, and referral source.',
          'Employment and HR data (for staff and contractors): payroll and benefits information, competency and training records, medical fitness-to-work certificates, and offshore travel and manifest records.',
          'Recruitment data (for candidates): curriculum vitae, qualifications, references, right-to-work documentation and interview records.',
          'Correspondence and submissions: enquiries sent through our contact forms, media requests, supplier registrations, and reports made through our whistleblowing channel.',
          'Special category and sensitive data: health data strictly necessary for occupational fitness, emergency response and medical evacuation. We collect this only where it is necessary and permitted by law, and we restrict access to authorised medical and HSE personnel.',
        ],
      },
      {
        id: 'privacy-lawful-basis',
        heading: '3. Purposes and lawful basis',
        paragraphs: [
          'Under Indonesia’s Law No. 27 of 2022 we rely on consent, the performance of a contract, compliance with a legal obligation, the protection of vital interests, and our legitimate interests, as applicable to each purpose. Under Malaysia’s PDPA 2010 we rely primarily on consent and on the statutory exemptions available for the performance of a contract and compliance with legal obligations.',
        ],
        bullets: [
          'To operate the portal, authenticate users and secure our systems — legitimate interests and, for employees and contractors, performance of contract.',
          'To administer employment, contractor engagement, payroll, training and offshore logistics — performance of contract and legal obligation.',
          'To protect life and safety in an emergency, including medical evacuation and personnel accounting — protection of vital interests and legal obligation.',
          'To comply with regulatory, tax, health and safety, anti-bribery and sanctions obligations in Indonesia and Malaysia — legal obligation.',
          'To assess candidates and manage recruitment — steps taken at your request prior to entering a contract, and consent where required.',
          'To send corporate communications, publications and event invitations where you have asked to receive them — consent, which you may withdraw at any time.',
          'Where we rely on your consent, you may withdraw it at any time without affecting the lawfulness of processing carried out before withdrawal.',
        ],
      },
      {
        id: 'privacy-cookies',
        heading: '4. Cookies and similar technologies',
        paragraphs: [
          'We use cookies and similar technologies to make the portal work, to remember your preferences and to understand how the site is used. Strictly necessary cookies — those required for authentication, session management, load balancing and security — are set without consent because the portal cannot function without them.',
          'Analytics and preference cookies are set only with your consent, which we request through the cookie banner on your first visit and which you may change at any time through the cookie settings link in the footer. We do not use cookies for advertising, we do not sell any data derived from them, and we do not permit third parties to track you across other websites from our portal.',
          'You may also block or delete cookies through your browser settings. Blocking strictly necessary cookies will prevent you from signing in to the authenticated areas of the portal.',
        ],
      },
      {
        id: 'privacy-retention',
        heading: '5. Retention',
        paragraphs: [
          'We keep personal data only for as long as it is needed for the purpose for which it was collected, or for as long as the law requires us to keep it. Retention periods are set out in the Searah Records Retention Schedule and reviewed annually.',
        ],
        bullets: [
          'Portal access and authentication logs: 12 months.',
          'CCTV footage: 30 days, unless retained for an investigation or legal proceedings.',
          'Website analytics data: 26 months in aggregated or pseudonymised form.',
          'Recruitment records for unsuccessful candidates: 12 months, or longer with your consent so that we may consider you for future roles.',
          'Employee and contractor records: for the duration of the engagement and thereafter for the period required by Indonesian and Malaysian employment, tax and social security law.',
          'Occupational health, HSE incident and exposure records: for the periods mandated by applicable health and safety legislation, which may extend for decades after the engagement ends.',
          'When a retention period expires, data is securely deleted or irreversibly anonymised.',
        ],
      },
      {
        id: 'privacy-sharing',
        heading: '6. Disclosure and international transfers',
        paragraphs: [
          'We share personal data within the Searah group and, where necessary, with our shareholders Eni (Italy) and PETRONAS (Malaysia) for governance, audit and secondment purposes. We also share it with service providers acting on our instructions — including cloud hosting, IT support, payroll, occupational health, medical evacuation and travel security providers — each of which is bound by a written processing agreement. We disclose data to regulators, tax authorities, law enforcement and courts where we are legally obliged to do so, and to professional advisers where necessary for the establishment or defence of legal claims. We do not sell personal data.',
          'Because Searah operates in Indonesia and Malaysia and is owned by an Italian and a Malaysian shareholder, personal data is transferred across borders. Transfers out of Indonesia are made in accordance with Article 56 of Law No. 27 of 2022: to countries with an adequate level of protection, or on the basis of binding, appropriate safeguards in the form of intra-group agreements and standard contractual clauses, or with your explicit consent where no other basis applies.',
          'Transfers out of Malaysia are made in accordance with the PDPA 2010, on the basis of your consent, the necessity of the transfer for the performance of a contract, or the existence of comparable protection in the recipient jurisdiction secured by contract. Where data is transferred to Eni in Italy, it is additionally protected by the European Union’s data protection framework. A copy of the safeguards applied to a specific transfer can be requested from the Data Protection Officer.',
        ],
      },
      {
        id: 'privacy-rights',
        heading: '7. Your rights',
        paragraphs: [
          'Subject to the conditions and exemptions in Indonesian and Malaysian law, you have the following rights in relation to the personal data we hold about you.',
        ],
        bullets: [
          'To be informed of how your data is processed, and to obtain a copy of it.',
          'To have inaccurate or incomplete data corrected or updated.',
          'To have your data erased where it is no longer necessary, or where processing was based on consent that you have withdrawn.',
          'To restrict or object to processing, including processing carried out on the basis of our legitimate interests.',
          'To receive your data in a structured, commonly used and machine-readable format, and to have it transmitted to another controller where technically feasible.',
          'To withdraw consent at any time, and to opt out of corporate communications using the unsubscribe link in every message.',
          'To lodge a complaint with the competent supervisory authority — in Indonesia, the authority designated under Law No. 27 of 2022; in Malaysia, the Personal Data Protection Commissioner.',
        ],
      },
      {
        id: 'privacy-security',
        heading: '8. Security',
        paragraphs: [
          'Searah applies technical and organisational measures proportionate to the risk, including encryption of data in transit and at rest, multi-factor authentication, role-based access control, network segmentation between corporate and operational technology environments, continuous monitoring by our security operations centre, and independent penetration testing.',
          'Access to personal data is granted on a need-to-know basis and is reviewed periodically. Our staff and contractors receive mandatory data protection and information security training, and are bound by confidentiality obligations that survive the end of their engagement.',
          'No system can be guaranteed to be completely secure. In the event of a personal data breach that is likely to result in a risk to your rights, we will notify you and the competent supervisory authority within the periods required by law — in Indonesia, within 72 hours of becoming aware of the breach.',
        ],
      },
      {
        id: 'privacy-children',
        heading: '9. Children and third-party sites',
        paragraphs: [
          'The Searah portal is intended for a professional audience and is not directed at children. We do not knowingly collect personal data from anyone under the age of 18. If you believe we have done so, contact the Data Protection Officer and we will delete it.',
          'The portal links to websites operated by our shareholders, regulators, partners and suppliers. We are not responsible for their privacy practices, and we encourage you to read the privacy notice of any site you visit from ours.',
        ],
      },
      {
        id: 'privacy-contact',
        heading: '10. Contacting the Data Protection Officer',
        paragraphs: [
          'Searah has appointed a Data Protection Officer, who is responsible for overseeing compliance with this policy and is the first point of contact for any question or request concerning your personal data.',
          'Data Protection Officer, Searah Energy Holdings, Menara Searah, Jakarta, Indonesia. Email: dpo@searah.com. Telephone: +62 21 5000 700. For matters arising in Malaysia, the Data Protection Officer may also be reached through the regional office in Kuala Lumpur on +60 3 2600 700.',
          'We will acknowledge a data subject request within seven working days and respond substantively within the period required by applicable law. We may ask you to verify your identity before we act on a request. If you are dissatisfied with our response, you may complain to the competent supervisory authority in Indonesia or Malaysia.',
        ],
      },
      {
        id: 'privacy-changes',
        heading: '11. Changes to this policy',
        paragraphs: [
          'We review this Privacy Policy at least annually and whenever there is a material change in how we process personal data or in the law that governs it. The date at the head of this document records the last revision.',
          'Where a change materially affects how we use your data, we will notify you through the portal or by email before it takes effect. Previous versions are retained by the Legal department and are available from the Data Protection Officer on request.',
        ],
      },
    ],
  },
];

/** Resolve a legal document by its route slug (`terms`, `privacy`). */
export function getLegalDocument(slug: string): LegalDocument | undefined {
  return legalDocuments.find((document) => document.slug === slug);
}
