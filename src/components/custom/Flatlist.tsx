import React, { useCallback } from "react";
import { ActivityIndicator, Animated, FlatList, Platform } from "react-native";
import { makeid } from "../../services/utils";
import { paddingHorizontal } from "../../styles";
import colors from "../../styles/colors";
import NoData from "./NoData";

export const FlatListScroll = React.forwardRef((props: any, ref: any) => {
  return (
    <FlatList
      ref={ref}
      {...props}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={false}
      data={['dumy']}
      renderItem={() => {
        return props.children;
      }}
      bounces={false}
      scrollEventThrottle={16}
      onEndReachedThreshold={0.01}
      ListEmptyComponent={null}
      ListHeaderComponent={null}
      keyExtractor={(_: any, index: { toString: () => any; }) => index.toString()}
    // legacyImplementation
    />
  );
})

export const FlatListScrollAnimated = React.forwardRef((props: any, ref: any) => {
  return (
    <Animated.FlatList
      ref={ref}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={false}
      data={['dumy']}
      renderItem={() => {
        return props.children;
      }}
      bounces={false}
      scrollEventThrottle={16}
      onEndReachedThreshold={0.01}
      ListEmptyComponent={null}
      ListHeaderComponent={null}
      keyExtractor={(_: any, index: { toString: () => any; }) => index.toString()}
      {...props}
      keyboardShouldPersistTaps={props.keyboardShouldPersistTaps ? 'handled' : undefined}
    // legacyImplementation
    />
  );
})

export function FlatListHorizontal(props: any) {
  const keyExtractor = useCallback((_, index) => {
    return index.toString();
  }, []);
  const getItemLayout = useCallback(
    (_, index) => ({
      length: props.ITEM_HEIGHT,
      offset: props.ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  return (
    <FlatList
      listKey={makeid()}
      cellKey={makeid()}
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews={Platform.OS == 'ios' ? false : true}
      horizontal
      data={props.data}
      // bounces={false}
      scrollEventThrottle={16}
      renderItem={props.renderItem}
      getItemLayout={props.ITEM_HEIGHT ? getItemLayout : null}
      keyExtractor={keyExtractor}
      {...props}
      keyboardShouldPersistTaps={props.keyboardShouldPersistTaps ? 'handled' : undefined}
    // legacyImplementation
    />
  );
}

export function FlatListVertical(props: any) {
  const keyExtractor = useCallback((_, index) => {
    return index.toString();
  }, []);
  const getItemLayout = useCallback(
    (_, index) => ({
      length: props.ITEM_HEIGHT,
      offset: props.ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  return (
    <FlatList
      listKey={makeid()}
      cellKey={makeid()}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={Platform.OS == 'ios' ? false : true}
      data={props.data}
      // bounces={false}
      scrollEventThrottle={16}
      onEndReachedThreshold={0.01}
      renderItem={props.renderItem}
      getItemLayout={props.ITEM_HEIGHT ? getItemLayout : null}
      keyExtractor={keyExtractor}
      ListEmptyComponent={<NoData />}
      {...props}
      keyboardShouldPersistTaps={props.keyboardShouldPersistTaps ? 'handled' : undefined}
    // legacyImplementation
    />
  );
}

export function FlatListFooter(){
  return (
    <ActivityIndicator
        size="large"
        color={colors.baseColor}
        style={{ marginBottom: paddingHorizontal, alignSelf: 'center' }}
      />
  )
}