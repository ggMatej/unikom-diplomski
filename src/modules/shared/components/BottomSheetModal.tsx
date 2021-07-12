import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { Color } from 'global-styles';

import { CustomButton } from './CustomButton';

interface BottomSheetModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onOpenCamera: () => void;
  onOpenGallery: () => void;
}

type Props = BottomSheetModalProps;

export const BottomSheetModal: React.FC<Props> = ({
  isVisible,
  onOpenCamera,
  onOpenGallery,
  onCancel,
}) => {
  return (
    <Modal
      backdropColor={Color.TextDark}
      backdropOpacity={0.55}
      isVisible={isVisible}
      onSwipeComplete={onCancel}
      swipeDirection={['down']}
      style={styles.view}
      animationOutTiming={700}
      useNativeDriverForBackdrop={true}
      onBackdropPress={onCancel}
    >
      <View style={styles.container}>
        <View style={styles.modalHandle} />
        <View style={styles.imageUploadModalContent}>
          <CustomButton
            placeholder={'otvori kameru'}
            onPress={onOpenCamera}
            type={'primary'}
          />
          <CustomButton
            placeholder={'izaberi iz galerije'}
            onPress={onOpenGallery}
            type={'primary'}
          />
          <CustomButton
            placeholder={'odustani'}
            onPress={onCancel}
            type={'cancel'}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '35%',
    width: '90%',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Color.Background,
    borderTopWidth: 0.3,
    borderTopColor: Color.TextDark,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderLeftColor: Color.Primary,
    borderRightColor: Color.Secondary,
    borderRightWidth: 4,
    borderLeftWidth: 4,
  },
  imageUploadModalContent: {
    justifyContent: 'space-evenly',
    backgroundColor: Color.Background,
    width: '90%',
    height: '85%',
  },
  modalHandle: {
    backgroundColor: Color.TextDark,
    opacity: 0.3,
    height: 5,
    width: '20%',
    marginTop: '2%',
    borderRadius: 50,
  },
});
