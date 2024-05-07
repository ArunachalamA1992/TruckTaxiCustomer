import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect, useState, version} from 'react';
import {useNavigation} from '@react-navigation/native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../components/Colors';
import {Dropdown} from 'react-native-element-dropdown';

const Home = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(false)
  const [open, setOpen] = useState(false);
  const [goodsName, setGoodsName] = useState(null);
  const [FareType, setFareType] = useState(null);
  const [noVehicles, setNoVehicles] = useState(null);
  const [atlerNumber, setAlterNUmber] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{marginLeft: width * 0.04}}
          onPress={() => navigation.toggleDrawer()}>
          <Icon name="reorder" size={25} color="#000" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
          }}>
          <Text style={{color: 'black', fontSize: 18}}>Book a Pickup</Text>
          <Icon2 name="truck" size={20} color="#000" />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: width * 0.04}}
          onPress={() => navigation.navigate('Notifications')}>
          <Text
            style={{
              position: 'absolute',
              top: -4,
              right: -4,
              backgroundColor: Colors.red,
              fontSize: 12,
              paddingHorizontal: width * 0.01,
              borderRadius: 25,
              zIndex: 5,
            }}>
            1
          </Text>
          <Icon name="bell" size={23} color={Colors.primaryColor} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const VehicleData = [
    {
      name: 'Tata ace',
      weight: 500,
      img: 'https://5.imimg.com/data5/QO/IQ/VY/GLADMIN-3061/tata-ace-zip-cng-pickup-truck-payload-500-kg-250x250.jpg',
    },
    {
      name: 'Bolero',
      weight: 500,
      img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBQUFBgVFRQZGBgaGxsYGBsbGxsbGx0gGhgbGxsaGxsbIC0lHB4pIBsZJTcmKS8wNDQ0GyM5PzkyPi00NDABCwsLEA8QGxISHTIgJCkyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIwMjIyMjIyMjIyMjAyMjIyMjAyMDsyP//AABEIALcBEwMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBAcCAQj/xABNEAACAQIEAgcEBQgEDAcAAAABAgMAEQQSITEFQQYTIlFhcYEykaGxFCNCYnIHUoKDkrLB0UPCw/AWJDNTY3OToqPS4fEVF0RUhLPT/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAeEQEBAAIDAQEBAQAAAAAAAAAAAQIREiExUUEiA//aAAwDAQACEQMRAD8A7JSlKBSlKBSlKBSlKBSlKBSlKBSlKBSozH8ewkOkuJiQ7WZ1BPgFvcmorEdOsEvstJIfuRvb9pgF+NNmlopVFm/KFe/V4ORu7O6IPXJnI91R+I6dY4js4eCLxd3k/wCS9TlF410qlcfl6ZY9tDjIE/AiE+l2etN+MY175sdiW/1aFR6FY0+dTa6dspXB5mkb25cW/wCKVlHqOtPyrRxGGjPtQh/xylv6tXv4nX1+hA42uPfXqvzXCiNiY4/o8KqNTZTqWVwLnc2sD6VbsJh5l1hdpEGzYXESE/7LMrIPR6nJdOzUrl3DelOIVsgxOcjeOdA7ftRiORfMxtVowXTBWH1sLJbd4z16DzyAOn6aLSZRLjVppWnw/iUU654ZUkXvRgw8jY6GtytIUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUJpWjxjGdTE7gXYWCL+c7HKi+rECgqnGOO42SaSDCQ9mM5HkV09ogHLd1IUgEXFj51Cz8Dx83+WaMg7iSaSQfsKAnwq28IwIgiWMtmbV3b8+RyWkf1Yk+AsKzShfEeRpxl9OVinQdEnQWM8aDujhH8X/AIVm/wAH419qeVvLKnyX+NTs8fc9vMXqFxWKIYqdxzqzCJc6R8AjbVY2cd7yOR4gXa1G4Aq+zDCD5C9/MitZuMTRpZbhRexyX3JJ1871F4jpFKb/AFlvAWq6Zt2zzYzLdbAW0OltvKo2fiB8PcP5VG4nGEm5NydSa0JsTVElPxBvzj7zUbLiq05J61zJr/flUElwe2cyHfO9vKOM3/eFRkQKkEEq2moJB08RUxhMOwjhH2mgnk9JJEjB91ar4NxuKxj23l1puxdI8RlCSFZ0/NmUP7mOoqY4Zjg4WTMYUyl+cuXs30znNl7J0VhVZGHNTPDoj1QTuEie55FHwKms54z8awyt9WCKUyNnQxYlgLdZE5SceAVisn/EPlUvgukssbiMYjtXP1WKQ5zbkrgI488slczeA38e/wD61Iw8SnVQjSZ0NxkkAkT2SRo2o25GnGzw5S+u6cK4iJkvYKw0ZQwax8DoSPMA+AqQrln5NsQHxBFigCMAis2QFSosFJOntG221dUrUqV8pSlVClKUClKUClKUClKUClKUClKUClKUCq5jZutxFv6ODTwaRl1P6CMB5yNzWvnTLjMuGSNYQpklkEaFhcL2SS1ufIeGa+u1R8bCOMJe51JPNmYlnY+JYsfWrIlrelxG9ac+LA51EcS4ska3dgt9B3knko3J8BVfx3EpWHZZYx3EZn9dQEO+lzy8QNCyz8QA51WsXjTncm4BJ1qv4mSVjYzMR+O3nfu9DWuyv/nPif51Ns6WhMb2F15X9+tR+NxYOhAY+IBAqJ650XVs3cLFj42A1t4nQd4rA8jvv2R3WPz0v6aeJpasj1iGj12B8P5Co9nPn/fat9OHudVUW77GsEnB2O/yrPKHG/Gk9/GsYJAY+Fh5nb4XrdfhJHL4CtrgnCzJiIY7dlpFZvKMF2uO7KG18RU2swq34Hh18W8Y1EGFwuHv4lc59brVa4pKescCR7A6AGwAI2AHgRrzq3cMxzwYrFSTYeZo5Z37UaZ7BCqxsddimf3iuf4/iSGV9cvaIsQQez2db89KmLeU7Xjo3wETRJI5Jui6g2JawLX8AawJD1ZYEWyyH3MiP/VerP8Ak3nV8EliG3FgRmuLA6b2/lUd0nwpSSU7XWBrekyN81q5+Jh6134Pla+VNORRSPiKx43hQDKyplBaI2GwzOEYDwuWq7YaDrI0fTtIrftKDWvxuAR4eSTbq4y9/wDVt1l/DatM6QnRWLqcaqbdqx8mjZvmw91dQrnuKj6viq2/zaN75UT5K1dCrE9rV8hSlK0hSlKBSlKBSlKBShNUji3TaJs0eFmiL7Z2dSAb65UFyTvvb1qWyLJtd6xyTIvtMF8yB865lLjsURd8VFl5lo5nHxlVfcK1xjQv/qYwf9HhIx8WLVnl8a4/XRpOPYRdDiYr92dSfcDetdulOEG0hb8KO3yWqCnEndlRcZOWYhVVEw6C5/VG3nsBrWfFTdW2V8TiXN7dmRtT90JGpbzUECx1FTeVXjj9XBulkX2YcQ3lEw+dq136WSfZwM588q/OqbxbFRwlV6ySRmUOR9In7IYXXNdxqRrbusedRL8WjP8AQK34nkb95ql5GsVr43isTiXR/ozxmPPls6fby3JJ52W2neaipocSfaNvx4hF+SmoU4tOWDhuf9GD6aitnhk8kyhookAzsgKQR2uGy2DMB4bX1NT+j+WvjMBFnzyPhs40BfGDQdwGUWHlvWD6LCdsRhF8ElZz/u6fCp1ExBveVUAJBy9vbQi0SqL3+9XybDROG+unkZVzuEeJMoGhYq2dreh3q9tdfFdkxCx6LIr+Kxk7675LnnWtHxR3kyiWKNb2zO0ifDOK2MecMI2fPNYaA9YDcnawGHW/LnUj0OwccIleQJIHKqmdEcgqLuwJF/aJXxy3qfm1uNnrcwXAYJrM/FcMXtb6t0zWvfLd5CbX8KkU6BYY3IxTsTuQ8R/szXqKXBuXEmGQgBSCI4x7RcEEFD+aPf4V6OB4Yf8A08YPjBCfkFqbTQvQaICwxUq/px//AJ14HQmMbYxz+Lq2+QWsyYHDD2HRfKN0/wDrc18bA/mzJ6yzj4PpTtUTi+hUhkCLjE1V3BaM6ZGRbdmQ79YPdUl0S6JvhsQ0ksyyEoVXIpAUF1LE5uZso08a8S4eRJEBcEsGUfWRkfZa17DL7POvb4PEEG0ZOhGgD7jfsN5cqbqaYeO8NxE8irhZTEQplbtyICZOr5IDfe1zt61k6P8AR6WF5JMS6TtIqhrhibqb3LG19LDbkKgoIZs7q6S9YrhoQe0yIeqzg5dVBG+bskXBuSLTZ4gym2dl8CSPgauVs8SSX1Jz8Awch7WFAPepAPpYA/Go7C4XClXMLyOLFcsivkOSRdUc3vYobdq1idK9JxiTlJfzANacMkcbPKEAJSQEDsg9YwYkADKCGUftNvfSS39WyfiW4c+KyKYcTFkXsCORB2MnYKBiQSAVIB7q2OJYjHSQSxPhY3EkckeaORltnQpezAg799RnR3i8YhAdGGa8yEWYlJWZxmF+yVJy8wdCOYEsvFMPvdge/Kf4VednScJWCfGtPjo5TDJEFjKv1gFrqzMLMpIOrc7Hw7uiKwNc3Tij9c4aYPC1ityRlARewQV1OcE3v9o91VzorhcWwxL4bGtDbFTApkV0a2UhrNqLg20/NFamX6lxdspXOo8dxqP7eGmH30dCfVGI+FbK9MMcmkvDsw74plP+66r861yjPCr5Sq5wDpSmKkMXUTQsouRKqqP0SGOY+W1WOrLtLClKVUKUpQV3pjjGjiVEXM8riNVvbMSDZSeSk2BPJS1RCYHFNHYyqQDlYNEoQ2tfKBoq3vob2033rB0i4qHx8UYayRxuwNxqzq6gm/Lsj31GXDuzBgXRmKZ3VYyxYspy7ZlZr5tLC19xTjv1ZlrxWumWKjjdUwyKrFglspUNJmynsk2tpcEcn8qgZsfIIzJo2Z8kIy2zWNi1r6gm9vI1tcfzmcn2urhe2S7LnIKKqH7WUtcHmFvWvjYWWWNYwGTDxdk7q0gS667Fg7X9DREvwnHvhsNica5RijfRcOMos0rAF213VRfzF6zdG+L4iWVmlcJDDF9JxAVNBpdI1U3AZgFNwL6G1iKjOMxZsNw/CJ2o416zEZTs8j3dT95VuPUUYsvDZIlW+IxOJzzKN0iQAopOxu1yADsaIiG4jPOxfOyvPKcg0OVb3diSLsBcKPwt3UxWILTsquwihUl8rkZsu4JvuzFU9a3cBg2STPkb6uLJFt2ny3N9dLuz794rQg4TKIijIQzyLnN10RbnTXW7MSR/oxRUlw7AuIEN/r8U+VOeRN2exPshAW/SXurqvRXAxxwWjKlFDIjKoDG1w5Lakm9xpbnvVW6M4jCNJJPLOsQQfR4UIzEKqjOw7rsct/u+NWPDdIeHwwpDFiVOTRTIwRTffM9rAk63ta/dREOxwiLOcQHciUIiBpC+UJGRkJYWBZm202rHwqJOsM6xmFFSQkPIzsYjHICXVwSvbCWAJGq94rVxUuDllZnkisxBYnGR8gFzdk6iwAsL1H4riGEQPFErOshXrJOsILZDcIgYXEYPa1sWOtgAKKgcdOgMYRSbkKWYdkWALFQRmY6XF8tu6pnAzMI16uJ3Q3bPsCWJJI07QvpewBtpUTxeWEzQrldY+yHW+ZxGWXrHFralRYczc94qycU6T4ZF7OcadlchWwGgt4DQelZmOOtN5Z5W7rWMsbsAwAa1hcPfyuo86zdRGP6VV852T4OwqjY/pHMxKxu0aX2RirN4uym58F2HjudSHjuLT2cTMP1jEe4mnCJzrpC4Vz7EpPgk0bn9k5ifdWIiRTYyPcbhlS/eNAoIqip0qxn2pcw+9HG37yGpjA9LJGyrNGjx96II3TxXL2T+Eix8NxLhPxqZ39WAvIzKOsBa5ykqTY769vUeorOHxA3eNrfdZe7vY1pStZlswIPaVhsysl1YeBBB79dda2oMdYWNib6Ei599/G1eb/S5Tx34b7r4mKkEmdSA4GvaKgiyLbMATzB25Vtpx/FDdm9JCfgwFaSREzMuidgtYnLZfq9be731jxEZQ2Ot9VI2Yd4Na5y2TfbFxsSJ47IfajDeaQt8zesWI4mroy9Sqkg9oRlbaX3U5a0Y0LbbDc62F9B5knQAak1tYsRxxspF3YHS+q6HVraX8P8AuZc5Lx9pMennhONjSMLJGSQWsQXUABjlAsCot5edbQ4hhD9tl/WRn4FB86jOHws8fYFyLki4vvfbekKszZRv46WtuWvsBzrVynffi8L0k5JIiCUkYm2gKrr+krn5VE9GUDLP21U/SJPaD63C81U2rJZM3ZAIXUtaxPj4X2A8RzJrQ4XgpPrFypnMrtla4ezBSCOZBFj6mtzuM5dVZhEw9mSP0ky/vgV7H0geyzH8Mit8Fc1CSYSWMXeNguxZHdrX2LBdl8TtWMvp7TftX/evU0bXHovJMcZHnWTcglg1h9W9rnb3100Vxjoa3+PQDOfaO+XW0bkDQV2gV0w8c8/SlKVtgqpdKekjR3hgF5NMzXACX1sBuWtbyvVtrl/FsZhhjm63D2+tymXrHyXBADOmq8gNbD3VnLf4s1+q9xOCeSTOIGRNCEtIwBFrkPmBOoB12PlWp9GMjhZER2W+hzOV77lnIQd+YipqfHZ8TiTG10Dot1Y2LCJQ9iD+GvfCOG3ZIkkVQxC+wCfMg6E1zyt3p1kmtqNjp0kOURiEox7cRzpIL2Oi5bjS4bnr317TDQ88W/pDJ8+srp/EeGvh+rvOT1kgQZYENrgm518NudahlYI7/SPZXMFWONi2qaDIx1GdSw3XnyJ1OTP81zd8PENppH/VW+cteVijvq7/AOyB/tf7/PpsjyIXBmfsZderjAbMhfsEkZzZSABfMbWtU2eATf8AvHH6pR/Wp/RrFxzqYDp1jjlb6OD/AGw51NcE4dF1TtHBJOzHLmaNYkCgAsq9tySxtmO1hYWNzVlEkmUM2JOoBsEOlxe3tC9aXEcSLZhp8N9SbA2FySfWs3O1qYRHYmHEIP8AIRxLYntZhYc2uXAC+NrVjkwGL+0yL+ko/rmp/g3EIUhu8iq4LF85y8zlbXcZbC45gjeqxh+OYcdYVw3WXkcobvbLfSyotrXvbzFa4s8n2TBygXaZR5G/yrSnkybyux7lW5/nUivHpP6LCRoOR6sA+92HyqH4xxbElhmkyg27K5fLkotUXb1hcVMFfq0dEaxdmW7HkLmwsNdBtc1CcasrIgH2LnvJZydfQA+tTODkkYaux7wWJB9Kr3F2z4h7cjkH6AC/MVcfWcvGqMMx2t371nw/CppP8mhfxF7cuZ05iprgnDlbtPqARZdNSdQGBPskAi/hfYGrM/E4YFsUVyNrmyjeyqBa9gSLnkdheujDnWKwckZtIjITtmBF9AdO/ce+mGblXRk49hcVeGWFQHuAycjYnMVO+176HuIqm9IODthJ8pOZG7SMNQynTfw1Hp6AJngGPzRBCiMYmv2lv9W4YWve9lkYf7QVLRcRKtmVEB5WXbxGu9VLgj5ZguwclD+sFlv5NkP6NS5krjnhLe464Z2N6HE50lSTUtkKlyGysqKCw1ve9iGGum2prPhsYLGNwShOw3U/nJ/LnUG8hD3sbWIuATvltoOXZPw76+/SR3N+w/8AKs5YSzTeOek/LxAKAIxlAvl55b6FvvSHm3IGw76j2kJvY6m9aP0jwf8AZb+NZIJbkmxAXU308h6nT1qY/wCcx8W5/G/HKqxxOpCvkGfLa5I+0baXt6m+t9LZpuJlkK2szHtvzYch4c6hFmt2bXtYDVRsLbEjx9LV7RmYgBGJOg2/gatwlu6zMrrUb2ImsFUbaE+ZAJ9wIHoe+vGKxbQ4dpgx62V8kbbkWAeVxf7QHVqDyz1rO2ZjbbU+8hR8xVmxPDoBFC2JGaOONnCD7TyvY3tqOzHHbYG55A26/wCcc81GPSPGsbHFzeFpGX921TGHxZdEdjdmW7GwFyGKsbDmSt/WoPjuEiVllgDCJmtlJzZGGuXNzuLkb7HU1scNltFbTR3Gp7wh+ZNXPuJh1Vw6FvfiGH/Gf3HruIrhfQFGbiOH0tYu2x2Eb13QUx8XP0pSlaYK4b0wW+La+wxT37tnCE+vzruVce6XQouLmR2KFmzgspZGVwDe66rrcagjS9xtWcmsWtw+WMR5WfIRmINrrl3ysAL75jfXfbnWtwrpAiy/SchXDwuhdixzHOSLImXta2NmINQeKks7IGVgezddVNxqQdL7n41uQ4LDSQGN8WIy5uylT2WU2BO2YaX3G9c9bu2/zTpH+G2CkFzDiWXkThnYelr1D8c43gJspEc6sOzrBMgyk3JGVCQ1wNeYuOdU4cJjHs8Wi8iuX+0r7/4e/wBni0HrJl/tK67jnxqXbGYLU5pbk3uUxROsis1rpYDItststydAKsHBemnD8PEqPI+YFmc9VOQSTckF1vtbQ1SRw3FfZ4hh2/XH/npiOB46QBWxEEgAsoMjHnfSx72531NNmnvh3EJcTdYoWbIqse2gOXMUuFYi+21+Y76nisUahmYXIuovnc3Gma1gg8N/Oq/wfo3i4ZlkJjAsyuQ+YlSp0I0B1AN7jYHWvXG8LJG3WMQVdmOgtZtyCLnc5j+13Vyynx0xtvqBwU7GfENLZ5RG5jLDNYqLjKDt2bWFbXD4AyIzWZiuYsdTc3PPbyrRxhKOk67oRm8V5/Aketb2HFhaNWIJzAAkjXU2Fr691+dbmSZT424pAARe+vzAPzN/Wobi0l2FSjYKe1+pcDfMy5F8yzWHx7qhcfEQQS6HwRg9vMr2fjWL6s8SvD2Ci52Gp9NTVawymRyxtckt+0b/AMTU20loXP3SB5t2R86iMGba2uBr68v7g1vBnNPriMqcyFGUA2J31GneRbnovO9bEPRt3iOLxEy4eLSzlGkY3OUZEW3ZubZiQLmtbhUXWMkbk5Ls8xF79XChkfyJC6H861WroHifpk0jTorI4kZYzfLGrKIwgAsMnV5UyneyncA1thVOI8EaKNcTDMs8BPtqjRuhDAZnjYkhbsozAkdod9fJ8T9IwbRP7cP1iHW9r2cab3B958q6ZI+EjiOEhhYXkaNCxWRJJFt1uFL52McjorKFe3LmK5kcIcNi3hN+w7x76ldQt/HKVPnQQMZII11AFj5bGrViERiJesVFlu6grI2pP1i3VCvZe4te4BXvqqxr2gvmuvev/attlmKdUGITNny/eAKg+4n+9rSzay6Tgji/z4P6qQ/Mqa8kQjeQn/46H4vLUTDwedxZI5HOmqo7anvsNjUhD0PxrRuOodSTGRnyptnDe2Rtce+s8WuT2cVh1+048lgj/g1eTxKA2H1jdwM0dr23sIrVs4f8n2LO4Rf0wf3M1SMX5P5BYmRFIOvZdr+HaC/CnFOSHPEo0W4jcDfWV7a+CBawJxZJCQsat+IzH5y/wq1f+X4KKrSSPYAdiMAmw3uWYfCtKPofJF1gEUlyy5C0kIzL95WKm++1qvCHKtHAZpHVRGiA6dkHMdbgasbC9vcKsWOijxONaCQ/VRZUVQ2UvIFCRR3+zmZWufA1rdFsL/jKXIYL2yQbgALmseQI2I5GsHRDEQviC8oJeWRZISM2W6GXfKbas6CxHI7VqTUY3uo7pPwBsKXhIYRyQ/SI8xzFHjYZ0ut8xGozdxGu9YOgEEUuJ6ibEPAsgGVo2CMzqcqpcgjtZ235gW3qz9MFACza5ZOsvmsGDTYea6tb2TYIp30RRyvXPuCG0+HPdLEf+IlFfoPhPQjC4eVJleZ5E2Z5Wa+hGqiwPtHS3OrSKUoFKUoFU/pl0RbGskkcio6Aqcylg4vdRdSCpBzcj7VXCvtSzZt+Z8XG8bMGUdkkHfTKWB5fdb3Vr4jiSLoyEm+pB2HPcanw+VWbpPhjHiJ4zp9Y2X9Ikr786fHuqkcSF2uOYvfv+HdU4RrnW+3EILaFzfTRbEeOuh8qyiaIqWDMwG9lYEePaAFvWqwj2NSGGnCg6izCxHPUW99ThDnUuHhtfrEPheza/da2vhX1Y4m9l0PgzIp9QTUAp8jvyvWZCPL4U4RedTqYWNjZSpOtxpf+RrYjhWM9vRWFiNrjwIG4NiPIVoYDCSS6JE8l9Pq43fX9FSPiKmv/AC34hcSLhiAQDlzR3HhbOLeVOBzRht/LxFbX/iM2UL10mUCwAkYADusDtW8eh/EFv/icgFjoBGwvpY2DGo5ujfEVbtYfEFb8oGJ9csZ+FTgc2q9jqdT3nU+81p4txas/EUdCUyurg2YOuTL+IMAb1iwkbM1jIL2J1AAuFJ35bU4VecaOIxJEYTvNz5DUfG3urFAQByvp4HepfF8N1JJJa5Ha/ArAEnYa632OnOo3FIFKgXsQDqCP4VuTTFu1i4HieqjaYlgFRFBS2ZTI5VWUHexU91XrAcdjhhjks0hkeOJmjjVWLuDd3RdBqL6X9oW3qgcPg6zDOgIBIiYZmCg9XKMwuTa+Vyf0TVp4Zikgiz5wVHbJXUWCgXHeOz8aqLHx/DKuEmMKLnldZ3tcFXVlbrhc6soS/LUHxqh9NAG4g8gW/WxwykDmXhW49SvxqyrjWeJVjBbroyFJGUxh0ATrO9u0q6G3tHwqpdJsUsmLdlYFECRoRzVIlUEeoPuoKvMxzudjnc+V2Jrx1rfnN76+SOcz/ibz3IrJg8K0sixqVBJAzMbKo5sx5AUF36HdGMbi067DOYU1AcuVViDZlAQkmxvuLaV0PAcD4qGQSzwFVvnIzsz6G1wFWxBtrflW90c4rw/C4eLDxYhSsahb7Zjuzkd7MSfWptOPYVtpk99BWuL8G4kqkwPh5Gt7LKyHyBJYe8itXo5wDiUjlsbKsSD2UhPbb8T6hV8tT3i2t3TiELbSKfUVlWdDs6n1FBz3pV0TxFnfDzYlxkZgnWJoQDYAGMsw8L35VyHHYPHZeskixQQC7OyShBy1JAA176/UgYd4qO49w0YrDTQE26xGQHuJGh9DY+lB+XcLK8ZzRu6HvRmU2PLQ6jwq5dGcYkUXWdWXdWKKFNyM4ZiMvI22JIFwdzYCk2KMUcFWUlWU7hlNip7iCLVO8Ix2UsmfKGXsmwsGFrE33Nha/LUjUCgsvSG8scGGjYPJJKX0uArMvVxob7aSMx5AW35uC/ky4guIhaWNFjWRHdhIrHKjBjYbk6W9akug2HXE8SVo0Cx4ZS7AXsHdSqDUnU3Y630QbkXrslApSlApSlAr7XyvjOBuQKDnP5TOCHs4lL20SS3LWyP56gX8Frj2Pi1v7uY2F7HuFxr3Ed9fpPiPEsLkZJWVlYFWUi4IIsQRzriHS7hUMbs2FmEiHXI9w6b6Bjo4152Pffegoc8fMViz+FbeIe3KtZpR3UHkympHo9waXGYhIIwSzmxNtFX7THwA19w51qYfDM5too5lth/E10nolxSHARlYTd39uQgZmtyH5qDkO8m5PIO1cMwCYeGOGMWRFCL5AWvpzO/ma27gc65SemDt9tq8npGT9o++g6o2IQbuo9RWF+IxDdxXLjxzxrweMeNBeuMrgMSAJ41kt7JIsy/hcWYehqq4/o5w9Ed4I5EkVSUJkkZb2O6s1iLXqMfip76wNxJu+gruJXLl5gZb2F72VoydtbtY/hXXUVXuJroh15qe66kg29QfdVkxjDMQdBqb72DWBPoch9/mIPiEdwR+lYciNGGncbe/1oNzo7IGUKWy5WuSNbDdjbmANbc8oArd4fJNHK8crWyMEtZQhVh2MijTKQVItuDVa4bijFIGuQDzHI/Zax8a6BgMJHiMjLLGHS4OHn1j5m0ZDKeruSQtyRtoNKD1guPQte0a5EvmyBiJGCtZQzMbBjZLjSzEjSqniAzyDPq8jtI55EsxY27he+njVw4rHDBd5WhzhQqxwKiKLXtZVJyjU9piTqQKiOCcLfEFpsu/ZGnK99O7TL6WPOgjpMFGfsD3V8XALyQVdYOikjbIT6VJYfoRKd1A86CgJhyNhW1HmHfXR4Ogn5zgeQqRg6FwL7TM3uFBzJJpBzNbCYqbkW9L11aDo3hU/owfPWpCLBxp7MajyAoOSwfT3/yaSH0NbQwPGvsqw8z/ANa6wKUHBuK/k64lipTK6Irt7TXAzH84/e8edZML+SLHGweSJR36kj3Gu60oK/0P6NR8Pg6pLFiczvrdmta58ANAKsFKUClKUClKUCsM2HDVmr6KCDxXAlfkKg8X0RVv6MGrxXy1ByzE9CU/zQ91R79DEH9H8K7HavJjHcKDjP8Agko/o/hX0dGwPs12FsKh+yKxPw+M/ZqDko4DblXxuDkcq6u3CIzyrXfgUZoOVPw1hWu+FYV1d+jqHnWu/RdTQcocEVrvPaurSdD1PdWrJ0ERuQoOTY6VHFs1iNj8wfA1AzYix13+Hv532/6122X8nEbd1a5/JRC27AelUcTLKf8Av/fSs8TkCyvYdx/nXaE/JDgvtM58rCpHCfku4ZGbmEv+JiR7hQcp6McEkxsgUMCgIzuR9Wvy6w/dX1IFd74TwyKCNI0XRRYEjU8yT4kkmsmB4XBCMsUSIB+aoHxreoPgpSlApSlApSlApSlApSlApSlApSlApSlB6pSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlApSlB//Z',
    },
    {
      name: '407',
      weight: 500,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJemlHhyIYd9riyxsK6ieol7XMkQEgokkSVVTF-BlrJQ&s',
    },
    {
      name: 'Eicher',
      weight: 500,
      img: "data:image/jpeg;base64,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",
    },
  ];

  const goods = [
    {label: 'Cartoon Box', value: '1'},
    {label: 'Wood', value: '2'},
    {label: 'Steel', value: '3'},
  ];

  const fare = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '2'},
    {label: 'Item 5', value: '3'},
    {label: 'Item 6', value: '2'},
    {label: 'Item 7', value: '3'},
  ];

  const vehicle = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
  ];

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: "2-digit",
    hour12: false,
  };

  const checkPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Storage Permission Required',
                message: 'Application needs access to your storage to download File',
            }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Error', 'Storage Permission Not Granted');
        }
    } catch (err) {
        console.error('Error requesting storage permission:', err);
    }
};

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Choose Your Vehicle</Text>
        <FlatList
          data={VehicleData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            const isFocused = selectedVehicle ? item.name == selectedVehicle.name : false;
           
            return (
              <TouchableOpacity
                style={[
                  styles.vehicle,
                  isFocused
                    ? {
                        borderWidth: 1,
                        borderColor: Colors.primaryColor,
                      }
                    : null,
                ]}
                key={index}
                onPress={() => setSelectedVehicle(item)}>
                <Image style={styles.vehicleImg} source={{uri: item.img}} />
                <Text style={styles.vehicleName}>{item.name}</Text>
                <Text style={styles.vehicleName}>{item.weight}</Text>
              </TouchableOpacity>
            );
          }}
        />
        <View style={styles.typeView}>
          <Text style={styles.h3}>Vehicle Type: </Text>
          <TouchableOpacity>
            <Text style={styles.h3}>Select Type</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.line} />
        <View style={styles.dateView}>
          <Text style={styles.h3}>Date & Time:</Text>
          <TouchableOpacity style={styles.selectDate} onPress={() => setOpen(true)}>
          <Icon name="calendar" size={15} color="#000" />
          {dateSelected ? <Text style={styles.h3}>{date.toLocaleDateString('en-US', options).toString()}</Text>
          :<Text style={styles.h3}>Select Date</Text>
          }
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              setDateSelected(true)
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        <View style={styles.locationView}>
          <View style={styles.locationTextView}>
            <Text style={styles.h3}>Pickup Location:</Text>
            <Text style={styles.h3}>Drop Location:</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Map')}>
            <Text style={styles.location}>Choose Location</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <View style={styles.dropView}>
          <View style={styles.dropView1}>
            <Text style={styles.h2}>Goods Name:</Text>
            <Text style={styles.h2}>Fare Type:</Text>
            <Text style={styles.h2}>Number of Vehicles:</Text>
          </View>
          <View>
            <Dropdown
              style={styles.dropdown}
              containerStyle={styles.dropContainer}
              itemTextStyle={styles.dropTextStyle}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              iconColor={Colors.white}
              data={goods}
              maxHeight={200}
              labelField="label"
              valueField="label"
              placeholder="Select item"
              value={goodsName}
              onChange={item => {
                setGoodsName(item.label);
              }}
            />
            <Dropdown
              style={styles.dropdown}
              containerStyle={styles.dropContainer}
              itemTextStyle={styles.dropTextStyle}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              iconColor={Colors.white}
              data={fare}
              maxHeight={200}
              labelField="label"
              valueField="label"
              placeholder="Select item"
              value={FareType}
              onChange={item => {
                setFareType(item.label);
              }}
            />
            <Dropdown
              style={styles.dropdown}
              containerStyle={styles.dropContainer}
              itemTextStyle={styles.dropTextStyle}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              iconColor={Colors.white}
              data={vehicle}
              maxHeight={200}
              labelField="label"
              valueField="label"
              placeholder="Select item"
              value={noVehicles}
              onChange={item => {
                setNoVehicles(item.label);
              }}
            />
          </View>
        </View>
        <View style={styles.numberHeader}>
        <Text style={styles.alterNumber}>Alternative Mobile Number</Text>
        <Text style={styles.optional}>(optional)</Text>
        </View>
        <View style={styles.numberView}>
          <Text style={styles.numberText}>+91-</Text>
          <TextInput
            style={styles.numberInput}
            placeholder="Alternative Mobile Number....."
            placeholderTextColor={Colors.black3}
            keyboardType="phone-pad"
            onChangeText={text => setAlterNUmber(text)}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.next}
        onPress={() => navigation.navigate('BookingSummary')}>
        <Text style={styles.nextText}>Next</Text>
        <Icon name="arrow-circle-right" size={25} color="#fff" />
      </TouchableOpacity>
    </>
  );
};

export default Home;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: width * 0.04,
    backgroundColor: Colors.white,
  },
  header: {
    color: Colors.black,
    fontSize: 18,
    paddingTop: height * 0.02,
  },
  vehicle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * 0.02,
    marginVertical: width * 0.03,
  },
  vehicleImg: {
    width: width * 0.23,
    height: height * 0.08,
    resizeMode: 'contain',
  },
  vehicleName: {
    color: Colors.black,
    fontSize: 14,
  },
  typeView: {
    flexDirection: 'row',
    justifyContent: 'Flex-start',
    alignItems: 'center',
    gap: width * 0.06,
    marginTop: height * 0.01,
  },
  line: {
    marginVertical: height * 0.02,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    width: '100%', 
  },
  h3: {
    color: Colors.black,
    fontSize: 14,
  },
  dateView: {
    flexDirection: 'row',
    justifyContent: 'Flex-start',
    alignItems: 'center',
    gap: width * 0.18,
  },
  selectDate: {
    backgroundColor: Colors.steel,
    padding: width* 0.01,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    gap: width* 0.01,
  },
  locationView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.1,
  },
  locationTextView: {
    marginTop: height * 0.03,
    gap: height * 0.03,
  },
  location: {
    color: Colors.white,
    backgroundColor: Colors.primaryColor,
    padding: width * 0.02,
    borderRadius: 5,
  },
  h2: {
    color: Colors.black,
    fontSize: 14,
  },
  //dropdown
  dropView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropView1: {
    gap: height * 0.045,
  },
  dropdown: {
    margin: 10,
    height: 35,
    width: width * 0.38,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  dropContainer: {
    color: Colors.black2,
  },
  placeholderStyle: {
    color: Colors.black3,
    fontSize: 14,
    marginLeft: width * 0.04,
  },
  dropTextStyle: {
    color: Colors.black,
  },
  selectedTextStyle: {
    color: Colors.black,
    fontSize: 16,
    marginLeft: width * 0.04,
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: 10,
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
  },
  /////
  numberHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.02,
    gap: width* 0.01,
  },
  alterNumber: {
    color: Colors.black,
    fontSize: 15,
  },
  optional: {
    color: Colors.shadow,
  },
  numberView: {
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: height * 0.01,
  },
  numberText: {
    color: Colors.black,
    alignSelf: 'center',
    paddingHorizontal: width * 0.03,
    fontSize: 14,
  },
  numberInput: {
    color: Colors.black,
    width: width * 0.7,
  },
  ////
  next: {
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.012,
    gap: width * 0.04,
  },
  nextText: {
    fontSize: 20,
    color: Colors.white,
  },
});
