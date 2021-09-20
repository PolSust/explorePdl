import React, { useEffect, useState } from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';

const ImageChoiceModal = ({ showModal }) => {
  // const [visible, setVisible] = useState(showModal);

  // useEffect(() => {
  //   console.log(showModal);
  // }, [showModal]);

  return (
    <Provider>
      <Portal>
        <Modal
          visible={showModal}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={tw`p-20 bg-white`}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default ImageChoiceModal;
