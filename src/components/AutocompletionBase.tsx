import React, { FC } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import uuid from 'react-native-uuid';

interface Props {
  data: readonly any[];
  renderItem: ListRenderItem<any> | null | undefined;
  /**
   * In tailwind
   */
  bgColor: string;
  rounded?: boolean;
  relative1?: boolean;
}

const AutocompletionBase: FC<Props> = ({
  data,
  renderItem,
  bgColor,
  rounded = false,
  relative1 = false,
}) => {
  let roundedClass = rounded ? 'rounded-xl' : '';
  let relativeClass = relative1 ? 'bottom-1' : '';
  let colorClass = data.length > 0 ? bgColor : '';

  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      keyboardDismissMode="interactive"
      style={tw`pb-3 relative z-40 shadow-lg ${relativeClass} ${colorClass} ${roundedClass}`}
      data={data}
      renderItem={renderItem}
      keyExtractor={() => uuid.v4().toString()}
    />
  );
};

export default AutocompletionBase;
