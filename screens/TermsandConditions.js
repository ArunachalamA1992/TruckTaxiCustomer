//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Color from '../Global/Color';
import { Iconviewcomponent } from '../Global/Icontag';
import { Manrope } from '../Global/FontFamily';

// create a component
const TermsandConditions = () => {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>TERMS & CONDITIONS</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>Welcome to Truck taxi. If you continue to browse and use our app/website you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Truck taxi services (Owner of Truck taxi) relationship with you in relation to this app/website and the Services (as described below)</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>In the event there is a conflict between the terms and conditions specified herein and the provisions of any other document executed between the parties hereto, the terms and conditions specified herein would prevail.</Text>
                </View>

                <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>DEFINITIONS</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>The following definitions apply to the terms and conditions set out below that govern this contract of Carriage between you and us:</Text>

                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <Iconviewcomponent
                            Icontag={'AntDesign'}
                            iconname={'checkcircle'}
                            icon_size={20}
                            icon_color={Color.primary}
                        />
                        <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>“We”, “us”, “our”, “Carrier”, “TRUCK TAXI”, “Company” shall refer to Truck taxi services (owner of Truck taxi), its employees, authorised agents and its independent contractors and the entities that carry or undertake to carry the consignment hereunder or perform any other services incidental thereto on its behalf.</Text>
                    </View>
                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <Iconviewcomponent
                            Icontag={'AntDesign'}
                            iconname={'checkcircle'}
                            icon_size={20}
                            icon_color={Color.primary}
                        />
                        <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>“You”, “your”, “consignor” shall refer to the sender, consignor or consignee of the Consignment, holder of this Consignment Note, receiver and owner of the contents of the Consignment or any other party having a legal interest in those contents, as the case may be.</Text>
                    </View>
                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <Iconviewcomponent
                            Icontag={'AntDesign'}
                            iconname={'checkcircle'}
                            icon_size={20}
                            icon_color={Color.primary}
                        />
                        <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>“Carriage” means and includes the whole of the operations and services undertaken by us in connection with the Consignment.</Text>
                    </View>
                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <Iconviewcomponent
                            Icontag={'AntDesign'}
                            iconname={'checkcircle'}
                            icon_size={20}
                            icon_color={Color.primary}
                        />
                        <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>“Consignment” means any package, parcel, sachet, or freight which is or are given to and accepted by us for carriage under our Consignment Note.</Text>
                    </View>
                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <Iconviewcomponent
                            Icontag={'AntDesign'}
                            iconname={'checkcircle'}
                            icon_size={20}
                            icon_color={Color.primary}
                        />
                        <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>“Dangerous Goods” means goods classified as dangerous as per ICAO T.I., IATA DGR, IMDG-Code, ADR or other national regulations for transport.</Text>
                    </View>
                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <Iconviewcomponent
                            Icontag={'AntDesign'}
                            iconname={'checkcircle'}
                            icon_size={20}
                            icon_color={Color.primary}
                        />
                        <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>“Delivery” means the tender of the consignment to the consignee or intimation about the arrival of the consignment.</Text>
                    </View>
                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <Iconviewcomponent
                            Icontag={'AntDesign'}
                            iconname={'checkcircle'}
                            icon_size={20}
                            icon_color={Color.primary}
                        />
                        <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>“Prohibited Items” means any goods or materials, the Carriage of which is prohibited by Applicable Law.</Text>
                    </View>
                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <Iconviewcomponent
                            Icontag={'AntDesign'}
                            iconname={'checkcircle'}
                            icon_size={20}
                            icon_color={Color.primary}
                        />
                        <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>“Receiver” or “Consignee” shall refer to the recipient or addressee or the consignee of the Consignment.</Text>
                    </View>
                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <Iconviewcomponent
                            Icontag={'AntDesign'}
                            iconname={'checkcircle'}
                            icon_size={20}
                            icon_color={Color.primary}
                        />
                        <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>“Applicable Law” means, means all laws, statutes, ordinance, regulations, guidelines, policies, rules, bye-laws, notifications, directions, directives and orders or other governmental restrictions or any similar form of decision of, or determination by, or any interpretation, administration and other pronouncements having the effect of law of the Republic of India or any other applicable jurisdiction by state, municipality, court, tribunal, government, ministry, department, commission, arbitrator or board or such other body which has the force of law in India.</Text>
                    </View>
                </View>

                <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>USER(S) ELIGIBILITY</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>User(s) means any individual or business entity/organization that legally operates in India or in other countries, uses and has the right to use the services provided by TRUCK TAXI(“Services”). The Services provided by TRUCK TAXI is a technology based service which enables the hiring of vehicles by customers for a point to point service, or for time and usage based service within city limits and outside city limits, including inter-city all over India, through the internet and / or mobile telecommunications devices. Our Services are available only to those individuals or companies who can form legally binding contracts under the Applicable Law. Therefore, user(s) must not be a minor as per Applicable Law; i. e. user(s) must be at least 18 years of age to be eligible to use our Services.</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>TRUCK TAXI advises its users that while accessing the web site, they must follow/abide by the related laws. TRUCK TAXI is not responsible for the possible consequences caused by your behaviour / acts during use of web site. TRUCK TAXI may, in its sole discretion, refuse the service to anyone at any time.</Text>
                </View>

                <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>USER(S) AGREEMENT</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>This agreement applies to user(s) if user(s) are visitors, registered – free or paid user(s) who access the web site for any purpose. It also applies to any legal entity which may be represented by you under actual or apparent authority. User(s) may use this site solely for their own personal or internal purposes.</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>This agreement applies to all TRUCK TAXI Services offered on the web site, collectively with any additional terms and condition that may be applicable to the specific service used/accessed by user(s).In the event of a conflict or inconsistency between any provision of the terms and conditions mentioned herein with those of the particular service, the provisions of the terms and conditions applicable to such specific Services shall prevail.</Text>
                </View>

                <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>AMENDMENT TO USER(S) AGREEMENT</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>TRUCK TAXI may change, modify, amend, or update this agreement from time to time with or without any prior notification to user(s) and the amended and restated terms and conditions of use shall be effective immediately on posting. If you do not adhere to the changes, you must stop using the service. Your continuous use of the Services will signify your acceptance of the changed terms. User(s) shall also be bound by any amendment made in any policy or agreement from time to time, referred to in these Terms of Service.</Text>
                </View>

                <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>INTELLECTUAL PROPERTY RIGHTS</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>TRUCK TAXI is the sole owner or lawful licensee of all the rights to the web site and its content. Web site content means its design, layout, text, images, graphics, sound, video etc. The web site content embodies trade secrets and intellectual property rights protected under worldwide copyright and other laws. All title, ownership and intellectual property rights in the web site and its content shall remain with TRUCK TAXI, its affiliates or licensor’s of TRUCK TAXI content, as the case may be.</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>All rights, not otherwise claimed under this agreement or by TRUCK TAXI.in, are hereby reserved. The information contained in this web site is intended, solely to provide general information for the personal use of the reader, who accepts full responsibility for its use. TRUCK TAXI does not represent or endorse the accuracy or reliability of any information, or advertisements (collectively, the “content”) contained on, distributed through, or linked, downloaded or accessed from any of the Services contained on this web site, or the quality of any products, information or other materials displayed, or obtained by you as a result of an advertisement or any other information or offer in or in connection with the Service.</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>We accept no responsibility for any errors or omissions, or for the results obtained from the use of this information. All information in this web site is provided “AS IS ” with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied, including, but not limited to warranties of performance, merchantability and fitness for a particular purpose. Nothing herein shall to any extent substitute for the independent investigations and the sound technical and business judgment of the user(s). In no event shall TRUCK TAXI be liable for any direct, indirect, incidental, punitive, or consequential damages of any kind whatsoever with respect to the Service. User(s) of this site must hereby acknowledge that any reliance upon any content shall be at their sole risk.</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>TRUCK TAXI reserves the right, in its sole discretion and without any obligation, to make improvements to, or correct any error or omissions in any portion of the Service or the app/website.</Text>
                </View>

                <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>Trademark</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>All related icons and logos are registered trademarks or trademarks or service marks of TRUCK TAXI in various jurisdictions and are protected under applicable copyright, trademark and other proprietary rights laws. The unauthorized copying, modification, use or publication of these marks is strictly prohibited.</Text>
                </View>

                <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>Copyright</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>All content on this web site is the copyright of TRUCK TAXI except the third party content and link to third party web sites on our app/website.</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>Systematic retrieval of TRUCK TAXI content to create or compile, directly or indirectly, a collection, compilation, database or directory (whether through robots, spiders, automatic devices or manual processes) without written permission from TRUCK TAXI is prohibited.</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>In addition, use of the content for any purpose not expressly permitted in this Agreement is prohibited and may invite legal action. As a condition of your access to and use of TRUCK TAXI’s Services, you agree that you will not use the web site service to infringe the intellectual property rights of others in any way. TRUCK TAXI reserves the right to terminate the account of a user(s) upon any infringement of the rights of others in conjunction with use of the TRUCK TAXI service, or if TRUCK TAXI believes that user(s) conduct is harmful to the interests of TRUCK TAXI, its affiliates, or other users, or for any other reason in TRUCK TAXI’s sole discretion, with or without cause. You shall be liable to indemnify TRUCK TAXI for any losses or expenses incurred by TRUCK TAXI due to any infringement of intellectual property rights owned by TRUCK TAXI without prejudicing TRUCK TAXI’s right to bring any legal action against you.</Text>
                </View>

                <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>LINKS TO THIRD PARTY SITES</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>Links to third party sites are provided by web site as a convenience to user(s) and TRUCK TAXI has no control over such sites i.e content and resources provided by them.</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>TRUCK TAXI may allow user(s) access to content, products or Services offered by third parties through hyperlinks (in the form of word link, banners, channels or otherwise) to such Third Party’s web site. You are cautioned to read such sites’ terms and conditions and/or privacy policies before using such sites in order to be aware of the terms and conditions of your use of such sites. TRUCK TAXI believes that user(s) acknowledge that TRUCK TAXI has no control over such third party’s site, does not monitor such sites, and TRUCK TAXI shall not be responsible or liable to anyone for such third party site, or any content, products or Services made available on such a site. User(s) shall review TRUCK TAXI’s Privacy Policy and abide by TRUCK TAXI’s Privacy Policy at the time of the User(s) interaction with TRUCK TAXI, with respect to and concerning any information and data.</Text>
                </View>

                <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>TERMINATION</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>Most content and some of the features on the web site are made available to visitors free of charge. However, TRUCK TAXI reserves the right to terminate access to certain areas or features of the web site at any time for any reason, with or without notice. TRUCK TAXI also reserves the universal right to deny access to particular users to any/all of its Services without any prior notice/explanation in order to protect the interests of TRUCK TAXI and/or other visitors to the web site. TRUCK TAXI reserves the right to limit, deny or create different access to the web site and its features with respect to different user(s), or to change any of the features or introduce new features without prior notice.</Text>
                </View>

                <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>TERMS & CONDITIONS FOR USE OF OUR SERVICE</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>The following Terms & Conditions shall apply to customers utilising the Services offered by the Company for the hiring of vehicles:</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>The customer shall pay the fare (as agreed), parking charges, additional night surcharge (where applicable) and any fee or levy presently payable or hereinafter imposed by the Applicable Law or required to be paid for availing the Services of TRUCK TAXI.</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>The customer agrees and accepts that the use of the Services provided by the Company is at the sole risk of the Customer, and further acknowledges that the Company disclaims all representations and warranties of any kind, whether express or implied.</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>The customer shall ensure that he/she will not indulge in any of the following activities while availing the service:</Text>

                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
                        <Iconviewcomponent
                            Icontag={'AntDesign'}
                            iconname={'checkcircle'}
                            icon_size={20}
                            icon_color={Color.primary}
                        />
                        <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Soiling or damaging the body and/or any other interiors of the vehicles.</Text>
                    </View>
                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <Iconviewcomponent
                            Icontag={'AntDesign'}
                            iconname={'checkcircle'}
                            icon_size={20}
                            icon_color={Color.primary}
                        />
                        <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Misusing, soiling or damaging any of the devices (technical/non-technical) in the vehicle.</Text>
                    </View>
                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <Iconviewcomponent
                            Icontag={'AntDesign'}
                            iconname={'checkcircle'}
                            icon_size={20}
                            icon_color={Color.primary}
                        />
                        <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Asking the driver to break any Traffic/RTO/City Police and/or government rules for any purpose. The driver has the right to refuse such a request by the customer. The driver also has the right to refuse such a pick-up.</Text>
                    </View>
                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <Iconviewcomponent
                            Icontag={'AntDesign'}
                            iconname={'checkcircle'}
                            icon_size={20}
                            icon_color={Color.primary}
                        />
                        <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Pressurizing the driver to overload truck with the consignment than the allowed limit.</Text>
                    </View>


                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>The Customer shall indemnify Company from and against and in respect of any or all liabilities, losses, charges and expenses (including legal fees and costs on a full indemnity basis) claims, demands, actions and proceedings which Company may incur or sustain directly or indirectly from or by any reason of or in relation to the use or proposed use of the Services by the Customer and shall pay such sums on demand on the Company.</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>The Company is hereby authorized to use the location based information provided by any of the telecommunication companies when the Customer uses the mobile phone to make a vehicle booking. The location based information will be used only to facilitate and improve the probability of locating a mini-truck for the Customer.</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>The Company shall be entitled to disclose to all companies within its group, or any government body as so required by the Applicable Law or by directive or request from any government body, the particulars of the Customer in the possession of Company in any way as Company, in its absolute discretion, deems fit or if it considers it in its interests to do so.</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>The Company shall be entitled at any time without giving any reason to terminate the booking of the vehicle done by the Customer. User(s) shall indemnify TRUCK TAXI with respect to any expenses incurred with respect to such booking.</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>In case of lost items during the transit, Company will try to locate the items on a “best-effort” basis but is not responsible for the same in case of loss or damage or theft or misappropriation to / of the same. TRUCK TAXI aggregates the vehicles for the purposes of providing Services. In the event of loss of any item, User(s) shall not have any right to withhold the payment to be made to TRUCK TAXI. Further, in the event any payments from the User to TRUCK TAXI are pending for the period prescribed by TRUCK TAXI in its respective invoice / statement, TRUCK TAXI reserves the right, in accordance with the Applicable Law, to exercise particular lien over the consignment till full payment is made to TRUCK TAXI for the Services. Additionally, User(s) will be liable to indemnify TRUCK TAXI against any loss, damage or expenses incurred by it due to the custody of the consignment during this period.</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>Any complaint in respect of the Services or the use of the vehicles, the Customer has to inform the Company of the same in writing within 24 hours of using the vehicles or Services of the Company.</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>The Company shall not be liable for any conduct of the drivers of the vehicles. However, the Company encourages you to notify it, of any complaints that you may have against the driver that you may have hired using the Company’s Services.</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>The Company shall be entitled to add to, vary or amend any or all these terms and conditions at any time and the Customer shall be bound by such addition, variation or amendment once such addition, variation or amendment are incorporated into these terms and conditions at Company’s website at www.Truck taxi.in on the date that Company may indicate that such addition, variation or amendment is to come into effect.</Text>
                    <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>All the calls made to the Company’s call centre are recorded by the Company for quality and training purposes. In the event you place a query on our app/website including any query with respect to our Services, applicable fees or Terms of Service, you hereby expressly agree to consent to receive our responses, whether by way of telephonic calls or electronic mail, to such query and all related information with respect to our Services. For removal of doubts, related information shall include without limitation any marketing and/or commercial information. You understand, agree and acknowledge that such information shall in no event, qualify as unsolicited commercial communication under the Telecom Unsolicited Commercial Communications Regulations, 2007 and/or due to disclosure of such information, our telephone numbers shall not qualify to be registered under the ‘National Do Not Call Register’ or the ‘Private Do Not Call Register’ in accordance with the Telecom Unsolicited Commercial Communications Regulations, 2007 or any other Applicable Law.</Text>

                    <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>Cancellation Policy</Text>
                        <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>All cancellations made 5 minutes after driver allocation will incur a cancellation fee of INR. 150/- (Indian Rupees one hundred and Fifty only). Cancelling four bookings in a day after driver allocation will temporarily suspend your account for 24 hours. Figures are subject to change.</Text>
                    </View>

                    <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>Toll Charges</Text>
                        <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>In case of a toll on your trip, return toll fare will be charged.</Text>
                    </View>

                    <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>CONFIDENTIALITY</Text>
                        <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>User(s) shall not disclose any information received under the contract of service with TRUCK TAXI to any third party. Access to any information which pertains to business of TRUCK TAXI shall be kept confidential to the extent it might adversely impact TRUCK TAXI’s business. User(s) shall be liable to indemnify TRUCK TAXI against any loss of business or reputation due to the act of the user(s).</Text>
                    </View>

                    <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>DISCLAIMER</Text>
                        <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>All vehicles registered with the Company are continuously tracked using mobile technology for security reasons only. It is hereby made expressly clear to you that the Company does not own any vehicle nor it directly or indirectly employ any driver for the vehicles. Vehicles and drivers are all supplied by third parties and the Company disclaims any and all liability(ies) in respect of the drivers and the vehicles alike.</Text>
                        <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>The Company have right to use the customer contact information for its own marketing purposes. The Company may send regular SMS updates to the mobile numbers registered with it.</Text>
                    </View>

                    <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>YOUR ACCEPTANCE OF OUR TERMS AND CONDITIONS</Text>
                        <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>By giving us your consignment you accept our terms and conditions set out in the consignment note and/or the contract of carriage and/or the contract for the performance of other services on behalf of yourself and/or anyone else who has an interest in the consignment or the performance of other Services irrespective of whether you have signed the front of our consignment note or not. Our terms and conditions also cover and can be invoked by anyone we use or sub-contract to collect, transport, deliver your consignment or perform other Services as well as our employees, directors and agents. Only one of our authorised officers may agree to a variation of these terms and conditions in writing. When you give us the consignment with oral or written instructions that conflict with our terms and conditions we shall not be bound by such instructions.</Text>
                    </View>

                    <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>YOUR OBLIGATIONS</Text>
                        <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>You warrant, undertake and guarantee to us:</Text>

                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>The contents of the consignment (including but not limited to weight and number of items) have been properly described on our consignment note and that the Consignment Note is complete in all respects and the documents as required for the transporting the consignment including invoice, permits are enclosed with the Consignment Note.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>That the contents of the Consignment are not Prohibited Items and/or are not restricted by the applicable regulations and that you will supply to us any Dangerous Goods declaration that is needed, properly and accurately in accordance with Applicable Law and neither you nor the consignee is a person or organisation with whom we or you may not legally trade under Applicable Law.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>That all statements and information and documents provided by you relating to the Consignment will be true and correct and you acknowledge that in the event that you make untrue or fraudulent statement about the Consignment or any of its contents, you would risk a civil claim and/or criminal prosecution the penalties for which may include forfeiture and sale. You agree to indemnify us and hold us harmless from any claims that may be brought against us or our agents arising from the information provided by you.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>We are authorised to deliver the goods at the address mentioned on the Consignment Note and without prejudice to the foregoing it is expressly agreed that we shall be conclusively presumed to have delivered the goods in accordance with this contract. We will be sending the delivery confirmation by SMS/e-mails, no-response within 24 hours would be considered as an affirmative to the delivery.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>You have declared the correct weight of the consignment and you will provide any special equipment we may need to load or unload the consignment on or off our vehicles.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>When you have asked us to charge the receiver or a third party and the receiver or third party does not pay us you will promptly settle our invoice together with an administration fee in full within 7 days of us sending you the invoice.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Applicable Law has been complied with by you.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>You understand, agree and acknowledge that the Services are not suitable for transportation of valuables like cash, gold, silver, diamond, precious stones, jewels or jewellery, expensive luxury items etc. (“Valuables”). If you handover / load the vehicles with Valuables for transportation, any loss / damage / theft / misappropriation to / of the consignment shall be at your risk and not ours, for the reasons mentioned earlier and without prejudice, we shall not only have the right to explicitly and specifically disclaim any liability and/or responsibility arising/accruing from the damage / loss / theft / misappropriation to/of the consignment or any contents of the consignment, but also the right to claim indemnification from you where we have suffered loss of reputation / goodwill due to your actions of breaching our terms of service.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>You understand, agree and acknowledge that if the consignment or any contents thereof are of the value exceeding INR 25,000/- (Indian Rupees Twenty-Five Thousand only), you shall get the consignment insured from a General Insurance company operating in India before handing over the consignment for transportation. In absence of adequate insurance to cover loss of goods in transit or in absence of wrong or non-declaration of the consignment details / value, and whether insured or not, the transportation of the consignment shall be entirely at your risk and not ours and we explicitly and specifically disclaim any liability and/or responsibility arising/accruing from the damage / loss / theft / misappropriation or any insurable loss to / of the consignment or any contents of the consignment and you further agree to indemnify us in all those cases where we have suffered loss of reputation / goodwill due to your actions of breaching our terms of service.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>You agree to indemnify us and hold us harmless from any liabilities we may suffer or any costs, damages or expenses, including legal costs, we incur either to you or to anyone else arising out of you being in breach of any of these warranties, representations and guarantees, even if we inadvertently accept a consignment that contravenes any of your obligations.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>You certify that all statements and information you provide relating to the transportation of the consignment will be true and correct. You acknowledge that in the event that you make untrue or fraudulent statements about the consignment or any of its contents you risk a civil claim and/or criminal prosecution the penalties for which include forfeiture and sale of your consignment. To the extent that we may voluntarily assist you in completing the required customs and other formalities such assistance will be rendered at your sole risk. You agree to indemnify us and hold us harmless from any claims that may be brought against us arising from the information you provide to us and any costs we will incur regarding this, and pay any administration fee we may charge you for providing the Services described in this condition.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>The customer agrees and acknowledges that the use of the Services offered by Company is at the sole risk of the customer and that Company disclaims all representations and warranties of any kind, whether express or implied as to condition, suitability, quality, merchantability and fitness for any purposes are excluded to the fullest extent permitted by Applicable Law. Without prejudice to the above, the Company makes no representation or warranties with respect to:</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>The Services meeting the customer’s requirements.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>The Services will be uninterrupted, timely, secure, or error-free.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Any responsibility or liability for any loss or damage, howsoever caused or suffered by the Customer arising out of the use of Services offered by Company or due to the failure of Company to provide Services to the Customer for any reason whatsoever including but not limited to the Customer’s non-compliance with the Services’ recorded voice instructions, malfunction, partial or total failure of any network terminal, data processing system, computer tele-transmission or telecommunications system or other circumstances whether or not beyond the control of Company or any person or any organization involved in the above mentioned systems.</Text>
                        </View>

                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Any liability for any damages of any kind arising from the use of the Service offered by the Company, including, but not limited to direct, indirect, incidental, punitive, and consequential damages.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Any additional or extra charges for far off locations & toll charges as well.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Any alternate arrangement(s) if the vehicle has not reached due to any reason.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>We are not liable if we do not fulfil any obligations towards you at all as a result of:</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Circumstances beyond our control such as (but not limited to):</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Acts of god including earthquakes, cyclones, storms, flooding, fire, disease, fog, snow or frost or other natural calamities or disasters.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Force majeure including (but not limited to) war, epidemics, pandemics, accidents, acts of public enemies, strikes, embargoes, perils of the air, local disputes or civil commotions.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>National or local disruptions in air or ground transportation networks and mechanical problems to modes of transport or machinery.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Latent defects or inherent vice in the contents of the consignment.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Criminal acts of third parties such as theft and arson.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Your acts or omissions or those of third parties such as:</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>You being in breach of (or any other party claiming an interest in the consignment causing you to breach) your obligations under these terms and conditions.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>The contents of the consignment consisting of any article that is a prohibited item / Dangerous Goods / Valuables even though we may have accepted the consignment by mistake or you have willingly handed it over to us without notifying / informing / declaring to us.</Text>
                        </View>

                    </View>

                    <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>DANGEROUS GOODS / SECURITY</Text>
                        <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>Dangerous Goods</Text>

                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>We do not carry, nor perform other Services regarding, goods which are in our sole opinion Dangerous Goods including, but not limited to, those specified in the regulations, guidelines, technical instructions, codes applicable to us and our business or to the transport of, or the performance of other Services regarding, Dangerous Goods.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>We may at our discretion accept some Dangerous Goods for carriage, or for the performance of other Services, in some locations if you have been accorded the status of an approved customer and this must be given by us in writing before your consignment can be accepted. Your Dangerous Goods will only be accepted if they comply with the applicable regulations and our requirements. Details of our requirements together with the procedure for applying for approved customer status are available from our nearest office and a dangerous goods surcharge will be invoiced to you upon acceptance of your consignment.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Prohibited Items: We do not accept consignments that contain prohibited items.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>We accept consignments only upon your declaration of the type and value of the consignment (“said to contain” basis). We have no responsibility whatsoever as to the correctness of description, type or value thereof and you agree to indemnify us and hold us harmless from any claims that may be brought against us arising out of or relating to such declaration provided by you and any costs we will incur relating thereto.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>REJECTED CONSIGNMENTS</Text>
                        <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>If the receiver refuses to accept delivery, we will try to contact you and agree to the next action if it is appropriate. You agree to pay us any costs we incur in forwarding, disposing of or returning the consignment and our charges (if any) for the agreed appropriate next action.</Text>
                        <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>If user(s) terminates the agreement with TRUCK TAXI with respect to any consignment, user(s) shall be liable to pay TRUCK TAXI the entire fees and other expenses so incurred with respect to such consignment.</Text>
                    </View>

                    <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>CLAIMS BROUGHT BY THIRD PARTIES</Text>
                        <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>You undertake to us that you shall not permit any other person who has an interest in the consignment to bring a claim or action against us arising out of Carriage even though we may have been negligent or in default and if a claim or action is made you will indemnify us against the consequences of the claim or action and the costs and expenses we incur in defending it.</Text>
                        <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>The above mentioned terms and conditions of use and/or Agreement and the Privacy Policy constitute the entire agreement between the User(s) and TRUCK TAXI with respect to access to and use of the web site and the Services offered by TRUCK TAXI, superseding any prior written or oral agreements in relation to the same subject matter herein.</Text>
                    </View>

                    <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>GST</Text>

                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>GST, as applicable, will be levied on the Invoice.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Any information shall be considered only prospectively. Under no circumstances, will invoices be revised retrospectively for delay in providing GST registration information.</Text>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                            <Iconviewcomponent
                                Icontag={'AntDesign'}
                                iconname={'checkcircle'}
                                icon_size={20}
                                icon_color={Color.primary}
                            />
                            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Taxes on reverse charge mechanism, wherever applicable, shall have to be paid by the recipient of services.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>GOVERNING LAW AND JURISDICTION</Text>
                        <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>These Terms of Service shall be governed by and construed in accordance with the laws of the India, without regard to the principles of conflict of laws. The courts of [Coimbatore] shall have exclusive jurisdiction over any disputes, differences or claims arising out of or in connection with these Terms of Service or any Services provided by us pursuant to these Terms of Service.</Text>
                    </View>

                    <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>DISCLAIMER</Text>
                        <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>The information contained in this website and TRUCK TAXI App is for general information purposes only. The information is provided by TRUCK TAXI and while we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website / App or the information, products, services, or related graphics contained on the website / App for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</Text>
                        <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website / App.</Text>
                        <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>Through this website / App you are able to link to other websites which are not under the control of TRUCK TAXI. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.</Text>
                        <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>Every effort is made to keep the portal up and running smoothly. However, TRUCK TAXI takes no responsibility for, and will not be liable for, the portal being temporarily unavailable due to technical issues beyond our control.</Text>
                    </View>
                </View>

                <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ width: '95%', paddingHorizontal: 10, fontSize: 16, color: Color.black, letterSpacing: 0.5, fontFamily: Manrope.SemiBold }}>Contact Us</Text>
                    <Text style={{ width: '95%', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, letterSpacing: 0.5, fontFamily: Manrope.SemiBold }}>#122, Sarojini street, Ram nagar, Coimbatore 641009</Text>

                    <TouchableOpacity style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, marginVertical: 20 }}>
                        <View style={{ width: 35, height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: Color.primary, borderWidth: 1 }}>
                            <Iconviewcomponent
                                Icontag={'Feather'}
                                iconname={'phone-call'}
                                icon_size={14}
                                iconstyle={{ color: Color.primary }}
                            />
                        </View>
                        <Text style={{ fontSize: 16, color: Color.black, letterSpacing: 0.5, fontFamily: Manrope.SemiBold, paddingHorizontal: 10 }}>(+91) 75 4000 4000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '95%', flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center' }}>
                        <View style={{ width: 35, height: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: Color.primary, borderWidth: 1 }}>
                            <Iconviewcomponent
                                Icontag={'Ionicons'}
                                iconname={'mail'}
                                icon_size={14}
                                iconstyle={{ color: Color.primary }}
                            />
                        </View>
                        <Text style={{ width: '95%', fontSize: 16, letterSpacing: 0.5, color: Color.black, fontFamily: Manrope.SemiBold, paddingHorizontal: 10 }}>info@trucktaxi.in</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Color.white,
    },
});

//make this component available to the app
export default TermsandConditions;
