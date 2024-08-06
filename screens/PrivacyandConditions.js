import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Color from '../Global/Color';
import { Manrope } from '../Global/FontFamily';
import { Iconviewcomponent } from '../Global/Icontag';

const PrivacyandConditions = () => {
  const token = useSelector(state => state.token)
  const mobileNumber = useSelector(state => state.mobileNumber);


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10, paddingTop: 20 }}>
          <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>PRIVACY POLICY</Text>
          <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>This privacy policy sets out how Truck taxi uses and protects any information that you give Truck taxi when you use this website.</Text>
          <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>Truck taxi is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.</Text>
          <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>Truck taxi may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. This policy is effective from june 27 2016.</Text>
        </View>

        <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
          <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>WHAT WE COLLECT</Text>
          <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>We may collect the following information:</Text>
          <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
            <Iconviewcomponent
              Icontag={'AntDesign'}
              iconname={'checkcircle'}
              icon_size={20}
              icon_color={Color.primary}
            />
            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Name and job title.</Text>
          </View>

          <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
            <Iconviewcomponent
              Icontag={'AntDesign'}
              iconname={'checkcircle'}
              icon_size={20}
              icon_color={Color.primary}
            />
            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Contact information including email address.</Text>
          </View>
          <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
            <Iconviewcomponent
              Icontag={'AntDesign'}
              iconname={'checkcircle'}
              icon_size={20}
              icon_color={Color.primary}
            />
            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Demographic information such as postcode, location, preferences and interests.</Text>
          </View>
          <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
            <Iconviewcomponent
              Icontag={'AntDesign'}
              iconname={'checkcircle'}
              icon_size={20}
              icon_color={Color.primary}
            />
            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Other information relevant to customer surveys and/or offers.</Text>
          </View>
          <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
            <Iconviewcomponent
              Icontag={'AntDesign'}
              iconname={'checkcircle'}
              icon_size={20}
              icon_color={Color.primary}
            />
            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>app install, uninstall and other installed apps information</Text>
          </View>
        </View>

        <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
          <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>WHAT WE DO WITH THE INFORMATION WE GATHER</Text>
          <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</Text>
        </View>

        <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
          <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>Internal Record Keeping</Text>
          <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>We may use the information to improve our products and services.</Text>
          <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>We may periodically send promotional emails, SMSs and make voice calls about new products, special offers or other information which we think you may find interesting using the email address and mobile number which you have provided.</Text>
          <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, SMS, voice, fax or mail. We may use the information to customize the website according to your interests.</Text>
          <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>You may specifically opt-out of the above in accordance with the Telecom Commercial Communications Customer Preference Regulations, 2018 or otherwise specified. In case you wish to opt out of the same, please contact us at +91 04224575767 or email us at info@trucktaxi.in with your request for opting out of such commercial communication from us</Text>
        </View>

        <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
          <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>Security</Text>
          <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online. We do not retain any information collected from you for any longer than is reasonably required by us for the purpose of our services or such period as may be required by applicable laws in India.</Text>
        </View>

        <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
          <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>Disclosure</Text>
          <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>We may disclose to third party services certain personally identifiable information listed below:</Text>

          <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
            <Iconviewcomponent
              Icontag={'AntDesign'}
              iconname={'checkcircle'}
              icon_size={20}
              icon_color={Color.primary}
            />
            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Information you provide us such as name, email, mobile phone number.</Text>
          </View>
          <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
            <Iconviewcomponent
              Icontag={'AntDesign'}
              iconname={'checkcircle'}
              icon_size={20}
              icon_color={Color.primary}
            />
            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Information we collect as you access and use our service, including device information, location and network carrier. This information is shared with third party service providers so that we can:</Text>
          </View>
          <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
            <Iconviewcomponent
              Icontag={'AntDesign'}
              iconname={'checkcircle'}
              icon_size={20}
              icon_color={Color.primary}
            />
            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Personalize the app for you so you get the smoothest experience.</Text>
          </View>
          <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
            <Iconviewcomponent
              Icontag={'AntDesign'}
              iconname={'checkcircle'}
              icon_size={20}
              icon_color={Color.primary}
            />
            <Text style={{ paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Manrope.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22 }}>Perform behavioural analytics.</Text>
          </View>
        </View>

        <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
          <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>HOW WE USE COOKIES</Text>
          <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>A cookie is a small file which asks permission to be placed on your computer’s hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.</Text>
          <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.</Text>
          <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.</Text>
          <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.</Text>
        </View>

        <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
          <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>LINK TO OTHER WEBSITES</Text>
          <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.</Text>
          <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>We will not disclose or share your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen.</Text>
          <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>You may request details of personal information which we hold about you under the Information Technology (Reasonable security practices and procedures and sensitive personal data or information) Rules, 2011. A small fee will be payable. If you would like a copy of the information held on you please write to info@trucktaxi.in</Text>
          <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible, at the above address. We will promptly correct any information found to be incorrect. You can also withdraw your consent by writing to us at info@trucktaxi.in. Such withdrawal will result in discontinuance of the services for which such information is required.</Text>
        </View>

        <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 10 }}>
          <Text style={{ fontSize: 16, color: Color.black, fontFamily: Manrope.SemiBold, letterSpacing: 0.5, }}>CONTACT US</Text>
          <Text style={{ textAlign: 'justify', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: Color.black2, fontFamily: Manrope.Light, letterSpacing: 0.5, lineHeight: 22 }}>If there are any questions regarding this privacy policy or if you wish to report a breach of the Privacy Policy, you may contact us using the information on the support page.</Text>
        </View>

        <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 20 }}>
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
  )
}
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
});

export default PrivacyandConditions;