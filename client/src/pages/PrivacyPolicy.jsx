
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSiteEffects } from "../hooks/useSiteEffects";

export default function PrivacyPolicy() {
    useSiteEffects();
    return (
        <>
            <Navbar activePage="legal" />
            <main className="privacy-page">
                <div className="privacy-container">
                    <header className="privacy-header reveal reveal-up">
                        <span className="privacy-label">WHITEHOUSE ACADEMY</span>
                        <h1>Privacy Policy</h1>
                        <p className="privacy-date">Last Updated: October 29, 2026</p>
                        <p>
                            Whitehouse Academy, the skill development institute of
                            Whitelabel Media, located in Madurai, Tamil Nadu, India,
                            values the privacy and personal information of its website
                            visitors, students, prospective students, and other
                            individuals who interact with us.
                        </p>
                        <p>
                            This Privacy Policy explains how we collect, use, store,
                            protect, and manage personal information when you visit
                            our website, submit an inquiry, register for a course,
                            or use our educational services.
                        </p>
                        <p>
                            By accessing our website or voluntarily providing your
                            personal information, you acknowledge that you have read
                            this Privacy Policy.
                        </p>
                    </header>

                    <section className="reveal">
                        <h2>1. About Whitehouse Academy</h2>
                        <p>
                            Whitehouse Academy provides practical, industry-oriented
                            training and skill development programs designed to help
                            students develop professional skills.
                        </p>
                        <p>Our courses may include:</p>
                        <ul>
                            <li>Digital Marketing</li>
                            <li>Graphic Designing</li>
                            <li>Coding and Web Development</li>
                            <li>Video Editing</li>
                            <li>AI Video Editing</li>
                            <li>Drone Training</li>
                        </ul>
                        <p>
                            We use personal information to respond to enquiries,
                            manage course registrations, communicate with students,
                            provide educational services, and improve our website
                            and training experience.
                        </p>
                    </section>

                    <section className="reveal">
                        <h2>2. Information We Collect</h2>
                        <p>
                            We may collect personal information when you interact
                            with our website, contact our team, or participate in
                            our educational programs.
                        </p>

                        <h3>Personal Information</h3>
                        <p>Depending on your interaction with us, information may include:</p>
                        <ul>
                            <li>Full name</li>
                            <li>Mobile number</li>
                            <li>Email address</li>
                            <li>Educational qualifications</li>
                            <li>Course interests</li>
                            <li>Registration details</li>
                            <li>Communication preferences</li>
                            <li>Information voluntarily provided through enquiry forms</li>
                        </ul>

                        <h3>Technical Information</h3>
                        <p>
                            When you visit our website, certain technical information
                            may be collected automatically, including:
                        </p>
                        <ul>
                            <li>IP address</li>
                            <li>Browser type and version</li>
                            <li>Device information</li>
                            <li>Operating system</li>
                            <li>Website pages visited</li>
                            <li>Date and time of visits</li>
                            <li>Referring website information</li>
                        </ul>
                        <p>
                            This information helps us understand website usage,
                            maintain security, and improve the user experience.
                        </p>

                        <h3>Information Provided During Course Registration</h3>
                        <p>
                            Students registering for courses may be required to
                            provide additional information necessary for enrollment,
                            training administration, communication, and applicable
                            educational requirements.
                        </p>
                        <p>
                            We aim to collect only information that is reasonably
                            necessary for these purposes.
                        </p>
                    </section>

                    <section className="reveal">
                        <h2>3. How We Collect Information</h2>
                        <p>We may collect personal information through:</p>
                        <ul>
                            <li>Website enquiry forms</li>
                            <li>Course registration forms</li>
                            <li>Contact forms</li>
                            <li>Telephone calls</li>
                            <li>Email communications</li>
                            <li>Direct interactions with our team</li>
                            <li>Website analytics tools</li>
                            <li>Cookies and similar technologies, where applicable</li>
                        </ul>
                        <p>
                            Providing personal information is generally voluntary
                            unless the information is necessary to process a requested
                            service or fulfill an applicable legal requirement.
                        </p>
                    </section>

                    <section className="reveal">
                        <h2>4. How We Use Your Information</h2>
                        <p>
                            Whitehouse Academy may use personal information for
                            the following purposes:
                        </p>

                        <h3>Course Enquiries and Admissions</h3>
                        <p>
                            To respond to course inquiries, explain available training
                            programs, process registrations, and communicate enrollment
                            information.
                        </p>

                        <h3>Educational Services</h3>
                        <p>
                            To manage student records, coordinate classes, communicate
                            schedules, provide learning resources, and support
                            course-related activities.
                        </p>

                        <h3>Placement and Career Support</h3>
                        <p>
                            To provide relevant placement assistance, career guidance,
                            interview preparation, and employment-related communications
                            where these services are offered.
                        </p>

                        <h3>Communication</h3>
                        <p>To contact students and prospective students regarding:</p>
                        <ul>
                            <li>Course information</li>
                            <li>Admission updates</li>
                            <li>Training schedules</li>
                            <li>Important announcements</li>
                            <li>Registration confirmations</li>
                            <li>Student support</li>
                        </ul>
                        <p>
                            Promotional communications will be handled in accordance
                            with applicable consent and communication requirements.
                        </p>

                        <h3>Website Improvement</h3>
                        <p>
                            To understand website traffic, identify technical issues,
                            improve navigation, and enhance the overall user experience.
                        </p>

                        <h3>Security and Legal Compliance</h3>
                        <p>
                            To protect our website, prevent misuse, maintain business
                            records, address security concerns, and comply with
                            applicable legal obligations.
                        </p>
                    </section>

                    <section className="reveal">
                        <h2>5. Cookies and Website Analytics</h2>
                        <p>
                            Our website may use cookies and similar technologies to
                            improve functionality, understand visitor behavior, and
                            analyze website performance.
                        </p>
                        <p>Cookies may help us:</p>
                        <ul>
                            <li>Understand how visitors use our website.</li>
                            <li>Improve website navigation.</li>
                            <li>Measure website traffic.</li>
                            <li>Identify technical issues.</li>
                            <li>Support relevant website functionality.</li>
                        </ul>
                        <p>
                            We may use analytics services such as Google Analytics
                            or other tools if they are implemented on our website.
                            These services may collect information about website
                            visits, browser activity, device information, and
                            interactions.
                        </p>
                        <p>
                            Where required, we will provide appropriate information
                            and obtain consent for cookies or similar technologies.
                            You may manage cookies through your browser settings.
                            Disabling certain cookies may affect website functionality.
                        </p>
                    </section>

                    <section className="reveal">
                        <h2>6. Google Analytics and Advertising Services</h2>
                        <p>
                            We may use Google Analytics, Google Ads, or other digital
                            marketing tools to understand website performance and
                            improve our communication with prospective students.
                        </p>
                        <p>Depending on the tools implemented, these services may collect:</p>
                        <ul>
                            <li>Website visits</li>
                            <li>Page views</li>
                            <li>Traffic sources</li>
                            <li>Device information</li>
                            <li>Website interactions</li>
                            <li>Advertising-related activity</li>
                        </ul>
                        <p>
                            We may use this information to measure marketing performance,
                            understand user interests, and improve our educational
                            services. Third-party services may process information
                            according to their own privacy policies and applicable
                            settings.
                        </p>
                        <p>
                            Where required, appropriate consent and privacy controls
                            will be provided.
                        </p>
                    </section>

                    <section className="reveal">
                        <h2>7. Sharing of Personal Information</h2>
                        <p>
                            Whitehouse Academy does not sell personal information
                            to third parties.
                        </p>

                        <h3>Service Providers</h3>
                        <p>
                            With trusted service providers who support our website,
                            hosting, communication, analytics, registration, or
                            educational operations.
                        </p>

                        <h3>Educational and Placement Activities</h3>
                        <p>
                            With relevant organizations, employers, or placement
                            partners when necessary for a requested placement-related
                            service and subject to applicable requirements.
                        </p>

                        <h3>Legal Requirements</h3>
                        <p>
                            When disclosure is required by applicable law, court
                            orders, government authorities, or other legally valid
                            requests.
                        </p>

                        <h3>Business Protection</h3>
                        <p>
                            When reasonably necessary to protect our legal rights,
                            website security, students, staff, or business operations.
                        </p>
                        <p>
                            We aim to limit sharing to information necessary for
                            the relevant purpose.
                        </p>
                    </section>

                    <section className="reveal">
                        <h2>8. Data Storage and Retention</h2>
                        <p>
                            We retain personal information only for as long as
                            reasonably necessary to fulfill the purposes described
                            in this Privacy Policy, maintain educational and business
                            records, or comply with applicable legal requirements.
                        </p>
                        <p>Retention periods may depend on:</p>
                        <ul>
                            <li>Course enrollment and completion.</li>
                            <li>Student communication requirements.</li>
                            <li>Educational records.</li>
                            <li>Applicable legal obligations.</li>
                            <li>Business administration.</li>
                            <li>Dispute resolution.</li>
                            <li>Security and fraud prevention.</li>
                        </ul>
                        <p>
                            When personal information is no longer required, we will
                            take appropriate steps to delete it or otherwise handle
                            it in accordance with applicable law and our retention
                            practices.
                        </p>
                    </section>

                    <section className="reveal">
                        <h2>9. Data Security</h2>
                        <p>
                            We take reasonable measures to protect personal information
                            against unauthorized access, disclosure, alteration, loss,
                            or misuse.
                        </p>
                        <p>These measures may include:</p>
                        <ul>
                            <li>Appropriate access restrictions.</li>
                            <li>Website security measures.</li>
                            <li>Secure handling of student information.</li>
                            <li>Monitoring and maintenance of website systems.</li>
                            <li>
                                Limiting access to personal information to authorized
                                personnel and service providers.
                            </li>
                        </ul>
                        <p>
                            However, no website, internet transmission, or electronic
                            storage system can be guaranteed to be completely secure.
                        </p>
                        <p>
                            Users should avoid sharing passwords, confidential
                            information, or unnecessary sensitive personal details
                            through unsecured communication channels.
                        </p>
                    </section>

                    <section className="reveal">
                        <h2>10. Your Privacy Rights</h2>
                        <p>
                            Subject to applicable law, individuals may have rights
                            regarding their personal information.
                        </p>
                        <p>These rights may include:</p>
                        <ul>
                            <li>Requesting information about personal data collected or processed.</li>
                            <li>Requesting access to personal information.</li>
                            <li>Requesting correction of inaccurate or incomplete information.</li>
                            <li>Requesting deletion of personal information where legally applicable.</li>
                            <li>Withdrawing consent where processing is based on consent.</li>
                            <li>Raising concerns or submitting privacy-related complaints.</li>
                            <li>Exercising other rights available under applicable Indian data protection laws.</li>
                        </ul>
                        <p>
                            Requests will be reviewed and handled according to
                            applicable legal requirements. Certain information may
                            need to be retained where required by law or necessary
                            for legitimate business and legal purposes.
                        </p>
                    </section>

                    <section className="reveal">
                        <h2>11. Children’s Privacy</h2>
                        <p>
                            Whitehouse Academy recognizes the importance of protecting
                            children’s personal information.
                        </p>
                        <p>
                            Our website and educational services are intended to be
                            used in accordance with applicable age requirements and
                            legal obligations.
                        </p>
                        <p>
                            Where personal information of a child is collected or
                            processed, we will follow applicable Indian data protection
                            requirements, including parental or guardian consent
                            where legally required.
                        </p>
                        <p>
                            We do not knowingly collect children’s personal information
                            in violation of applicable law.
                        </p>
                        <p>
                            Parents or guardians who believe that a child’s personal
                            information has been provided to us without appropriate
                            authorization may contact us using the details provided below.
                        </p>
                    </section>

                    <section className="reveal">
                        <h2>12. Third-Party Websites</h2>
                        <p>
                            Our website may contain links to external websites,
                            educational platforms, social media services, or other
                            third-party resources.
                        </p>
                        <p>
                            These websites operate independently and may have their
                            own privacy policies, data collection practices, and
                            security measures.
                        </p>
                        <p>
                            Whitehouse Academy is not responsible for the privacy
                            practices or content of external websites.
                        </p>
                        <p>
                            We encourage users to review the privacy policies of
                            third-party websites before sharing personal information
                            with them.
                        </p>
                    </section>

                    <section className="reveal">
                        <h2>13. Email and Communication Preferences</h2>
                        <p>
                            We may contact prospective students and enrolled students
                            regarding their enquiries, registrations, courses, schedules,
                            educational services, and relevant updates.
                        </p>
                        <p>
                            Where promotional communications are sent, we will follow
                            applicable consent and communication requirements.
                        </p>
                        <p>
                            Individuals may request to stop receiving promotional
                            communications by contacting us.
                        </p>
                        <p>
                            However, we may continue to send essential communications
                            related to existing registrations, educational services,
                            transactions, or legal obligations where permitted.
                        </p>
                    </section>

                    <section className="reveal">
                        <h2>14. Data Protection and Applicable Indian Laws</h2>
                        <p>
                            Whitehouse Academy aims to handle personal information
                            responsibly and in accordance with applicable Indian
                            data protection and privacy laws.
                        </p>
                        <p>
                            Our privacy practices will be reviewed and updated as
                            necessary to reflect applicable legal requirements,
                            including the Digital Personal Data Protection Act, 2023,
                            and relevant rules and notifications to the extent applicable.
                        </p>
                        <p>
                            The collection, processing, storage, sharing, and deletion
                            of personal information will be handled according to the
                            applicable legal requirements and our actual operational
                            practices.
                        </p>
                    </section>

                    <section className="reveal">
                        <h2>15. Changes to This Privacy Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time to
                            reflect changes in our website, educational services,
                            data processing practices, or applicable laws.
                        </p>
                        <p>
                            Any updated policy will be published on this page with
                            a revised last updated date.
                        </p>
                        <p>
                            We encourage visitors and students to review this page
                            periodically to stay informed about our privacy practices.
                        </p>
                    </section>

                    <section className="privacy-contact reveal">
                        <h2>16. Contact Us</h2>
                        <p>
                            If you have questions about this Privacy Policy, wish
                            to request access to or correction of your personal
                            information, or have a privacy-related concern,
                            please contact us.
                        </p>

                        <div className="privacy-contact-details">
                            <p><strong>Institution:</strong> Whitehouse Academy</p>
                            <p>
                                <strong>Location:</strong> 42, 2nd Floor, TPK Main Road,
                                Pasumalai, Madurai, Tamil Nadu – 625004, India.
                            </p>
                            <p>
                                <strong>Call:</strong>{' '}
                                <a href="tel:+918098091797">+91 80980 91797</a>
                            </p>
                            <p>
                                <strong>Email:</strong>{' '}
                                <a href="mailto:placement@whitehouse.org.in">
                                    placement@whitehouse.org.in
                                </a>
                            </p>
                            <p>
                                <strong>Website:</strong>{' '}
                                <a
                                    href="https://whitehouse.org.in/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    https://whitehouse.org.in/
                                </a>
                            </p>
                        </div>

                        <p>
                            We will review privacy-related inquiries and respond
                            in accordance with applicable requirements.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
