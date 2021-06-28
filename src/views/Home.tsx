import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { PERMISSIONS, check, openSettings } from 'react-native-permissions';

import { Color } from 'global-styles';
import { ActionButton, InfoModal } from 'components';
import { BottomSheetModal } from 'components/BottomSheetModal';
import { usePermissionRequest } from 'hooks';

export const Home: React.FC = () => {
  const [
    isCameraPermissionModalVisible,
    setIsCameraPermissionModalVisible,
  ] = useState(false);

  const [
    isLocationPermissionModalVisible,
    setIsLocationPermissionModalVisible,
  ] = useState(false);

  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  const [isImageUploadModalVisible, setIsImageUploadModalVisible] = useState(
    false,
  );

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
      <StatusBar backgroundColor={Color.Text} />
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
              <ActionButton
                buttonText={'dodaj fotografiju'}
                onPress={onAddPhoto}
                buttonIcon={'camera'}
                isDisabled={isImageUploadModalVisible}
              />
              <ActionButton
                buttonText={'dodaj opis'}
                onPress={onPress}
                buttonIcon={'gallery'}
                isDisabled={true}
              />
              <ActionButton
                buttonText={'dodaj lokaciju'}
                onPress={onPress}
                buttonIcon={'location'}
                isDisabled={true}
              />
            </View>
          </View>
        </LinearGradient>
        <View style={styles.bottomContainerBack}>
          <LinearGradient
            colors={[Color.Primary, Color.Secondary]}
            useAngle={true}
            angle={90}
            style={styles.bottomContainerFront}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: Color.Background,
  },
  bottomContainerFront: {
    height: '100%',
    backgroundColor: Color.Primary,
  },
  contentContainer: {
    height: '95%',
    width: '95%',
    elevation: 3,
    borderBottomRightRadius: 55,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
