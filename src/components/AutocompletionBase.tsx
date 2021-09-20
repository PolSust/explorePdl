import React, { FC } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import uuid from 'react-native-uuid';

interface Props {
  data: readonly any[];
  renderItem: ListRenderItem<any> | null | undefined;
}

const AutocompletionBase: FC<Props> = ({ data, renderItem }) => {
  return (
    <FlatList
      style={tw`pb-3 bg-gray-200 `}
      data={data}
      renderItem={renderItem}
      keyExtractor={() => uuid.v4().toString()}
    />
  );
};

export default AutocompletionBase;
