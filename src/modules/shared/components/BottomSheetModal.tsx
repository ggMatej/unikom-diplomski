import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { Color } from 'global-styles';

import { LinearGradientButton } from '.';

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
      backdropColor={Color.Text}
      backdropOpacity={0.55}
      isVisible={isVisible}
      onSwipeComplete={onCancel}
      swipeDirection={['down']}
      style={styles.view}
      animationOutTiming={700}
      useNativeDriverForBackdrop={true}
      onBackdropPress={onCancel}
    >
      <View style={styles.imageUploadModalContainer}>
        <View style={styles.modalHandle} />
        <View style={styles.imageUploadModalContent}>
          <LinearGradientButton
            placeholder={'otvori kameru'}
            onPress={onOpenCamera}
            type={'primary'}
          />
          <LinearGradientButton
            placeholder={'izaberi iz galerije'}
            onPress={onOpenGallery}
            type={'primary'}
          />
          <LinearGradientButton
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
    margin: 0,
  },
  imageUploadModalContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '40%',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Color.Background,
    borderTopWidth: 0.3,
    borderTopColor: Color.Text,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderLeftColor: Color.Primary,
    borderRightColor: Color.Secondary,
    borderRightWidth: 4,
    borderLeftWidth: 4,
  },
  imageUploadModalContent: {
    justifyContent: 'center',
    backgroundColor: Color.Background,
    width: '70%',
    height: '80%',
  },
  modalHandle: {
    backgroundColor: Color.Text,
    opacity: 0.3,
    height: 5,
    width: '20%',
    marginTop: '2%',
    borderRadius: 50,
  },
});
