import React, { useEffect, useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Portal, Button, Provider, Dialog } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';

interface props {
  /**
   * Callback function to be called when the user confirms the action
   */
  callback: (confirmed: boolean) => void;

  question: string;
}

const ConfirmModal = ({ callback, question }: props) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (question) {
      setVisible(true);
    }
  }, [question]);

  return (
    <>
      <Provider>
        <Portal>
          <Dialog
            style={tw`flex items-center`}
            visible={visible}
            onDismiss={() => {
              setVisible(false);
            }}>
            <Dialog.Title>{question} ?</Dialog.Title>
            <Dialog.Actions>
              <Button
                style={tw`mx-4`}
                color="gray"
                mode="text"
                onTouchEnd={() => {
                  callback(false);
                  setVisible(false);
                }}>
                Non
              </Button>
              <Button
                style={tw`mx-4`}
                color="red"
                mode="text"
                onTouchEnd={() => {
                  callback(true);
                  setVisible(false);
                }}>
                Oui
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Provider>
    </>
  );
};

export default ConfirmModal;
