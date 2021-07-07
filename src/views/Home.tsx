import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { PERMISSIONS, check, openSettings } from 'react-native-permissions';
import { Color } from 'global-styles';
import { usePermissionRequest } from 'hooks';
import { Action, BottomSheetModal, InfoModal } from 'modules/shared';

const { width } = Dimensions.get('window');

export const Home: React.FC = () => {
  const [isCameraPermissionModalVisible, setIsCameraPermissionModalVisible] =
    useState(false);

  const [
    isLocationPermissionModalVisible,
    setIsLocationPermissionModalVisible,
  ] = useState(false);

  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  const [isImageUploadModalVisible, setIsImageUploadModalVisible] =
    useState(false);

  function toggleCameraPermissionModal() {
    setIsCameraPermissionModalVisible(!isCameraPermissionModalVisible);
  }

  function toggleLocationPermissionModal() {
    setIsLocationPermissionModalVisible(!isLocationPermissionModalVisible);
  }

  function toggleSettingsModal() {
    setIsSettingsModalVisible(!isSettingsModalVisible);
  }

  function toggleImageUploadModal() {
    setIsImageUploadModalVisible(!isImageUploadModalVisible);
  }

  const requestCameraPermission = usePermissionRequest(
    'android.permission.CAMERA',
    toggleImageUploadModal,
    toggleCameraPermissionModal,
    toggleSettingsModal,
  );

  const requestLocationPermission = usePermissionRequest(
    'android.permission.ACCESS_FINE_LOCATION',
    toggleImageUploadModal,
    toggleLocationPermissionModal,
    toggleSettingsModal,
  );

  function onPress() {
    console.log('wtf');
  }

  function onAddPhoto() {
    check(PERMISSIONS.ANDROID.CAMERA).then((cameraPermission) => {
      if (cameraPermission === 'granted') {
        toggleImageUploadModal();
        return;
      }
      requestCameraPermission();
    });
  }

  function openAppSettings() {
    toggleSettingsModal();
    setTimeout(() => {
      openSettings();
    }, 500);
  }

  function onCameraPermissionModalClosed() {
    toggleCameraPermissionModal();
    requestCameraPermission();
  }

  function onLocationPermissionModalClosed() {
    toggleCameraPermissionModal();
    requestLocationPermission();
  }

  function openAppGallery() {
    return;
  }

  function openAppCamera() {
    return;
  }

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <BottomSheetModal
          isVisible={isImageUploadModalVisible}
          onCancel={toggleImageUploadModal}
          onOpenGallery={openAppGallery}
          onOpenCamera={openAppCamera}
        />

        <InfoModal
          title={'Info'}
          message={
            'Za korištenje aplikacije potrebno je dopuštenje za korištenje kamere.'
          }
          isVisible={isCameraPermissionModalVisible}
          infoModalCallback={onCameraPermissionModalClosed}
        />

        <InfoModal
          title={'Info'}
          message={`Korištenje kamere je blokirano.\nOmogučite korištenje kamere u postavkama.`}
          isVisible={isSettingsModalVisible}
          infoModalCallback={openAppSettings}
        />

        <InfoModal
          title={'Info'}
          message={
            'Za korištenje aplikacije potrebno je dopuštenje za korištenje lokacije.'
          }
          isVisible={isLocationPermissionModalVisible}
          infoModalCallback={onLocationPermissionModalClosed}
        />

        <LinearGradient
          colors={[Color.Primary, Color.Secondary]}
          useAngle={true}
          angle={90}
          style={styles.topContainerBack}
        >
          <View style={styles.topContainerFront}>
            <View style={styles.contentContainer}>
              <TouchableOpacity onPress={onPress} style={styles.navigator}>
                <Image
                  style={styles.navigatorIcon}
                  source={require('assets/images/arrow-left.png')}
                />
              </TouchableOpacity>
              <ScrollView
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                horizontal
              >
                <View style={styles.scrollViewItemContainer}>
                  <Action
                    buttonText={'Dodaj fotografiju'}
                    buttonIcon={'camera'}
                    onPress={onAddPhoto}
                  />
                </View>
                <View style={styles.scrollViewItemContainer}>
                  <Action
                    buttonText={'Dodaj opis'}
                    buttonIcon={'description'}
                    onPress={onAddPhoto}
                  />
                </View>
                <View style={styles.scrollViewItemContainer}>
                  <Action
                    buttonText={'Dodaj lokaciju'}
                    buttonIcon={'location'}
                    onPress={onAddPhoto}
                  />
                </View>
              </ScrollView>
              <TouchableOpacity onPress={onPress} style={styles.navigator}>
                <Image
                  style={styles.navigatorIcon}
                  source={require('assets/images/arrow-right.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.bottomContainerBack}>
          <LinearGradient
            colors={[Color.Primary, Color.Secondary]}
            useAngle={true}
            angle={90}
            style={styles.bottomContainerFront}
          >
            <View style={styles.tabContainer}></View>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    height: '100%',
    backgroundColor: Color.Secondary,
  },
  topContainerBack: {
    flex: 7,
    backgroundColor: Color.Primary,
  },
  topContainerFront: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: Color.Background,
    borderBottomRightRadius: 55,
  },
  bottomContainerBack: {
    flex: 1,
  },
  bottomContainerFront: {
    height: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    padding: 5,
    height: '95%',
    width: '95%',
    elevation: 3,
    borderBottomRightRadius: 55,
  },
  scrollViewItemContainer: {
    width: width - 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigator: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  navigatorIcon: {
    width: 25,
    height: 25,
    tintColor: Color.TextDark,
  },
});
