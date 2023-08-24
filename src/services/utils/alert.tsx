import { Alert, CloseIcon, HStack, IconButton, VStack } from "native-base";
import React from "react";
import { TextTranslate, TextTranslateBold } from "../../components/custom/TextTranslate";

export const MessageType = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
};

export const VariantType = {
  solid: 'solid',
  subtle: 'subtle',
  left_accent: 'left-accent',
  top_accent: 'top-accent',
  outline: 'outline'
}

const ToastAlert = ({
  toast,
  id,
  status,
  variant,
  title,
  desc,
  isClosable,
  mb,
  ...rest
}: any) => <Alert maxWidth="100%" alignSelf="center" flexDirection="row" status={status ?? "info"} variant={variant} {...rest} mb={mb}>
    <VStack space={1} flexShrink={1} w="100%">
      <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
        <HStack space={2} flexShrink={1} alignItems="center">
          <Alert.Icon />
          <TextTranslateBold style={{ color: variant === "solid" ? "lightText" : variant !== "outline" ? "darkText" : null }}>
            {title}
          </TextTranslateBold>
        </HStack>
        {isClosable ? <IconButton variant="unstyled" icon={<CloseIcon size="3" />} _icon={{
          color: variant === "solid" ? "lightText" : "darkText"
        }} onPress={() => toast.close(id)} /> : null}
      </HStack>
      {desc && <TextTranslate style={{
        color: variant === "solid" ? "lightText" : variant !== "outline" ? "darkText" : null,
        paddingHorizontal: 24
      }}>
        {desc}
      </TextTranslate>
      }
    </VStack>
  </Alert>;

export function showToast(
  toast: any,
  title: string,
  status: string = MessageType.success,
  desc: string | null = null,
  duration: number = 2000,
  mb: number = 0,
  variant: string = VariantType.left_accent
) {
  const item = {
    toast,
    title,
    status,
    variant,
    desc,
    mb
  }
  toast.show({
    render: ({
      id
    }: any) => {
      return <ToastAlert id={id} {...item} isClosable />;
    },
    duration
  })
}