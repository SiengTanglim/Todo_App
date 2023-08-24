import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import MainTab from './MainTab';
// import CustomSpinner from '../components/custom/CustomSpinner';


const Stack = createNativeStackNavigator();
const MainStack = () => {
  // const loading = useAppSelector(state => state.loading);
  return (
    <>
      {/* <CustomSpinner visible={loading} /> */}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          presentation: 'card',
        }}
        initialRouteName="MainHome"
      >
        <Stack.Screen name="MainHome" component={MainTab} />
        {/* <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="EditProfileInfo" component={EditProfileInfo} />
        <Stack.Screen name="EditPassword" component={EditPassword} />
        <Stack.Screen
          name="MyCourseRegisterLesson"
          component={MyCourseRegisterLesson}
        />
        <Stack.Screen name="MemberShipPlan" component={MemberShipPlan} />
        <Stack.Screen name="QuizHistory" component={QuizHistory} />
        <Stack.Screen name="SaveBookVideo" component={SaveBookVideo} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="MyBook" component={MyBook} />
        <Stack.Screen name="MyVideo" component={MyVideo} />

        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="SearchType" component={SearchType} />
        <Stack.Screen name="ListCategory" component={ListCategory} />
        <Stack.Screen name="ListByCategory" component={LlistByCategory} />
        <Stack.Screen name="HomeViewAll" component={HomeViewAll} />
        <Stack.Screen name="DataViewAll" component={DataViewAll} />
        <Stack.Screen
          name="ViewAllBookByPackage"
          component={ViewAllBookByPackage}
        />
        <Stack.Screen
          name="ViewAllVideoByPackage"
          component={ViewAllVideoByPackage}
        />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="BookDetail" component={BookDetail} />
        <Stack.Screen name="BookPackageDetail" component={BookPackageDetail} />
        <Stack.Screen name="VideoDetail" component={VideoDetail} />
        <Stack.Screen
          name="VideoPackageDetail"
          component={VideoPackageDetail}
        />
        <Stack.Screen name="BorrowBook" component={BorrowBook} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Congratulate" component={Congratulate} />
        <Stack.Screen name="SubscribeService" component={SubscribeService} />
        <Stack.Screen name="ReadBook" component={ReadBook} />
        <Stack.Screen name="WatchVideo" component={WatchVideo} />
        <Stack.Screen name="LessonDetail" component={LessonDetail} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="CourseDetail" component={CourseDetail} />
        <Stack.Screen name="ListLessonBook" component={ListLessonBook} />
        <Stack.Screen name="ListLessonVideo" component={ListLessonVideo} />
        <Stack.Screen name="ListLessonAudio" component={ListLessonAudio} />
        <Stack.Screen name="ListComment" component={ListComment} />
        <Stack.Screen name="ListReply" component={ListReply} />
        <Stack.Screen name="UploadInvoice" component={UploadInvoice} />
        <Stack.Screen name="QuizResult" component={QuizResult} />
        <Stack.Screen name="ListLesson" component={ListLesson} />
        <Stack.Screen name="QuizHistoryResult" component={QuizHistoryResult} />
        <Stack.Screen name="Certificate" component={Certificate} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen
          name="AudioPlayer"
          component={AudioPlayer}
          options={{animation: 'slide_from_bottom'}}
        />
        <Stack.Screen name="MyClass" component={MyClass} />
        <Stack.Screen name="ClassDetail" component={ClassDetail} />
        <Stack.Screen name="SubjectDetail" component={SubjectDetail} /> */}
        {/* <Stack.Screen name="ListSubject" component={ListSubject} /> */}
      </Stack.Navigator>
    </>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
