import React, { useState } from 'react';
import { StatusBar, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import { Color } from 'global-styles';
import { CustomButton } from 'components';
import { BottomSheetModal } from 'components/BottomSheetModal';

export const Home: React.FC = () => {
  const [isImageUploadModalVisible, setIsImageUploadModalVisible] = useState(
    false,
  );

  function onPress() {
    console.log('wtf');
  }

  function toggleImageUploadModal() {
    setIsImageUploadModalVisible(!isImageUploadModalVisible);
  }

  function imageUploadModalContent() {
    return (
      <View style={styles.imageUploadModalContent}>
        <Text>WASAP</Text>
        <Text>SUCK MY PENIS</Text>
        <Text>YOU FUCK</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={Color.Text} />
      <View style={styles.mainContainer}>
        <BottomSheetModal
          isVisible={isImageUploadModalVisible}
          swipeCallBack={toggleImageUploadModal}
          content={imageUploadModalContent()}
        />
        <LinearGradient
          colors={[Color.Primary, Color.Secondary]}
          useAngle={true}
          angle={90}
          style={styles.topContainerBack}
        >
          <View style={styles.topContainerFront}>
            <View style={styles.contentContainer}>
              <CustomButton
                buttonText={'dodaj fotografiju'}
                onPress={toggleImageUploadModal}
                buttonIcon={'camera'}
                isDisabled={isImageUploadModalVisible}
              />
              <CustomButton
                buttonText={'dodaj opis'}
                onPress={onPress}
                buttonIcon={'gallery'}
                isDisabled={true}
              />
              <CustomButton
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
  imageUploadModalContent: {
    backgroundColor: Color.Background,
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
    padding: 10,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderLeftColor: Color.Primary,
    borderRightColor: Color.Secondary,
    borderRightWidth: 3,
    borderLeftWidth: 3,
  },
});
