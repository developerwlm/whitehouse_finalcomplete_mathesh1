import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSiteEffects } from "../hooks/useSiteEffects";

const terms = [
    {
        title: "1. About Whitehouse Academy",
        paragraphs: [
            "Whitehouse Academy provides practical skill development and professional training designed to help students develop industry-relevant skills.",
            "Our courses may include Digital Marketing, Graphic Designing, Coding and Web Development, Video Editing, AI Video Editing, and Drone Training.",
            "Course availability, duration, syllabus, training methods, fees, and other details may vary depending on the program."
        ]
    },
    {
        title: "2. Website Usage",
        paragraphs: ["By using our website, you agree to:"],
        bullets: [
            "Provide accurate and complete information when submitting enquiries or registration forms.",
            "Use the website only for lawful purposes.",
            "Avoid activities that may damage, disrupt, or interfere with the website.",
            "Not attempt unauthorized access to our website, servers, or systems.",
            "Not submit misleading, fraudulent, abusive, or inappropriate information."
        ],
        ending: "We reserve the right to restrict or suspend access to our website if we reasonably believe these terms have been violated."
    },
    {
        title: "3. Course Enquiries and Registration",
        paragraphs: [
            "Students interested in our courses may contact Whitehouse Academy through the website, telephone, email, or other available communication channels.",
            "Submitting an enquiry does not guarantee admission or enrollment.",
            "Course enrollment will be confirmed only after completing the applicable registration requirements and receiving confirmation from our authorized team.",
            "Students are responsible for providing accurate personal and contact information during registration."
        ]
    },
    {
        title: "4. Course Information and Training",
        paragraphs: [
            "Whitehouse Academy aims to provide practical, industry-oriented training based on the course curriculum and learning objectives.",
            "Course information displayed on the website is provided for general guidance.",
            "We may update or modify course curriculum, training schedules, course duration, delivery methods, trainers, learning resources, available courses, and training facilities.",
            "Any significant changes affecting an enrolled student will be communicated through appropriate channels wherever reasonably possible."
        ]
    },
    {
        title: "5. Course Fees and Payments",
        paragraphs: [
            "Course fees, payment schedules, applicable discounts, and other charges will be communicated to students before enrollment.",
            "Students are responsible for paying the applicable course fees according to the agreed payment schedule."
        ],
        bullets: [
            "Course fees must be paid through authorized payment methods.",
            "Any applicable taxes or additional charges will be communicated before payment.",
            "Discounts and promotional offers are subject to their stated eligibility conditions.",
            "Students should retain payment receipts and confirmation messages.",
            "Admission and access to training may be subject to completion of the required payment formalities."
        ],
        ending: "Whitehouse Academy reserves the right to revise course fees for future enrollments. Any applicable fee changes for existing students will be communicated according to the agreed enrollment terms."
    },
    {
        title: "6. Cancellation, Refunds and Course Withdrawal",
        paragraphs: [
            "Students who wish to cancel their enrollment, withdraw from a course, or request a refund must contact Whitehouse Academy through its official communication channels.",
            "Refund eligibility, cancellation charges, applicable deductions, and processing timelines will depend on the refund policy communicated during enrollment and the circumstances of the request.",
            "Where no separate written refund policy has been provided, students should contact our team for clarification before making payment.",
            "Refund requests will be reviewed individually and handled in accordance with the applicable enrollment terms and Indian law.",
            "Nothing in these Terms and Conditions is intended to exclude any consumer rights that cannot legally be excluded."
        ]
    },
    {
        title: "7. Attendance and Student Responsibilities",
        paragraphs: ["Students are expected to:"],
        bullets: [
            "Attend classes regularly and follow the training schedule.",
            "Participate actively in practical sessions and learning activities.",
            "Complete assignments and projects within the specified timelines.",
            "Respect trainers, staff members, and fellow students.",
            "Follow classroom, laboratory, studio, and equipment safety instructions.",
            "Maintain appropriate behavior during training.",
            "Use learning resources responsibly."
        ],
        ending: "Students are responsible for maintaining their own progress and completing the course requirements. Repeated misconduct, unauthorized activities, or violations of academy rules may result in disciplinary action, subject to applicable policies and law."
    },
    {
        title: "8. Certificates and Course Completion",
        paragraphs: [
            "Certificates, where offered, may be issued to students who successfully complete the applicable course requirements.",
            "Certificate eligibility may depend on course completion, attendance requirements where applicable, completion of assignments or practical assessments, payment of applicable course fees, and compliance with relevant certification conditions.",
            "Enrollment alone does not guarantee a certificate.",
            "Whitehouse Academy does not guarantee employment, salary, freelance income, business success, or placement unless a specific written commitment has been provided."
        ]
    },
    {
        title: "9. Placement and Career Support",
        paragraphs: [
            "Whitehouse Academy aims to help students develop practical skills that may support their career development.",
            "Career guidance, portfolio assistance, interview preparation, internship opportunities, or placement assistance may be offered depending on the course and available programs.",
            "Employment opportunities depend on individual skills and performance, employer requirements, market conditions, interview results, and relevant qualifications and experience.",
            "Unless expressly agreed in writing, Whitehouse Academy does not guarantee job placement, a specific salary, internship selection, or freelance projects."
        ]
    },
    {
        title: "10. Intellectual Property Rights",
        paragraphs: [
            "All original website content, including text, graphics, logos, photographs, videos, designs, course materials, and other resources, belongs to Whitehouse Academy, Whitelabel Media, or their respective content owners, unless otherwise stated.",
            "Users may not reproduce, distribute, modify, publish, sell, or commercially exploit our copyrighted materials without prior written permission, except where permitted by applicable law.",
            "Students may use course materials for their personal educational purposes, subject to the applicable course rules.",
            "Students must respect the intellectual property rights of trainers, other students, clients, and third parties.",
            "Any project involving third-party assets, software, photographs, music, or other copyrighted materials must comply with the relevant licensing requirements."
        ]
    },
    {
        title: "11. Student Projects and Portfolio",
        paragraphs: [
            "Students may create assignments, designs, websites, videos, campaigns, and other projects during training.",
            "Students are responsible for ensuring that their submitted work does not violate applicable laws or third-party intellectual property rights.",
            "Whitehouse Academy may request permission to display student projects, testimonials, or achievements for educational or promotional purposes.",
            "Such use will be subject to applicable privacy requirements and any necessary student consent.",
            "Students may decline promotional use of their personal information or work without affecting their rights under applicable law."
        ]
    },
    {
        title: "12. Website Content and Accuracy",
        paragraphs: [
            "We make reasonable efforts to provide accurate and updated information on our website. However, course descriptions, schedules, photographs, training details, and other information may change over time.",
            "Website content is provided for general informational purposes and should not be treated as a binding course offer unless confirmed by our authorized team.",
            "We reserve the right to correct errors, update information, or modify website content when necessary."
        ]
    },
    {
        title: "13. Third-Party Websites and Services",
        paragraphs: [
            "Our website may contain links to third-party websites, platforms, tools, or services, including educational platforms, software providers, payment services, social media platforms, or other resources.",
            "Whitehouse Academy does not control the content, availability, security, or policies of third-party websites.",
            "Users are encouraged to review the applicable terms and privacy policies before using external services."
        ]
    },
    {
        title: "14. Privacy and Personal Information",
        paragraphs: [
            "Whitehouse Academy may collect personal information when users submit enquiry forms, register for courses, contact our team, request information about training programs, or interact with our website.",
            "Information may include names, phone numbers, email addresses, and other details voluntarily provided by users.",
            "We use personal information for purposes such as responding to enquiries, processing registrations, communicating course information, providing educational services, and maintaining business records.",
            "Personal information will be handled in accordance with our Privacy Policy and applicable Indian data protection laws.",
            "Users should refer to our Privacy Policy for additional information about data collection, usage, storage, and applicable rights."
        ]
    },
    {
        title: "15. Website Availability and Security",
        paragraphs: [
            "We aim to maintain the availability and proper functioning of our website. However, uninterrupted access cannot be guaranteed.",
            "Website availability may be affected by maintenance, technical issues, internet connectivity, third-party services, or circumstances beyond our reasonable control.",
            "Users must not attempt to introduce malicious software, interfere with website operations, or access restricted systems without authorization."
        ]
    },
    {
        title: "16. Limitation of Liability",
        paragraphs: [
            "To the extent permitted by applicable law, Whitehouse Academy shall not be responsible for losses arising from temporary website interruptions, technical errors or connectivity issues, unauthorized access caused by circumstances beyond our reasonable control, third-party websites or services, or decisions made solely based on general website information.",
            "This section does not exclude liability for matters that cannot legally be excluded or limited under applicable law."
        ]
    },
    {
        title: "17. Indemnification",
        paragraphs: [
            "To the extent permitted by applicable law, users agree to be responsible for claims, damages, or expenses arising from their unlawful use of the website, infringement of third-party rights, or violation of these Terms and Conditions.",
            "This provision does not apply to the extent that such claims or losses result from our own unlawful acts or other circumstances for which liability cannot legally be excluded."
        ]
    },
    {
        title: "18. Changes to Terms and Conditions",
        paragraphs: [
            "Whitehouse Academy may update these Terms and Conditions from time to time to reflect changes in our services, website functionality, business practices, or applicable laws.",
            "Updated terms will be published on this page with a revised date.",
            "Users are encouraged to review this page periodically.",
            "Continued use of the website after changes are published will be subject to the updated terms, to the extent permitted by applicable law."
        ]
    },
    {
        title: "19. Governing Law and Jurisdiction",
        paragraphs: [
            "These Terms and Conditions shall be governed by the laws of India.",
            "Subject to applicable law, disputes arising from the use of our website or services shall be subject to the jurisdiction of the competent courts in Madurai, Tamil Nadu, India.",
            "Nothing in this section limits any mandatory rights or legal remedies available to users under applicable law."
        ]
    }
];

export default function TermsAndConditions() {
    useSiteEffects();
    return (
        <>
            <Navbar activePage="legal" />
            <main className="legal-page">
                <div className="container">
                    <div className="legal-page__header reveal reveal-up">
                        <span className="eyebrow">WHITEHOUSE ACADEMY</span>
                        <h1>Terms & Conditions</h1>
                        <p>Last Updated: October 29, 2026</p>
                        <p>
                            Welcome to Whitehouse Academy, the skill development institute
                            of Whitelabel Media, Madurai, Tamil Nadu, India.
                        </p>
                    </div>

                    <article className="legal-content">
                        <p className="reveal reveal-fade">
                            These Terms and Conditions govern your access to and use of our
                            website, <a href="https://whitehouse.org.in/">whitehouse.org.in</a>,
                            and the educational services offered by Whitehouse Academy.
                        </p>
                        <p>
                            By accessing our website, submitting an inquiry, registering
                            for a course, or using our services, you agree to these Terms
                            and Conditions. If you do not agree, please discontinue using
                            our website and services.
                        </p>

                        {terms.map((section) => (
                            <section className="legal-section reveal" key={section.title}>
                                <h2>{section.title}</h2>

                                {section.paragraphs?.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}

                                {section.bullets && (
                                    <ul>
                                        {section.bullets.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                )}

                                {section.ending && <p>{section.ending}</p>}
                            </section>
                        ))}

                        <section className="legal-section reveal">
                            <h2>20. Contact Information</h2>
                            <p>
                                For questions, course inquiries, registration details,
                                cancellation requests, or clarification regarding these
                                Terms and Conditions, please contact Whitehouse Academy.
                            </p>
                            <p><strong>Institution:</strong> Whitehouse Academy</p>
                            <p>
                                <strong>Location:</strong> 42, 2nd floor, TPK Main Road,
                                Pasumalai, Madurai, Tamil Nadu – 625004.
                            </p>
                            <p>
                                <strong>Call:</strong>{" "}
                                <a href="tel:+918098091797">+91 80980 91797</a>
                            </p>
                            <p>
                                <strong>Mail:</strong>{" "}
                                <a href="mailto:placement@whitehouse.org.in">
                                    placement@whitehouse.org.in
                                </a>
                            </p>
                            <p>
                                <strong>Website:</strong>{" "}
                                <a href="https://whitehouse.org.in/">
                                    https://whitehouse.org.in/
                                </a>
                            </p>
                        </section>
                    </article>
                </div>
            </main>

            <Footer />
        </>
    );
}
